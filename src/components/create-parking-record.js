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
  const colSpan = useBreakpointValue({ base: 2, md: 1 });

  const [parkingSpaceId, setParkingSpaceId] = useState("");
  const [parkingTagName, setParkingTagName] = useState("");
  const [plateNumber, setPlateNumber] = useState("");

  const [parkingSlotRecordForCheckOut, setParkingSlotRecordForCheckOut] =
    useState("");

  const [recordId, setRecordId] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  useEffect(() => {
    // console.log(props);
    setParkingSpaceId(props.spaceId);
    setParkingTagName(props.tag);
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

  const checkInCreateNewRecord = (e) => {
    console.log(parkingSpaceId, parkingTagName);
    e.preventDefault();
    axios
      .post(`https://entity-sandbox.meeco.dev/api/parking-records`, {
        time_parked: new Date().toISOString(),
        plate_number: plateNumber.toString(),
        parking_slot: parkingTagName.toString(),
      })
      .then((res) => {
        console.log(res.status, "new parking record created", res.data.data.id);
        //upon getting back data, put to state
        setRecordId(0);
      });

    // if (plateNumber !== "") {
    //   let data = {
    //     data: {
    //       time_parked: new Date().toISOString(),
    //       plate_number: plateNumber.toString(),
    //       parking_slot: parkingTagName.toString(),
    //     },
    //   };
    //   console.log(data);
    //   axios
    //     .post(`https://entity-sandbox.meeco.dev/api/parking-records`, {
    //       time_parked: new Date().toISOString(),
    //       plate_number: plateNumber.toString(),
    //       parking_slot: parkingTagName.toString(),
    //     })
    //     .then((res) => {
    //       console.log(
    //         res.status,
    //         "new parking record created",
    //         res.data.data.id
    //       );
    //       // setRecordId(res.data.data.id);
    //       openToast();
    //     });
    //   setPlateNumber("");
    // } else {
    //   alert("Plate number cannot be blank");
    // }
  };

  // should be id of parking record, how do i find that? via plate number
  const checkOutEditRecord = (recordId) => {
    let timeVacated = new Date().toISOString();
    // console.log(timeVacated);

    let passTime = { data: { time_vacated: timeVacated } };
    console.log(passTime);

    console.log(recordId);
    if (recordId !== undefined) {
      axios
        .put(
          `https://entity-sandbox.meeco.dev/api/parking-records/${recordId}`,
          passTime
        )
        .then((res) => {
          console.log(res.data, res.status);
        });
    }
    console.log("id still undefined");
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
