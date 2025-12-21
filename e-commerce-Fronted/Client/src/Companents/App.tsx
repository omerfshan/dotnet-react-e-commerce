

import { useEffect, useState } from 'react';

import ProductList from './ProductList.tsx'
import type { IProduct } from '../Model/IProduct.ts';
import { Container, CssBaseline } from '@mui/material';
import Header from './Header/Header.tsx';

function App() {
  
const [products, setProducts] = useState<IProduct[]>([]);
const [favoriteCount, setFavoriteCount] = useState(0);



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
    <CssBaseline/>
   <Header favoriteCount={favoriteCount} />

    <Container>
   <ProductList
  products={products}
 
  onFavorite={() => setFavoriteCount((c) => c + 1)}
/>

    </Container>
    </>
  )
}

export default App
