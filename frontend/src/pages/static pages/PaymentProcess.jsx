import React from "react";

const PaymentProcess = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Top Navbar */}
      <header className="h-20 flex items-center justify-between px-10 bg-slate-100">
        <div className="text-2xl font-bold text-teal-600">KB</div>
        <nav className="flex gap-8 text-sm text-slate-700">
          <a>Home</a>
          <a>Categories</a>
          <a>How it works</a>
          <a>About Us</a>
        </nav>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-teal-600 text-teal-600 rounded-md text-sm">Log In</button>
          <button className="px-4 py-2 bg-teal-600 text-white rounded-md text-sm">Join Now</button>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-10 py-10 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        {/* Left */}
        <section className="bg-white rounded-xl shadow p-6 space-y-6">
          <h2 className="text-lg font-semibold">2. Payment</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border-2 border-violet-500 bg-violet-50 rounded-xl p-4 font-medium text-center">Visa</div>
            <div className="border rounded-xl p-4 text-center">eSewa</div>
            <div className="border rounded-xl p-4 text-center">Cash on delivery</div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm">Card number</label>
              <input className="w-full mt-1 border rounded-lg px-3 py-2" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm">Expiry Date</label>
                <input className="w-full mt-1 border rounded-lg px-3 py-2" />
              </div>
              <div>
                <label className="text-sm">Security number</label>
                <input className="w-full mt-1 border rounded-lg px-3 py-2" />
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" /> Remember my payment details
            </label>
          </div>

          <div className="pt-4 border-t">
            <h3 className="font-semibold mb-2">3. Cancellation Policy</h3>
            <p className="text-sm text-slate-600">
              By selecting the button below, I agree to the booking and refund rules. I also agree to the updated
              <span className="text-teal-600"> Terms of Service</span> and <span className="text-teal-600">Privacy Policy</span>.
            </p>
          </div>
        </section>

        {/* Right */}
        <aside className="bg-white rounded-xl shadow p-6 space-y-4">
          <h2 className="text-lg font-semibold">Sr 125 Aprilia</h2>
          <p className="text-teal-600 font-medium">Rs. 1,200/day</p>

          <div className="text-sm text-slate-600 space-y-1">
            <p>Brand: Aprilia</p>
            <p>Negotiable: Yes</p>
            <p>Condition: Good working</p>
            <p>Post Date: August 30, 2024</p>
            <p>Rented by: 12</p>
            <p>Ad Status: Available</p>
          </div>

          <div className="pt-4 border-t">
            <h3 className="font-semibold">User Details</h3>
            <p className="text-sm text-slate-600">Kathmandu</p>
            <p className="text-sm text-slate-600">Member (Last active a month ago)</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm">Pickup date</label>
              <input className="w-full mt-1 border rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="text-sm">Drop date</label>
              <input className="w-full mt-1 border rounded-lg px-3 py-2" />
            </div>
          </div>

          <div>
            <label className="text-sm">Pickup time</label>
            <input className="w-full mt-1 border rounded-lg px-3 py-2" />
          </div>

          <div className="pt-4 border-t text-sm flex justify-between">
            <span>Rent scooter per day</span>
            <span className="font-medium">Rs. 1,200/day</span>
          </div>

          <button className="w-full mt-4 py-3 bg-teal-600 text-white rounded-lg">
            Confirm and Rent Now
          </button>
        </aside>
      </main>
    </div>
  );
};

export default PaymentProcess;
