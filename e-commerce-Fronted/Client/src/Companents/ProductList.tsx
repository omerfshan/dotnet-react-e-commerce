import type { IProduct } from "../Model/IProduct";
import Grid from "@mui/material/Grid";
import ProductCard from "../page/ProductCard/ProductCard";


interface Props {
  products: IProduct[];
 
}


export default function ProductList({ products }: Props) 
 {
  return (
    <Grid container spacing={2}>
      {products.map((p) => (
        <Grid key={p.id} size={{ xs: 6, md: 4, lg: 3 }}>
            <ProductCard key={p.id} product={p} />
        </Grid>
      ))}
    </Grid>
  );
}
