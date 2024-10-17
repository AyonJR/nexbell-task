import { useState } from "react";
import { Link } from "react-router-dom";
import { CiPhone } from "react-icons/ci";
import { MdOutlineMail } from "react-icons/md";



export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

 

  return (
    <div>
      <div className="w-full h-12 custom-font bg-white hidden lg:block">
        <div className="flex gap-5 w-full">
          <div>
            <div className="w-full mt-2 flex items-center gap-2">
              <CiPhone className="h-8 w-8 font-bold text-black ml-5"></CiPhone>
              <h2 className="text-black custom-font font-light text-xl">+ 01415896129</h2>
            </div>
           
          </div>
          <div>
          <div className="w-full mt-2 flex items-center gap-2">
              <MdOutlineMail className="h-8 w-8 text-black ml-5"></MdOutlineMail>
              <h2 className="text-black custom-font font-light text-xl"> NexBell@gmail.com</h2>
            </div>
          </div>
        </div>
      </div>

      {/* navbar */}
      <nav className="relative bg-black">
        <div className="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
          <div className="flex items-center justify-between">
            <h2 className="custom-font text-3xl text-white  font-medium">
              NexBell
            </h2>

            {/* Mobile menu button */}
            <div className="flex lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="text-white hover:text-white  focus:outline-none "
                aria-label="toggle menu"
              >
                {isOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 8h16M4 16h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-black md:mt-0 md:p-0 md:top-0 md:relative md:bg-transparent md:w-auto md:opacity-100 custom-font md:translate-x-0 md:flex md:items-center ${
              isOpen
                ? "translate-x-0 opacity-100"
                : "opacity-0 -translate-x-full"
            }`}
          >
            <div className="flex gap-4 items-center flex-col md:flex-row md:mx-6">
              <Link to={"/"}>
                <a className="my-2 text-white transition-colors  duration-300 transform  hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0">
                  Home
                </a>
              </Link>
             
            </div>

            
          </div>
        </div>
      </nav>
    </div>
  );
}