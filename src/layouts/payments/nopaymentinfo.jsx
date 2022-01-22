import { Alert, AlertDescription, AlertIcon } from "@chakra-ui/react";

const NoPaymentInfo = () => {
  return (
    <Alert
      status="info"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="200px"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertDescription maxWidth="sm">No Payment added</AlertDescription>
    </Alert>
  );
};

export default NoPaymentInfo;
