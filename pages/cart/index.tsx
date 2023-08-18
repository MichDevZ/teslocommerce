import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { CartList, OrdenSummary } from "@/components/cart";
import { ShopLayout } from "@/components/layouts"
import { CartContext } from '@/context';
import Link from 'next/link';


const CartPage = () => {

    const {isLoaded, cart, numberOfItems, subTotal, tax, total} = useContext(CartContext);
    const router = useRouter();

    useEffect(() => {
      if (isLoaded && cart.length === 0) {
        router.replace('/cart/empty')
      }
    
    }, [isLoaded, cart, router])
    
    if (!isLoaded || cart.length === 0) {
        return (<></>);
    }

  return (
    <ShopLayout title="Carrito - 3" pageDescription='Carrito de compras de la tienda' >
        <Typography variant='h1' component='h1'>Carrito</Typography>

        
        <Grid container>
            <Grid item xs={12} sm={7}>
            <CartList editable />
            </Grid>

            <Grid item xs={12} sm={5}>
                <Card className="summary-card">
                    <CardContent>
                        <Typography variant="h2">Orden</Typography>
                        <Divider sx={{my:1}} />

                        <OrdenSummary total={total} subTotal={subTotal} tax={tax} numberOfItems={numberOfItems}  />

                        <Box sx={{mt:3}}>
                            <Link href={'/checkout/address'}>
                            <Button 
                            color="secondary" 
                            className="circular-btn" 
                            fullWidth
                            href='/checkout/address'
                            >
                                CheckOut
                            </Button>
                            </Link>
                        </Box>

                    </CardContent>
                </Card>
            </Grid>
        </Grid>


    </ShopLayout>
  )
}

export default CartPage