import React, { useState } from "react";

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
  console.log(props);

  const [list, setList] = useState(props.dataObject);
  console.log(list);

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

      <UnorderedList>
        {list.map((item, index) => (
          <ListItem key={index} id={item.id}>
            {item.attributes.name} - {item.attributes.slots} slots
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
      <Text>
        Or did you want to create new parking spaces? If so, click{" "}
        <Link href="/create-parking-space">here</Link>.
      </Text>
    </VStack>
  );
}

{
  /* <table>
        <thead>
          <tr className="table-heading">
            <th className="hospital-name">NAME</th>
          </tr>
        </thead>
        <tbody className="table-body"></tbody>
      </table> */
}
