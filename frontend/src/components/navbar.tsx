import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <div className=" flex  justify-between md:px-20 px-8 py-2 shadow-md bg-white z-10 backdrop-blur-md items-start h-14 text fixed top-0 w-full">
        
        <div className="text-2xl font-bold tracking-tighter">
          <Link to="/">TickTickBoom</Link>
        </div>
        <button
          className="md:hidden pt-1 z-50"
          onClick={() => {
            setVisible(!visible);
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d={visible ? "M6 18L18 6M6 6l12 12" : "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"} />
</svg>

        </button>
          
 <div
          className={`md:flex  md:flex-row p-6 pt-14 md:p-0  md:static fixed top-0 right-0 md:bg-transparent bg-white backdrop-blur-sm flex-col transition-transform duration-300 md:transition-none ease-in-out gap-4 md:w-fit md:translate-x-0  w-[200px] md:h-full h-screen z-40  md:z-0 border md:border-none  ${visible?"":"translate-x-full"} `}
        >
          <div className="text-md font-medium hover:bg-blue-200  px-2 py-2 rounded-lg transition-all duration-300">
            <Link to="/create-todo">Create Todo</Link>
          </div>

          <div className="text-md font-medium hover:bg-blue-200  px-2 py-2 rounded-lg transition-all duration-300">
            <Link to="/signin">Sign In</Link>
          </div>
          <div className="text-md font-medium hover:bg-blue-200  px-2 py-2 rounded-lg transition-all duration-300">
            <Link to="/signup">Get Started</Link>
          </div>
        </div>

          
            </div>
    </>
  );
};
export default Navbar;
