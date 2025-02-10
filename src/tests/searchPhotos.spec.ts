import { createClient } from "pexels";
import searchPhotos from "../services/searchPhotos";

jest.mock("pexels");

describe("searchPhotos", () => {
  const mockAddPhotos = jest.fn();
  const mockSetLoading = jest.fn();
  const mockSetError = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should search photos successfully", async () => {
    const mockPhotos = [{ id: 1, src: { medium: "test.jpg" } }];
    (createClient as jest.Mock).mockReturnValue({
      photos: {
        search: jest.fn().mockResolvedValue({ photos: mockPhotos }),
      },
    });

    await searchPhotos("test", mockAddPhotos, mockSetLoading, mockSetError);

    expect(mockSetLoading).toHaveBeenCalledWith(true);
    expect(mockAddPhotos).toHaveBeenCalledWith(mockPhotos);
    expect(mockSetLoading).toHaveBeenCalledWith(false);
  });

  it("should handle search errors", async () => {
    const mockError = new Error("Search API Error");
    (createClient as jest.Mock).mockReturnValue({
      photos: {
        search: jest.fn().mockRejectedValue(mockError),
      },
    });

    await searchPhotos("test", mockAddPhotos, mockSetLoading, mockSetError);

    expect(mockSetLoading).toHaveBeenCalledWith(true);
    expect(mockSetError).toHaveBeenCalled();
    expect(mockSetLoading).toHaveBeenCalledWith(false);
    expect(mockAddPhotos).not.toHaveBeenCalled();
  });
});
