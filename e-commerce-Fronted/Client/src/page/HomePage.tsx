import { useEffect, useState } from "react";
import ProductList from "../Companents/ProductList";
import type { IProduct } from "../Model/IProduct";
import requests from "../Api/Api";

export default function HomePage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [favoriteCount, setFavoriteCount] = useState(0);

  useEffect(() => {
    requests.Catalog.list()
      .then(data => setProducts(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <ProductList
      products={products}
      onFavorite={() => setFavoriteCount(c => c + 1)}
    />
  );
}
