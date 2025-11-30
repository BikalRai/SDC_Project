import ReContainer from "@/components/containers/ReContainer";
import SectionHeader from "@/components/header/SectionHeader";

const VerificationProcess = () => {
  return (
    <ReContainer className="py-20">
      <div className="flex justify-center">
        <SectionHeader header="Verification Process" />
      </div>

      <div className="mt-10 max-w-3xl mx-auto grid gap-6">
        <h2 className="text-primary text-2xl md:text-3xl font-bold text-center">
          Get Verified in 3 Simple Steps
        </h2>

        <ol className="space-y-4 text-gray-700 text-sm md:text-base">
          <li className="bg-white p-5 shadow rounded-xl">
            <b>1. Upload your documents</b> – Provide valid government ID and
            contact information.
          </li>
          <li className="bg-white p-5 shadow rounded-xl">
            <b>2. Profile Review</b> – Our verification team checks your details
            for authenticity.
          </li>
          <li className="bg-white p-5 shadow rounded-xl">
            <b>3. Approval</b> – Once approved, you can start listing items!
          </li>
        </ol>
      </div>
    </ReContainer>
  );
};

export default VerificationProcess;
