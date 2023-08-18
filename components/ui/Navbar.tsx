
import { AppBar, Badge, Box, Button, IconButton, Input, InputAdornment, Toolbar, Typography } from '@mui/material';

import {ClearOutlined, SearchOutlined, ShoppingCartOutlined} from '@mui/icons-material'
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { CartContext, UiContext } from '@/context';
import Link from 'next/link';




export const Navbar = () => {

    const {route, push} = useRouter();

    const {toggleSideMenu} = useContext(UiContext)
    const {numberOfItems} = useContext(CartContext)

    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchVisible, setisSearchVisible] = useState(false)

    const onSearchTerm = () => {
        if (searchTerm.trim().length === 0) return;
        push(`/search/${searchTerm}`)
    }

   

  return (
    <AppBar>
        <Toolbar>
                <Link href="/" style={{display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'GrayText'  }} >
                    <Typography variant="h6">Teslo |</Typography>                                                     
                    <Typography sx={{ml: 0.5}}>Shop</Typography>                                                     
                </Link>


                <Box flex={1} />
                <Box sx={{display: isSearchVisible ? 'none' : {xs: 'none', sm: 'block'} }} className='fadeIn'>
                    <Link href='/category/men'>
                        <Button color={route === '/category/men'  ? 'primary' : 'info' } >Hombres</Button>
                    </Link>
                    <Link href='/category/women'>
                        <Button color={route === '/category/women' ? 'primary' : 'info' } >Mujeres</Button>
                    </Link>
                    <Link href='/category/kid'>
                        <Button color={route === '/category/kid' ? 'primary' : 'info' }>Niños</Button>
                    </Link>
             
                </Box>
                <Box flex={1} />



                {
                    isSearchVisible
                        ? (
                            <Input
                                sx={{display:{xs: 'none', sm: 'flex'} }}
                                className='fadeIn'
                                autoFocus
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' ? onSearchTerm() : null}
                                type='text'
                                placeholder="Buscar..."
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setisSearchVisible(false)}
                                        >
                                            <ClearOutlined />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                        )
                        : (
                            <IconButton
                                onClick={() => setisSearchVisible(true)}
                                className='fadeIn'
                                sx={{display: {xs: 'none', sm: 'flex'} }}
                            >
                                <SearchOutlined />
                            </IconButton> 
                        )  
                }

                
                <IconButton
                    sx={{display: {xs: 'flex' , sm: 'none'}}}
                    onClick={toggleSideMenu}
                >   
                    <SearchOutlined />
                </IconButton>

                <Link href='/cart'>
                    <IconButton>
                        <Badge badgeContent={numberOfItems > 9 ? '+9' : numberOfItems} color='secondary'>
                            <ShoppingCartOutlined />
                        </Badge>
                    </IconButton>
                </Link>
                

                <Button
                onClick={toggleSideMenu}
                >
                    Menú
                </Button>

        </Toolbar>
    </AppBar>
  )
}
