import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Text,
} from "@chakra-ui/react";

const PaymentError = ({ message = "" }) => {
  return (
    <Alert
      status="error"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="200px"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        Something went wrong!
      </AlertTitle>
      <AlertDescription maxWidth="sm">
        <Text fontSize="2xl">There was an error processing your request</Text>
        {message && <Text fontSize="xs">{message}</Text>}
      </AlertDescription>
    </Alert>
  );
};

export default PaymentError;
