import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { usePhotos } from "../PhotosContext";
import getPhotos from "../services/getPhotos";
import MasonryWall from "./MasonryWall";
import { useErrorBoundary } from "react-error-boundary";

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

function Gallery() {
  const { photos, loading, error, setPhotos, setLoading, setError } =
    usePhotos();
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    getPhotos(setPhotos, setLoading, setError);
  }, [setPhotos, setLoading, setError]);

  if (loading) return <LoadingContainer>Loading photos...</LoadingContainer>;

  if (error) {
    showBoundary(new Error(error));
    return null;
  }

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
