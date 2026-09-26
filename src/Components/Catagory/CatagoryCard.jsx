import React from 'react'
import classes from './Catagory.module.css'

const CatagoryCard = ({ data }) => {
  return (
    <div className={classes.category}>
      <a href="#">
        <span>
          <h2>{data.title}</h2>
        </span>
        <img src={data.imgLink} alt={data.title} />
        <p>shop now</p>
      </a>
    </div>
  )
}

export default CatagoryCard