import React from "react";
import { Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { PhotosProvider } from "./PhotosContext";
import PhotoDetail from "./components/PhotoDetail";
import Header from "./components/Header";
import Gallery from "./components/Gallery";
import GlobalStyles from "./styles/GlobalStyles";
import ErrorFallback from "./components/ErrorFallback";

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // Reset the state of your app here
      }}
    >
      <PhotosProvider>
        <GlobalStyles />
        <Header />
        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route path="/photos/:photoId" element={<PhotoDetail />} />
        </Routes>
      </PhotosProvider>
    </ErrorBoundary>
  );
}

export default App;
