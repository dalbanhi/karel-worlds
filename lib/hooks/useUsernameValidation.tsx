import { useState } from "react";
import debounce from "lodash.debounce";
import { checkUsername } from "../actions/users";

export function useUsernameValidation() {
  const [isUsernameTaken, setIsUsernameTaken] = useState(false);

  const validateUsername = debounce(async (username: string) => {
    if (username) {
      const isTaken = await checkUsername(username);
      setIsUsernameTaken(isTaken);
    }
  }, 200); // 200ms debounce

  return { isUsernameTaken, validateUsername };
}
