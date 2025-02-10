import React from "react";
import { Routes, Route } from "react-router-dom";
import { PhotosProvider } from "./PhotosContext";
import PhotoDetail from "./components/PhotoDetail";
import Header from "./components/Header";
import Gallery from "./components/Gallery";
import GlobalStyles from "./styles/GlobalStyles";

function App() {
  return (
    <PhotosProvider>
      <GlobalStyles />
      <Header />
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/photos/:photoId" element={<PhotoDetail />} />
      </Routes>
    </PhotosProvider>
  );
}

export default App;
