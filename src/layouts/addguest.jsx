import React from "react";
import { Field, Formik } from "formik";

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
  useToast,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";

import { PhoneIcon } from "@chakra-ui/icons";
import { ERROR_TOAST_STYLE, SUCCESS_TOAST_STYLE } from "../static/styles";
import { API_URL } from "../static/common";

const AddGuest = (props) => {
  const { isModalOpen, onModalClose } = props;
  const btnRef = React.useRef();
  const toast = useToast();
  const onSubmit = async (values, actions) => {
    try {
      const id = uuidv4();
      const body = { ...values, id };

      await fetch(`${API_URL}guests`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const text = "You've successfully added guest.";
      toast({
        title: "Guest Created",
        status: "success",
        description: text,
        containerStyle: SUCCESS_TOAST_STYLE,
        duration: 2000,
        isClosable: true,
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Guest Create Failed",
        status: "error",
        description: "Guest is not created",
        containerStyle: ERROR_TOAST_STYLE,
        duration: 2000,
        isClosable: true,
      });
    }
    onModalClose();
    actions.setSubmitting(false);
  };

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    address1: "",
    address2: "",
    country: "",
    city: "",
    state: "",
    postalCode: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    email: Yup.string().email().required(),
    phoneNo: Yup.string()
      .required()
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(10, "Must be exactly 10 digits")
      .max(10, "Must be exactly 10 digits"),
    address1: Yup.string().required(),
    address2: Yup.string(),
    city: Yup.string().required(),
    state: Yup.string().required(),
    postalCode: Yup.string()
      .required()
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(6, "Must be exactly 6 digits")
      .max(6, "Must be exactly 6 digits"),
  });

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
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({
            handleSubmit,
            handleChange,
            values,
            isSubmitting,
            handleReset,
          }) => (
            <>
              <ModalHeader>Add Guest</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Grid gridGap="4">
                  <Heading as="h5" size="sm">
                    Guest Information
                  </Heading>
                  <Field name="firstName">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.firstName && form.touched.firstName
                        }
                      >
                        <FormLabel htmlFor="firstName">First Name</FormLabel>
                        <Input
                          {...field}
                          id="firstName"
                          placeholder="Enter First Name"
                          value={values.firstName}
                          onChange={handleChange}
                        />
                        <FormErrorMessage>
                          {form.errors.firstName}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="lastName">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.lastName && form.touched.lastName
                        }
                      >
                        <FormLabel htmlFor="lastName">Last Name</FormLabel>
                        <Input
                          {...field}
                          id="lastName"
                          placeholder="Enter Last Name"
                          value={values.lastName}
                          onChange={handleChange}
                        />
                        <FormErrorMessage>
                          {form.errors.lastName}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="email">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.email && form.touched.email}
                      >
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Input
                          {...field}
                          id="email"
                          placeholder="Enter Email"
                          value={values.email}
                          onChange={handleChange}
                        />
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="phoneNo">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.phoneNo && form.touched.phoneNo}
                      >
                        <FormLabel htmlFor="phoneNo">Phone Number</FormLabel>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            children={<PhoneIcon color="gray.300" />}
                          />
                          <Input type="text" {...field} name="phoneNo" />
                        </InputGroup>
                        <FormErrorMessage>
                          {form.errors.phoneNo}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="address1">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.address1 && form.touched.address1
                        }
                      >
                        <FormLabel htmlFor="address1">Address</FormLabel>
                        <Input
                          {...field}
                          id="address1"
                          placeholder="Street address or post office box"
                          value={values.address1}
                          onChange={handleChange}
                        />
                        <FormErrorMessage>
                          {form.errors.address1}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="address2">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.address2 && form.touched.address2
                        }
                      >
                        <Input
                          {...field}
                          id="address2"
                          placeholder="Apartments, suites, units, buildings, floors, etc."
                          value={values.address2}
                          onChange={handleChange}
                        />
                        <FormErrorMessage>
                          {form.errors.address2}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Grid gridGap="2" templateColumns="45% 30% 25%">
                    <Field name="city">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.city && form.touched.city}
                        >
                          <FormLabel htmlFor="city">City</FormLabel>
                          <Input
                            {...field}
                            id="city"
                            value={values.city}
                            onChange={handleChange}
                          />
                          <FormErrorMessage>
                            {form.errors.city}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="state">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.state && form.touched.state}
                        >
                          <FormLabel htmlFor="state">State</FormLabel>
                          <Select
                            {...field}
                            id="state"
                            value={values.state}
                            onChange={handleChange}
                            placeholder="Choose state"
                          >
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                          </Select>
                          <FormErrorMessage>
                            {form.errors.state}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="postalCode">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.postalCode && form.touched.postalCode
                          }
                        >
                          <FormLabel htmlFor="postalCode">
                            Postal Code
                          </FormLabel>
                          <Input
                            {...field}
                            type="text"
                            id="postalCode"
                            value={values.postalCode}
                            onChange={handleChange}
                          />
                          <FormErrorMessage>
                            {form.errors.postalCode}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Grid>
                </Grid>
              </ModalBody>
              <ModalFooter>
                <HStack spacing="2">
                  <Button
                    variant="primary"
                    isLoading={isSubmitting}
                    onClick={handleSubmit}
                  >
                    ADD
                  </Button>
                  <Button variant="primaryOutline" onClick={handleReset}>
                    CLEAR
                  </Button>
                </HStack>
              </ModalFooter>
            </>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export default AddGuest;
