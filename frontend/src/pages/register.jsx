import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { Label } from "../components/label";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registration attempt:", { firstName, lastName, email });
  };

  const handleSocialSignup = (provider) => {
    console.log(`Signup with ${provider}`);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Gradient Background */}
      <div className="lg:w-4/10 bg-gradient-to-br from-[hsl(var(--auth-gradient-start))] to-[hsl(var(--auth-gradient-end))]" />

      {/* Right side - Registration Form */}
      <div className="w-6/10 flex items-center justify-center p-8 py-0 rounded-tl-3xl rounded-bl-3xl border">
        <div className="w-full">
          <div className="bg-transparent rounded-2xl p-8 md:p-12 w-full">
            <h1 className="text-4xl font-bold text-text-black mb-8">
              Create Account
            </h1>

            <form onSubmit={handleSubmit} className="">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-text-muted">
                    First name
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="h-12"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-text-muted">
                    Last name
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="h-12"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-text-muted">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-text-muted">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12"
                  required
                />
              </div>

              {/* Create Account Button */}
              <Button
                type="submit"
                className="w-full h-14 text-lg bg-amber-400 hover:bg-amber-500"
                size="lg"
              >
                Create Account
              </Button>
            </form>

            {/* Login Link */}
            <p className="text-left mt-6 text-text-muted">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary hover:underline font-medium"
              >
                Login
              </Link>
            </p>

            {/* Divider */}
            <div className="relative my-8 flex items-center">
              <div className="w-5/10 border-t border-border"></div>
              <div className="mx-7">or</div>
              <div className="w-5/10 border-t border-border"></div>
            </div>

            {/* Social Signup Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                type="button"
                variant="outline"
                className="h-14"
                onClick={() => handleSocialSignup("facebook")}
              >
                Signup with
                <svg
                  className="w-5 h-5 ml-2"
                  viewBox="0 0 24 24"
                  fill="#1877F2"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </Button>

              <Button
                type="button"
                variant="outline"
                className="h-14"
                onClick={() => handleSocialSignup("google")}
              >
                Signup with
                <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24">
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
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
