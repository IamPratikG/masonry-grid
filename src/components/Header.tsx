import React, { useCallback } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import SearchBox from "./SearchBox";
import { usePhotos } from "../PhotosContext";

const StyledHeader = styled.header`
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem 2rem;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  text-decoration: none;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
`;

const NavLink = styled(Link)`
  color: #333;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const CuratedButton = styled.button`
  padding: 8px 12px;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-right: 10rem;

  &:hover {
    background-color: #0060df;
  }
`;

const Header = () => {
  const { clearPhotos, setMode, mode } = usePhotos();
  const navigate = useNavigate();

  const handleCuratedClick = useCallback(() => {
    clearPhotos();
    setMode("curated");
    navigate("/");
  }, [clearPhotos, setMode, navigate]);

  return (
    <StyledHeader>
      <HeaderContent>
        <Logo to="/">Photo Gallery</Logo>
        <SearchBox key={mode} />
        <Nav>
          <CuratedButton onClick={handleCuratedClick}>
            View Curated
          </CuratedButton>
          <NavLink to="/">Home</NavLink>
        </Nav>
      </HeaderContent>
    </StyledHeader>
  );
};

export default Header;
