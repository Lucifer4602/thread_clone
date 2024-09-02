import { Button } from "@chakra-ui/button";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import userAtom from "../atoms/userAtom";
import useShowToast from "../hooks/useShowToast";
import { FiLogOut } from "react-icons/fi";

const LogoutButton = () => {
  const setUser = useSetRecoilState(userAtom);
  const showToast = useShowToast();
  const navigate = useNavigate(); // Initialize navigate

  const handleLogout = async () => {
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
      navigate("/auth"); // Use navigate to redirect to the auth page
    } catch (error) {
      showToast(
        "Error",
        "An unexpected error occurred. Please try again.",
        "error"
      );
    }
  };

  return (
    <Button
      position={"fixed"}
      top={"30px"}
      right={"30px"}
      size={"sm"}
      onClick={handleLogout}
    >
      <FiLogOut size={20} />
    </Button>
  );
};

export default LogoutButton;
