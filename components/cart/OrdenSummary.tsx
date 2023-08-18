import { CartContext } from "@/context";
import { currency } from "@/utils";
import { Grid, Typography } from "@mui/material"
import { FC, useContext } from 'react';

interface Props {
    total: number;
    subTotal: number;
    tax: number;
    numberOfItems: number
}

export const OrdenSummary: FC <Props> = ({total, subTotal, tax, numberOfItems}) => {

    if (!total) {
        const {numberOfItems, subTotal, tax, total} = useContext(CartContext);
    }
    

  return (
    <Grid container>

        <Grid item xs={6}>
            <Typography>No. Productos</Typography>
        </Grid>

        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>{numberOfItems} {numberOfItems > 1 ? 'Productos' : 'Producto'} </Typography>
        </Grid>

        <Grid item xs={6}>
            <Typography>SubTotal</Typography>
        </Grid>

        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>{currency.format(subTotal)}</Typography>
        </Grid>

        <Grid item xs={6}>
            <Typography>Impuestos ({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%)</Typography>
        </Grid>

        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>{currency.format(tax)}</Typography>
        </Grid>
        
        <Grid item xs={6} sx={{mt: 2}}>
            <Typography variant="subtitle1" >Total:</Typography>
        </Grid>

        <Grid item xs={6} display='flex' justifyContent='end' sx={{mt: 2}}>
            <Typography variant="subtitle1" >{currency.format(total)}</Typography>
        </Grid>

    </Grid>
  )
}
