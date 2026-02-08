import {
  Box,
  Step,
  StepLabel,
  Stepper,
  Card,
  CardContent,
  Typography,
  Divider,
} from "@mui/material";
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
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        backgroundColor: "#f5f7fb",
        py: 6,
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 900,
          borderRadius: 3,
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <CardContent sx={{ p: { xs: 3, md: 5 } }}>
          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" fontWeight={600} textAlign="center" gutterBottom>
              KYC Verification
            </Typography>
            <Typography variant="body2" color="text.secondary" textAlign="center">
              Please complete all steps to verify your identity
            </Typography>
          </Box>

          {/* Stepper */}
          <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Divider sx={{ mb: 4 }} />

          {/* Step Content */}
          {getStepContent(activeStep)}

          {/* Navigation Buttons */}
          {activeStep !== steps.length - 1 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 4,
              }}
            >
              <PrimaryButton
                btnText="Back"
                disabled={activeStep === 0 || isSubmitting}
                onClick={handleBack}
              />

              <PrimaryButton
                btnText="Next"
                onClick={handleNext}
                disabled={isSubmitting}
              />
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default KycForm;
