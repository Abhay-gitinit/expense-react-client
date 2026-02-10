import axios from "axios";
import { serverEndpoint } from "../config/appConfig";

export const createOrder = async (amount) => {
  const res = await axios.post(
    `${serverEndpoint}/payments/create-order`,
    { amount },
    { withCredentials: true }
  );
  return res.data;
};

export const verifyPayment = async (paymentData) => {
  const res = await axios.post(
    `${serverEndpoint}/payments/verify`,
    paymentData,
    { withCredentials: true }
  );
  return res.data;
};
