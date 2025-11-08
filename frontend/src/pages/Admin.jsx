import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "../components/ui/toggle-group";

export default function Admin() {
  const [role, setRole] = useState("user");

  return (
    <div className="min-h-screen flex justify-center items-center bg-[--color-background] dark:bg-black transition-all duration-300">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8 w-full sm:w-[420px] transition-all duration-300">
        <h2 className="text-center text-2xl font-bold mb-6 text-[--color-primary]">
          Login as{" "}
          <span className="capitalize text-[--color-text-black] dark:text-white">
            {role}
          </span>
        </h2>

        {/* Role Toggle */}
        <ToggleGroup
          type="single"
          value={role}
          onValueChange={(val) => val && setRole(val)}
          className="flex justify-center mb-6"
        >
          <ToggleGroupItem
            value="user"
            className="px-4 py-2 mx-1 text-sm font-semibold rounded-full border transition-all
              data-[state=on]:bg-[--color-primary] data-[state=on]:text-white
              data-[state=off]:bg-gray-200 dark:data-[state=off]:bg-gray-700
              data-[state=off]:text-gray-700 dark:data-[state=off]:text-gray-300
              hover:scale-105"
          >
            User
          </ToggleGroupItem>
          <ToggleGroupItem
            value="admin"
            className="px-4 py-2 mx-1 text-sm font-semibold rounded-full border transition-all
              data-[state=on]:bg-[--color-primary] data-[state=on]:text-white
              data-[state=off]:bg-gray-200 dark:data-[state=off]:bg-gray-700
              data-[state=off]:text-gray-700 dark:data-[state=off]:text-gray-300
              hover:scale-105"
          >
            Admin
          </ToggleGroupItem>
          <ToggleGroupItem
            value="superadmin"
            className="px-4 py-2 mx-1 text-sm font-semibold rounded-full border transition-all
              data-[state=on]:bg-[--color-primary] data-[state=on]:text-white
              data-[state=off]:bg-gray-200 dark:data-[state=off]:bg-gray-700
              data-[state=off]:text-gray-700 dark:data-[state=off]:text-gray-300
              hover:scale-105"
          >
            SuperAdmin
          </ToggleGroupItem>
        </ToggleGroup>

        {/* Different Login Forms Based on Role */}
        {role === "user" && (
          <form className="space-y-4">
            <input
              type="email"
              placeholder="User Email"
              className="w-full border p-3 rounded-lg"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full border p-3 rounded-lg"
            />
            <button className="w-full bg-[--color-primary] text-white py-2 rounded-lg font-semibold">
              Login as User
            </button>
          </form>
        )}

        {role === "admin" && (
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Admin ID"
              className="w-full border p-3 rounded-lg"
            />
            <input
              type="password"
              placeholder="Admin Password"
              className="w-full border p-3 rounded-lg"
            />
            <button className="w-full bg-[--color-primary] text-white py-2 rounded-lg font-semibold">
              Login as Admin
            </button>
          </form>
        )}

        {role === "superadmin" && (
          <form className="space-y-4">
            <input
              type="text"
              placeholder="SuperAdmin Key"
              className="w-full border p-3 rounded-lg"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full border p-3 rounded-lg"
            />
            <button className="w-full bg-[--color-primary] text-white py-2 rounded-lg font-semibold">
              Login as SuperAdmin
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
