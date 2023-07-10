import React from "react";
// import "./App.css";
import Trending from "./components/Trending";
import AddMovie from "./components/AddMovie";
import EditFilm from "./components/EditMovie";
import Editlagi from "./components/Editlagi";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./style/landingPage.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Trending />} />
        <Route path="/add" element={<AddMovie />} />
        <Route path="/edit" element={<EditFilm />} />
        <Route path="/film/editlagi/:id" element={<Editlagi />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
