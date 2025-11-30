import ReContainer from "@/components/containers/ReContainer";
import SectionHeader from "@/components/header/SectionHeader";

const JoinAsProvider = () => {
  return (
    <ReContainer className="py-20">
      <div className="flex justify-center">
        <SectionHeader header="Join as Provider" />
      </div>

      <div className="mt-10 grid gap-6 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-primary">
          Start earning by sharing what you own
        </h2>

        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
          Become a verified provider on our platform and rent out your items
          effortlessly. Whether you own tools, clothes, vehicles, electronics,
          or any valuable products — Kiraya Bazar allows you to list and earn
          securely.
        </p>

        <div className="mt-8">
          <button className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/80 transition font-semibold">
            Become a Provider
          </button>
        </div>
      </div>
    </ReContainer>
  );
};

export default JoinAsProvider;
