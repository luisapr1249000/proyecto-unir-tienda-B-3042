import Autocomplete from "react-google-autocomplete";

const UserAddressDirectionCreate = () => {
  return (
    <Autocomplete
      onPlaceSelected={(place) => {
        console.log(place);
      }}
    />
  );
};

export default UserAddressDirectionCreate;
