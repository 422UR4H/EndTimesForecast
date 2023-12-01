import { CityData, CityLatLng } from "../../../pages/HomePage";
import MainButton from "../../atoms/MainButton";
import Overlay from "../../atoms/Overlay";
import StyledModal from "./styled";

type CitiesModalProps = {
  citiesData: CityData[];
  setShowModal(b: boolean): void;
  setCityLatLng(cityLatLng: CityLatLng): void;
};

export default function CitiesModal({
  citiesData,
  setShowModal,
  setCityLatLng,
}: CitiesModalProps) {
  function handleClick(cityLatLng: CityLatLng): void {
    setCityLatLng(cityLatLng);
    setShowModal(false);
  }

  return (
    <StyledModal>
      <Overlay onClick={() => setShowModal(false)} />
      <div className="cities-list">
        <h1>Escolha sua cidade</h1>

        {citiesData.map((cityData, i) => (
          <MainButton key={i} onClick={() => handleClick(cityData.cityLatLng)}>
            <h2>
              {i + 1}: {cityData.state}
            </h2>
            <p>
              {cityData.description}, {cityData.state_code}
            </p>
          </MainButton>
        ))}
      </div>
    </StyledModal>
  );
}
