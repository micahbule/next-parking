import { useRouter } from "next/router";

// import { getParkingSpacesId } from "../../lib/api";
// import useSWR from "swr";

// const fetcher = async (url) => {
//   const res = await fetch(url);
//   if (!res.ok) {
//     throw Error("oops");
//   }
//   const data = {
//     id: String,
//     name: String,
//   };
//   await res.json();
//   return data;
// };

const ParkingSpace = () => {
  const router = useRouter();
  // const { data, error } = useSWR(
  //   `https://entity-sandbox.meeco.dev/api/parking-spaces/${id}`,
  //   fetcher
  // );

  // if (error) {
  //   return alert("Failed");
  // }
  // if (!data) {
  //   return alert("loading");
  // }

  const { id } = router.query;
  return <h2>user id={id}</h2>;
};

export default ParkingSpace;
