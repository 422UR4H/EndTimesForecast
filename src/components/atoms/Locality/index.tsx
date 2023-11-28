import { CityLatLng } from "../../../pages/HomePage";
import StyledLocality from "./styled";

type LocalityProps = {
  cityLatLng: CityLatLng | undefined;
};
export default function Locality({ cityLatLng }: LocalityProps) {
  return (
    <StyledLocality>
      <h1>{cityLatLng?.city || "Sua Cidade"}</h1>
      <p>
        Lat:{"  "}
        {cityLatLng?.lat.toFixed(2) || "00.00"}
        {"  "}Long:{"  "}
        {cityLatLng?.lng.toFixed(2) || "00.00"}
      </p>
    </StyledLocality>
  );
}
