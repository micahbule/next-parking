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

const CreateSlotTags = (props) => {
  const [slots, setSlots] = useState([]);
  const [tagName, setTagName] = useState("");
  const [slotsToRender, setSlotsToRender] = useState([]);
  const [currentSlotsNum, setCurrentSlotsNum] = useState(0);

  useEffect(() => {
    const getSlotsData = async () => {
      const res = axios
        .get(`https://entity-sandbox.meeco.dev/api/parking-slots`)
        .then((res) => {
          // console.log(res.data.data);
          let slotsData = res.data.data;
          setSlots(slotsData);
          setSlotsToRender(slotsData);
          setCurrentSlotsNum(slotsData.length);
        });
    };
    // getSlotsData();
    // console.log(slots);
    // if (slots === []) {
    //   console.log("no data");
    //   getSlotsData();
    // }
    getSlotsData();
  }, []);

  const capacityHandler = (params) => {
    props.slotCapacityChecker();
  };

  const addSlot = () => {
    //TODO: if name exists, don't proceed. no duplicates
    // TODO: if at capacity, disable input tag
    // check if at capacity
    axios
      .get(`https://entity-sandbox.meeco.dev/api/parking-slots`)
      .then((res) => {
        let result = res.data.data;
        console.log(result.length);
        let num = result.length;
        setCurrentSlotsNum(num);
      });
    if (currentSlotsNum >= props.spaceCapacity) {
      alert("Space at capacity. Unable to add slots.");
    } else {
      axios
        .post(`https://entity-sandbox.meeco.dev/api/parking-slots`, {
          data: {
            slot_tag: tagName,
            available: true,
          },
        })
        .then((res) => {
          console.log(res.status);
        })
        .catch((error) => {
          console.log(error);
        });
      setTagName("");
    }
  };

  return (
    <div>
      <VStack w="full" h="fill" p={10} spacing={10} alignItems="flex-start">
        <VStack spacing={3} alignItems="flex-start"></VStack>
        <SimpleGrid columns={3} columnGap={3} rowGap={6} w="full">
          {/* TODO: update availability */}
          <GridItem colSpan={3}>
            <Text>Occupied Slots: {currentSlotsNum}</Text>
            <Text>
              Available Slots: {props.spaceCapacity - currentSlotsNum}
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
                  <Button key={index} id={slot.id}>
                    {slot.attributes.slot_tag} -
                    {slot.attributes.available.toString()}
                  </Button>
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
