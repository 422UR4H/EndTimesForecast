import StyledCasaquinhoMessage from "./style";

type CasaquinhoMessageProps = {
  minTemp: number | undefined;
};

export default function CasaquinhoMessage({ minTemp }: CasaquinhoMessageProps) {
  return (
    <StyledCasaquinhoMessage>
      {(minTemp || 0) < 290.15
        ? `Não esqueça de levar o casaquinho!`
        : `Não, você não deve levar um casaquinho!`}
    </StyledCasaquinhoMessage>
  );
}
