// src/Components/product/ProductCard.jsx
import React, { useContext } from "react";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
import CurrencyFormat from "../Currencyformat/CurrencyFormat1";
import classes from "./Product.module.css";
import { DataContext } from "../DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";

function ProductCard({ product, flex, renderDesc, renderAdd = true }) { 
  if (!product) return null;
  const { id, title, price, description, images, image, rating } = product;

  const [state, dispatch] = useContext(DataContext);

  const AddToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: { id, title, price, description, images, image, rating },
    });
  };
  let imageUrl = "";
  if (Array.isArray(images) && images.length > 0) {
    imageUrl = images[0];
  } else if (typeof images === "string") {
    imageUrl = images;
  } else if (image) {
    imageUrl = image;
  }

  if (typeof imageUrl === "string") {
    if (imageUrl.startsWith("[")) {
      try {
        const parsed = JSON.parse(imageUrl);
        imageUrl = Array.isArray(parsed) ? parsed[0] : imageUrl;
      } catch {
        imageUrl = imageUrl.replace(/[\[\]\\"]/g, "");
      }
    } else {
      imageUrl = imageUrl.replace(/[\[\]\\"]/g, "");
    }
  }

  if (!imageUrl) {
    imageUrl = "https://via.placeholder.com/300";
  }

  return (
    <div className={`${classes.card_container} ${flex ? classes.product_flexed : ""}`}>
    
      <div className={classes.img_wrapper}>
        <Link to={`/products/${id}`}>
          <img
            src={imageUrl}
            alt={title || "Product"}
            className={classes.img_container}
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/300";
            }}
          />
        </Link>
      </div>

     
      <div className={classes.product_details}>
        <h3>{title || "Untitled Product"}</h3>

        <div className={classes.rating}>
          <Rating value={rating?.rate || 4} precision={0.5} readOnly />
          <small>({rating?.count || 120})</small>
        </div>

        <div className={classes.price}>
          <CurrencyFormat amount={price || 0} />
        </div>

        {renderDesc && (
          <div className={classes.description_box}>
            <p>{description || "No description available."}</p>
          </div>
        )}


        {renderAdd && (
          <button
            className={classes.button}
            onClick={AddToCart}
            style={
              flex
                ? {
                    display: "block",
                    position: "static",
                    width: "500px",
                    marginTop: "20px",
                  }
                : {}
            }
          >
            Add to Cart
          </button>
        )}
      </div>   
    </div>
  );
}

export default ProductCard;