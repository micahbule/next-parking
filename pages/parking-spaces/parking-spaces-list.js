import React, { useState, useEffect } from "react";

import {
  VStack,
  Heading,
  Button,
  Flex,
  Link,
  ListItem,
  UnorderedList,
  Text,
  Input,
} from "@chakra-ui/react";

export default function ParkingSpacesList(props) {
  const [list, setList] = useState(props.dataObject);

  // handlers
  const onEditHandler = (id) => {
    props.editItem(id);
  };
  const onDeleteHandler = (id) => {
    props.deleteItem(id);
  };

  return (
    <VStack w="full" h="full" p={10} spacing={10} alignItems="flex-start">
      <VStack spacing={3} alignItems="flex-start">
        <Heading size="2xl">List of Existing Parking Spaces</Heading>
      </VStack>
      <Heading as="h3">Click a parking space to check availability</Heading>
      <UnorderedList>
        {list.map((item, index) => (
          <ListItem key={index} id={item.id}>
            <Link
              color="teal.500"
              textDecoration="underline"
              href={`/parking-spaces/${item.id}`}
            >
              {item.attributes.name} - {item.attributes.slots} slots
            </Link>

            <Button width="60px" ml={10} onClick={() => onEditHandler(item.id)}>
              Edit
            </Button>
            <Button
              width="60px"
              ml={10}
              onClick={() => onDeleteHandler(item.id)}
            >
              Delete
            </Button>
          </ListItem>
        ))}
      </UnorderedList>
    </VStack>
  );
}
