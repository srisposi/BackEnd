import * as React from 'react';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Product from './Product';
import  { useState, useEffect } from 'react';
import productsData from '../productData';

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2),
    },
}));

export default function Products() {
  const classes = useStyles();
  const [products, setProducts] = useState([]);

  const getProducts = (()=> {
    fetch('http://localhost:8007/api/productos')
      .then(response => response.json())
      .then(data => setProducts(data));
  });

  useEffect(()=> {
    getProducts();
  }, []);

    return (
    <div className={classes.root}>
      <Grid container spacing={2}>
          {
            products.map(product => (
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Product key={product.id} product={product}/>
            </Grid>
            ))
          }
      </Grid>
    </div>
  );
}
