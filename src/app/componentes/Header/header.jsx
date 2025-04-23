"use client"
import Link from 'next/link';
import { junge } from '../../Fontes/fonts';
import style from './style.module.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PostAddIcon from '@mui/icons-material/PostAdd';
import InventoryIcon from '@mui/icons-material/Inventory';
import ChecklistIcon from '@mui/icons-material/Checklist';
import AssessmentIcon from '@mui/icons-material/Assessment';

export default function Header({ linkDestino }) {
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
              <PostAddIcon/>
              </ListItemIcon>
              <ListItemText>
                <Link href={"/Telas/CadastroProduto"}>
                Cadastrar Produto
                </Link>
              </ListItemText>
            </ListItemButton>
          </ListItem>

      </List>
      <Divider />
      <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InventoryIcon/>
              </ListItemIcon>
              <ListItemText>
                <Link href={"/Telas/Estoque"}>
                  Estoque
                </Link>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ChecklistIcon/>
              </ListItemIcon>
              <ListItemText>
                <Link href={"/Telas/Pedidos"}>
                Pedidos
                </Link>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AssessmentIcon/>
              </ListItemIcon>
              <ListItemText>
                <Link href={"/"}>
                  Resultados
                </Link>
              </ListItemText>
            </ListItemButton>
          </ListItem>
      </List>
    </Box>
  );


  return (
    <div className={style.backBlack}>
      <header className={style.headerCircle}>
        <div className={style.options}>
          <Link href={linkDestino}>          
              <img
                width="40"
                height="40"
                src="https://img.icons8.com/ios-glyphs/30/FFFFFF/left.png"
                alt="left"
              />
          </Link>
          <p className={`${style.title} ${junge.className}`}>Quiosque 2</p>
             <div>
              {['right'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <img
                      className='cursor-pointer'
                      onClick={toggleDrawer(anchor,true)}
                      width="30"
                      height="30"
                      src="https://img.icons8.com/ios-filled/50/FFFFFF/menu--v6.png"
                      alt="menu--v6"
                      />
                  <Drawer
                    anchor={anchor}
                    open={state[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                  >
                    {list(anchor)}
                  </Drawer>
                </React.Fragment>
              ))}
            </div>
        </div>
      </header>
    </div>
  );
}
