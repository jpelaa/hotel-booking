export const itemToString = (item) =>
  item ? `${item.firstName} ${item.lastName}` : "";

// API search guest
export const searchGuest = (search) => {
  return fetch(`http://localhost:3001/guests?q=${search}`, {
    method: "GET",
  })
    .then((r) => r.json())
    .catch((error) => {
      console.error(error);
      return [];
    });
};
