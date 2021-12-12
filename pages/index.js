import {
  Container,
  Flex,
  Button,
  useColorMode,
  useColorModeValue,
  Text,
  Link,
} from "@chakra-ui/react";

// import { getParkingSpaces } from "../../lib/api";

import Registration from "../src/sections/authentication/registration";
import ParkingSpacesList from "./parking-spaces/parking-spaces-list";

export default function Home() {
  const { toggleColorMode } = useColorMode();

  const bgColor = useColorModeValue("gray.50", "whiteAlpha.50");
  const secondaryTextColor = useColorModeValue("gray.600", "gray.400");

  return (
    <Container maxW="container.xl" p={0}>
      <Button onClick={toggleColorMode}>Change Color Theme</Button>
      <Flex
        h={{ base: "auto", md: "100vh" }}
        py={[0, 10, 20]}
        direction={{ base: "column", md: "row" }}
      >
        <Link href="/parking-spaces">Click here to see parking spaces.</Link>
        <Registration
          bgColor={bgColor}
          secondaryTextColor={secondaryTextColor}
        />
      </Flex>
    </Container>
  );
}

// export async function getServerSideProps() {
//   const data = await getParkingSpaces();
//   return {
//     props: {
//       data,
//     },
//   };
// }
