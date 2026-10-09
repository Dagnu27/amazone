import React, { useContext } from "react";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
import CurrencyFormat from "../Currencyformat/CurrencyFormat1";
import classes from "./Product.module.css";
import { DataContext } from "../DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";

const FALLBACK_IMAGE = "https://placehold.co/300";

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

  // Image URL Parsing
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

  // Ensure imageUrl is valid and non-empty to prevent duplicate network calls
  const safeImageUrl = imageUrl && imageUrl.trim() !== "" ? imageUrl : FALLBACK_IMAGE;

  return (
    <div className={`${classes.card_container} ${flex ? classes.product_flexed : ""}`}>
      {/* Image Container */}
      <div className={classes.img_wrapper}>
        <Link to={`/products/${id}`}>
          <img
            src={safeImageUrl}
            alt={title || "Product"}
            className={classes.img_container}
            onError={(e) => {
              e.target.onerror = null; // Prevents infinite onError loops
              e.target.src = FALLBACK_IMAGE;
            }}
          />
        </Link>
      </div>

      {/* Details Container */}
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
                    width: "100%",
                    maxWidth: "500px",
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
