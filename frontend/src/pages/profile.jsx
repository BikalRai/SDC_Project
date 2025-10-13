import React from "react";
import FloatingBlobs from "../components/floatingBlobs";

const Profile = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <FloatingBlobs>
        <div className="text-center p-8">
          <h1 className="text-4xl font-bold">Profile Page</h1>
          <p className="mt-4 text-lg">
            This content appears on top of the floating blobs.
          </p>
        </div>
      </FloatingBlobs>
    </div>
  );
};

export default Profile;
