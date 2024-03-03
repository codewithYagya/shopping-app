import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import BasicRating from "./Rating";
import { toast } from "react-toastify";
import axios from "axios";

// Styles for the modal
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

// TransitionsModal component
export default function TransitionsModal({
    isModalOpened,
    setModalOpened,
    updatedValue,
    setUpdatedValue,
    productList,
    setProductList,
    item,
    setAnchorEl
}) {
    // Function to handle input changes
    const handleChange = (e) => {
        e.preventDefault();
        setUpdatedValue({
            ...updatedValue,
            [e.target.name]: e.target.value,
        });
    };

    // Function to handle saving changes
    const handleSave = async (e, item) => {
        let payload = {
            title: updatedValue.title,
            description: updatedValue.description,
            price: updatedValue.price,
            rating: updatedValue.rating,
        };

        // Making a PUT request to update the product
        const { data } = await axios.put(
            `https://dummyjson.com/products/${item.id}`,
            payload
        );
        console.log(`updatedData`, data);

        // Updating the product list with the edited product
        setProductList(() => {
            let newUpdatedProduct = [];
            productList?.map((i) => {
                if (i.id !== item.id) {
                    newUpdatedProduct.push(i);
                } else {
                    newUpdatedProduct.push(data);
                }
            });
            return newUpdatedProduct;
        });

         // Closing the modal and resetting the anchor element
        setModalOpened(false);
        setAnchorEl(null)
        toast.success(`Edited successfully!`);
    };

    return (
        <div>
            {/* Modal component for editing */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={isModalOpened}
                onClose={() => setModalOpened(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={isModalOpened}>
                    <Box sx={style}>
                        {/* Modal content */}
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Edit Product Now!
                        </Typography>
                        {/* Input for updating the title */}
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            <>
                                <div>Update Title</div>
                                <input
                                    className="mx-1"
                                    type="text"
                                    value={updatedValue.title}
                                    onChange={handleChange}
                                    name="title"
                                    placeholder="Title"
                                />
                            </>
                        </Typography>

                        {/* Input for updating the price */}
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            <>
                                <div>Update Price</div>
                                <input
                                    className="mx-1"
                                    type="number"
                                    value={updatedValue.price}
                                    onChange={handleChange}
                                    name="price"
                                />
                            </>
                        </Typography>
                        {/* Input for updating the rating */}
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            <>
                                <div>Update Rating</div>
                                <BasicRating
                                    rating={updatedValue.rating}
                                    isEditing={isModalOpened}
                                    setUpdatedValue={setUpdatedValue}
                                    updatedValue={updatedValue}
                                />
                            </>
                        </Typography>
                        {/* Buttons for saving and canceling changes */}
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            <div className="d-flex">
                                <button
                                    className="btn btn-dark"
                                    onClick={(e) => handleSave(e, item)}
                                >
                                    Save
                                </button>
                                <button
                                    className="btn btn-danger mx-3"
                                    onClick={() => { setModalOpened(false); toast.error(`Canceled Editing`); setAnchorEl(null) }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </Typography>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
