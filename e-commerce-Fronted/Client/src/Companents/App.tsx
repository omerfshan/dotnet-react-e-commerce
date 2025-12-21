

import { useEffect, useState } from 'react';
import Header from './Header.tsx'
import ProductList from './ProductList.tsx'
import type { IProduct } from '../Model/IProduct.ts';
import { Container, CssBaseline } from '@mui/material';

function App() {
  
const [products, setProducts] = useState<IProduct[]>([]);



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
    <Header/>
    <Container>
    <ProductList products={products} setProducts={setProducts} />
    </Container>
    </>
  )
}

export default App
