import React, { useEffect, useState } from 'react'
import axios from 'axios'
import classes from './Product.module.css'
import ProductCard from './ProductCard'

const Product = () => {
  const [products, setproducts] = useState([])

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then((res) => {
        setproducts(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <section className={classes.products_container}>
      {products.map((singleProduct) => (
        <ProductCard Product={singleProduct} key={singleProduct.id} />
      ))}
    </section>
  )
}

export default Product