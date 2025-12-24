import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid } from "@mui/material";

import colors from "../../theme/color";
import type { IProduct } from "../../Model/IProduct";
import ProductLoading from "./Companents/ProductLoading";
import ProductNotFound from "./Companents/ProductNotFound";
import ProductGalleryPanel from "./Companents/ProductGalleryPanel";
import ProductBuyPanel from "./Companents/ProductBuyPanel";
import ProductDescriptionPanel from "./Companents/ProductDescriptionPanel";
import requests from "../../Api/Api";




// 🔧 backend static images base (senin backend: http://localhost:5232/images/1.jpg gibi)
const IMAGE_BASE = "http://localhost:5232/images/";

export default function ProductAboutPage() {
  const { id } = useParams();

  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);

  const [activeIndex, setActiveIndex] = useState(0);

  // senin sayfada options var ama modelinde yok; layout bozulmasın diye boş bırakıyoruz
  const [optionValues, setOptionValues] = useState<Record<string, string>>({});
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    requests.Catalog.product_Details(Number(id))
      .then((data: IProduct) => setProduct(data))
      .finally(() => setLoading(false));
  }, [id]);

  const images = useMemo(() => {
    if (!product?.imageUrl) return ["/images/1.jpg"]; // fallback (istersen placeholder koyarız)
    // imageUrl "1.jpg" gibi geliyorsa:
    return [`${IMAGE_BASE}${product.imageUrl}`];
  }, [product?.imageUrl]);

  // demo’daki highlights yerine: description’dan 2-3 madde çıkaralım (layout aynı kalsın)
  const highlights = useMemo(() => {
    const desc = (product?.description || "").trim();
    if (!desc) {
      return [
        "Güvenli ödeme ve hızlı kargo",
        "Kolay iade (satıcı politikasına göre)",
        "Stok durumuna göre hızlı teslimat",
      ];
    }

    // çok minimal: cümleleri bölüp ilk 3’ünü madde yap
    const parts = desc
      .split(/[\.\n]/g)
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 3);

    return parts.length
      ? parts
      : [
          "Güvenli ödeme ve hızlı kargo",
          "Kolay iade (satıcı politikasına göre)",
          "Stok durumuna göre hızlı teslimat",
        ];
  }, [product?.description]);

  // seller kısmı modelinde yok; tasarım bozulmasın diye placeholder bıraktım
  const seller = useMemo(
    () => ({
      name: "Commerce Seller",
      feedbackPercent: 99.2,
      feedbackCount: 12450,
    }),
    []
  );

  const discountText = useMemo(() => {
    // senin modelde listPrice yok; layout kalsın diye null
    return null;
  }, []);

  if (loading) return <ProductLoading />;
  if (!product) return null;

  return (
    <Box sx={{ bgcolor: colors.softBg, minHeight: "100vh", py: { xs: 2, md: 3 } }}>
      <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: 2, md: 3 } }}>
        <Grid container spacing={2.5} alignItems="flex-start">
          {/* LEFT: Gallery */}
          <Grid size={{ xs: 12, md: 7 }}>
            <ProductGalleryPanel
              images={images}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              stock={product.stock}
            />
          </Grid>

          {/* RIGHT: Details + Sticky Buy Box */}
          <Grid size={{ xs: 12, md: 5 }}>
            <ProductBuyPanel
              product={product}
              seller={seller}
              highlights={highlights}
              discountText={discountText}
              optionValues={optionValues}
              setOptionValues={setOptionValues}
              qty={qty}
              setQty={setQty}
            />
          </Grid>
        </Grid>

        {/* BOTTOM: Long description */}
        <ProductDescriptionPanel description={product.description} />
      </Box>
    </Box>
  );
}
