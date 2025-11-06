import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Label } from "../components/Label";
import FloatingBlobs from "../components/FloatingBlobs";
import { TextField } from "@mui/material";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registration attempt:", { username, password });
  };

  const handleSocialSignup = (provider) => {
    console.log(`Signup with ${provider}`);
  };

  return (
    <FloatingBlobs>
      <div className="min-h-[90vh] bg-transparent flex justify-center items-center">
        {/* Card - Registration Form */}
        <div className="w-[570px] flex items-center justify-center">
          <div className="w-9/10 flex justify-center items-center">
            <div className="bg-white rounded-3xl py-8 px-12 w-full shadow-lg">
              {/* Headings */}
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">
                Welcome Back!
              </h1>
              <h2 className="text-base sm:text-lg md:text-xl font-semibold text-text-black mt-1 mb-4">
                Login to continue
              </h2>

              {/* Form */}
              <form onSubmit={handleSubmit}>
                {/* Username Field */}
                <div className="space-y-2 mb-6">
                  <TextField
                    label="Email"
                    variant="filled"
                    fullWidth
                    required
                    sx={{
                      "& .MuiFilledInput-root": {
                        "&:before": { borderBottomWidth: "3px" },
                        "&:after": { borderBottomWidth: "3px" },
                        "&:hover:not(.Mui-disabled):before": {
                          borderBottomWidth: "3px",
                        },
                      },
                    }}
                  />
                </div>

                {/* Password Field */}
                <div className="space-y-2 mb-6">
                  <TextField
                    label="Password"
                    variant="filled"
                    fullWidth
                    required
                    type="password"
                    sx={{
                      "& .MuiFilledInput-root": {
                        "&:before": { borderBottomWidth: "3px" },
                        "&:after": { borderBottomWidth: "3px" },
                        "&:hover:not(.Mui-disabled):before": {
                          borderBottomWidth: "3px",
                        },
                      },
                    }}
                  />
                </div>

                {/* Remember me + Forgot password */}
                <div className="flex items-center justify-between mb-10 sm:mb-12">
                  <div className="flex items-center">
                    <input
                      id="remember"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 text-xs sm:text-sm md:text-base text-text-muted font-medium">
                      Remember me
                    </span>
                  </div>
                  <Link
                    to="/forgot-password"
                    className="text-xs sm:text-sm md:text-base text-primary hover:underline font-medium"
                  >
                    Forgot Password?
                  </Link>
                </div>

                {/* Login Button */}
                <Button
                  type="submit"
                  className="w-full h-12 sm:h-13 bg-amber-400 hover:bg-amber-500 text-sm sm:text-base md:text-lg"
                >
                  Login Now
                </Button>
              </form>

              {/* Divider */}
              <div className="relative mt-8 flex items-center justify-center">
                <h1 className="font-bold text-sm sm:text-base md:text-lg text-text-black">
                  or Login with
                </h1>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-1 mt-2 mb-6">
                <Button
                  type="button"
                  variant="ghost"
                  className="h-8 sm:h-10"
                  onClick={() => handleSocialSignup("google")}
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 ml-2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span className="ml-3 text-xs sm:text-sm md:text-base text-text-black font-medium">
                    Google
                  </span>
                </Button>
              </div>

              {/* Sign Up Link */}
              <p className="mt-2 text-xs sm:text-sm md:text-base text-text-black text-center font-bold">
                Don’t have an account?{" "}
                <Link to="/register" className="text-primary hover:underline">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </FloatingBlobs>
  );
};

export default Register;
