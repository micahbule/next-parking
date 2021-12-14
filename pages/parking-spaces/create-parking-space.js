import {
  VStack,
  Heading,
  SimpleGrid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";

import { useState, useEffect } from "react";
import axios from "axios";

const CreateParkingSpace = ({ bgColor, secondaryTextColor }) => {
  const colSpan = useBreakpointValue({ base: 2, md: 1 });

  const [spaceName, setSpaceName] = useState("");
  const [slots, setSlots] = useState(1);
  const [createdAt, setCreatedAt] = useState(Date());
  const [updatedAt, setUpdatedAt] = useState(Date());
  const [createdBy, setCreatedBy] = useState("admin for now");
  const [updatedBy, setUpdatedBy] = useState("admin for now - edit");

  const submitHandler = () => {
    if (spaceName !== "") {
      //  TODO: error handling, if name exists// add if duplicate name
      let data = {
        name: spaceName,
        slots: slots,
        createdAt: createdAt,
        updatedAt: updatedAt,
        createdBy: createdBy,
        updatedBy: updatedBy,
      };

      console.log({ data });
      axios
        .post(`https://entity-sandbox.meeco.dev/api/parking-spaces`, { data })
        .then((res) => {
          console.log(res.data, "NEW SPACE ADDED");
        });

      clearFields();
    } else {
      console.log("cannot be blank");
    }
  };

  const clearFields = () => {
    setSpaceName("");
    setSlots(1);
    setCreatedAt("");
    setUpdatedAt("");
    setCreatedBy("");
    setUpdatedBy("");
  };

  return (
    <div>
      <VStack
        w="full"
        h="fill"
        p={10}
        spacing={10}
        alignItems="flex-start"
        bg={bgColor}
      >
        <VStack spacing={3} alignItems="flex-start">
          <Heading size="2xl">Create New Parking Space</Heading>
        </VStack>
        <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
          <GridItem colSpan={colSpan}>
            <FormControl>
              <FormLabel>Parking Space Name</FormLabel>
              <Input
                placeholder="Name of Space"
                // value={spaceName}
                bg="white.100"
                onChange={(e) => setSpaceName(e.target.value)}
              ></Input>
            </FormControl>
          </GridItem>
          <GridItem colSpan={1}>
            <FormControl>
              <FormLabel>Number of Slots Available</FormLabel>
              <NumberInput
                bg="white.100"
                value={slots}
                defaultValue={slots}
                onChange={(value) => setSlots(value)}
                // max={100}
                size="md"
                maxW={20}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </GridItem>

          <GridItem colSpan={2}>
            <Button
              variant="outline"
              size="lg"
              w="full"
              colorScheme="purple"
              onClick={() => {
                submitHandler();
              }}
            >
              Add New Parking Space
            </Button>
          </GridItem>
        </SimpleGrid>
      </VStack>
    </div>
  );
};

export default CreateParkingSpace;
