import styled from "styled-components";

const StyledSearchForm = styled.form`
  position: relative;

  .icon {
    width: 34px;
    height: 34px;

    fill: ${({ theme }) => theme.colors.secondaryText};

    position: absolute;
    top: 22px;
    left: 20px;
  }
`;
export default StyledSearchForm;
