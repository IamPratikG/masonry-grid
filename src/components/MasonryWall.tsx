import styled from "styled-components";

const MasonryWall = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  grid-gap: 16px;
  max-width: 100%;

  @media (min-width: 1400px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export default MasonryWall;
