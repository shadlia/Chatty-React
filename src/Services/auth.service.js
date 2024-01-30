import api from "../utils/api";

const ResgisterAPI = async (paylaod) => {
  const { data } = await api.post("/api/auth/register", paylaod);
  return data;
};

const LoginAPI = async (paylaod) => {
  const { data } = await api.post("/api/auth/login", paylaod);
  return data;
};
export { ResgisterAPI, LoginAPI };
