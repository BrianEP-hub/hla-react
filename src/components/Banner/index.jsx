import { Container, Typography, Button, Grid } from "@material-ui/core";
import logo from "./HLA-logo.svg";
import "./style.css";

const Banner = () => {
  return (
    <div className="banner">
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Typography className="title" variant="h1">
              Welcome to HLA Engineering
            </Typography>
            <Button className="shopping-button" href="#products">
              Store
            </Button>
          </Grid>
          <Grid className="brand" item sm={6}>
            <img src={logo} alt="Brand-logo" />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Banner;
