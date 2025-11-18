import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import KycPersonalForm from "../components/kyc/KycPersonalForm";
import KycDocumentUpload from "../components/kyc/KycDocumentUpload";
import KycReview from "../components/kyc/KycReview";

import AppTheme from "../components/shared-theme/AppTheme";
import ColorModeIconDropdown from "../components/shared-theme/ColorModeIconDropdown";
import AppLayout from "@/components/layout/AppLayout";
import Info from "../components/checkout/Info";
import InfoMobile from "../components/checkout/InfoMobile";

const steps = ["Personal Details", "Document Upload", "Review & Submit"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <KycPersonalForm />;
    case 1:
      return <KycDocumentUpload />;
    case 2:
      return <KycReview />;
    default:
      throw new Error("Unknown step");
  }
}

export default function KycVerification(props) {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => setActiveStep(activeStep + 1);
  const handleBack = () => setActiveStep(activeStep - 1);

  return (
    <AppLayout>
      <div className="flex justify-center items-center bg-background">
        <Grid container marginTop={4}>
          {/* LEFT SIDE SUMMARY (Desktop only) */}
          <Grid
            item
            sm={12}
            md={5}
            lg={4}
            sx={{
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
              backgroundColor: "background.paper",
              borderRight: { sm: "none", md: "1px solid" },
              borderColor: { sm: "none", md: "divider" },
              alignItems: "start",
              pt: 16,
              px: 10,
              gap: 4,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                width: "100%",
                maxWidth: 500,
              }}
            >
              <Info Title="KYC Verification" />
            </Box>
          </Grid>

          {/* MAIN CONTENT */}
          <Grid
            item
            sm={12}
            md={7}
            lg={8}
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "auto",
              backgroundColor: {
                xs: "transparent",
                sm: "background.default",
              },
              alignItems: "start",
              pt: { xs: 0, sm: 16 },
              px: { xs: 2, sm: 10 },
              gap: { xs: 4, md: 8 },
            }}
          >
            {/* DESKTOP STEPPER */}
            <Box
              sx={{
                display: "flex",
                justifyContent: { sm: "space-between", md: "flex-end" },
                alignItems: "center",
                width: "100%",
                maxWidth: { sm: "100%", md: 600 },
              }}
            >
              <Stepper
                id="desktop-stepper"
                activeStep={activeStep}
                sx={{
                  width: "100%",
                  height: 40,
                  display: { xs: "none", md: "flex" },
                }}
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>

            {/* MOBILE SUMMARY CARD */}
            <Card sx={{ display: { xs: "flex", md: "none" }, width: "100%" }}>
              <CardContent
                sx={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "text.secondary" }}
                  >
                    Perfect Rental
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    KYC Verification Steps
                  </Typography>
                </div>

                <InfoMobile />
              </CardContent>
            </Card>

            {/* MOBILE STEPPER */}
            <Stepper
              id="mobile-stepper"
              activeStep={activeStep}
              alternativeLabel
              sx={{ display: { xs: "flex", md: "none", width: '100%'} }}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {/* MAIN FORM SECTION */}
            <Box sx={{ flexGrow: 1, width: "100%", maxWidth: 600 }}>
              {activeStep === steps.length ? (
                <Stack spacing={2} useFlexGap>
                  <Typography variant="h1">✔️</Typography>
                  <Typography variant="h5">
                    KYC Submitted Successfully
                  </Typography>
                  <Typography variant="body1" sx={{ color: "text.secondary" }}>
                    Your identity verification request has been submitted. We
                    will notify you once it is approved.
                  </Typography>
                </Stack>
              ) : (
                <>
                  {getStepContent(activeStep)}

                  {/* NAVIGATION BUTTONS */}
                  <Box
                    sx={{
                      mt: 4,
                      mb: "60px",
                      display: "flex",
                      justifyContent:
                        activeStep !== 0 ? "space-between" : "flex-end",
                      width: "100%",
                    }}
                  >
                    {activeStep !== 0 && (
                      <Button
                        startIcon={<ChevronLeftRoundedIcon />}
                        onClick={handleBack}
                        variant="outlined"
                      >
                        Previous
                      </Button>
                    )}

                    <Button
                      variant="contained"
                      endIcon={<ChevronRightRoundedIcon />}
                      onClick={handleNext}
                      
                    >
                      {activeStep === steps.length - 1 ? "Submit KYC" : "Next"}
                    </Button>
                  </Box>
                </>
              )}
            </Box>
          </Grid>
        </Grid>
      </div>
    </AppLayout>
  );
}
