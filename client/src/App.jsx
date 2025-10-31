import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";






function App() {
  return (
    <BrowserRouter>

 <ToastContainer
        position="top-right"
        autoClose={2000}
        theme="colored"
      
      />

    
      <Routes>
    

        <Route path='/' element={<ProductList />} />

        <Route path='/form' element={<ProductForm />} />



      </Routes>
    </BrowserRouter>
  );
}

export default App;