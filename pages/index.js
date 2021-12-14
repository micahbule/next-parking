import {
  Container,
  Flex,
  Button,
  useColorMode,
  useColorModeValue,
  Text,
  VStack,
  Link,
  Heading,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";

import React, { useState, useEffect } from "react";

import CreateParkingSpace from "./parking-spaces/create-parking-space";

// import { getParkingSpaces } from "../lib/api";
import axios from "axios";

export default function Home({ data }) {
  const { toggleColorMode } = useColorMode();

  const [parkingList, setParkingList] = useState(data);

  const bgColor = useColorModeValue("gray.50", "whiteAlpha.50");
  const secondaryTextColor = useColorModeValue("gray.600", "gray.400");

  // TODO: auto update. doesn't update automatically when a new parking space is addded welp
  useEffect(() => {
    const getParkingSpacesList = async () => {
      const res = await fetch(
        `https://entity-sandbox.meeco.dev/api/parking-spaces/`
      );
      const responseJson = await res.json();
      let data = responseJson.data;
      console.log(data);
      setParkingList(data);
    };
    getParkingSpacesList();
  }, []);

  // // edit details in list
  // const editItem = (id) => {
  //   console.log(id, "edited");
  //   // axios
  //   //   .put(`https://entity-sandbox.meeco.dev/api/parking-spaces/${id}`, {
  //   //     data,
  //   //   })
  //   //   .then((res) => {
  //   //     console.log(res.data);
  //   //   });
  // };

  // // delete from list FOREVERR
  // const deleteItem = (id) => {
  //   console.log(id, "deleted forever");
  //   axios
  //     .delete(`https://entity-sandbox.meeco.dev/api/parking-spaces/${id}`)
  //     .then((res) => {
  //       console.log(res.data);
  //     });
  // };

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

        <VStack w="full" h="full" p={10} spacing={10} alignItems="flex-start">
          <VStack spacing={3} alignItems="flex-start">
            <Heading size="2xl">List of Existing Parking Spaces</Heading>
          </VStack>
          <Heading as="h3">Choose a parking space.</Heading>
          <UnorderedList>
            {parkingList.map((item, index) => (
              <ListItem key={index} id={item.id}>
                <Link
                  color="teal.500"
                  textDecoration="underline"
                  href={`/parking-spaces/${item.id}`}
                >
                  {item.attributes.name} - {item.attributes.slots} slots
                </Link>

                {/* <Button
                  width="60px"
                  ml={10}
                  onClick={() => onEditHandler(item.id)}
                >
                  Edit
                </Button>
                <Button
                  width="60px"
                  ml={10}
                  onClick={() => onDeleteHandler(item.id)}
                >
                  Delete
                </Button> */}
              </ListItem>
            ))}
          </UnorderedList>
        </VStack>
      </Flex>
    </Container>
  );
}
