import React, { useState,useContext } from 'react'
import classes from './Auth.module.css'
import { Link } from 'react-router-dom'
import { auth } from "../../Utility/firebase"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"
import {dataContext} from "../../components/DataProvider/DataProvider"
const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const [{user},dispatch] = useContext(dataContext)
 console.log(user)



  // Handle Sign In
  const signinHandler = async (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // console.log("Signed in:", user);
        dispatch({
          type:Type.SET_USER, 
          user: userCredential.user
        }) 
      })
      .catch((err) => {
        setError(err.message);
        console.log(err);
      });
  };

  // Handle Register / Create Account
  const registerHandler = async (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // console.log("Registered:", user);
          dispatch({
          type:Type.SET_USER, 
          user: userCredential.user
        })
      })
      .catch((err) => {
        setError(err.message);
        console.log(err);
      });
  };

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
        
        {error && <small style={{ color: "red" }}>{error}</small>}

        <form>
          <div>
            <label htmlFor="email">Email or mobile phone number</label>
            <input 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              type="email" 
              id="email" 
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              type="password" 
              id="password" 
            />
          </div>

          <button 
            type="submit" 
            onClick={signinHandler} 
            className={classes.login_signinbtn}
          >
            Sign In
          </button>
        </form>

        <p>
          By continuing, you agree to the fake Amazon Clone Conditions of Use and Privacy Notice. 
          This is built for project and learning purposes only.
        </p>
      </div>

      {/* Create Account Section */}
      <div className={classes.login_container} style={{ border: 'none', boxShadow: 'none', padding: '10px 26px 0 26px', textAlign: 'center' }}>
        <p style={{ color: '#767676', fontSize: '12px', margin: '0 0 5px 0' }}>New to Amazon?</p>
        <button 
          type="button" 
          onClick={registerHandler} 
          className={classes.register_btn}
        >
          Create your Amazon account
        </button>
      </div>
    </section>
  )
}

export default Auth