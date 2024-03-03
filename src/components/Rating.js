// BasicRating component for displaying and editing ratings
import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";

export default function BasicRating({ rating, isEditing, setUpdatedValue, updatedValue }) {
    // State to manage the rating value
    const [value, setValue] = useState(rating);

    return (
        // Container for rating display and editing
        <Box
            sx={{
                "& > legend": { mt: 2 },
            }}
        >
            {/* Check if the component is in editing mode */}
            {isEditing ? (
                // Render Rating component for editing
                <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                        // Update the state with the new rating value
                        setValue(newValue);
                        // Update the parent component's state with the new rating value
                        setUpdatedValue({
                            ...updatedValue,
                            rating: newValue,
                        })
                    }}
                />
            ) : (
                // Render Rating component for read-only display
                <Rating name="half-rating-read" value={value} precision={0.5} readOnly />
            )}
        </Box>
    );
}
