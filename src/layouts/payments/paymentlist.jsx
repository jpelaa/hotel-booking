import { EditIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Table,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import moment from "moment";
import { MODE_TYPES } from "../../static/common";
import { getTotalAmount } from "../../utils/common";

const PaymentList = ({
  paymentList = [],
  isCheckedOut = false,
  handleEdit,
}) => {
  return (
    <Table size="sm">
      <Thead position="sticky" top="0" bg="white">
        <Tr>
          <Th>Payment Date</Th>
          <Th>Mode of Payment</Th>
          <Th>Description</Th>
          <Th isNumeric>Amount Paid</Th>
          {!isCheckedOut && <Th></Th>}
        </Tr>
      </Thead>
      <Tbody>
        {paymentList.map((paymentData) => {
          return (
            <Tr key={paymentData.id}>
              <Td>
                {paymentData.paymentDate
                  ? moment(paymentData.paymentDate).format("MM-DD-YYYY")
                  : ""}
              </Td>
              <Td>{MODE_TYPES[paymentData.mode]}</Td>
              <Td>{paymentData.desc}</Td>
              <Td isNumeric>{paymentData.amount}</Td>
              {!isCheckedOut && (
                <Td>
                  <IconButton
                    size="xs"
                    aria-label="Edit Payment"
                    icon={<EditIcon />}
                    onClick={() => handleEdit(paymentData.id)}
                  />
                </Td>
              )}
            </Tr>
          );
        })}
      </Tbody>
      <Tfoot>
        <Tr>
          <Th colSpan={!isCheckedOut ? "3" : "2"}>Total</Th>
          <Th isNumeric>{getTotalAmount(paymentList)}</Th>
        </Tr>
      </Tfoot>
    </Table>
  );
};

export default PaymentList;
