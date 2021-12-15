import {
  VStack,
  Heading,
  Button,
  SimpleGrid,
  GridItem,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  useToast,
  Box,
  Text,
  Input,
} from "@chakra-ui/react";

import { useState, useEffect } from "react";
import axios from "axios";

const CreatePaymentRecord = (props) => {
  const colSpan = useBreakpointValue({ base: 2, md: 1 });
  const bgColor = useColorModeValue("gray.50", "whiteAlpha.50");
  const secondaryTextColor = useColorModeValue("gray.600", "gray.400");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [parkingRecord, setParkingRecord] = useState("");
  const [amount, setAmount] = useState(0);
  // const [datePaid, setDatePaid] = useState(Date());
  // const [createdAt, setCreatedAt] = useState(Date());
  // const [updatedAt, setUpdatedAt] = useState(Date());
  // const [createdBy, setCreatedBy] = useState("admin");
  // const [updatedBy, setUpdatedBy] = useState("admin - edit");

  const openToast = () => {
    toast({
      position: "top",
      status: "success",
      duration: 3500,
      render: () => (
        <Box color="white" p={3} bg="green.500">
          <Text textAlign="center">
            Paymment Successful! Payment Record Created
          </Text>
        </Box>
      ),
    });
  };

  const onSubmitPayHandler = () => {
    props.onClose();
    openToast();
    let data = {
      data: {
        amount: amount,
        date_paid: new Date().toISOString(),
      },
    };
    console.log(data);
    axios
      .post(`https://entity-sandbox.meeco.dev/api/parking-payments`, data)
      .then((res) => {
        console.log(res.data, "new payment record created");
      });
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
          <Heading size="2xl">Payment Record</Heading>
        </VStack>
        <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
          <GridItem colSpan={colSpan}>Date: {new Date().toString()}</GridItem>
          <GridItem colSpan={1}>Time In </GridItem>
          <GridItem colSpan={1}>Time Out </GridItem>
          <GridItem colSpan={1}>Duration of Stay </GridItem>
          <GridItem colSpan={1}>
            Amount Due
            <Input
              placeholder="Enter Price"
              bg="white.100"
              type="number"
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
          </GridItem>
          <GridItem colSpan={colSpan}>
            <Button
              size="md"
              variant="outline"
              colorScheme="green"
              onClick={() => {
                onSubmitPayHandler();
                props.onClose();
              }}
            >
              Pay Amount
            </Button>
          </GridItem>
        </SimpleGrid>
      </VStack>
    </div>
  );
};

export default CreatePaymentRecord;
