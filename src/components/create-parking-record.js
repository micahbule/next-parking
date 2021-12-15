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
} from "@chakra-ui/react";

import { useState, useEffect } from "react";
import axios from "axios";

import CreatePaymentRecord from "../components/create-payment-record";

const CreateParkingRecord = (props) => {
  //TODO: toggle availability of slots
  const colSpan = useBreakpointValue({ base: 2, md: 1 });

  const [parkingSpaceId, setParkingSpaceId] = useState("");
  const [parkingTagName, setParkingTagName] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [slotId, setSlotId] = useState("");

  // parking record created upon check in
  const [recordId, setRecordId] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  useEffect(() => {
    console.log(props);
    setParkingSpaceId(props.spaceId);
    setParkingTagName(props.tag);
    setSlotId(props.slotId);
  }, []);

  const openToast = () => {
    toast({
      position: "top",
      status: "success",
      duration: 9000,
      render: () => (
        <Box color="white" p={3} bg="green.500">
          <Text textAlign="center">Parking Successful</Text>
        </Box>
      ),
    });
  };

  //TODO: toggle availability of slots
  const checkInCreateNewRecord = (e) => {
    console.log(parkingSpaceId.toString(), parkingTagName.toString());
    e.preventDefault();

    if (plateNumber !== "") {
      let data = {
        data: {
          time_parked: new Date().toISOString(),
          plate_number: plateNumber.toString(),
          // parking_slot: parkingTagName.toString(), //parking slot not accepted!
        },
      };
      axios
        .post(`https://entity-sandbox.meeco.dev/api/parking-records`, data)
        .then((res) => {
          console.log(res.status, "new parking record created");
          //upon getting back data, put parking record ID to state
          setRecordId(res.data.data.id);
        });
      // // TODO: update availability in parking slots database using parking slot id

      // i think this has to be put, then availability has to be changed
      //  axios
      //    .post(`https://entity-sandbox.meeco.dev/api/parking-slots/${slotId}`, )
      //    .then((res) => {
      //      console.log(res.status, "new parking record created", "AVAILABILITY OF SLOT CHANGED");
      //    })
    } else {
      alert("Plate number cannot be blank");
    }
  };

  //TODO: update the correct parking record
  //TODO: toggle availability of slots

  // each parking tag has a unique corresponding record id
  // each record id also has a unique plate number
  // you can only edit using the record id

  const checkOutEditRecord = (recordId) => {
    console.log(recordId);
    let timeVacated = new Date().toISOString();
    // console.log(timeVacated);

    let passTime = { data: { time_vacated: timeVacated } };
    console.log(passTime);
    axios
      .put(
        `https://entity-sandbox.meeco.dev/api/parking-records/${recordId}`,
        passTime
      )
      .then((res) => {
        console.log(res.data, res.status);
      });

    // if (recordId !== undefined) {
    //   axios
    //     .put(
    //       `https://entity-sandbox.meeco.dev/api/parking-records/${recordId}`,
    //       passTime
    //     )
    //     .then((res) => {
    //       console.log(res.data, res.status);
    //     });
    // }
    // console.log("id still undefined");
  };

  const checkOutHandler = () => {
    onOpen();
    checkOutEditRecord();
  };

  return (
    <div>
      <VStack w="full" h="fill" p={10} spacing={10} alignItems="flex-start">
        <VStack spacing={3} alignItems="flex-start">
          <ModalHeader>
            <Text size="xl">Create New Parking Record</Text>
            {/* <Text>in {props.parkingSpaceData.name}</Text> */}
            <Heading size="3xl">
              {" "}
              Parking Slot {parkingTagName}
              <Text fontSize="md">in Parking Space ID {parkingSpaceId}</Text>
            </Heading>
          </ModalHeader>
        </VStack>
        <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
          <GridItem colSpan={colSpan}>
            <FormControl>
              <FormLabel>Plate Number</FormLabel>
              <Input
                placeholder="Enter your plate number"
                value={plateNumber}
                bg="white.100"
                onChange={(e) => setPlateNumber(e.target.value)}
              ></Input>
            </FormControl>
          </GridItem>

          <GridItem colSpan={2}>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={(e) => {
                checkInCreateNewRecord(e);
              }}
            >
              Park Here
            </Button>
            <Button
              href="/create-payment-record"
              colorScheme="red"
              mr={3}
              onClick={() => {
                checkOutHandler(recordId);
                console.log(recordId);
              }}
            >
              Check Out
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalCloseButton />
                <ModalBody>
                  <CreatePaymentRecord onClose={onClose} />
                </ModalBody>
              </ModalContent>
            </Modal>
          </GridItem>
        </SimpleGrid>
      </VStack>
    </div>
  );
};

export default CreateParkingRecord;
