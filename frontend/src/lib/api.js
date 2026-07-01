import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export async function submitContact(payload) {
  const res = await axios.post(`${API}/contact`, payload);
  return res.data;
}
