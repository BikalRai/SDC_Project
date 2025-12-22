import { Box, Step, StepLabel, Stepper } from "@mui/material";
import { useRef, useState } from "react";
import KycPersonalForm from "./KycPersonalForm";
import KycReview from "./KycReview";
import KycDocumentUpload from "./KycDocumentUpload";
import KycAddressForm from "./KycAddressForm";
import PrimaryButton from "../buttons/PrimaryButton";

const steps = [
  "Personal Info",
  "Address Info",
  "Citizenship Info",
  "Confirmation",
];

const initialFormData = {
  firstName: "",
  lastName: "",
  fatherName: "",
  dob: "",
  gender: "",
  phone: "",

  province: "",
  district: "",
  municipality: "",
  wardNumber: "",
  street: "",

  citizenshipNumber: "",
  issuedDistrict: "",
  issuedDate: "",
  citizenshipFrontImageUrl: "",
  citizenshipBackImageUrl: "",
};

const KycForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const stepSubmitRef = useRef(null);

  const onStepSubmit = (stepData) => {
    setFormData((prev) => ({ ...prev, ...stepData }));
    setActiveStep((prev) => prev + 1);
  };

  const handleNext = () => {
    if (stepSubmitRef.current) {
      stepSubmitRef.current();
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      alert("Submitted!");
      setActiveStep((prev) => prev + 1);
    } catch {
      alert("Submit failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStepContent = (step) => {
    const commonProps = {
      formData,
      onStepSubmit,
      registerSubmitHandler: (handler) => {
        stepSubmitRef.current = handler;
      },
    };

    switch (step) {
      case 0:
        return <KycPersonalForm {...commonProps} />;
      case 1:
        return <KycAddressForm {...commonProps} />;
      case 2:
        return <KycDocumentUpload {...commonProps} />;
      case 3:
        return (
          <KycReview
            formData={formData}
            onBack={handleBack}
            onSubmitComplete={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <form>
      <Box>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {getStepContent(activeStep)}

        {/* Hide BACK + NEXT when on REVIEW */}
        {activeStep !== steps.length - 1 && (
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <PrimaryButton
              btnText='Back'
              disabled={activeStep === 0 || isSubmitting}
              onClick={handleBack}
            />

            <PrimaryButton
              btnText='Next'
              onClick={handleNext}
              disabled={isSubmitting}
            />
          </Box>
        )}

        {/* Show only SUBMIT on Review */}
        {/* {activeStep === steps.length - 1 && (
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <PrimaryButton
              btnText={isSubmitting ? "Submitting..." : "Submit"}
              onClick={handleSubmit}
              disabled={isSubmitting}
            />
          </Box>
        )} */}
      </Box>
    </form>
  );
};

export default KycForm;
