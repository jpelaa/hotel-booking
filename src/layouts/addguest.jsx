import React from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
} from "@chakra-ui/react";
import { PhoneIcon } from "@chakra-ui/icons";

const AddGuest = (props) => {
  const { isModalOpen, onModalClose } = props;
  const btnRef = React.useRef();

  const [firstName, setFirstName] = React.useState("");
  const [isInvalid, setInvalid] = React.useState(false);

  return (
    <Modal
      size="xl"
      onClose={onModalClose}
      finalFocusRef={btnRef}
      isOpen={isModalOpen}
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Guest</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Grid gridGap="4">
            <Heading as="h5" size="sm">
              Guest Information
            </Heading>
            <FormControl id="firstName" isInvalid={isInvalid}>
              <FormLabel>First Name</FormLabel>
              <Input
                isInvalid={isInvalid}
                type="text"
                placeholder="Enter First Name"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
              />
              <FormErrorMessage>First Name is required.</FormErrorMessage>
            </FormControl>
            <FormControl id="lastName">
              <FormLabel>Last Name</FormLabel>
              <Input type="text" placeholder="Enter Last Name" />
              <FormErrorMessage>Last Name is required.</FormErrorMessage>
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input type="text" placeholder="Enter Email" />
              <FormErrorMessage>Email is required.</FormErrorMessage>
            </FormControl>
            <FormControl id="phoneNo">
              <FormLabel>Phone Number</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<PhoneIcon color="gray.300" />}
                />
                <Input type="tel" placeholder="Phone number" />
              </InputGroup>
              <FormErrorMessage>Phone Number is required.</FormErrorMessage>
            </FormControl>
            <FormControl id="address">
              <FormLabel>Address</FormLabel>
              <InputGroup mb="4">
                <Input
                  type="text"
                  placeholder="Street address or post office box"
                />
                <FormErrorMessage>Address 1 is required.</FormErrorMessage>
              </InputGroup>
              <Input
                type="text"
                placeholder="Apartments, suites, units, buildings, floors, etc."
              />
            </FormControl>
            <Grid gridGap="2" templateColumns="45% 30% 25%">
              <FormControl id="city">
                <FormLabel>City</FormLabel>
                <Input type="text" placeholder="" />
              </FormControl>
              <FormControl id="state">
                <FormLabel>State</FormLabel>
                <Select placeholder="Choose state">
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
              </FormControl>
              <FormControl id="postalCode">
                <FormLabel>Postal Code</FormLabel>
                <Input type="text" placeholder="" />
              </FormControl>
            </Grid>
          </Grid>
        </ModalBody>
        <ModalFooter>
          <HStack spacing="2">
            <Button variant="primary" onClick={() => setInvalid(true)}>
              ADD
            </Button>
            <Button variant="primaryOutline" onClick={onModalClose}>
              CANCEL
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddGuest;
