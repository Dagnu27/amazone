import React from 'react'
import { Rating } from '@mui/material'
import CurrencyFormat from '../Currencyformat/CurrencyFormat1'
import classes from './Product.module.css'

const ProductCard = ({ product }) => {
  if (!product) return null;

  const { images, title, id, price } = product;
  const cleanImageUrl = (url) => {
    if (!url) return '';
    try {
     const parsed = JSON.parse(url);
      return Array.isArray(parsed) ? parsed[0] : url;
    } catch {
      return url.replace(/[\[\]\\"]/g, '');
    }
  };
  const imageUrl = cleanImageUrl(images?.[0]);
  return (
    <div className={classes.card_container}>
      <a href={`/product/${id}`}>
        <img
          src={imageUrl}
          alt={title}
        />
      </a>
      <h3>{title}</h3>
      <div className={classes.rating}>
        <Rating value={4.5} precision={0.1} readOnly />
        <small>(120)</small>
      </div>
      <div>
        <CurrencyFormat amount={price} />
      </div>
      <button className={classes.button}>
        Add to Cart
      </button>
    </div>
  )
}
export default ProductCard