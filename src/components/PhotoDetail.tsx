import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { usePhotos } from "../PhotosContext";
import { Photo } from "pexels";

const Container = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const BackButton = styled.button`
  background-color: #0070f3;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-bottom: 1rem;

  &:hover {
    background-color: #0060df;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

const StyledImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const DetailsContainer = styled.div`
  margin-top: 2rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
`;

const PhotographerLink = styled.a`
  color: #0070f3;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const PhotoDetail = () => {
  const navigate = useNavigate();
  const { photoId } = useParams<{ photoId: string }>();
  const { photoMap } = usePhotos();
  const photo = photoMap[Number(photoId)] as Photo;

  if (!photo) return <div>Photo not found</div>;

  return (
    <Container>
      <BackButton onClick={() => navigate(-1)}>← Back to Gallery</BackButton>
      <ImageContainer>
        <StyledImage
          src={photo.src.original}
          alt={photo.alt || `Photograph by ${photo.photographer}`}
        />
      </ImageContainer>
      <DetailsContainer>
        <Title>{photo.alt || `Untitled (ID: ${photo.id})`}</Title>
        <p>
          Photographer:{" "}
          <PhotographerLink
            href={photo.photographer_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {photo.photographer}
          </PhotographerLink>
        </p>
      </DetailsContainer>
    </Container>
  );
};

export default PhotoDetail;
