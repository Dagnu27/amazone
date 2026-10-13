import React from 'react'
import { categoryInfos } from './catagoryfullinfos'
import CatagoryCard from './CatagoryCard'
import classes from './Catagory.module.css'

const Catagory = () => {
  return (
    <section className={classes.category_container}>
      {categoryInfos.map((infos, index) => (
        <CatagoryCard key={infos.name || index} data={infos} />
      ))}
    </section>
  )
}

export default Catagory