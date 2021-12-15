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

  const [parkingSlot, setParkingSlot] = useState("");
  const [plateNumber, setPlateNumber] = useState("");

  const [parkingSlotRecordForCheckOut, setParkingSlotRecordForCheckOut] =
    useState("");

  const [recordId, setRecordId] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  // useEffect(() => {
  //   const getParkingSlotRecordId = async () => {
  //     if (parkingSlotRecordForCheckout) {
  //       getParkingSlotRecordId();
  //     }

  //     if (recordId) { getParkingSlotRecordId() }
  //   }, []

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
    e.preventDefault();
    if (plateNumber !== "") {
      let data = {
        data: {
          time_parked: new Date().toISOString(),
          plate_number: plateNumber,
        },
      };
      axios
        .post(`https://entity-sandbox.meeco.dev/api/parking-records`, data)
        .then((res) => {
          console.log(
            res.status,
            "new parking record created",
            res.data.data.id
          );
          setRecordId(res.data.data.id);
          openToast();
        });
      clearFields();
      props.onClose();
      onClose();
    } else {
      alert("Plate number cannot be blank");
    }
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

    // const getParkingRecordId = async () => {
    //   try {
    //     let res = await axios.get(
    //       `https://entity-sandbox.meeco.dev/api/parking-records?filters[plate_number]=${plateNumber}`
    //     );
    //     let parkingId = res.data.data.id;
    //     console.log(parkingId);
    //   } catch (error) {
    //     console.log(error);
    //   }

    // getParkingRecordId();
    // axios
    //   ((res) => {
    //     setParkingSlotRecordForCheckOut(res.data.data);
    //   })
    //   .then(
    //     console.log(timeVacated, parkingSlotRecordForCheckOut.id)
    //     // axios.put(
    //     //   `https://entity-sandbox.meeco.dev/api/parking-records${parkingSlotRecordForCheckOut.id}`,
    //     //   timeVacated
    //     // )
    //     // .then((res) => {
    //     //   console.log(res.data);
    //     // })
    //   );
  };

  const checkOutHandler = () => {
    onOpen();
    checkOutEditRecord();
  };

  const clearFields = () => {
    setPlateNumber("");
  };

  return (
    <div>
      <VStack w="full" h="fill" p={10} spacing={10} alignItems="flex-start">
        <VStack spacing={3} alignItems="flex-start">
          <ModalHeader>
            <Text size="xl">Create New Parking Record</Text>
            {/* <Text>in {props.parkingSpaceData.name}</Text> */}
            <Heading size="3xl"> Parking Slot {parkingSlot} </Heading>
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
