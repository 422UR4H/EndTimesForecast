import { CityData } from "../../../pages/HomePage";
import MainButton from "../../atoms/MainButton";
import Overlay from "../../atoms/Overlay";
import StyledModal from "./styled";

type CitiesModalProps = {
  citiesData: CityData[];
  setShowModal(b: boolean): void;
};

export default function CitiesModal({
  citiesData,
  setShowModal,
}: CitiesModalProps) {
  function onClick(e: any): void {
    console.log(e.target);
  }
  console.log(citiesData);

  return (
    <StyledModal>
      <Overlay onClick={() => setShowModal(false)} />
      <div className="cities-list">
        <h1>Escolha sua cidade</h1>
        {citiesData.map((cityData, i) => (
          <MainButton key={i} onClick={onClick}>
            <h2>
              {i + 1}: {cityData.state}
            </h2>
            <p>
              {cityData.state_district}, {cityData.state_code}
            </p>
          </MainButton>
        ))}
      </div>
    </StyledModal>
  );
}
