
import { AppBar,  Box, Button, Toolbar, Typography } from '@mui/material';

import { useContext } from 'react';
import { UiContext } from '@/context';
import Link from 'next/link';




export const AdminNavbar = () => {

    const {toggleSideMenu} = useContext(UiContext)


  return (
    <AppBar>
        <Toolbar>
                <Link href="/" style={{display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'GrayText'  }} >
                    <Typography variant="h6">Teslo |</Typography>                                                     
                    <Typography sx={{ml: 0.5}}>Shop</Typography>                                                     
                </Link>

                <Box flex={1} />
                
                <Button
                onClick={toggleSideMenu}
                >
                    Menú
                </Button>

        </Toolbar>
    </AppBar>
  )
}
