import {
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
} from "@material-ui/core";
import { ShoppingCart, AccountCircle } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";

import "./style.css";

const NavBar = ({ basketItems, totalCost }) => {
  const location = useLocation();

  return (
    <>
      <AppBar position="fixed" className="custom-navbar">
        <Container>
          <Toolbar>
            <Typography
              component={Link}
              to="/"
              variant="h6"
              className="custom-title"
              color="inherit"
            >
              <img
                src="HLA-logo.svg"
                alt="Hartlichtautomatik logo"
                height="25px"
                className="logo"
              />
            </Typography>
            
            {location.pathname === "/basket" ? (
              <div className="basket-wrapper">
                <h2>
                  Total cost: <strong>{totalCost}</strong>
                </h2>
              </div>
            ) : (
              <div className="basket-wrapper">
                <IconButton 
                 conponent={Link}
                 to="/account"
                 aria-label="account"
                 color="inherit">
                <AccountCircle className="custom-button"/>
              </IconButton>
                <IconButton
                  component={Link}
                  to="/basket"
                  aria-label="Show basket contents"
                  color="inherit"
                >
                  <Badge badgeContent={basketItems} color="secondary">
                    <ShoppingCart className="custom-button" />
                  </Badge>
                </IconButton>
              </div>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default NavBar;
