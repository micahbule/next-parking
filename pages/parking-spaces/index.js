import {
  Container,
  Flex,
  Button,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

import CreateParkingSpace from "./create-parking-space";
import ParkingSpacesList from "./parking-spaces-list";

import { getParkingSpaces } from "../../lib/api";
import { getParkingSpacesId } from "../../lib/api";

export default function ({ data, parkingSpaceId }) {
  console.log(data, parkingSpaceId);

  const [parkingList, setParkingList] = useState(data);

  const { toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("gray.50", "whiteAlpha.50");
  const secondaryTextColor = useColorModeValue("gray.600", "gray.400");

  // edit details in list
  const editItem = (id) => {
    console.log(id, "deleted");
    // axios
    //   .put(`https://entity-sandbox.meeco.dev/api/parking-spaces/${id}`, {
    //     data,
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //   });
  };

  // delete from list FOREVERR
  const deleteItem = (id) => {
    console.log(id, "deleted forever");
    axios
      .delete(`https://entity-sandbox.meeco.dev/api/parking-spaces/${id}`)
      .then((res) => {
        console.log(res.data);
      });
  };

  return (
    <Container maxW="container.xl" p={0}>
      <Button onClick={toggleColorMode}>Change Color Theme</Button>
      <Flex
        h={{ base: "auto", md: "100vh" }}
        py={[0, 10, 20]}
        direction={{ base: "column-reverse", md: "row" }}
      >
        <CreateParkingSpace
          bgColor={bgColor}
          secondaryTextColor={secondaryTextColor}
        />
        <ParkingSpacesList
          editItem={editItem}
          deleteItem={deleteItem}
          dataObject={parkingList}
          bgColor={bgColor}
          secondaryTextColor={secondaryTextColor}
        />
      </Flex>
    </Container>
  );
}

export async function getServerSideProps() {
  const data = await getParkingSpaces();
  const parkingSpaceId = await getParkingSpacesId();
  return {
    props: {
      data,
      parkingSpaceId,
    },
  };
}
