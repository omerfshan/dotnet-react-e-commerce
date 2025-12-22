import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductList from "../Companents/ProductList";
import type { IProduct } from "../Model/IProduct";

export default function CatalogPage() {
  const { id } = useParams(); // /category/:id
  const [products, setProducts] = useState<IProduct[]>([]);
  const [favoriteCount, setFavoriteCount] = useState(0);

  useEffect(() => {
    const url = id
      ? `http://localhost:5232/api/Categories/${id}/products`
      : `http://localhost:5232/api/Products`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((err) => console.log("FETCH ERROR:", err));
  }, [id]);

  return (
    <ProductList
      products={products}
      onFavorite={() => setFavoriteCount((c) => c + 1)}
    />
  );
}
