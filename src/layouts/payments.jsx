import React from "react";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
  Radio,
  RadioGroup,
  Select,
  SimpleGrid,
  Stack,
  Textarea,
  useBoolean,
} from "@chakra-ui/react";
import { INPUT_STYLES } from "../static/styles";
import moment from "moment";
import { DayPickerRangeController } from "react-dates";

const Payments = (props) => {
  const firstField = React.useRef();
  const { isOpen, onClose } = props;

  const [startDatePopOver, setStartDatePopOver] = useBoolean();

  return (
    <Drawer
      isOpen={isOpen}
      size="xl"
      placement="right"
      initialFocusRef={firstField}
      onClose={onClose}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Payment</DrawerHeader>

        <DrawerBody>
          <Stack spacing="4px">
            <SimpleGrid columns={2} spacing={6}>
              <Popover
                placement="bottom-start"
                isOpen={startDatePopOver}
                onOpen={setStartDatePopOver.on}
                onClose={setStartDatePopOver.on}
              >
                <PopoverTrigger>
                  <FormControl id="arrivalDate">
                    <FormLabel color="#1F2223">Arrival</FormLabel>
                    <Input
                      {...INPUT_STYLES}
                      placeholder="Date"
                      value={moment().format("YYYY-MM-DD")}
                    />
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent w={"100"} focusBorderColor="primary">
                  <PopoverArrow />
                  <DayPickerRangeController
                    onOutsideClick={setStartDatePopOver.off}
                    onDatesChange={(value) => {
                      console.log(value, "startDate, endDate ");
                    }}
                    focusedInput={null}
                    onFocusChange={(value) => {}}
                    startDate={null}
                    endDate={null}
                    numberOfMonths={2}
                    keepOpenOnDateSelect={true}
                    hideKeyboardShortcutsPanel={true}
                  />
                </PopoverContent>
              </Popover>
              <FormControl id="details">
                <FormLabel>Details</FormLabel>
                <Input
                  type="text"
                  {...INPUT_STYLES}
                  placeholder="Enter Desc "
                />
              </FormControl>
            </SimpleGrid>

            <SimpleGrid columns={2} spacing={6}>
              <FormControl id="mode">
                <FormLabel htmlFor="mode">Mode</FormLabel>
                <RadioGroup onChange={() => {}} value={"1"}>
                  <Stack direction="column">
                    <Radio value="1">Cash</Radio>
                    <Radio value="2">Credit card</Radio>
                    <Radio value="3">Wire Transfer</Radio>
                    <Radio value="4">Others</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
              <FormControl id="amountForm" w="50%">
                <FormLabel htmlFor="amount">Amount</FormLabel>
                <InputGroup {...INPUT_STYLES}>
                  <InputLeftAddon
                    borderRadius="2xl"
                    pointerEvents="none"
                    children="$"
                  />
                  <Input
                    borderRadius="2xl"
                    type="number"
                    id="amount"
                    placeholder="0.00"
                  />
                  <InputRightAddon borderRadius="2xl">USD</InputRightAddon>
                </InputGroup>
              </FormControl>
            </SimpleGrid>
          </Stack>
        </DrawerBody>

        <DrawerFooter borderTopWidth="1px">
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary">Submit</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Payments;
