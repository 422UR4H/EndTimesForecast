import styled from "styled-components";

const StyledModal = styled.div`
  .cities-list {
    max-height: 90dvh;
    padding: 30px;
    border-radius: 20px;
    overflow-y: scroll;

    display: flex;
    flex-direction: column;
    gap: 20px;

    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;

    border: 5px solid ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.secondaryBackground};

    h1 {
      text-align: center;
    }
    &::-webkit-scrollbar {
			width: 16px;
      border-radius: 8px;
      background-color: ${({ theme }) => theme.colors.primaryBackground};
		}
		&::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.colors.primary};
			border-radius: 8px;
		}
  }
`;
export default StyledModal;
