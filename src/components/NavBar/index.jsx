import { Box, Flex, Heading } from "@chakra-ui/react";

const NavBar = () => {
  return (
    <Box
      mx="2"
      my="2"
      borderRadius="base"
      px="2"
      // bgGradient="linear(to-r, primary, secondary)"
    >
      <Flex justifyContent="space-between">
        <Box>
          <Heading color="#1F2223">Logo</Heading>
        </Box>
        <Box>
          <Flex direction="row" justifyContent="space-between">
            <Box m="4" color="#1F2223">
              Checkins
            </Box>
            <Box color="#1F2223" m="4">
              Reports
            </Box>
            <Box color="#1F2223" m="4">
              Configuration
            </Box>
            <Box color="#1F2223" m="4">
              Logout
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default NavBar;
