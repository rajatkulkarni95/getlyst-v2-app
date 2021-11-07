import { apiUrl } from "../utils/env";
import { getWithoutToken } from "../utils/fetcher";

export const fetchUserFromDatabase = async (email: string) => {
  const result = getWithoutToken(`${apiUrl}/users/?email=${email}`);

  return result;
};
