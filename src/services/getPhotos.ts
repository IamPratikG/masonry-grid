import { createClient, Photo } from "pexels";

export default function getPhotos(
  setPhotos: (photos: Photo[]) => void,
  setLoading: (loading: boolean) => void,
  setError: (error: string | null) => void
) {
  setLoading(true);
  setError(null);

  const apiKey = process.env.REACT_APP_PEXEL_API_KEY;
  if (!apiKey) {
    setError("Missing API key");
    setLoading(false);
    return;
  }

  const client = createClient(apiKey);
  client.photos
    .curated({ per_page: 80 })
    .then((response) => {
      if ("photos" in response) {
        setPhotos(response.photos);
      } else {
        setError("Invalid API response");
      }
    })
    .catch((error: Error) => setError(error.message))
    .finally(() => setLoading(false));
}
