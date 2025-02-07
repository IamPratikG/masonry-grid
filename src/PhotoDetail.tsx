import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePhotos } from "./PhotosContext";
import { Photo } from "pexels";

const PhotoDetails = () => {
  const navigate = useNavigate();
  const { photoId } = useParams<{ photoId: string }>();
  const { photoMap } = usePhotos();
  const photo = photoMap[Number(photoId)] as Photo;

  if (!photo) return <div className="error">Photo not found</div>;

  return (
    <div className="photo-detail-container">
      <button onClick={() => navigate(-1)} className="back-button">
        &larr; Back to Gallery
      </button>

      <div className="photo-content">
        <img
          src={photo.src.large2x}
          alt={photo.alt || `Photograph by ${photo.photographer}`}
          className="detail-image"
        />

        <div className="photo-metadata">
          <h2 className="photo-title">
            {photo.alt || `Untitled (ID: ${photo.id})`}
          </h2>

          <div className="metadata-section">
            <h3>Photographer</h3>
            <a
              href={photo.photographer_url}
              target="_blank"
              rel="noopener noreferrer"
              className="photographer-link"
            >
              {photo.photographer}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoDetails;
