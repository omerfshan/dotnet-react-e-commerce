import { useEffect, useState } from "react";

export default function ProductList() {
  const [products, setProducts] = useState([]);

useEffect(() => {
  fetch("http://localhost:5232/api/Products")
    .then(res => {
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.json();
    })
    .then(data => setProducts(data))
    .catch(err => console.log("FETCH ERROR:", err));
}, []);


  return (
    <>
      {
        products.map(p => (
          <Product key={p.id} products={p} />
        ))
      }
    </>
  );
}

function Product({ products }) {
  return (
    <>
      {
        products.isActive
          ? <h3>{products.name} - {products.price}</h3>
          : <p>bu ürün satışta değil</p>
      }
    </>
  );
}

