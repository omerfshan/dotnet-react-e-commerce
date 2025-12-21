import { Button } from "@mui/material";
import type { IProduct } from "../Model/IProduct";

type Props = {
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>
};

export default function AddProduct({ setProducts }: Props) {
  const handleAdd = () => {
    const newProduct: IProduct = {
      id: Date.now(),
      name: "Yeni Ürün",
      description: "Ürün açıklaması",
      price: 1000,
      isActive: true,
      imageUrl: "product.jpg",
      stock: 10
    };

    setProducts(prev => [...prev, newProduct]);
  };

  return (
   <Button variant="contained" onClick={handleAdd} >Add</Button>
  );
}
