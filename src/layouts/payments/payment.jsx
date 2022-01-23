import {
  Box,
  FormControl,
  FormLabel,
  Heading,
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
  SimpleGrid,
  Stack,
  useBoolean,
} from "@chakra-ui/react";
import moment from "moment";
import { useState } from "react";
import { DayPickerSingleDateController } from "react-dates";
import { MODE_TYPES } from "../../static/common";
import { INPUT_STYLES } from "../../static/styles";

const Payment = ({
  paymentId,
  paymentDate,
  mode,
  desc,
  amount,
  handlePaymentDateChange,
  handleModeChange,
  handleDescChange,
  handleAmountChange,
}) => {
  const [paymentDatePopOver, setPaymentDatePopOver] = useBoolean();
  const [focusedInput, setFocusedInput] = useState("date");

  return (
    <Box>
      <Heading as="h4" size="md">
        {paymentId ? "Edit" : "Add"} Payment
      </Heading>
      <SimpleGrid columns={2} spacing={4}>
        <Popover
          placement="bottom-start"
          isOpen={paymentDatePopOver}
          onOpen={setPaymentDatePopOver.on}
          onClose={setPaymentDatePopOver.on}
        >
          <PopoverTrigger>
            <FormControl id="paymentDate">
              <FormLabel color="#1F2223">Payment Date</FormLabel>
              <Input
                size="sm"
                {...INPUT_STYLES}
                placeholder="Date"
                value={moment(paymentDate).format("YYYY-MM-DD")}
              />
            </FormControl>
          </PopoverTrigger>
          <PopoverContent w={"100"} focusBorderColor="primary">
            <PopoverArrow />
            <DayPickerSingleDateController
              onOutsideClick={setPaymentDatePopOver.off}
              onDateChange={(value) => {
                handlePaymentDateChange(value);
                setPaymentDatePopOver.off();
              }}
              focusedInput={focusedInput}
              onFocusChange={(value) => {
                setFocusedInput(value || "date");
              }}
              date={moment(paymentDate)}
              numberOfMonths={1}
              keepOpenOnDateSelect={true}
              hideKeyboardShortcutsPanel={true}
            />
          </PopoverContent>
        </Popover>
        <FormControl id="details">
          <FormLabel>Details</FormLabel>
          <Input
            size="sm"
            type="text"
            {...INPUT_STYLES}
            placeholder="Enter Desc "
            onChange={handleDescChange}
            value={desc}
          />
        </FormControl>
      </SimpleGrid>

      <SimpleGrid columns={2} spacing={6}>
        <FormControl id="mode">
          <FormLabel htmlFor="mode">Mode</FormLabel>
          <RadioGroup
            size="sm"
            onChange={(value) => handleModeChange(value)}
            value={mode}
          >
            <Stack direction="row">
              {Object.keys(MODE_TYPES).map((keyName) => (
                <Radio key={keyName} colorScheme="blackAlpha" value={keyName}>
                  {MODE_TYPES[keyName]}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        </FormControl>
        <FormControl id="amountForm" w="50%">
          <FormLabel htmlFor="amount">Amount</FormLabel>
          <InputGroup size="sm" {...INPUT_STYLES}>
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
              onChange={handleAmountChange}
              value={amount}
            />
            <InputRightAddon borderRadius="2xl">USD</InputRightAddon>
          </InputGroup>
        </FormControl>
      </SimpleGrid>
    </Box>
  );
};

export default Payment;
