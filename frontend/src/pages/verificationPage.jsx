import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import FloatingBlobs from "../components/FloatingBlobs";

const VerificationPage = () => {
  return (
    <>
      <FloatingBlobs>
        <div className="h-screen bg-transparent flex justify-center items-center">
          <div className="bg-transparent rounded-3xl p-4 w-8/10 shadow-lg h-4/5">
            <div className="w-full flex h-full">
              {/* leftSide picture */}
              <div className="w-full bg-transparent h-auto rounded-3xl border"></div>
              {/* rightSide-Form */}
              <div className="w-full bg-white h-auto flex flex-col justify-center items-center rounded-3xl">
                {/* card Title */}
                <div>
                  <h1 className="text-2xl font-bold text-text-black">
                    Enter Verification Code
                  </h1>
                </div>
                <div className="mb-9">
                  <h2>We’ve send to sdcproject@gmail.com</h2>
                </div>

                {/* code form */}
                <form action="">
                  <div className="flex items-center justify-center h-auto mb-4">
                    <input
                      type="text"
                      placeholder="4"
                      className="border p-2 rounded w-13 h-15 text-center mr-2"
                    />
                    <input
                      type="text"
                      placeholder="4"
                      className="border p-2 rounded w-13 h-15 text-center mx-2"
                    />
                    <input
                      type="text"
                      placeholder="4"
                      className="border p-2 rounded w-13 h-15 text-center mx-2"
                    />
                    <input
                      type="text"
                      placeholder="4"
                      className="border p-2 rounded w-13 h-15 text-center mx-2"
                    />
                    <input
                      type="text"
                      placeholder="4"
                      className="border p-2 rounded w-13 h-15 text-center mx-2"
                    />
                    <input
                      type="text"
                      placeholder="4"
                      className="border p-2 rounded w-13 h-15 text-center ml-2"
                    />
                  </div>

                  <div>
                    <h3 className="text-center">Your link expires in 2:55</h3>
                  </div>

                  <div className="flex justify-around m-4">
                    {/* back button */}
                    <div>
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        className="bg-gray-400 text-text-black px-6 rounded-md"
                        onClick={() => handleSocialSignup("google")}
                      >
                        Back
                      </Button>
                    </div>

                    {/* verify button */}
                    <div>
                      <Button
                        type="button"
                        size="sm"
                        className="px-24 rounded-md"
                        onClick={() => handleSocialSignup("google")}
                      >
                        Verify
                      </Button>
                    </div>
                  </div>

                  {/* Login Link */}
                  <p className="mt-12 text-text-black text-center text-xl font-bold">
                    Didn’t received the code?
                    <Link
                      to="/register"
                      className="text-primary hover:text-text-muted underline"
                    >
                      resend code
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </FloatingBlobs>
    </>
  );
};

export default VerificationPage;
