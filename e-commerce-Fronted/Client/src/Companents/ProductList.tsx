import type { IProduct } from "../Model/IProduct";
import Grid from "@mui/material/Grid";
import ProductCard from "../page/ProductCard/ProductCard";


interface Props {
  products: IProduct[];
  onFavorite: () => void; 
}


export default function ProductList({ products,onFavorite }: Props) 
 {
  return (
    <Grid container spacing={2}>
      {products.map((p) => (
        <Grid key={p.id} size={{ xs: 6, md: 4, lg: 3 }}>
            <ProductCard key={p.id} product={p} onFavorite={onFavorite} />
        </Grid>
      ))}
    </Grid>
  );
}
