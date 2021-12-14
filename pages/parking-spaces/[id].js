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
  useToast,
} from "@chakra-ui/react";

import CreateParkingRecord from "../create-parking-record/index";

const ParkingSpace = () => {
  const router = useRouter();

  const { id } = router.query;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [parkingSpaceData, setParkingSpaceData] = useState("");
  const [parkingSpaceId, setParkingSpaceId] = useState("");
  const [parkingName, setParkingName] = useState("");
  const [parkingSlots, setParkingSlots] = useState(50);
  const [selectedSlot, setSelectedSlot] = useState("");

  useEffect(() => {
    const getParkingSpaceData = async () => {
      const res = await fetch(
        `https://entity-sandbox.meeco.dev/api/parking-spaces/${id}`
      );
      const responseJson = await res.json();
      let data = responseJson.data;
      console.log(data);
      setParkingSpaceData(data.attributes);
      setParkingSpaceId(data.id);
    };
    getParkingSpaceData();
  }, []);

  const selectedSlotHandler = (slotTagName) => {
    onOpen();
    setSelectedSlot(slotTagName);
  };

  const openToast = () => {
    toast({
      position: "top",
      status: "success",
      duration: 3500,
      render: () => (
        <Box color="white" p={3} bg="green.500">
          <Text textAlign="center">Parking Successful</Text>
        </Box>
      ),
    });
  };

  // create an array of slots according to number of slots per parking space
  const slotTagsArray = [];
  for (let i = 1; i <= parkingSlots; i++) {
    slotTagsArray.push(i);
  }

  //TODO: add letters to numbers, for slotTags

  return (
    <VStack w="full" h="full" p={10} spacing={10} alignItems="flex-start">
      <VStack spacing={3} alignItems="flex-start">
        <Text> Parking Space ID {id}</Text>
        <Heading fontWeight="800" as="h1">
          {parkingName}
        </Heading>
        <Text fontSize="2xl" fontWeight="400">
          Available slots: {parkingSlots}
        </Text>
        <Box>
          {slotTagsArray.map((slotTagName, index) => (
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
          ))}
        </Box>
      </VStack>
    </VStack>
  );
};

export default ParkingSpace;
