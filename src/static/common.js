export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://my-json-server.typicode.com/jpelaa/demo/"
    : "http://localhost:3001/";

export const API_STATUS = {
  init: "INIT",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failed: "FAILED",
};

export const MODE_TYPES = {
  1: "Cash",
  2: "Credit card",
  3: "Wire Transfer",
  4: "Others",
};
