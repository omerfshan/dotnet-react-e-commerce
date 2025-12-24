import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductList from "../Companents/ProductList";
import type { IProduct } from "../Model/IProduct";

import requests from "../Api/Api";

export default function CatalogPage() {
  const { id } = useParams(); // /category/:id
  const [products, setProducts] = useState<IProduct[]>([]);
  const [favoriteCount, setFavoriteCount] = useState(0);

 useEffect(() => {
  const req = id
    ? requests.Catalog.Category_details(Number(id))
    : requests.Catalog.list();

  req
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
