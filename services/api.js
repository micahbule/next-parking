export const getParkingSpacesList = async () => {
    const res = await fetch(
      `https://entity-sandbox.meeco.dev/api/parking-spaces/`
    );
    const responseJson = await res.json();
    return responseJson
};