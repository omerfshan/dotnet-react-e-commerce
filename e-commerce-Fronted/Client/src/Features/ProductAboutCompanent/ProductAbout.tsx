import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import colors from "../../theme/color";
import type { IProduct } from "../../Model/IProduct";
import ProductLoading from "./Companents/ProductLoading";
import ProductGalleryPanel from "./Companents/ProductGalleryPanel";
import ProductBuyPanel from "./Companents/ProductBuyPanel";
import ProductDescriptionPanel from "./Companents/ProductDescriptionPanel";
import requests from "../../Api/Api";
import { imageUrl } from "../../Api/config";

// ✅ Ekle
import { selectProductById } from "../../store/Slices/productsSlice";
import { useAppSelector } from "../../store/ hooks";

export default function ProductAboutPage() {
  const { id } = useParams();

  // ✅ Önce cache'e bak
  const cachedProduct = useAppSelector((state) =>
    selectProductById(state, Number(id))
  );

  // ✅ Cache'de varsa direkt kullan, loading'i false başlat
  const [product, setProduct] = useState<IProduct | null>(cachedProduct ?? null);
  const [loading, setLoading] = useState(!cachedProduct);

  const [activeIndex, setActiveIndex] = useState(0);
  const [optionValues, setOptionValues] = useState<Record<string, string>>({});
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (!id) return;

    // ✅ Cache'de varsa API'ye gitme
    if (cachedProduct) {
      setProduct(cachedProduct);
      setLoading(false); // ✅ burda kapat
      return;
    }

    // Cache'de yoksa API'den çek
    setLoading(true);
    requests.Catalog.product_Details(Number(id))
      .then((data: IProduct) => setProduct(data))
      .finally(() => setLoading(false));
  }, [id, cachedProduct]);


  // ⬇️ Buradan itibaren hiçbir şey değişmiyor
  const images = useMemo(() => {
    return [imageUrl(product?.imageUrl)];
  }, [product?.imageUrl]);

  const highlights = useMemo(() => {
    const desc = (product?.description || "").trim();
    if (!desc) {
      return [
        "Güvenli ödeme ve hızlı kargo",
        "Kolay iade (satıcı politikasına göre)",
        "Stok durumuna göre hızlı teslimat",
      ];
    }
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

  const seller = useMemo(
    () => ({
      name: "Commerce Seller",
      feedbackPercent: 99.2,
      feedbackCount: 12450,
    }),
    []
  );

  const discountText = useMemo(() => null, []);

  if (loading) return <ProductLoading />;
  if (!product) return null;

  return (
    <Box sx={{ bgcolor: colors.softBg, minHeight: "100vh", py: { xs: 2, md: 3 } }}>
      <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: 2, md: 3 } }}>
        <Grid container spacing={2.5} alignItems="flex-start">
          <Grid size={{ xs: 12, md: 7 }}>
            <ProductGalleryPanel
              images={images}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              stock={product.stock}
            />
          </Grid>
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
        <ProductDescriptionPanel description={product.description} />
      </Box>
    </Box>
  );
}