import {
  VStack,
  Link,
  Text,
  Heading,
  SimpleGrid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  Button,
  useBreakpointValue,
  ModalHeader,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useToast,
  Box,
  AlertTitle,
} from "@chakra-ui/react";

import { useState, useEffect } from "react";
import axios from "axios";
import CreateParkingRecord from "../components/create-parking-record";

const CreateSlotTags = (props) => {
  // console.log(props.id);
  const [slots, setSlots] = useState([]);
  const [tagName, setTagName] = useState("");
  const [slotsToRender, setSlotsToRender] = useState([]);
  const [currentSlotsNum, setCurrentSlotsNum] = useState(0);
  const [spaceId, setSpaceId] = useState(0);
  const [slotId, setSlotId] = useState("");

  const [tagDataToPass, setTagDataToPass] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    setSpaceId(props.id);
    const getThisSpaceData = async () => {
      const res = await axios
        .get(`https://entity-sandbox.meeco.dev/api/parking-slots`)
        .then((res) => {
          // console.log(res.data.data);
          let slotsData = res.data.data;
          console.log(slotsData);
          setSlots(slotsData);
          setSlotsToRender(slotsData);
          setCurrentSlotsNum(slotsData.length);
        });
    };
    getThisSpaceData();
  }, []);

  const capacityHandler = (params) => {};

  const addSlot = () => {
    //TODO: if name exists, don't proceed. no duplicates
    // TODO: if at capacity, disable input tag /parking-slots?parking_space=<parking-space-id>

    // get how many slots are in a specific parking space,
    // this is also to check if space is at capacity
    axios
      .get(`https://entity-sandbox.meeco.dev/api/parking-slots`)
      .then((res) => {
        let result = res.data.data;
        let num = result.length;
        setCurrentSlotsNum(num);
      });
    if (currentSlotsNum >= props.capacity) {
      alert("Space at capacity. Unable to add slots.");
    } else {
      if (tagName === "") {
        alert("cannot be blank");
      } else {
        axios
          .post(`https://entity-sandbox.meeco.dev/api/parking-slots`, {
            data: {
              parking_space: spaceId,
              slot_tag: tagName,
              available: true,
            },
          })
          .then((res) => {
            console.log(res.status, res.data);
          });
        setTagName("");
      }
    }
  };

  const getSlotId = (slotTagName) => {
    axios
      .get(
        `https://entity-sandbox.meeco.dev/api/parking-slots?filters[slot_tag]=${slotTagName}`
      )
      .then((res) => {
        console.log(res.data);
        let slotId = res.data.id;
        console.log(res.data.data.id); // why is this undefined??
        // setSlotId(slotId);
      });
  };

  const selectedSlotHandler = (slotTagName) => {
    onOpen();
    setTagDataToPass(slotTagName);
    getSlotId(slotTagName);
  };

  return (
    <div>
      <VStack w="full" h="fill" p={10} spacing={10} alignItems="flex-start">
        <VStack spacing={3} alignItems="flex-start"></VStack>
        <SimpleGrid columns={3} columnGap={3} rowGap={6} w="full">
          {/* TODO: update availability */}
          <GridItem colSpan={3}>
            <Text>Occupied Slots In This Parking Space: {currentSlotsNum}</Text>
            <Text>
              Available Slots in This Parking Space:{" "}
              {props.capacity - currentSlotsNum}
            </Text>
          </GridItem>

          <GridItem colSpan={1}>
            <FormLabel>Enter Slot Tag Name</FormLabel>
            <Input
              placeholder="Enter tag name"
              value={tagName}
              bg="white.100"
              onChange={(e) => setTagName(e.target.value)}
            />
          </GridItem>
          <GridItem colSpan={3}>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                addSlot();
              }}
            >
              Add
            </Button>
          </GridItem>

          <GridItem colSpan={3}>
            <GridItem colSpan={3}>
              {slotsToRender === [] ? (
                <VStack spacing={3} alignItems="flex-start">
                  <Heading size="2xl">Data Loading...</Heading>
                </VStack>
              ) : (
                // TODO: conditional render, if available, green; else red
                slotsToRender.map((slot, index) => (
                  <div key={index}>
                    <Button
                      key={index}
                      id={slot.id}
                      onClick={() => {
                        selectedSlotHandler(slot.attributes.slot_tag);
                      }}
                    >
                      {slot.attributes.slot_tag} -
                      {slot.attributes.available.toString()}
                    </Button>
                    <Modal isOpen={isOpen} onClose={onClose}>
                      <ModalOverlay />
                      <ModalContent>
                        <ModalCloseButton />
                        <ModalBody>
                          <CreateParkingRecord
                            spaceId={spaceId}
                            // TODO: change this probs
                            tag={tagDataToPass}
                            slotId={slotId}
                          />
                        </ModalBody>
                      </ModalContent>
                    </Modal>
                  </div>
                ))
              )}
            </GridItem>
          </GridItem>
        </SimpleGrid>
      </VStack>
    </div>
  );
};

export default CreateSlotTags;
