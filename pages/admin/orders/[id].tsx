import { GetServerSideProps, NextPage } from 'next'
import { getServerSession } from 'next-auth';
import { Box, Card, CardContent, Chip, Divider, Grid,  Typography } from '@mui/material';
import { AirplaneTicketOutlined, CreditCardOutlined, CreditScoreOutlined } from '@mui/icons-material';
import { CartList, OrdenSummary } from "@/components/cart";
import { AdminLayout } from "@/components/layouts"
import { dbOrders } from '@/database';
import { IOrder } from '@/interfaces';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

interface Props {
    order: IOrder
}

const OrderPage: NextPage<Props> = ({order}) => {

    const {shippingAddress} = order
    

  return (
    <AdminLayout title="Resumen de la orden" subTitle={`Orden Id: ${order._id}`} icon={<AirplaneTicketOutlined />} >
         {
            order.isPaid
            ? (
                <Chip  
                    sx={{my:2}}
                    label='Pago Realizado'
                    variant='outlined'
                    color='success'
                    icon={<CreditScoreOutlined />}
                />

            ): (
                <Chip  
                    sx={{my:2}}
                    label='Pendiente de pago'
                    variant='outlined'
                    color='error'
                    icon={<CreditCardOutlined />}
                />

            )
         }   



        <Grid container className='fadeIn'>
            <Grid item xs={12} sm={7}>
            <CartList products={order.orderItems} />
            </Grid>

            <Grid item xs={12} sm={5}>
                <Card className="summary-card">
                    <CardContent>
                        <Typography variant="h2">Resumen ({order.numberOfItems} {order.numberOfItems > 1 ? 'productos' : 'producto'})</Typography>
                        <Divider sx={{my:1}} />
                        
                        <Box display='flex' justifyContent='space-between' >
                            <Typography variant='subtitle1'>Dirección de entrega</Typography>
                       </Box>

                        <Typography>{shippingAddress.firstName} {shippingAddress.lastName}</Typography>
                        <Typography>{shippingAddress.address} {shippingAddress.address2 ? `, ${shippingAddress.address2}` : '' }</Typography>
                        <Typography>{shippingAddress.city}, {shippingAddress.zip}</Typography>
                        <Typography>{shippingAddress.country}</Typography>
                        <Typography>{shippingAddress.phone}</Typography>

                        <Divider sx={{my:1}} />

                        <OrdenSummary 
                        total = {order.total} 
                        subTotal = {order.subTotal}
                        tax = {order.tax}
                        numberOfItems = {order.numberOfItems}
                        />

                        <Box sx={{mt:3}} display='flex' flexDirection='column' >


                            <Box display='flex' flexDirection='column'>

                            {
                                order.isPaid 
                                ? (

                                    <Chip  
                                        sx={{my:2, flex: 1}}
                                        label='Pago Realizado'
                                        variant='outlined'
                                        color='success'
                                        icon={<CreditScoreOutlined />}
                                    />
                                ) :
                                (
                                    <Chip  
                                    sx={{my:2, flex: 1 }}
                                    label='Pendiente de pago'
                                    variant='outlined'
                                    color='error'
                                    icon={<CreditCardOutlined />}
                                />
                                )
                            }

                            </Box>

                            

                        </Box>

                    </CardContent>
                </Card>
            </Grid>
        </Grid>


    </AdminLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({req, query, res}) => {

    const {id = '' } = query;

    const session = await getServerSession(req, res, authOptions)

    if (!session) {
        return {
            redirect: {
                destination: `/auth/login?p=/orders/${id}`,
                permanent: false
            }
        }
    }

    const order = await dbOrders.getOrderById(id.toString());

    if (!order) {
        return {
            redirect: {
                destination: '/admin/orders',
                permanent: false
            }
        }
    }

    return {
        props: {
            order
        }
    }
}

export default OrderPage;