import React, { useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { PhotosProvider, usePhotos } from "./PhotosContext";
import PhotoDetail from "./PhotoDetail";
import getPhotos from "./services/getPhotos";
import "./App.css";

function AppContent() {
  const { photos, loading, error, setPhotos, setLoading, setError } =
    usePhotos();

  useEffect(() => {
    getPhotos(setPhotos, setLoading, setError);
  }, [setPhotos, setLoading, setError]);

  if (loading)
    return (
      <div className="loading-state">
        <div className="spinner"></div>
        <p>Loading photos...</p>
      </div>
    );

  if (error)
    return (
      <div className="error-state">
        <div className="error-icon">&amp;#x26A0;</div>
        <h2>Error Loading Photos</h2>
        <p>{error}</p>
        <button onClick={() => getPhotos(setPhotos, setLoading, setError)}>
          Retry
        </button>
      </div>
    );

  return (
    <div className="App">
      <h1>Photo Gallery</h1>
      <div className="photo-grid">
        {photos.map((photo) => (
          <Link
            to={`/photos/${photo.id}`}
            key={photo.id}
            className="photo-card"
          >
            <img
              src={photo.src.medium}
              alt={photo.alt || `Photograph by ${photo.photographer}`}
              className="grid-image"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <PhotosProvider>
      <Routes>
        <Route path="/" element={<AppContent />} />
        <Route path="/photos/:photoId" element={<PhotoDetail />} />
      </Routes>
    </PhotosProvider>
  );
}

export default App;
