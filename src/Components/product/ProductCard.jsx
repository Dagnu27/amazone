import React from 'react'
import { Rating } from '@mui/material'
import CurrencyFormat from '../Currencyformat/CurrencyFormat1'
import classes from './Product.module.css'

const ProductCard = ({ Product }) => {
  const { image, title, id, rating, price } = Product;

  return (
    <div className={classes.card_container}>
      <a href={`/product/${id}`}>
        <img src={image} alt={title} />
      </a>
      <h3>{title}</h3>
      <div className={classes.rating}>
        <Rating value={rating?.rate || 0} precision={0.1} readOnly />
        <small>{rating?.count}</small>
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