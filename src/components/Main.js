import React, { useState, useEffect } from "react";
import RecipeReviewCard from "./RecipeReviewCard";
import "../styles/main.css";
import axios from "axios"; // axios library for http request
import PaginationRounded from "./pagination";
import CustomLoader from "./Loader";
import ClearIcon from "@mui/icons-material/Clear";
import { toast } from "react-toastify";


const Main = ({ handleClick, handlePdp }) => {

  // State for all products, current product list, loading status, current page, and sorting status
  const [allProducts, setAllProducts] = useState();
  const [productList, setProductList] = useState();
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [isSorting, setSorting] = useState(false);

  // Fetching product list from the API on component mount
  useEffect(() => {
    (async function fetchProductList() {
      try {
        const { data } = await axios.get(
          `https://dummyjson.com/products?limit=100`
        );
        
        const slicedProduct = data?.products?.slice(0, 10);

        setAllProducts(data.products);
        setProductList(slicedProduct);

      } catch (error) {
        console.log(`error in getting product list`, error);
        toast.error(error.message);
      } finally {
        // Set loading to false after a delay
        setTimeout(() => {
          setLoading(false);
        }, 4500);
      }
    })();
  }, []);

  // Effect to handle page changes and update product list accordingly
  useEffect(() => {
    toast.warning(`Please wait fetching product list`)
    setLoading(true);
    const pageChangeProduct = allProducts?.slice(page * 10 - 10, 10 * page);
    // Set loading to false after a delay and display success message
    setTimeout(() => {
      setLoading(false);
      toast.success(`Success`)
    }, 4500);
    setProductList(pageChangeProduct);
    setSorting(false);
  }, [page]);

  console.log(`productList`, productList);
  console.log(`allProducts`, allProducts);

  // Function to handle sorting by price in ascending order
  const handleSort = () => {
    setSorting(!isSorting);
    productList?.sort((a, b) => a.price - b.price);
    toast.success(`Applied Low to High`);
  };

  // Function to remove sorting and revert to the original order
  const handleClose = () => {
    setSorting(!isSorting);
    productList?.sort((a, b) => a.id - b.id);
    toast.error(`Sorting Removed`);
  };

  return (
    <>
      {!isLoading && (
        <div className="mt-2">
          {!isSorting && (
            <button className="btn btn-danger mx-2" onClick={handleSort}>
              Price - Low To High
            </button>
          )}
          {isSorting && (
            <button
              className="btn btn-dark d-flex align-items-center mx-2"
              onClick={handleClose}
            >
              <span>Remove</span>
              <ClearIcon />
            </button>
          )}
        </div>
      )}
      <section>
        {isLoading ? (
          <CustomLoader />
        ) : (
          <>
            {productList?.map((item) => (
              <RecipeReviewCard
                key={item.id}
                item={item}
                handleClick={handleClick}
                setProductList={setProductList}
                productList={productList}
                handlePdp={handlePdp}
              />
            ))}
          </>
        )}
      </section>
      <div className="mt-5 mb-4 d-flex justify-content-center">
        <PaginationRounded setPage={setPage} />
      </div>
    </>
  );
};

export default Main;
