import { ShopLayout } from "@/components/layouts"
import { ProductList } from "@/components/products"
import { FullScreenLoading } from "@/components/ui"
import { Typography } from "@mui/material"
import { useProducts } from "@/hooks"


const KidPage = () => {

    const {products, isLoading} = useProducts('/products?gender=kid' );

  return (
    <ShopLayout title={'Teslo-Shop - Niños'} pageDescription={'Encuentra los mejores productos para niño de Teslo aqui'} >
    <Typography variant='h1' component='h1'>Tienda </Typography>
    <Typography variant='h2' sx={{marginBottom: 1, }}>Productos para niños</Typography>

      {
        isLoading
          ? <FullScreenLoading />
          : <ProductList products={products} />
      }

    
  </ShopLayout>
  )
}

export default KidPage