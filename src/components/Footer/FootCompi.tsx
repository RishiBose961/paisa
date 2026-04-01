import { logoutUserAction } from "@/slice/authSlice";
import { useDispatch } from "react-redux";
import { Button } from "../ui/button";

const FootCompi = () => {
    
    const dispatch = useDispatch();


  const handleLogout = () => {

    dispatch(logoutUserAction());
    window.location.replace("/login");
  };

  return (
    <footer className="fixed bottom-0 left-0 z-20 w-full p-4 bg-neutral-primary-soft border-t border-default
     shadow-sm flex justify-center items-center md:p-6">
      <span className="text-sm text-body sm:text-center">
        © 2026{" "}
        <a href="#" className="hover:underline">
          PAISA™
        </a>
        <Button onClick={handleLogout} variant="outline" className="ml-4 text-sm cursor-pointer">
          Logout
        </Button>
      </span>

  
    </footer>
  );
};

export default FootCompi;