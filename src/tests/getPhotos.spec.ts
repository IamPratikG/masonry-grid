import { createClient } from "pexels";
import getPhotos from "../services/getPhotos";

jest.mock("pexels");

describe("getPhotos", () => {
  const mockAddPhotos = jest.fn();
  const mockSetLoading = jest.fn();
  const mockSetError = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch photos successfully", async () => {
    const mockPhotos = [{ id: 1, src: { medium: "test.jpg" } }];
    (createClient as jest.Mock).mockReturnValue({
      photos: {
        curated: jest.fn().mockResolvedValue({ photos: mockPhotos }),
      },
    });

    await getPhotos(mockAddPhotos, mockSetLoading, mockSetError);

    expect(mockSetLoading).toHaveBeenCalledWith(true);
    expect(mockAddPhotos).toHaveBeenCalledWith(mockPhotos);
    expect(mockSetLoading).toHaveBeenCalledWith(false);
  });

  it("should handle errors", async () => {
    const mockError = new Error("API Error");
    (createClient as jest.Mock).mockReturnValue({
      photos: {
        curated: jest.fn().mockRejectedValue(mockError),
      },
    });

    await getPhotos(mockAddPhotos, mockSetLoading, mockSetError);

    expect(mockSetLoading).toHaveBeenCalledWith(true);
    expect(mockSetError).toHaveBeenCalled();
    expect(mockSetLoading).toHaveBeenCalledWith(false);
    expect(mockAddPhotos).not.toHaveBeenCalled();
  });
});
