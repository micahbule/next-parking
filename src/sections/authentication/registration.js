import {
  VStack,
  Text,
  Heading,
  SimpleGrid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  Select,
  Checkbox,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";

export default function Registration({ bgColor, secondaryTextColor }) {
  const colSpan = useBreakpointValue({ base: 2, md: 1 });
  return (
    <>
      <VStack
        w="full"
        h="fill"
        p={10}
        spacing={10}
        alignItems="flex-start"
        bg={bgColor}
      >
        <VStack spacing={3} alignItems="flex-start">
          <Text>Log-in or Create a New Account Here</Text>
          <Heading size="2xl">Registration</Heading>
        </VStack>
        <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
          {/* form */}
          <GridItem colSpan={colSpan}>
            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input placeholder="Juana" bg="white.100"></Input>
            </FormControl>
          </GridItem>
          <GridItem colSpan={colSpan}>
            <FormControl>
              <FormLabel>Last Name</FormLabel>
              <Input placeholder="dela Cruz" bg="white.100"></Input>
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input placeholder="juana.dc@email.com" bg="white.100"></Input>
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input placeholder="5th Ave." bg="white.100"></Input>
            </FormControl>
          </GridItem>
          <GridItem colSpan={colSpan}>
            <FormControl>
              <FormLabel>City</FormLabel>
              <Input placeholder="Taguig" bg="white.100"></Input>
            </FormControl>
          </GridItem>
          <GridItem colSpan={colSpan}>
            <FormControl>
              <FormLabel>Country</FormLabel>
              <Select bg="white.100">
                <option>Philippines</option>
                <option>Indonesia</option>
                <option>Taiwan</option>
                <option>Malaysia</option>
                <option>Brunei</option>
                <option>Hong Kong</option>
              </Select>
            </FormControl>
          </GridItem>
          {/* here because same spacing */}
          <GridItem colSpan={2}>
            <Text color={secondaryTextColor}>
              <Checkbox defaultChecked>Remember Me</Checkbox>
            </Text>
          </GridItem>
          <GridItem colSpan={2}>
            <Text color={secondaryTextColor}>
              We will never give out your details to anyone.
            </Text>
          </GridItem>

          <GridItem colSpan={2}>
            <Button variant="outline" size="lg" w="full" colorScheme="purple">
              Register
            </Button>
          </GridItem>
        </SimpleGrid>
      </VStack>
    </>
  );
}
