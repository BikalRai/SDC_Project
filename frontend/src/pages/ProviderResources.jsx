import ReContainer from "@/components/containers/ReContainer";
import SectionHeader from "@/components/header/SectionHeader";
import AppLayout from "@/components/layout/AppLayout";
import AppNavBar from "@/components/navbar/AppNavBar";
import Footer from "@/components/section/Footer";

const ProviderResources = () => {
  return (
    <AppLayout>
      <AppNavBar />

      <ReContainer className="py-20">
        <div className="flex justify-center">
          <SectionHeader header="Provider Resources" />
        </div>

        <div className="mt-12 grid gap-8 max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-primary text-center">
            Everything you need to grow as a provider
          </h2>

          <ul className="space-y-4 text-gray-700 text-sm md:text-base">
            <li className="bg-white shadow-md p-5 rounded-xl">
              📘 <b>Listing Guidelines</b> – How to upload items effectively.
            </li>
            <li className="bg-white shadow-md p-5 rounded-xl">
              ⭐ <b>Pricing Tips</b> – Set competitive prices and maximize
              income.
            </li>
            <li className="bg-white shadow-md p-5 rounded-xl">
              🛡️ <b>Safety Rules</b> – Rent securely with confidence.
            </li>
            <li className="bg-white shadow-md p-5 rounded-xl">
              🤝 <b>Support</b> – Get help anytime through our support channels.
            </li>
          </ul>
        </div>
      </ReContainer>
      <Footer />
    </AppLayout>
  );
};

export default ProviderResources;
