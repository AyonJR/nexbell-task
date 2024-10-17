import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { enqueueSnackbar, useSnackbar } from 'notistack'; 


const Signup = () => {
  const { createUser, loginUserWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirm = e.target.confirmpassword.value;

    if (password === confirm) {
      createUser(email, password)
        .then((result) => {
          console.log(result.user);
          enqueueSnackbar("Signup successful!", { variant: 'success' });

          navigate("/");
        })
        .catch((error) => {
          console.log(error);
          enqueueSnackbar("Signup failed. Please try again.", { variant: 'error' });
        });
    } else {
      console.error("Passwords do not match");
    }
  };

  const handleGoogleSignup = () => {
    loginUserWithGoogle()
      .then(() => {
        enqueueSnackbar("Signup with Google successful!", { variant: 'success' });
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        enqueueSnackbar("Google Signup failed. Please try again.", { variant: 'error' });
      });
  };

  return (
    <div>
      <div className="bg-black">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl p-6 lg:p-14 font-normal text-center mb-6 lg:mb-10 text-white custom-font">
          Create Account
        </h1>
      </div>
      {/* Signup card */}
      <div className="flex items-center justify-center min-h-screen ">
        <section className="w-full max-w-md p-8 mx-auto bg-white rounded-lg shadow-xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-black">Signup</h2>
            <p className="mt-2 text-gray-600">
              Create a new account to get started.
            </p>
          </div>
          <form onSubmit={handleSignup}>
            <div className="mb-6">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="username"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-black bg-white border border-gray-300 rounded-md focus:border-customPurple focus:ring-customPurple focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="emailAddress"
              >
                Email Address
              </label>
              <input
                id="emailAddress"
                name="email"
                type="email"
                className="block w-full px-4 py-2 mt-2 text-black bg-white border border-gray-300 rounded-md focus:border-customPurple focus:ring-customPurple focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="block w-full px-4 py-2 mt-2 text-black bg-white border border-gray-300 rounded-md focus:border-customPurple focus:ring-customPurple focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="passwordConfirmation"
              >
                Confirm Password
              </label>
              <input
                id="passwordConfirmation"
                name="confirmpassword"
                type="password"
                className="block w-full px-4 py-2 mt-2 text-black bg-white border border-gray-300 rounded-md focus:border-customPurple focus:ring-customPurple focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="w-full px-6 font-bold py-3 text-black bg-customPurple rounded-lg hover:bg-purple-500 hover:text-white focus:outline-none"
              >
                Sign Up
              </button>
            </div>
          </form>

          <div className="flex justify-center mt-6">
            <button
              onClick={handleGoogleSignup}
              className="flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 focus:outline-none"
            >
              <FaGoogle className="mr-2" /> Sign up with Google
            </button>
          </div>
          <div className="flex justify-center mt-6">
            <p>
              Already have an account?
              <span className="text-customPurple font-bold underline">
                <Link to={"/login"}>Login</Link>
              </span>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Signup;