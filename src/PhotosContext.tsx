import React, { createContext, useContext, useState, useMemo } from "react";
import { Photo } from "pexels";

type PhotosContextType = {
  photos: Photo[];
  photoMap: Record<number, Photo>;
  loading: boolean;
  error: string | null;
  setPhotos: React.Dispatch<React.SetStateAction<Photo[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
};

const PhotosContext = createContext<PhotosContextType>({
  photos: [],
  photoMap: {},
  loading: false,
  error: null,
  setPhotos: () => {},
  setLoading: () => {},
  setError: () => {},
});

const createPhotoMap = (photos: Photo[]): Record<number, Photo> => {
  const photoMap: Record<number, Photo> = {};
  for (const photo of photos) {
    photoMap[photo.id] = photo;
  }
  return photoMap;
};

export const PhotosProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const photoMap = useMemo(() => createPhotoMap(photos), [photos]);

  return (
    <PhotosContext.Provider
      value={{
        photos,
        photoMap,
        loading,
        error,
        setPhotos,
        setLoading,
        setError,
      }}
    >
      {children}
    </PhotosContext.Provider>
  );
};

export const usePhotos = () => useContext(PhotosContext);
