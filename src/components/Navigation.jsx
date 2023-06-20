import Link from "next/link";
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Hidden,
  Box,
  IconButton,
  SwipeableDrawer,
  Divider,
  List,
  ListItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import styles from "@/styles/Home.module.css";

/* Desktop navigation */
export default function Navigation() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <AppBar position="sticky" className={styles.navMenu} sx={{bgcolor:'transparent', boxShadow:'none'}}>
        <Toolbar className={styles.navContainer}>
          <Link className={styles.logo} href="./">
            FOO <br /> FESTIVAL
          </Link>
          <div className={styles.flexBox}>
            {/*Box hider navmenuen i mobil xs er en mediaQuiery */}
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {/* Her indsættes vores menuelementer */}
              <Link className={styles.navStyleBtn1} href="/myPage">
                FAVORITES
              </Link>
            </Box>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {/* Her indsættes vores menuelementer */}
              <Link className={styles.navStyleBtn1} href="/program">
                PROGRAM
              </Link>
            </Box>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Link className={styles.navStyleBtn2} href="/events">
                EVENTS
              </Link>
            </Box>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Link className={styles.navStyleBtn2} href="/map">
                MAP
              </Link>
            </Box>
          </div>
          {/* Dette gør at burgermenuen forsvinder igen når skærmen bliver større */}
          {/* Burger menu */}
          <Box display={{ xs: "block", sm: "none" }}>
            <IconButton className={styles.burgerIcon}>
              {/* Burger ikon */}
              <MenuIcon onClick={() => setOpen(true)} />
            </IconButton>
          </Box>
        </Toolbar>
        <SwipeableDrawer
          anchor="right"
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
        >
          <IconButton className={styles.backIcon}>
            {/* Luk knap */}
            <ChevronRightIcon onClick={() => setOpen(false)} />
          </IconButton>
          <Divider></Divider>
          {/* Her indsættes vores menuelementer */}
          <List>
          <ListItem>
              <Link className={styles.navStyleBtn2} href="/myPage">
                FAVORITES
              </Link>
            </ListItem>
            <ListItem>
              <Link className={styles.navStyleBtn2} href="/program">
                PROGRAM
              </Link>
            </ListItem>
            <ListItem>
              {/* Her indsættes vores menuelementer */}
              <Link className={styles.navStyleBtn2} href="/events">
                EVENTS
              </Link>
            </ListItem>
            <ListItem>
              {/* Her indsættes vores menuelementer */}
              <Link className={styles.navStyleBtn2} href="/map">
                MAP
              </Link>
            </ListItem>
          </List>
        </SwipeableDrawer>
      </AppBar>
    </>
  );
}
