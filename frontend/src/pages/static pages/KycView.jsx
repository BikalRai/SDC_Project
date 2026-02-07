import { useEffect, useState } from "react";
import { CheckCircle, Clock, MapPin, Phone, User } from "lucide-react";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";
import { useDispatch, useSelector } from "react-redux";
import { getKycById, updateKycStatus } from "@/slices/kyc.slice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function KYCHub() {
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const { kycId } = useParams();
  const dispatch = useDispatch();
  const { kyc, loading } = useSelector((state) => state.kyc);
  const [rejectionReason, setRejectionReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleStatusUpdate = async (status) => {
    if (isSubmitting) return;

    // If status is PROCESSED, do the direct update with confirmation
    if (status === "PROCESSED") {
      if (!window.confirm("Are you sure you want to approve this KYC?")) return;
      executeStatusChange("PROCESSED", null);
    }
    // If status is REJECTED, just open the modal
    else if (status === "REJECTED") {
      setIsRejectModalOpen(true);
    }
  };

  // Helper function to handle the actual API call
  const executeStatusChange = async (status, reason) => {
    setIsSubmitting(true);
    try {
      const payload = {
        id: kycId,
        updateData: {
          status: status.toUpperCase(),
          rejectionReason: reason,
        },
      };

      await dispatch(updateKycStatus(payload)).unwrap();
      toast.success("Updated successfuly.");
      navigate("/kyc-list");
    } catch (error) {
      toast.info("Rejected the verification.");
      navigate("/kyc-list");
      console.error("KYC Update Error:", error);
    } finally {
      setIsSubmitting(false);
      setIsRejectModalOpen(false); // Close modal if it was open
    }
  };

  useEffect(() => {
    if (kycId) {
      dispatch(getKycById(kycId));
    }
  }, [dispatch, kycId]);

  if (loading) return <div className="p-10">Loading KYC details...</div>;
  if (!kyc)
    return <div className="p-10">No KYC data found for ID: {kycId}</div>;

  const fullName = `${kyc.firstName} ${kyc.lastName}`;

  return (
    <div className="flex min-h-screen bg-[#F6FAFC]">
      <Sidebar />

      <main className="flex-1">
        <TopNavbar title="KYC Verification Detail" />

        <div className="px-10 py-6 grid grid-cols-[300px_1fr] gap-8">
          {/* LEFT COLUMN: Sidebar Info */}
          <div className="space-y-4">
            <div className="font-semibold text-gray-700">Document Type</div>
            <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
              <div className="flex justify-between items-center px-4 py-5 bg-[#E8F4F7] border-l-4 border-[#008CA8]">
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center font-bold text-[#008CA8] shadow-sm">
                    ID
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Nagarita</div>
                    <div className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">
                      {kyc.kycstatus}
                    </div>
                  </div>
                </div>
                {kyc.kycstatus === "PENDING" ? (
                  <Clock className="text-orange-400" size={20} />
                ) : (
                  <CheckCircle className="text-green-500" size={20} />
                )}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Details View */}
          <div className="space-y-6">
            {/* USER HEADER CARD */}
            <div className="bg-white p-6 rounded-xl shadow-sm flex justify-between items-center border border-gray-100">
              <div className="flex gap-4">
                <div className="w-14 h-14 bg-[#008CA8] rounded-full flex items-center justify-center font-bold text-white text-xl">
                  {kyc.firstName[0]}
                  {kyc.lastName[0]}
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-800">
                    {fullName}
                  </div>
                  <div className="text-sm text-gray-500 flex items-center gap-1">
                    <User size={14} /> {kyc.user?.email}
                  </div>
                </div>
              </div>

              <div className="flex gap-8 text-sm font-medium text-gray-600">
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-[#008CA8]" /> {kyc.phone}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#008CA8]" /> {kyc.district}
                  , {kyc.province}
                </div>
              </div>
            </div>

            {/* DOCUMENTS SECTION */}
            <div className="grid grid-cols-2 gap-6">
              <DocView
                label="FRONT OF NAGARITA"
                src={kyc.citizenshipFrontImageUrl}
              />
              <DocView
                label="BACK OF NAGARITA"
                src={kyc.citizenshipBackImageUrl}
              />
            </div>

            {/* FULL DATA GRID */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-2">
                Personal & Citizenship Information
              </h3>

              <div className="grid grid-cols-3 gap-y-8 gap-x-12">
                <InfoBox label="First Name" value={kyc.firstName} />
                <InfoBox label="Last Name" value={kyc.lastName} />
                <InfoBox label="Father's Name" value={kyc.fatherName} />

                <InfoBox
                  label="Citizenship Number"
                  value={kyc.citizenshipNumber}
                />
                <InfoBox label="Issued District" value={kyc.issuedDistrict} />
                <InfoBox label="Issued Date" value={kyc.issuedDate} />

                <InfoBox label="Date of Birth" value={kyc.dob} />
                <InfoBox label="Gender" value={kyc.gender} />
                <InfoBox label="Submitted On" value={kyc.submittedDate} />
              </div>

              <h3 className="text-lg font-bold text-gray-800 mt-12 mb-6 border-b pb-2">
                Permanent Address
              </h3>
              <div className="grid grid-cols-3 gap-y-8 gap-x-12">
                <InfoBox label="Province" value={kyc.province} />
                <InfoBox label="District" value={kyc.district} />
                <InfoBox label="Municipality" value={kyc.municipality} />

                <InfoBox label="Ward Number" value={kyc.wardNumber} />
                <InfoBox label="Street / Tole" value={kyc.street} />
              </div>
              <div>
                {kyc.kycstatus === "PENDING" && (
                  <div className="bg-white p-8 rounded-xl shadow-sm border-t-4 border-[#008CA8] mt-6 flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">
                        Final Verification Decision
                      </h3>
                      <p className="text-sm text-gray-500">
                        Decide if this user's identity is valid.
                      </p>
                    </div>

                    <div className="flex gap-4">
                      <button
                        disabled={isSubmitting}
                        onClick={() => handleStatusUpdate("REJECTED")}
                        className="px-8 py-3 border-2 border-red-500 text-red-500 font-bold rounded-xl hover:bg-red-50 transition-colors disabled:opacity-50"
                      >
                        REJECT
                      </button>

                      <button
                        disabled={isSubmitting}
                        onClick={() => handleStatusUpdate("PROCESSED")}
                        className="px-8 py-3 bg-[#008CA8] text-white font-bold rounded-xl hover:bg-[#00768d] shadow-md transition-all disabled:opacity-50"
                      >
                        APPROVE & VERIFY
                      </button>
                    </div>
                  </div>
                )}
              </div>
              {/* REJECTION MODAL */}
              {isRejectModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                  <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                    <div className="p-6 border-b border-gray-100">
                      <h3 className="text-xl font-bold text-gray-800 text-center">
                        Reject Verification
                      </h3>
                      <p className="text-sm text-gray-500 text-center mt-1">
                        Please explain why this document is being rejected.
                      </p>
                    </div>

                    <div className="p-6">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                        Rejection Reason
                      </label>
                      <textarea
                        autoFocus
                        className="w-full mt-2 border-2 border-gray-100 rounded-xl p-4 text-sm focus:border-red-500 focus:ring-0 outline-none transition-all resize-none bg-gray-50"
                        rows={4}
                        placeholder="e.g., The image is too blurry to read the citizenship number..."
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                      />
                    </div>

                    <div className="p-6 bg-gray-50 flex gap-3">
                      <button
                        onClick={() => setIsRejectModalOpen(false)}
                        className="flex-1 px-4 py-3 text-gray-600 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        disabled={isSubmitting || !rejectionReason.trim()}
                        onClick={() =>
                          executeStatusChange("REJECTED", rejectionReason)
                        }
                        className="flex-1 px-4 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 disabled:opacity-50 shadow-lg shadow-red-100 transition-all"
                      >
                        {isSubmitting ? "Rejecting..." : "Confirm Rejection"}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ---------- Reusable Display Components ---------- */

function InfoBox({ label, value }) {
  return (
    <div className="space-y-1">
      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
        {label}
      </p>
      <p className="text-sm font-semibold text-gray-700">{value || "—"}</p>
    </div>
  );
}

function DocView({ label, src }) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-bold text-gray-500 tracking-wide uppercase">
        {label}
      </p>
      <div className="h-56 bg-gray-100 rounded-xl overflow-hidden border-2 border-dashed border-gray-200 flex items-center justify-center">
        {src ? (
          <img
            src={src}
            alt={label}
            className="w-full h-full object-contain bg-black"
          />
        ) : (
          <div className="text-gray-400 text-xs text-center px-4">
            Image not uploaded yet
          </div>
        )}
      </div>
    </div>
  );
}
