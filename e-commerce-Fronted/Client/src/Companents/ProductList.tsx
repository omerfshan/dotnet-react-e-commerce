import type { IProduct } from "../Model/IProduct";
import Product from "./Product";
import Grid from "@mui/material/Grid";

interface Props {
  products: IProduct[];
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
}

export default function ProductList({ products }: Props) {
  return (
    <Grid container spacing={2}>
      {products.map((p) => (
        <Grid key={p.id} size={{ xs: 6, md: 4, lg: 3 }}>
          <Product product={p} />
        </Grid>
      ))}
    </Grid>
  );
}
