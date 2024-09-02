import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import useShowToast from "./useShowToast";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const useLogout = () => {
  const setUser = useSetRecoilState(userAtom);
  const showToast = useShowToast();
  const navigate = useNavigate(); // Initialize navigate

  const logout = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }

      localStorage.removeItem("user-threads");
      setUser(null);
      navigate("/auth"); // Redirect to authentication page after logout
    } catch (error) {
      showToast(
        "Error",
        "An unexpected error occurred. Please try again.",
        "error"
      );
    }
  };

  return logout;
};

export default useLogout;
