import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";

export const useSessionClearOnSignOut = () => {
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (!isSignedIn) {
      // Clear sessionStorage when the user signs out
      sessionStorage.removeItem("puzzleFormData");
      sessionStorage.removeItem("startWorldInfo");
      sessionStorage.removeItem("goalWorldInfo");
    }
  }, [isSignedIn]);
};
