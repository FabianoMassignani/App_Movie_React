import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MovieList } from "./pages/MovieList";
import { SerialList } from "./pages/SerialList";
import { MovieItem } from "./pages/MovieItem";
import { SerialItem } from "./pages/SerialItem";
import { LoginTrack } from "./pages/LoginTrack";
import { NotFoundPage } from "./pages/NotFoundPage";

import "./App.scss";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/serials" element={<SerialList />} />
          <Route path="/movie/:id" element={<MovieItem />} />
          <Route path="/serial/:id" element={<SerialItem />} />
          <Route path="/trakt" element={<LoginTrack />} />
          <Route element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
