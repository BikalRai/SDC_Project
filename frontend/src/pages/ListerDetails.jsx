// import React from "react";
// import { useNavigate } from "react-router-dom";

// const ListerDetails = ({ user }) => {
//   if (!user) return null;

//   const navigate = useNavigate();

//   return (
//     <div className="p-4 border border-gray-200 rounded-xl shadow-sm space-y-3">
//       <div className="flex items-center gap-4">
//         <img
//           src={user.image}
//           alt={user.fullName}
//           className="w-14 h-14 rounded-full object-cover"
//         />

//         <div>
//           <h3 className="font-semibold text-text-black">{user.fullName}</h3>
//           <p className="text-sm text-gray-500">{user.location}</p>
//         </div>
//       </div>

//       <div className="text-sm text-gray-700 space-y-1">
//         <p>📦 Total Listings: {user.totalListings}</p>
//         <p>⭐ Rating: {user.rating ?? "N/A"}</p>
//         <p>📅 Member since: {new Date(user.createdAt).toDateString()}</p>
//       </div>

//       <button className="mt-2 text-primary hover:underline text-sm" onClick={()=>navigate(`/profile/${user.id}`)}>
//         View Profile
//       </button>
//     </div>
//   );
// };

// export default ListerDetails;

import React from "react";
import { useNavigate } from "react-router-dom";

const ListerDetails = ({ user }) => {
  if (!user) return null;

  const navigate = useNavigate();

  return (
    <div className="p-5 border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition bg-white space-y-5">
      {/* Header */}
      <div className="flex items-center gap-4">
        <img
          src={user.image || "/default-avatar.png"}
          alt={user.fullName}
          className="w-16 h-16 rounded-full object-cover border-2 border-primary ring-2 ring-primary/20"
          onError={(e) => (e.currentTarget.src = "/default-avatar.png")}
        />

        <div>
          <h3 className="font-semibold text-lg text-gray-900">
            {user.fullName}
          </h3>
          <p className="text-sm text-gray-500">{user.location}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="bg-gray-50 rounded-lg py-2">
          <p className="text-xs text-gray-500">Listings</p>
          <p className="font-semibold text-gray-900">{user.totalListings}</p>
        </div>

        <div className="bg-gray-50 rounded-lg py-2">
          <p className="text-xs text-gray-500">Rating</p>
          <p className="font-semibold text-gray-900">{user.rating ?? "N/A"}</p>
        </div>

        <div className="bg-gray-50 rounded-lg py-2">
          <p className="text-xs text-gray-500">Joined</p>
          <p className="font-semibold text-gray-900">
            {new Date(user.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={() => navigate(`/profile/${user.id}`)}
        className="w-full mt-2 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-light-primary transition"
      >
        View Profile
      </button>
    </div>
  );
};

export default ListerDetails;
