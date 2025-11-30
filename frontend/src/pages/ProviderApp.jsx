import ReContainer from "@/components/containers/ReContainer";
import SectionHeader from "@/components/header/SectionHeader";

const ProviderApp = () => {
  return (
    <ReContainer className="py-20">
      <div className="flex justify-center">
        <SectionHeader header="Provider App" />
      </div>

      <div className="mt-10 max-w-3xl mx-auto grid gap-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-primary">
          Manage your rentals on the go
        </h2>

        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
          Our dedicated provider app helps you track orders, manage listings,
          talk with renters, and receive payments — all from your mobile device.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <button className="px-6 py-3 bg-black text-white rounded-xl font-semibold">
            Google Play
          </button>
          <button className="px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold">
            App Store
          </button>
        </div>
      </div>
    </ReContainer>
  );
};

export default ProviderApp;
