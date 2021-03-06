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
  import { useQuery } from 'react-query'
  import CreateParkingSpace from "../src/components/create-parking-space";
  import Header from "../src/components/header";
  import { getParkingSpacesList } from "../services/api";
  
  export default function Home() {
    const { data, isLoading } = useQuery('getParkingSpaces', getParkingSpacesList)
  
    return (
      <Container maxW="container.xl" p={0}>
        <Flex
          h={{ base: "auto", md: "100vh" }}
          py={[0, 10, 20]}
          direction={{ base: "column-reverse", md: "row" }}
        >
          <VStack w="full" h="full" p={10} spacing={10} alignItems="flex-start">
            <VStack spacing={3} alignItems="flex-start">
              <Heading size="2xl">List of Existing Parking Spaces</Heading>
            </VStack>
            <UnorderedList>
              {isLoading ? (
                <VStack spacing={3} alignItems="flex-start">
                  <Heading size="2xl">Data Loading...</Heading>
                </VStack>
              ) : (
                data.data.map((item, index) => (
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
  