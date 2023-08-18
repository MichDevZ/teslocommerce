import { ShopLayout } from "@/components/layouts"
import { Button, Chip, Grid, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { GetServerSideProps, NextPage } from 'next'
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { dbOrders } from "@/database";
import { IOrder } from "@/interfaces";
import Link from "next/link";

const columns: GridColDef[] = [
  {field: 'id', headerName: 'ID', width: 100},
  {field: 'fullname', headerName: 'Nombre Completo', width: 300},

  {
    field: 'paid',
    headerName: 'Pagada',
    description: 'Muestra información si está pagada',
    width: 200,
    renderCell : (params: GridRenderCellParams) => {
      return (
        params.row.paid
            ? <Chip color="success" label='Pagada' variant="outlined"/>
            : <Chip color="error" label='Pendiente de pago' variant="outlined"/>
      )
    }
  },

  {
    field: 'order', 
    headerName: 'Orden', 
    width: 200, 
    sortable: false, 
    renderCell: (params: GridRenderCellParams) => {
      return (
        <Link href={`/orders/${params.row.orderId}`} style={{textDecoration: 'underlined'}}>
          Ver orden
        </Link>
      )
    } },

]

interface Props {
  orders: IOrder[]
}

const HistoyPage: NextPage<Props> = ({orders}) => {

  const rows = orders.map((order, index) => ({
        id: index + 1,
        paid: order.isPaid, 
        fullname: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
        orderId: order._id
  }))

  return (
    <ShopLayout title='Historial de ordenes' pageDescription='Historial de ordenes del cliente' >
        <Typography variant="h1" component='h1'>Historial de ordenes</Typography>

        
        <Grid container className="fadeIn">
            <Grid item xs={12} sx={{height:650, width:'100%'}}> 
                <DataGrid 
                  rows={rows}
                  columns={columns}
                  autoPageSize
                />
            </Grid>
        </Grid>

    </ShopLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
  
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login?p=/orders/history',
        permanent: false
      }
    }
  }

  const orders = await dbOrders.getOrdersByUser(session.user._id);

  return {
    props: {
      orders
    }
  }
}

export default HistoyPage