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
} from "@chakra-ui/react";

import { useState, useEffect } from "react";
import axios from "axios";

const CreateParkingRecord = (props) => {
  const colSpan = useBreakpointValue({ base: 2, md: 1 });

  const [parkingSlot, setParkingSlot] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [parkingPayment, setParkingPayment] = useState("still parked");
  const [timeParked, setTimeParked] = useState(Date());
  const [timeVacated, setTimeVacated] = useState(Date());
  const [createdAt, setCreatedAt] = useState(Date());
  const [updatedAt, setUpdatedAt] = useState(Date());
  const [createdBy, setCreatedBy] = useState("admin");
  const [updatedBy, setUpdatedBy] = useState("admin - edit");

  useEffect(() => {
    // console.log(props);
    setParkingSlot(props.tagName);
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const checkInCreateNewRecord = () => {
    if (
      plateNumber !== ""
      //  && if name exists// add if duplicate name
      // and if record of parkingslot exists don't proceed
    ) {
      let data = {
        data: {
          attributes: {
            parking_slot: parkingSlot,
            time_parked: timeParked,
            createdAt: createdAt,
            createdBy: createdBy,
            plate_number: plateNumber,
            parking_payment: parkingPayment,
            updatedAt: updatedAt,
            updatedBy: updatedBy,
          },
        },
      };

      console.log("new record created: ", data);
      axios
        .post(`https://entity-sandbox.meeco.dev/api/parking-records`, data)
        .then((res) => {
          console.log(res.data, "new record created");
        });
      clearFields();
    } else {
      console.log("cannot be blank");
    }
    props.onClose();
  };

  const checkOutEditRecord = () => {
    console.log("record edited");
    // let data = {
    //   time_vacated: timeVacated,
    //   plate_number: plateNumber,
    //   parking_payment: parkingPayment,
    //   updatedAt: updatedAt,
    //   updatedBy: updatedBy,
    // };
    // console.log(data);
    // axios
    //   .put(`https://entity-sandbox.meeco.dev/api/parking-records/${id}`, { data })
    //   .then((res) => {
    //     console.log(res.data, "new record created");
    //   });
  };

  const clearFields = () => {
    setParkingSlot("");
    setPlateNumber("");
    setParkingPayment("");
    setTimeParked("");
    setTimeVacated("");
    setCreatedAt("");
    setUpdatedAt("");
    setCreatedBy("");
    setUpdatedBy("");
  };

  return (
    <div>
      <VStack w="full" h="fill" p={10} spacing={10} alignItems="flex-start">
        <VStack spacing={3} alignItems="flex-start">
          <ModalHeader>
            <Text size="xl">Create New Parking Record</Text>
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
              onClick={() => {
                checkInCreateNewRecord();
              }}
            >
              Park Here
            </Button>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => {
                checkOutEditRecord();
              }}
            >
              Check Out
            </Button>
          </GridItem>
        </SimpleGrid>
      </VStack>
    </div>
  );
};

export default CreateParkingRecord;
