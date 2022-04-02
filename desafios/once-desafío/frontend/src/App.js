import "./App.css";
import React, { useState } from "react";
import Navbar from "./component/Navbar";
import Products from "./component/Products";
import CheckoutPage from "./component/CheckoutPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./component/SignIn";
import SignUp from "./component/SignUp";
import { useEffect } from "react";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { actionTypes } from "./reducer";
import { useStateValue } from "./StateProvider";
import CheckOut from "./component/CheckOutForm/Checkout";
import Chat from "../src/component/Chat/Chat";

function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      console.log(authUser);
      if (authUser) {
        dispatch({
          type: actionTypes.SET_USER,
          user: authUser,
        });
      }
    });
  }, []);

  //Lógica para el chat
  const [nombre, setNombre] = useState("");
  const [registrado, setRegistrado] = useState(false);

  const registrar = (e) => {
    e.preventDefault();
    if (nombre !== "") {
      setRegistrado(true);
    }
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/checkoutpage" element={<CheckoutPage />} />
          <Route path="/" element={<Products />} />
          <Route path="/checkout" element={<CheckOut />} />
        </Routes>

        {!registrado && (
          <form onSubmit={registrar}>
            <label htmlFor="">Introduzca su nombre</label>
            <input value={nombre} onChange={(e) => setNombre(e.target.value)} />
            <button>Ir al chat</button>
          </form>
        )}

        {registrado && <Chat nombre={nombre} />}
      </div>
    </Router>
  );
}

export default App;
