import type { IProduct } from "../Model/IProduct";
import Grid from "@mui/material/Grid";
import ProductCard from "../Features/ProductCard/ProductCard";


interface Props {
  products: IProduct[];
 
}


export default function ProductList({ products }: Props) 
 {
  return (
    <Grid container spacing={{ xs: 1.5, sm: 2, md: 2.5 }}>
      {products
        .filter((p) => p.isActive !== false)
        .map((p) => (
          <Grid key={p.id} size={{ xs: 6, sm: 4, md: 3, lg: 3 }}>
            <ProductCard key={p.id} product={p} />
          </Grid>
        ))}
    </Grid>
  );
}
