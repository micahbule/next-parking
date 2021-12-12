// one parking space with many parking slots
// show parking spaces and also you can create a parking space

import {
  VStack,
  Text,
  Heading,
  Link,
  ExternalLinkIcon,
} from "@chakra-ui/react";

export default function ParkingSpaces() {
  return (
    <VStack w="full" h="full" p={10} spacing={10} alignItems="flex-start">
      <VStack spacing={3} alignItems="flex-start">
        <Text>Parking Spaces Selection Here</Text>
        <Heading size="2xl">Parking Spaces</Heading>
      </VStack>
      <Text>
        Create new parking spaces{" "}
        <Link href="/create-parking-space" isExternal>
          here <ExternalLinkIcon mx="2px" />
        </Link>
      </Text>
    </VStack>
  );
}
