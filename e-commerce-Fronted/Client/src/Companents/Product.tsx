import type { IProduct } from "../Model/IProduct";

function Product({ product }: { product: IProduct }) {
  return (
    <>
      {product.isActive ? (
        <div>
            <h3>{product.name}</h3>
            <p>{product.price}</p>
        </div>
       
      ) : (
        <p>bu ürün satışta değil</p>
      )}
    </>
  );
}export default Product