import React from 'react';
import accounting from 'accounting';
import { Button } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { getBasketTotal } from '../reducer';
import { useStateValue } from "../StateProvider";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "20 vh"
    },
    button:{
        maxWidth: "200px",
        marginTop: "2rem",
    }
})); 

export const Total = () => {
  const classes = useStyles();
  const [{ basket}, dispatch ] = useStateValue();

    return (
    <div className={classes.root}>
        <h5>Total items: {basket?.length}</h5>
        <h5> { accounting.formatMoney(getBasketTotal(basket), "$") } </h5>
        <Link to="/checkout">
        <Button className={classes.button} variant="container" color="secondary">
            Check out
        </Button>
        </Link>
    </div>
  )
}

export default Total