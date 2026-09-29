import React from "react";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
import CurrencyFormat from "../Currencyformat/CurrencyFormat1";
import classes from "./Product.module.css";

function ProductCard({ product, flex, renderDesc }) {
  if (!product) return null;

  const { id, title, price, description, images, image, rating } = product;
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
      <Link to={`/products/${id}`}>
        <img
          src={imageUrl}
          alt={title || "Product"}
          className={classes.img_container}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300"; // Prevents broken image crashes
          }}
        />
      </Link>
      <div>
        <h3>{title || "Untitled Product"}</h3>
        {renderDesc && (
          <p style={{ maxWidth: "750px", padding: "10px 0", color: "#333" }}>
            {description || "No description available."}
          </p>
        )}
        <div className={classes.rating}>
          <Rating value={rating?.rate || 4} precision={0.5} readOnly />
          <small>{rating?.count || 120}</small>
        </div>
        <div>
          <CurrencyFormat amount={price || 0} />
        </div>
        <button className={classes.button}>add to cart</button>
      </div>
    </div>
  );
}

export default ProductCard;