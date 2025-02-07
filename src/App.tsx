import React, { useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { PhotosProvider, usePhotos } from "./PhotosContext";
import PhotoDetail from "./PhotoDetail";
import getPhotos from "./services/getPhotos";

function AppContent() {
  const { photos, loading, error, setPhotos, setLoading, setError } =
    usePhotos();

  useEffect(() => {
    getPhotos(setPhotos, setLoading, setError);
  }, [setPhotos, setLoading, setError]);

  if (loading)
    return (
      <div>
        <div id="loading-spinner"></div>
        <p>Loading photos...</p>
      </div>
    );

  if (error)
    return (
      <div>
        <div>&amp;#x26A0;</div>
        <h2>Error Loading Photos</h2>
        <p>{error}</p>
        <button onClick={() => getPhotos(setPhotos, setLoading, setError)}>
          Retry
        </button>
      </div>
    );

  return (
    <div>
      <h1>Photo Gallery</h1>
      <div>
        {photos.map((photo) => (
          <Link to={`/photos/${photo.id}`} key={photo.id}>
            <img
              src={photo.src.medium}
              alt={photo.alt || `Photograph by ${photo.photographer}`}
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
