import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  useDisclosure,
} from "@chakra-ui/react";
import {
  RESET_HOTEL_VALUE,
  UPDATE_HOTEL_VALUE,
  useHotelContext,
} from "../hotel-context";
import Payments from "./payments";

const Home = (props) => {
  const { state, dispatch } = useHotelContext();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClear = () => {
    dispatch({ type: RESET_HOTEL_VALUE });
  };

  return (
    <Grid templateColumns="60% 40%" gap={6} m="4">
      <Box
        w="100%"
        p={4}
        borderRadius="2xl"
        border="1px solid"
        borderColor="primary"
      >
        <Heading>Guest Checkin/Checkout</Heading>
        <FormControl id="searchGuestName">
          <FormLabel>Guest Name</FormLabel>
          <Input type="search" placeholder="Search" />
        </FormControl>
        <Grid templateColumns="repear(2,1fr)" gap={6}>
          <FormControl id="arrivalDate">
            <FormLabel>Arrival</FormLabel>
            <Input type="date" placeholder="Date" />
          </FormControl>
          <FormControl id="departureDate">
            <FormLabel>Departure</FormLabel>
            <Input type="date" placeholder="Date" />
          </FormControl>
        </Grid>

        <Grid templateColumns="repeat(3,1fr)" gap={6}>
          <FormControl id="arrivalDate">
            <FormLabel>Arrival</FormLabel>
            <Input type="date" placeholder="Date" />
          </FormControl>
          <FormControl id="departureDate">
            <FormLabel>Departure</FormLabel>
            <Input type="date" placeholder="Date" />
          </FormControl>
          <FormControl id="departureDate">
            <FormLabel>Departure</FormLabel>
            <Input type="date" placeholder="Date" />
          </FormControl>
        </Grid>

        <FormControl id="roomType">
          <FormLabel>Room Type</FormLabel>
          <Input type="search" placeholder="Select the Room Type" />
        </FormControl>

        <Grid templateColumns="repeat(3,1fr)" gap={6}>
          <FormControl id="arrivalDate">
            <FormLabel>Rate</FormLabel>
            <NumberInput
              allowMouseWheel
              onChange={(value) =>
                dispatch({
                  type: UPDATE_HOTEL_VALUE,
                  payload: {
                    keyName: "ratePerRoom",
                    value,
                  },
                })
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl id="departureDate">
            <FormLabel>Nights</FormLabel>
            <NumberInput allowMouseWheel>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl id="departureDate">
            <FormLabel>Estimated Cost</FormLabel>
            <NumberInput allowMouseWheel>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </Grid>

        <Grid templateColumns="repeat(3,1fr)" gap={6} p="8">
          <Button variant="primary">SAVE</Button>
          <Button variant="secondary" onClick={onOpen}>
            PAYMENT
          </Button>
          <Button variant="secondaryOutline" onClick={handleClear}>
            CLEAR
          </Button>
        </Grid>
      </Box>
      <Payments isOpen={isOpen} onClose={onClose} />
    </Grid>
  );
};

export default Home;
