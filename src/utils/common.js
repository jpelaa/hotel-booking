import { API_URL } from "../static/common";

export const itemToString = (item) =>
  item ? `${item.firstName} ${item.lastName}` : "";

// API search guest
export const searchGuest = (search) => {
  return fetch(`${API_URL}guests?q=${search}`, {
    method: "GET",
  })
    .then((r) => r.json())
    .catch((error) => {
      console.error(error);
      return [];
    });
};

export const getTotalAmount = (paymentList) => {
  return paymentList.reduce((acc, current) => {
    if (current.amount) {
      acc = acc + current.amount;
    }
    return acc;
  }, 0);
};
