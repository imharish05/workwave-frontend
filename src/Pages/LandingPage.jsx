import { Link } from "react-router-dom";
import Logo from "../assets/Logo2.png";

const LandingPage = () => {
  return (
    <div className="h-screen overflow-hidden w-full overflow-x-hidden flex items-center justify-center">
      <div className="flex flex-col items-center gap-5 text-center">
        <img
          src={Logo}
          alt="Workwave logo"
          className="object-contain max-w-xs max-h-40 md:max-w-md"
        />

        <p className="font-bold text-sm md:text-3xl">
          Start Your Career Journey With Workwave
        </p>

        <p className="text-sm md:text-base p-4">
          Create an account or sign in to see your personalised job recommendations.
        </p>

        <Link to={"/login"} className="inline-flex items-center justify-center bg-blue-700 text-white hover:bg-blue-900 p-4 rounded-lg">Get Started</Link>
      </div>
    </div>
  );
};

export default LandingPage;