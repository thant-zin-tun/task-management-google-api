import Cookies from "universal-cookie";
export const checkToken = () => {
  const cookies = new Cookies();
  const token = cookies.get("ACT");
  return token;
};
