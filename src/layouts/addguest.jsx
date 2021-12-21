import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";

const AddGuest = (props) => {
  const { isModalOpen, onModalClose } = props;
  const btnRef = React.useRef();

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
          <Box padding="4">
            <Heading as="h5" size="sm">
              Guest Information
            </Heading>
            <FormControl id="firstName">
              <FormLabel>First Name</FormLabel>
              <Input type="text" placeholder="Enter your First Name" />
            </FormControl>
            <FormControl id="lastName">
              <FormLabel>Last Name</FormLabel>
              <Input type="text" placeholder="Enter your Last Name" />
            </FormControl>
          </Box>
        </ModalBody>
        <ModalFooter>
          <HStack spacing="2">
            <Button variant="primary">ADD</Button>
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
