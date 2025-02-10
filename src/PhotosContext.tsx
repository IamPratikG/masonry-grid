import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from "react";
import { Photo } from "pexels";

type PhotoMode = "curated" | "search";

type PhotosContextType = {
  photos: Photo[];
  photoMap: Record<number, Photo>;
  loading: boolean;
  error: string | null;
  mode: PhotoMode;
  addPhotos: (newPhotos: Photo[] | ((prevPhotos: Photo[]) => Photo[])) => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  clearPhotos: () => void;
  setMode: (mode: PhotoMode) => void;
};

const PhotosContext = createContext<PhotosContextType>({
  photos: [],
  photoMap: {},
  loading: false,
  error: null,
  mode: "curated",
  addPhotos: () => {},
  setLoading: () => {},
  setError: () => {},
  clearPhotos: () => {},
  setMode: () => {},
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
  const [mode, setMode] = useState<PhotoMode>("curated");

  const addPhotos = useCallback(
    (newPhotos: Photo[] | ((prevPhotos: Photo[]) => Photo[])) => {
      setPhotos((prevPhotos) => {
        if (typeof newPhotos === "function") {
          return newPhotos(prevPhotos);
        }
        return [...prevPhotos, ...newPhotos];
      });
    },
    []
  );

  const clearPhotos = useCallback(() => {
    setPhotos([]);
  }, []);

  const photoMap = useMemo(() => createPhotoMap(photos), [photos]);

  const contextValue = useMemo(
    () => ({
      photos,
      photoMap,
      loading,
      error,
      mode,
      addPhotos,
      setLoading,
      setError,
      clearPhotos,
      setMode,
    }),
    [photos, photoMap, loading, error, mode, addPhotos, clearPhotos]
  );

  return (
    <PhotosContext.Provider value={contextValue}>
      {children}
    </PhotosContext.Provider>
  );
};

export const usePhotos = () => useContext(PhotosContext);
