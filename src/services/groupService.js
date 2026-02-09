import axios from "axios";
import { serverEndpoint } from "../config/appConfig";

export const fetchMyGroups = async () => {
  const res = await axios.get(`${serverEndpoint}/groups/my-groups`, {
    withCredentials: true,
  });

  return res.data.data || [];
};