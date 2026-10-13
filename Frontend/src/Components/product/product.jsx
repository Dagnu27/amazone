import React, { useEffect, useState } from 'react'
import axios from 'axios'
import classes from './Product.module.css'
import ProductCard from './ProductCard'
import Loader from '../Loader/Loader';

const Product = () => {
  const [products, setproducts] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios.get('https://api.escuelajs.co/api/v1/products')
      .then((res) => {
        const validProducts = res.data
          .filter(product => product.images?.length > 0)
          .slice(0, 30);

        setproducts(validProducts);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
        setIsLoading(false);
  }, [])

  return (
<>
      {isLoading ? (
        <Loader />
      ) : (
        <section className={classes.products_container}>
          {products.map((singleProduct) => (
            <ProductCard 
            product={singleProduct}
             key={singleProduct.id}
             renderAdd={true}
             />
          ))}
        </section>
      )}
    </>
  )
}

export default Product