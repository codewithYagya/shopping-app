// RecipeReviewCard component for displaying individual product cards
import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from "react";
import BasicRating from "./Rating";
import BasicMenu from './Menu';
import LoadingButton from '@mui/lab/LoadingButton';
import { Link } from "react-router-dom";

export default function RecipeReviewCard({ item, handleClick, key, setProductList, productList, handlePdp }) {
    // Destructuring properties from the item object
    const { title, description, price, thumbnail, rating } = item;

    // State to manage anchor element for menu
    const [anchorEl, setAnchorEl] = useState(null);
    // Check if the menu is open
    const open = Boolean(anchorEl);

    return (
        // Card component with product details
        <Card sx={{ maxWidth: 330, marginRight: 'auto', marginTop: 5 }}>
            {/* Card header with title, avatar, and menu button */}
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                action={
                    <>
                        {/* Menu button with BasicMenu component */}
                        <IconButton
                            aria-label="more"
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={(event) => setAnchorEl(event.currentTarget)}
                        >
                            <MoreVertIcon />
                        </IconButton>
                        {/* BasicMenu component for edit and delete actions */}
                        <BasicMenu open={open} anchorEl={anchorEl} setAnchorEl={setAnchorEl} item={item} productList={productList} setProductList={setProductList} />
                    </>
                }
                title={title}
                subheader={<BasicRating rating={rating} />}
            />
            {/* CardMedia component for displaying product image */}
            <Link to={`productDetails`}>
                <CardMedia
                    component="img"
                    height="194"
                    image={thumbnail}
                    alt="Product Image"
                    onClick={(e) => handlePdp(e, item)}
                />
            </Link>
            {/* CardContent component with price and description */}
            <CardContent>
                <Typography variant="body2" color="text.primary" sx={{ fontSize: 17, marginBottom: 1 }}>
                    {price + ' ' + 'Rs'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            {/* CardActions component with "Add to Cart" button */}
            <CardActions sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }} >
                {/* LoadingButton component for better user experience */}
                <LoadingButton variant="outlined" sx={{ marginTop: "auto", color: "red", borderColor: "red", outlineColor: "red" }} fullWidth className="add-to-cart" onClick={(e) => handleClick(e, item)}>
                    ADD TO CART
                </LoadingButton>
            </CardActions>
        </Card>
    );
}
