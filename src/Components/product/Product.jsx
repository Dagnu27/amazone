import React, { useEffect, useState } from 'react'
import axios from 'axios'
import classes from './Product.module.css'
import ProductCard from './ProductCard'

const Product = () => {
  const [products, setproducts] = useState([])

  useEffect(() => {
 axios.get('https://api.escuelajs.co/api/v1/products')
  .then((res) => {
    const validProducts = res.data
      .filter(product => product.images?.length > 0)
      .slice(0, 32);

    setproducts(validProducts);
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