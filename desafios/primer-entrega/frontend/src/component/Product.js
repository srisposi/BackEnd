import * as React from 'react';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, Avatar, IconButton, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ClassNames } from '@emotion/react';
import { AddShoppingCart } from '@mui/icons-material';
import accounting from "accounting";
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { actionTypes } from "../reducer";
import {useStateValue} from "../StateProvider";

// const ExpandMore = styled((props) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//   marginLeft: 'auto',
//   transition: theme.transitions.create('transform', {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));

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
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: "rotate(180deg)",
    },
}));

export default function Product({product : { id, nombre, precio, descripcion, rating, foto, stock, codigo }}) {
  const classes = UseStyles();
  const [{basket}, dispatch] = useStateValue();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const addToBasket = () => {
    dispatch({ 
      type: actionTypes.ADD_TO_BASKET,
      item: {
        id: id,
        nombre,
        foto,
        precio,
        rating,
        descripcion
      }
    })
  }

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
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {descripcion}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="Add to Cart" onClick={addToBasket}>
          <AddShoppingCart fontSize='large' />
        </IconButton>
            {Array({rating})
                .fill()
                .map((_, i) => (
                    <p>&#11088;</p>
                ))}
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen] : expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon/>
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Descripción:</Typography>
          <Typography paragraph>
            {descripcion}              
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
