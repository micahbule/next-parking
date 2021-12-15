export const getParkingSpacesList = async (setParkingList) => {
    const res = await fetch(
      `https://entity-sandbox.meeco.dev/api/parking-spaces/`
    );
    const responseJson = await res.json();
    let data = responseJson.data;
    console.log(data);
    setParkingList(data);
};