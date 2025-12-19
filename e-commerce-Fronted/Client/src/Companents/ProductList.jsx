
const products=[
    {id:0,name:'Product1',price:1000,is_active:true},
    {id:1,name:'Product2',price:2000,is_active:false},
    {id:2,name:'Product1',price:3000,is_active:true},
]


export default function ProductList() {
  return (
  <>
  {
    
  products.map(p=>(<Product key={p.id} products={p}/>))
  }
  </>
  

  )
}
function Product(props) 
{
    return (
        <>
        {       
            (props.products.is_active)?
                (<h3>{props.products.name}-{props.products.price}</h3>):
                <p>bu ürün satışta değil</p>    
        }
        </>
            )
}
