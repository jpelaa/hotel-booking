import { Box, Flex, Heading } from "@chakra-ui/react";

const NavBar = () => {
  return (
    <Box
      mx="4"
      my="2"
      h="50px"
      borderRadius="base"
      px="2"
      bgGradient="linear(to-r, primary, secondary)"
    >
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
