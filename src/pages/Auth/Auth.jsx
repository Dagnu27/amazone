import React from 'react'
import classes from './Auth.module.css'
import { Link } from 'react-router-dom'

const Auth = () => {
  return (
    <section className={classes.login}>
      {/* Logo */}
      <Link to="/">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt="Amazon Logo" 
        />
      </Link>

      {/* Form Container Box */}
      <div className={classes.login_container}>
        <h1>Sign in</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="email">Email or mobile phone number</label>
            <input type="email" id="email" />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>

          <button className={classes.login_signinbtn} type="submit">Sign In</button>
        </form>

        <p>
          By continuing, you agree to the fake Amazon Clone Conditions of Use and Privacy Notice. 
          This is built for project and learning purposes only.
        </p>
      </div>

      {/* Create Account Section */}
      <div className={classes.login_container} style={{ border: 'none', boxShadow: 'none', padding: '10px 26px 0 26px', textAlign: 'center' }}>
        <p style={{ color: '#767676', fontSize: '12px', margin: '0 0 5px 0' }}>New to Amazon?</p>
        <button className={classes.register_btn} type="button">Create your Amazon account</button>
      </div>
    </section>
  )
}

export default Auth