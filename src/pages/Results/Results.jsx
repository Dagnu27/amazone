import React, { useState, useEffect } from 'react';
import classes from './Results.module.css';
import LayOut from '../../Components/LayOut/LayOut';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { productUrl } from '../../Api/endPoint';
import ProductCard from '../../Components/product/ProductCard';
import Loader from '../../Components/Loader/Loader';

const Results = () => {
  const [products, setproducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { catagoryName } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${productUrl}?categorySlug=${catagoryName}`)
      .then((res) => {
        setproducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [catagoryName]);

  return (
    <LayOut>
      <h1 style={{ padding: '30px' }}>Results</h1>
      <p style={{ padding: '30px' }}>Category: {catagoryName}</p>
      <hr />

      {loading ? (
        <Loader />
      ) : (
        <div className={classes.products_container}>
          {products?.map((product) => (
            <ProductCard
             key={product.id} 
             product={product} 
             renderDesc={false}
             renderAdd={true}
             />
          ))}
        </div>
      )}
    </LayOut>
  );
};

export default Results;