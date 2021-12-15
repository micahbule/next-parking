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

import CreateParkingSpace from "../src/components/create-parking-space";
import Header from "../src/components/header";

export default function Home() {
  const [parkingList, setParkingList] = useState("");
  // const [new, setNew] = useState("")

  // TODO: auto update. doesn't update automatically when a new parking space is addded welp // add new dependency
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

  // const newSpaceHandler = (params) => {
  //   setNew()
  // }

  return (
    <Container maxW="container.xl" p={0}>
      <Flex
        h={{ base: "auto", md: "100vh" }}
        py={[0, 10, 20]}
        direction={{ base: "column-reverse", md: "row" }}
      >
        <CreateParkingSpace
        // new={newSpaceHandler}
        />

        <VStack w="full" h="full" p={10} spacing={10} alignItems="flex-start">
          <VStack spacing={3} alignItems="flex-start">
            <Heading size="2xl">List of Existing Parking Spaces</Heading>
          </VStack>
          <UnorderedList>
            {parkingList === "" ? (
              <VStack spacing={3} alignItems="flex-start">
                <Heading size="2xl">Data Loading...</Heading>
              </VStack>
            ) : (
              parkingList.map((item, index) => (
                <ListItem key={index} id={item.id}>
                  <Link
                    color="teal.500"
                    textDecoration="underline"
                    href={`/${item.id}`}
                  >
                    {item.attributes.name} - {item.attributes.slots} slots
                  </Link>
                </ListItem>
              ))
            )}
          </UnorderedList>
        </VStack>
      </Flex>
    </Container>
  );
}
