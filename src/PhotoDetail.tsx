import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePhotos } from "./PhotosContext";
import { Photo } from "pexels";

const PhotoDetails = () => {
  const navigate = useNavigate();
  const { photoId } = useParams<{ photoId: string }>();
  const { photoMap } = usePhotos();
  const photo = photoMap[Number(photoId)] as Photo;

  if (!photo) return <div>Photo not found</div>;

  return (
    <div>
      <button onClick={() => navigate(-1)}>&larr; Back to Gallery</button>

      <div>
        <img
          src={photo.src.large2x}
          alt={photo.alt || `Photograph by ${photo.photographer}`}
        />

        <div>
          <h2>{photo.alt || `Untitled (ID: ${photo.id})`}</h2>

          <div>
            <h3>Photographer</h3>
            <a
              href={photo.photographer_url}
              target="_blank"
              rel="noopener noreferrer"
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
