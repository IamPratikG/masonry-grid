import React, { useState } from "react";
import styled from "styled-components";
import { usePhotos } from "../PhotosContext";
import searchPhotos from "../services/searchPhotos";

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  width: 250px;
`;

const SearchButton = styled.button`
  padding: 8px 12px;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 4px;
  margin-left: 8px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0060df;
  }
`;

const SearchBox: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { addPhotos, setLoading, setError, setMode, clearPhotos } = usePhotos();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      clearPhotos();
      setMode("search");
      searchPhotos(searchTerm, addPhotos, setLoading, setError);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Search photos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyUp={handleKeyPress}
      />
      <SearchButton onClick={handleSearch}>Search</SearchButton>
    </SearchContainer>
  );
};

export default SearchBox;
