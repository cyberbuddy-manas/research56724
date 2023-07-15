import React, { useState, useEffect, useRef } from 'react';
import "./App.css";
import './messaging_init_in_sw';
import Home from "./pages/Home";
import Reports from "./pages/Reports";
import Doctor from "./pages/Doctor";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/doctor" element={<Doctor />} />
      </Routes>
    </>
  );
};

export default App;
