import {
  Container,
  Flex,
  Button,
  useColorMode,
  useColorModeValue,
  Text,
  Link,
} from "@chakra-ui/react";

export default function Home() {
  const { toggleColorMode } = useColorMode();

  // const bgColor = useColorModeValue("gray.50", "whiteAlpha.50");
  // const secondaryTextColor = useColorModeValue("gray.600", "gray.400");

  return (
    <Container maxW="container.xl" p={0}>
      <Button onClick={toggleColorMode}>Change Color Theme</Button>
      <Flex
        h={{ base: "auto", md: "100vh" }}
        py={[0, 10, 20]}
        direction={{ base: "column", md: "row" }}
      >
        <h1>DASHBOARD</h1>
        <Link href="/parking-spaces">Click here to see parking spaces.</Link>
        {/* <Registration
          bgColor={bgColor}
          secondaryTextColor={secondaryTextColor}
        /> */}
      </Flex>
    </Container>
  );
}
