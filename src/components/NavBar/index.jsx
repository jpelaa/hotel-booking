import { Box, Flex, Heading } from "@chakra-ui/react";

const NavBar = () => {
  return (
    <Box w="100%" h="50px" bgGradient="linear(to-r, green.200, pink.500)">
      <Flex justifyContent="space-between">
        <Box>
          <Heading>Logo</Heading>
        </Box>
        <Box>
          <Flex direction="row" justifyContent="space-between">
            <Box m="4"> Checkins </Box>
            <Box m="4">Reports</Box>
            <Box m="4">Configuration</Box>
            <Box m="4">Logout</Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default NavBar;
