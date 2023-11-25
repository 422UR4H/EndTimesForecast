import styled from "styled-components";

const StyledWeatherBox = styled.div`
  max-width: 500px;
  /* height: 180px; */
  /* min-height: 100px; */
  border-radius: 32px;
  padding-block: 50px;
  padding-inline: 45px;

  color: ${({ theme }) => theme.colors.primaryBackground};
  background-color: ${({ theme }) => theme.colors.primary};

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 13px;

  h1 {
    font-size: 22px;
    font-weight: 700;
    line-height: 24px;
  }

  p {
    font-size: 48px;
    font-weight: 600;
    line-height: 36px;
  }
`;
export default StyledWeatherBox;
