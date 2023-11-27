import styled from "styled-components";

const StyledModal = styled.div`
  .cities-list {
    h1 {
      text-align: center;
    }

    padding: 30px;
    border-radius: 20px;
    border: 5px solid ${({ theme }) => theme.colors.primary};

    display: flex;
    flex-direction: column;
    gap: 20px;

    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;

    background-color: ${({ theme }) => theme.colors.secondaryBackground};
  }
`;
export default StyledModal;
