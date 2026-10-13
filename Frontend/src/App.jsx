import React ,{ useEffect , useState} from 'react';
import Routing from './Router';
import './App.css';
import {DataContext} from "./Components/DataProvider/DataProvider"      
import { Type } from './Utility/action.type';
import { auth } from './Utility/firebase';
function App() {
  const [{ user }, dispatch] = React.useContext(DataContext);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    }); 
   
  }, []);


  return (
    <>
      <Routing />
    </>
  );
}

export default App;