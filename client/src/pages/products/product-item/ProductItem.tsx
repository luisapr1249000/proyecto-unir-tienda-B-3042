import React from "react";
import Grid from "@mui/material/Grid2";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  IconButton,
  InputAdornment,
  Paper,
  Rating,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { useGetProductById } from "../../../hooks/products.hooks";
import { ProductId } from "../../../types/product";
import LoadSpinner from "../../../components/common/load-spinner/LoadSpinner";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ReactLink from "../../../components/common/react-link/ReactLink";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import moment from "moment";
import ProductItemCard from "../../../components/products/product-item/ProductItemCard";
import ObjectNotFound from "../../../components/common/object-not-found/ObjectNotFound";

const ProductItem = () => {
  const { productId } = useParams() as ProductId;
  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductById({ productId });

  if (error) return <ObjectNotFound onReload={refetch} object="Product" />;
  return (
    <Grid
      container
      sx={{
        justifyContent: "center",
        alignItems: "center",
        // height: "calc(100vh)",
        border: 1,
        p: 3,
      }}
      spacing={3}
    >
      {isLoading && <LoadSpinner />}
      {error && <Typography>Product Not Found</Typography>}
      {product && (
        <>
          <ProductItemCard product={product} />
          <Grid
            component={Card}
            variant="outlined"
            size={{ xs: 10 }}
            sx={{ height: 100 }}
          >
            <CardContent>
              <Typography>Most Common Questions</Typography>
            </CardContent>
            <Divider />
            <CardContent></CardContent>
          </Grid>
        </>

        // <Card
        //   component={Grid}
        //   container
        //   size={{ xs: 10 }}
        //   sx={{
        //     display: "flex",
        //     height: 500,
        //   }}
        // >
        //   <Grid container size={{ xs: 4 }} sx={{ position: "relative" }}>
        //     <Grid sx={{ height: 1, width: 1, position: "absolute" }}>
        //       <CardMedia
        //         sx={{
        //           position: "absolute",
        //           objectFit: "cover",
        //           height: 1,
        //           width: 1,
        //           transition: (theme) => theme.transitions.create("transform"),
        //           "&:hover": { transform: "scale(1.25)" },
        //         }}
        //         component="img"
        //         image={product.images[0].url}
        //       />
        //     </Grid>
        //   </Grid>

        //   <Grid
        //     size={{ xs: 4 }}
        //     sx={{ p: 3, position: "relative" }}
        //     container
        //     direction="column"
        //   >
        //     <Grid
        //       container
        //       direction="column"
        //       sx={{ position: "absolute", right: 0, top: 0 }}
        //     >
        //       <IconButton color="inherit">
        //         <AddIcon fontSize="small" />
        //       </IconButton>
        //       <IconButton color="inherit">
        //         <PlaylistAddIcon fontSize="small" />
        //       </IconButton>
        //       <IconButton color="inherit">
        //         <FavoriteBorderIcon fontSize="small" />
        //       </IconButton>
        //     </Grid>
        //     <CardContent>
        //       <Typography gutterBottom variant="h5" sx={{ fontWeight: "bold" }}>
        //         {product.name}
        //       </Typography>
        //       {/* <Divider sx={{ mb: 1 }}>
        //         <Typography
        //           gutterBottom
        //           variant="caption"
        //           color="textSecondary"
        //         >
        //           Description
        //         </Typography>
        //       </Divider> */}
        //       <Typography variant="body2">{product.description}</Typography>
        //       <Grid container sx={{ mt: 3 }}>
        //         <Grid size={{ xs: 12 }}>
        //           <Rating readOnly />
        //           <Typography gutterBottom>({product.price})</Typography>
        //         </Grid>
        //         <Grid size={{ xs: 12 }}>
        //           <Typography
        //             variant="body2"
        //             color="textSecondary"
        //             gutterBottom
        //           >
        //             Reviews
        //           </Typography>
        //         </Grid>
        //       </Grid>
        //       <Grid sx={{ p: 2 }} size={{ xs: 12 }}>
        //         <Divider>
        //           <Typography variant="caption" color="textSecondary">
        //             Categories
        //           </Typography>{" "}
        //         </Divider>
        //       </Grid>
        //       <Grid size={{ xs: 12 }} sx={{ mb: 2 }}>
        //         {product.categories.map((category) => (
        //           <Chip
        //             clickable
        //             component={Link}
        //             to={`/products/category/${category.name}`}
        //             label={category.name}
        //           />
        //         ))}
        //       </Grid>
        //       <Grid sx={{ p: 2 }} size={{ xs: 12 }}>
        //         <Divider />
        //       </Grid>

        //       <Grid size={{ xs: 12 }}>
        //         <Typography
        //           gutterBottom
        //           component="div"
        //           color="textSecondary"
        //           variant="body2"
        //         >
        //           Published At {moment(product.createdAt).format("LLL")}
        //         </Typography>
        //       </Grid>
        //     </CardContent>
        //   </Grid>
        //   <Grid
        //     component={Card}
        //     variant="outlined"
        //     sx={{ p: 3 }}
        //     container
        //     direction="column"
        //     size={{ xs: 4 }}
        //     spacing={2}
        //   >
        //     <Typography gutterBottom variant="h4">
        //       $ {product.price}
        //     </Typography>
        //     <Grid size={{ xs: 12 }}>
        //       <TextField
        //         size="small"
        //         fullWidth
        //         value={1}
        //         sx={{ input: { textAlign: "center" } }}
        //         slotProps={{
        //           input: {
        //             endAdornment: (
        //               <InputAdornment position="end">
        //                 <IconButton>
        //                   <AddIcon />
        //                 </IconButton>
        //               </InputAdornment>
        //             ),
        //             startAdornment: (
        //               <InputAdornment position="start">
        //                 <IconButton>
        //                   <RemoveIcon />
        //                 </IconButton>
        //               </InputAdornment>
        //             ),
        //           },
        //         }}
        //       />
        //     </Grid>
        //     <Divider sx={{ width: 1 }} />

        //     <Grid spacing={2} container size={{ xs: 12 }}>
        //       <Button
        //         fullWidth
        //         variant="outlined"
        //         sx={{ textTransform: "capitalize" }}
        //       >
        //         <Typography>Comprar Ahora</Typography>
        //       </Button>
        //       <Divider sx={{ width: 1 }} />
        //       <Button
        //         fullWidth
        //         variant="outlined"
        //         sx={{ textTransform: "capitalize" }}
        //       >
        //         <Typography>Agregar</Typography>
        //       </Button>
        //     </Grid>
        //     <Divider />

        //     <CardContent>
        //       <Typography variant="body2">
        //         Vendido por
        //         <Typography sx={{ fontWeight: "bold" }}>
        //           <ReactLink to={`/profile/${product.author.username}`}>
        //             {product.author.username}
        //           </ReactLink>
        //         </Typography>
        //       </Typography>
        //     </CardContent>
        //   </Grid>
        // </Card>
      )}
    </Grid>
  );
};

export default ProductItem;
