import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

import {
  VStack,
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Heading,
  Link,
} from "@chakra-ui/react";

import CreateSlotTags from "../src/components/create-slot-tags";

const ParkingSpace = () => {
  const router = useRouter();

  const { id } = router.query;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [parkingSpaceData, setParkingSpaceData] = useState([]);
  const [parkingSpaceId, setParkingSpaceId] = useState(0);
  // const [parkingSlots, setParkingSlots] = useState(0);

  const [spaceCapacity, setSpaceCapacity] = useState();

  useEffect(() => {
    const getParkingSpaceData = async () => {
      const res = await fetch(
        `https://entity-sandbox.meeco.dev/api/parking-spaces/${id}`
      );
      let responseJson = await res.json();
      let data = responseJson.data;
      console.log(data);
      setParkingSpaceData(data.attributes);
      setParkingSpaceId(data.id);
      setSpaceCapacity(data.attributes.slots);
    };
    if (parkingSpaceId) {
      getParkingSpaceData();
    }
  }, [id]);

  return (
    <VStack w="full" h="full" p={10} spacing={10} alignItems="flex-start">
      <Link textDecoration="underline" href="/">
        Go back to Parking Spaces List
      </Link>
      <VStack spacing={3} alignItems="flex-start">
        <Text> Parking Space ID {id}</Text>
        <Heading fontWeight="800" as="h1">
          {parkingSpaceData.name}
        </Heading>
        <Text fontSize="2xl" fontWeight="400">
          Capacity:{" "}
          {parkingSpaceData.slots === 0 ? "Loading" : parkingSpaceData.slots}{" "}
          slots
        </Text>

        <CreateSlotTags
          capacity={spaceCapacity}
          data={parkingSpaceData}
          id={parkingSpaceId}
        />
        {/* <Box>
          {parkingSpaceData === [] ? (
            <VStack spacing={3} alignItems="flex-start">
              <Heading size="2xl">Data Loading...</Heading>
            </VStack>
          ) : (
            slotTagsArray.map((slotTagName, index) => (
              <Button
                key={index}
                onClick={() => {
                  selectedSlotHandler(slotTagName);
                }}
              >
                {slotTagName}
                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalCloseButton />
                    <ModalBody>
                      <CreateParkingRecord
                        tagName={selectedSlot}
                        parkingSpaceId={parkingSpaceId}
                        parkingSpaceData={parkingSpaceData}
                        onClose={onClose}
                      />
                    </ModalBody>
                  </ModalContent>
                </Modal>
              </Button>
            ))
          )}
        </Box> */}
      </VStack>
    </VStack>
  );
};

export default ParkingSpace;
