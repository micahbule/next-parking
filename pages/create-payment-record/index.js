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
} from "@chakra-ui/react";

import { useState, useEffect } from "react";
import axios from "axios";

const CreatePaymentRecord = () => {
  const colSpan = useBreakpointValue({ base: 2, md: 1 });
  const bgColor = useColorModeValue("gray.50", "whiteAlpha.50");
  const secondaryTextColor = useColorModeValue("gray.600", "gray.400");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [parkingRecord, setParkingRecord] = useState("");
  const [amount, setAmount] = useState(0);
  const [datePaid, setDatePaid] = useState(Date());
  const [createdAt, setCreatedAt] = useState(Date());
  const [updatedAt, setUpdatedAt] = useState(Date());
  const [createdBy, setCreatedBy] = useState("admin");
  const [updatedBy, setUpdatedBy] = useState("admin - edit");

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
    openToast();
    onClose();
    let data = {
      data: {
        attributes: {
          amount: amount,
          date_paid: datePaid,
          createdAt: createdAt,
          updatedAt: updatedAt,
        },
      },
    };
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
          <GridItem colSpan={colSpan}>Time </GridItem>
          <GridItem colSpan={1}>lalala</GridItem>

          <GridItem colSpan={2}>Time In- </GridItem>
          <GridItem colSpan={2}>Time Out - </GridItem>
          <GridItem colSpan={1}>Duration - </GridItem>
          <GridItem colSpan={1}>
            <Button
              onClick={() => {
                onSubmitPayHandler();
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
