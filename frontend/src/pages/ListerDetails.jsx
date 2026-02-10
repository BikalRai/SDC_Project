import React from "react";
import { LuBadgeCheck } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const ListerDetails = ({ user }) => {
  const navigate = useNavigate();
  if (!user) return null;

  console.log(user, "user!!!");

  return (
    <div className="p-5 border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition bg-white space-y-5">
      {/* Header */}
      <div className="flex items-center gap-4 relative">
        <div className="relative">
          <img
            src={user?.image || "/default-avatar.png"}
            alt={user?.fullName}
            className="w-16 h-16 rounded-full object-cover border-2 border-primary ring-2 ring-primary/20"
            onError={(e) => (e.currentTarget.src = "/default-avatar.png")}
          />

          {/* THE BADGE: Positioned absolutely relative to the image container */}
          {user?.verified && (
            <div className="absolute bottom-0 right-0 bg-white rounded-full p-0.5 shadow-sm">
              <LuBadgeCheck
                className="text-blue-500 w-5 h-5 fill-blue-50"
                title="Verified User"
              />
            </div>
          )}
        </div>

        <div>
          <h3 className="font-semibold text-lg text-gray-900">
            {user?.fullName}
          </h3>
          <p className="text-sm text-gray-500">{user?.location}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="bg-gray-50 rounded-lg py-2">
          <p className="text-xs text-gray-500">Listings</p>
          <p className="font-semibold text-gray-900">{user?.totalListings}</p>
        </div>

        <div className="bg-gray-50 rounded-lg py-2">
          <p className="text-xs text-gray-500">Rating</p>
          <p className="font-semibold text-gray-900">{user?.rating ?? "N/A"}</p>
        </div>

        <div className="bg-gray-50 rounded-lg py-2">
          <p className="text-xs text-gray-500">Joined</p>
          <p className="font-semibold text-gray-900">
            {new Date(user?.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={() => navigate(`/profile/${user?.id}`)}
        className="w-full mt-2 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-light-primary transition"
      >
        View Profile
      </button>
    </div>
  );
};

export default ListerDetails;
