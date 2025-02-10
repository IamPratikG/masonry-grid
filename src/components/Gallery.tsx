import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { usePhotos } from "../PhotosContext";
import getPhotos from "../services/getPhotos";
import MasonryWall from "./MasonryWall";

const GalleryContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const StyledImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  border-radius: 8px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 2rem;
`;

const RetryButton = styled.button`
  background-color: #0070f3;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;

  &:hover {
    background-color: #0060df;
  }
`;

function Gallery() {
  const { photos, loading, error, setPhotos, setLoading, setError } =
    usePhotos();

  useEffect(() => {
    getPhotos(setPhotos, setLoading, setError);
  }, [setPhotos, setLoading, setError]);

  if (loading) return <LoadingContainer>Loading photos...</LoadingContainer>;

  if (error)
    return (
      <ErrorContainer>
        <h2>Error Loading Photos</h2>
        <p>{error}</p>
        <RetryButton onClick={() => getPhotos(setPhotos, setLoading, setError)}>
          Retry
        </RetryButton>
      </ErrorContainer>
    );

  return (
    <GalleryContainer>
      <MasonryWall>
        {photos.map((photo) => (
          <Link to={`/photos/${photo.id}`} key={photo.id}>
            <StyledImage
              src={photo.src.medium}
              alt={photo.alt || `Photograph by ${photo.photographer}`}
            />
          </Link>
        ))}
      </MasonryWall>
    </GalleryContainer>
  );
}

export default Gallery;
