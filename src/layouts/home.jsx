import { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  HStack,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
  Select,
  SimpleGrid,
  useBoolean,
  useDisclosure,
  useNumberInput,
} from "@chakra-ui/react";
import {
  RESET_HOTEL_VALUE,
  UPDATE_HOTEL_VALUE,
  useHotelContext,
} from "../hotel-context";
import Payments from "./payments";
import { DayPickerRangeController } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import "react-dates/initialize";
import "../styles/react_dates_overrides.css";
import moment from "moment";

const Home = (props) => {
  const { state, dispatch } = useHotelContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(null);
  const [startDatePopOver, setStartDatePopOver] = useBoolean();
  const [endDatePopOver, setEndDatePopOver] = useBoolean();

  const [focusedInput, setFocusedInput] = useState("startDate");

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      defaultValue: 0,
      min: 0,
      max: 6,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps({ isReadOnly: true });

  const handleClear = () => {
    dispatch({ type: RESET_HOTEL_VALUE });
  };

  console.log(state, " state of asdasd");

  console.log(focusedInput, " state of asdasd");

  return (
    <Grid templateColumns="60% 40%" m="4">
      <Grid
        gap="2"
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
        <SimpleGrid columns={2} spacing={6}>
          <Popover
            placement="bottom-start"
            isOpen={startDatePopOver}
            onOpen={setStartDatePopOver.on}
            onClose={setStartDatePopOver.on}
          >
            <PopoverTrigger>
              <FormControl id="arrivalDate">
                <FormLabel>Arrival</FormLabel>
                <Input
                  type="date"
                  placeholder="Date"
                  value={moment(startDate).format("YYYY-MM-DD")}
                />
              </FormControl>
            </PopoverTrigger>
            <PopoverContent w={"100"} focusBorderColor="primary">
              <PopoverArrow />
              <DayPickerRangeController
                onOutsideClick={setStartDatePopOver.off}
                onDatesChange={(value) => {
                  console.log(value, "startDate, endDate ");
                  setStartDate(value.startDate);
                  setEndDate(value.endDate);
                }}
                focusedInput={focusedInput}
                onFocusChange={(value) => setFocusedInput(value || "startDate")}
                startDate={startDate}
                endDate={endDate}
                numberOfMonths={2}
                keepOpenOnDateSelect={true}
                hideKeyboardShortcutsPanel={true}
              />
            </PopoverContent>
          </Popover>
          <Popover
            placement="bottom-end"
            isOpen={endDatePopOver}
            onOpen={setEndDatePopOver.on}
            onClose={setStartDatePopOver.on}
          >
            <PopoverTrigger>
              <FormControl id="departureDate">
                <FormLabel>Departure</FormLabel>
                <Input
                  type="date"
                  placeholder="Date"
                  value={moment(endDate).format("YYYY-MM-DD")}
                />
              </FormControl>
            </PopoverTrigger>
            <PopoverContent w={"100"}>
              <PopoverArrow />
              <DayPickerRangeController
                onOutsideClick={setEndDatePopOver.off}
                onDatesChange={(value) => {
                  setStartDate(value.startDate);
                  setEndDate(value.endDate);
                }}
                focusedInput={focusedInput}
                onFocusChange={(value) => setFocusedInput(value || "startDate")}
                startDate={startDate}
                endDate={endDate}
                numberOfMonths={2}
                keepOpenOnDateSelect={true}
              />
            </PopoverContent>
          </Popover>
        </SimpleGrid>

        {/* <FormControl id="arrivalDate">
          <FormLabel>Arrival</FormLabel>
          <Input type="date" placeholder="Date" />
        </FormControl>
        <FormControl id="departureDate">
          <FormLabel>Departure</FormLabel>
          <Input type="date" placeholder="Date" />
        </FormControl> */}
        <Grid templateColumns="repeat(3,1fr)" gap={6}>
          <FormControl id="adults">
            <FormLabel>Adults</FormLabel>
            <HStack>
              <Button focusBorderColor="primary" {...inc}>
                +
              </Button>
              <Input focusBorderColor="primary" {...input} />
              <Button focusBorderColor="primary" {...dec}>
                -
              </Button>
            </HStack>
          </FormControl>
          <FormControl id="children">
            <FormLabel>Children</FormLabel>
            <HStack>
              <Button focusBorderColor="primary" {...inc}>
                +
              </Button>
              <Input focusBorderColor="primary" {...input} />
              <Button focusBorderColor="primary" {...dec}>
                -
              </Button>
            </HStack>
          </FormControl>
          <FormControl id="rooms">
            <FormLabel>Rooms</FormLabel>
            <HStack>
              <Button focusBorderColor="primary" {...inc}>
                +
              </Button>
              <Input focusBorderColor="primary" {...input} />
              <Button focusBorderColor="primary" {...dec}>
                -
              </Button>
            </HStack>
          </FormControl>
        </Grid>

        <FormControl id="roomType">
          <FormLabel>Room Type</FormLabel>
          <Select focusBorderColor="primary" placeholder="Select the Room Type">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
        </FormControl>

        <Grid templateColumns="repeat(3,1fr)" gap={6}>
          <FormControl id="arrivalDate">
            <FormLabel>Rate</FormLabel>
            <NumberInput
              focusBorderColor="primary"
              allowMouseWheel
              onChange={(value) =>
                dispatch({
                  type: UPDATE_HOTEL_VALUE,
                  payload: {
                    keyName: "ratePerRoom",
                    value: Number(value),
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
            <NumberInput focusBorderColor="primary" allowMouseWheel>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl id="departureDate">
            <FormLabel>Estimated Cost</FormLabel>
            <NumberInput focusBorderColor="primary" allowMouseWheel>
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
      </Grid>
      <Payments isOpen={isOpen} onClose={onClose} />
    </Grid>
  );
};

export default Home;
