import { ShopLayout } from "@/components/layouts"
import { ProductList } from "@/components/products"
import { FullScreenLoading } from "@/components/ui"
import { Typography } from "@mui/material"
import { useProducts } from "@/hooks"


const WomenPage = () => {

    const {products, isLoading} = useProducts('/products?gender=women' );

  return (
    <ShopLayout title={'Teslo-Shop - Mujeres'} pageDescription={'Encuentra los mejores productos para mujeres de Teslo aqui'} >
    <Typography variant='h1' component='h1'>Tienda </Typography>
    <Typography variant='h2' sx={{marginBottom: 1, }}>Productos para mujeres</Typography>

      {
        isLoading
          ? <FullScreenLoading />
          : <ProductList products={products} />
      }

    
  </ShopLayout>
  )
}

export default WomenPage