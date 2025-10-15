import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Label } from "../components/Label";
import FloatingBlobs from "../components/FloatingBlobs";
import PrimaryButton from "../components/buttons/PrimaryButton";

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
      <div className='min-h-screen bg-transparent flex justify-center items-center'>
        {/* Card - Registration Form */}
        <div className='w-4/10 flex items-center justify-center'>
          <div className='w-9/10 flex justify-center items-center'>
            <div className='bg-white rounded-3xl py-10 px-18 w-full shadow-lg'>
              <h1 className='text-3xl font-bold text-primary'>Welcome Back!</h1>
              <h2 className='text-xl font-bold text-text-black mb-8'>
                Login to continue
              </h2>

              <form onSubmit={handleSubmit} className='grid'>
                {/* Username Field */}
                <div className='space-y-2'>
                  <Label htmlFor='username' className='text-text-muted'>
                    Username
                  </Label>
                  <Input
                    id='username'
                    type='username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className='h-12 mb-8'
                    required
                    variant='filled'
                  />
                </div>

                {/* Password Field */}
                <div className='space-y-2'>
                  <Label htmlFor='password' className='text-text-muted'>
                    Password
                  </Label>
                  <Input
                    id='password'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='h-12 mb-4'
                    required
                    variant='filled'
                  />
                </div>

                {/* Remember me checkbox and Forget Password link */}
                <div className='flex items-center justify-between mb-14'>
                  <div className='flex items-center'>
                    <input
                      id='remember'
                      type='checkbox'
                      className='h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500'
                    />
                    <Label
                      htmlFor='remember'
                      className='ml-2 text-text-muted top-0.5 relative'
                    >
                      Remember me
                    </Label>
                  </div>
                  <Link
                    to='/forgot-password'
                    className='text-text-muted hover:underline font-medium'
                  >
                    Forgot Password?
                  </Link>
                </div>

                {/* Create Account Button */}
                {/* <Button
                  type="submit"
                  className="w-full h-14 bg-amber-400 hover:bg-amber-500"
                  size="xl"
                >
                  Login Now
                </Button> */}
                <PrimaryButton btnText='Login Now' />
              </form>

              {/* Divider */}
              <div className='relative mt-8 flex items-center justify-center'>
                <div className=''>
                  <h1 className='font-bold text-xl text-text-black'>
                    or Login with
                  </h1>
                </div>
              </div>

              {/* Social Signup Buttons */}
              <div className='grid grid-cols-1 md:grid-cols-1 mt-2'>
                <Button
                  type='button'
                  variant='ghost'
                  className='h-8'
                  onClick={() => handleSocialSignup("google")}
                >
                  <svg className='w-5 h-5 ml-2' viewBox='0 0 24 24'>
                    <path
                      fill='#4285F4'
                      d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                    />
                    <path
                      fill='#34A853'
                      d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                    />
                    <path
                      fill='#FBBC05'
                      d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                    />
                    <path
                      fill='#EA4335'
                      d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                    />
                  </svg>
                </Button>
              </div>

              {/* Login Link */}
              <p className='mt-2 text-text-black text-center text-xl font-bold'>
                Dont have an account?{" "}
                <Link
                  to='/register'
                  className='text-primary hover:text-text-muted underline'
                >
                  SignUp
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
