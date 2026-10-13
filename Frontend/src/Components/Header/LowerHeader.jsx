import React from 'react'
import { IoMenu } from "react-icons/io5";
import classes from "./Header.module.css";
const LowerHeader = () => {
  return (
    <div className={classes.lower_container}>
      <ul>
        <li>
          <IoMenu/>
          <p>all</p>
        </li>
        <li>Today's Deals</li>
        <li>Costomer Service</li>
        <li>Registory </li>
        <li>Gift Cards</li>
        <li>Sell</li>
      </ul>
    </div>
  )
}

export default LowerHeader