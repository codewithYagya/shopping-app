import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useState } from "react";

export default function PaginationRounded({ setPage }) {
    // State to manage the current page
    const [currentPage, setCurrentPage] = useState(1);

    // Handle page change
    const handleChange = (event, value) => {
        // Update the current page state and trigger the setPage function
        setCurrentPage(value);
        setPage(value);
    };
    console.log(`currentPage`, currentPage);
    return (
        <Stack spacing={2}>
            <div className=''>
                {/* Material-UI Pagination component */}
                <Pagination
                    count={10}
                    variant="outlined"
                    shape="rounded"
                    page={currentPage}
                    onChange={handleChange}
                    style={{ color: "#ff0707", border: "1px solid rgb(255 0 0 / 50 %)", backgroundColor: "rgb(255 0 0 / 12 %)" }}
                />
            </div>
        </Stack>
    );
}
