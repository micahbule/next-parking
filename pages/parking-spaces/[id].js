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
} from "@chakra-ui/react";

import axios from "axios";

import CreateParkingRecord from "../create-parking-record/index";

const ParkingSpace = () => {
  const router = useRouter();

  const { id } = router.query;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [parkingSpaceData, setParkingSpaceData] = useState("");
  // const [spaceId, setSpaceId] = useState("");

  const [parkingSlots, setParkingSlots] = useState(50);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [parkingName, setParkingName] = useState("");

  // console.log(parkingSpaceData);
  // console.log(parkingSlots);

  // const fetchSpaceData = () => {
  //   axios.get(`https://entity-sandbox.meeco.dev/api/parking-spaces/${id}`).then(
  //     (response) => {
  //       // console.log(response.data.data);
  //       setParkingSpaceData(response.data.data);
  //       setParkingSlots(response.data.data.attributes.slots);
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // };

  const selectedSlotHandler = (slotTagName) => {
    onOpen();
    setSelectedSlot(slotTagName);
  };

  useEffect(() => {
    axios.get(`https://entity-sandbox.meeco.dev/api/parking-spaces/${id}`).then(
      (response) => {
        setParkingSpaceData(response.data.data);
        setParkingSlots(response.data.data.attributes.slots);
        setParkingName(response.data.data.attributes.name);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  useEffect(() => {
    console.log(parkingName);
  }, []);

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
                      // parkingSpaceData={parkingSpaceData}
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
