import * as React from 'react';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, Avatar, IconButton, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import { ClassNames } from '@emotion/react';
import { AddShoppingCart } from '@mui/icons-material/AddShoppingCart';
import accounting from "accounting";
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from "@material-ui/icons/Delete";
import { actionTypes } from "../reducer";
import { useStateValue } from "../StateProvider";

const UseStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    action: {
        marginTop: "3rem",
    },
    media: {
        height: 0,
        paddingTop: "56.25%", //16:9
    },
    cardActions: {
        display:"flex",
        justifyContent: "space-between",
        textAlign: "center",
    },
    cardRating:{
        display:"flex",
    }    
}));

export default function CheckoutCard({
    product : { id, nombre, precio, descripcion, rating, foto, stock, codigo },
}) {
  const classes = UseStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [{ basket}, dispatch ] = useStateValue();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const removeItem = () => dispatch({
    type: actionTypes.REMOVE_ITEM,
    id: id,
  })
 
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
        <Typography
            className={ClassNames.action}
            variants='h5'
            color='textSecondary'
        >
            {accounting.formatMoney(precio, "$")}
         </Typography>
        }
        title={nombre}
        subheader={stock}
      />
      <CardMedia
        className={classes.media}
        image={foto}
        title={nombre}
      />
      <CardActions disableSpacing className={classes.cardActions}>
        <div className={classes.cardRating}> 
            {Array({rating})
                .fill()
                .map((_, i) => (
                    <p>&#11088;</p>
                ))}
        </div>
        <IconButton>
            <DeleteIcon fontSize='large' onClick={removeItem}/>
        </IconButton>
      </CardActions>
    </Card>
  );
}
