import { useSelector } from "react-redux";
import { ModeToggle } from "./components/mode-toggle";
import { HomePage } from "./pages/Home/HomePage";
import FootCompi from "./components/Footer/FootCompi";


const Home = () => {
    const { user } = useSelector(
    (state: {
      auth: {
        isAuthenticated: boolean;
        user: { token: string; _id: string; name: string; avatar: string; email: string };
      };
    }) => state.auth
  );

  return (
    <>
   
    <div className="flex mt-4 flex-col items-center justify-center">
      <div className="flex justify-between items-center gap-5 mb-5">
        <div className="flex items-center gap-5">
          <p>Hi, {user?.name || "User"}</p>
          <ModeToggle />
        </div>
      </div>
      <HomePage />

    </div>
   <FootCompi/>
     </>
  )
}

export default Home