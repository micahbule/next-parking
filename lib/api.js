export const getParkingSpaces = async () => {
  const res = await fetch(
    `https://entity-sandbox.meeco.dev/api/parking-spaces`
  );
  const responseJson = await res.json();
  console.log(responseJson);
  return responseJson.data;
};

export const getParkingSpaceData = async () => {
  const res = await fetch(
    `https://entity-sandbox.meeco.dev/api/parking-spaces/${id}`
  );
  const responseJson = await res.json();
  console.log(responseJson);
  return responseJson.data;
};
