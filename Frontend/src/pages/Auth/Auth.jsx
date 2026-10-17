import React, { useState, useContext } from 'react'
import classes from './Auth.module.css'
import { Link,useNavigate,useLocation } from 'react-router-dom'
import { auth } from "../../Utility/firebase"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"
import { DataContext } from "../../Components/DataProvider/DataProvider"
import { Type } from "../../Utility/action.type"
import { ClipLoader } from "react-spinners"

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState({
    signIn: false,
    register: false
  });
  const [{ user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();

  const navstatedata=useLocation()
  // Handle Sign In
  const signinHandler = async (e) => {
    e.preventDefault();
    setIsLoading(prev => ({ ...prev, signIn: true }));
    setError(null);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        dispatch({
          type: Type.SET_USER, 
          user: userCredential.user
        });
        setIsLoading(prev => ({ ...prev, signIn: false }));
        navigate(navstatedata?.state?.redirect || "/");
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(prev => ({ ...prev, signIn: false }));
      });
  };

  // Handle Register / Create Account
  const registerHandler = async (e) => {
    e.preventDefault();
    setIsLoading(prev => ({ ...prev, register: true }));
    setError(null);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        dispatch({
          type: Type.SET_USER, 
          user: userCredential.user
        });
        setIsLoading(prev => ({ ...prev, register: false }));
       navigate(navstatedata?.state?.redirect || "/");
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(prev => ({ ...prev, register: false }));
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


{
  navstatedata?.state?.msg &&( 
    <small
      style={{
        padding:"5px",
        textAlign:"center",
        color:"red",
        fontWeight:"bold",
      }}
    >
      {navstatedata?.state?.msg}
    
    </small>
  )
}
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
            {isLoading.signIn ? <ClipLoader color="#eb8585" size={20} /> : "Sign In"}
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
          {isLoading.register ? <ClipLoader color="#f5adad" size={20} /> : "Create your Amazon account"}
        </button>

        {error && <small style={{ color: "red", display: "block", marginTop: "10px" }}>{error}</small>}
      </div>
    </section>
  )
}

export default Auth