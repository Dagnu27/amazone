import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LayOut from "../../Components/LayOut/LayOut";
import ProductCard from "../../Components/product/ProductCard";
import Loader from "../../Components/Loader/Loader";
import { productUrl } from "../../Api/endPoint";

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!productId) return;

    setIsLoading(true);
    axios
      .get(`${productUrl}/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("API error:", err);
        setProduct(null);
        setIsLoading(false);
      });
  }, [productId]);

  return (
    <LayOut>
      {isLoading ? (
        <Loader />
      ) : product ? (
        <div style={{ padding: "30px", maxWidth: "1200px", margin: "0 auto" }}>
          <ProductCard 
            product={product} 
            flex={true} 
            renderDesc={true}
            renderAdd={true} 

          />
        </div>
      ) : (
        <div style={{ padding: "50px", textAlign: "center", fontSize: "1.2rem" }}>
          Product not found.
        </div>
      )}
    </LayOut>
  );
}

export default ProductDetail;