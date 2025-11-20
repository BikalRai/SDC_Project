import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Avatar,
  Button,
  Divider,
} from "@mui/material";
import SecondaryButton from "../buttons/SecondaryButton";
import PrimaryButton from "../buttons/PrimaryButton";

const PERSONAL_KEY = "kyc_personal_v1";
const DOCS_KEY = "kyc_docs_v1";

export default function KycReview() {
  const [personal, setPersonal] = useState(null);
  const [docs, setDocs] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    try {
      const p = localStorage.getItem(PERSONAL_KEY);
      const d = localStorage.getItem(DOCS_KEY);
      if (p) setPersonal(JSON.parse(p));
      if (d) setDocs(JSON.parse(d));
    } catch (e) {
      console.warn("Failed to read review data", e);
    }
  }, []);

  const handleSubmit = async () => {
    // This is a demo / placeholder. Replace with your API call.
    if (!personal || !docs || !docs.selfie || !docs.idFront) {
      alert(
        "Missing required data: make sure personal info and required documents are present."
      );
      return;
    }

    try {
      setSubmitting(true);
      // Simulate upload delay
      await new Promise((r) => setTimeout(r, 1200));
      // Mark as submitted
      localStorage.setItem(
        "kyc_submitted_v1",
        JSON.stringify({ submittedAt: new Date().toISOString() })
      );
      // Optionally you could clear inputs:
      // localStorage.removeItem(PERSONAL_KEY);
      // localStorage.removeItem(DOCS_KEY);

      // Friendly confirmation UI (non-blocking)
      alert(
        "KYC submitted (demo). The real implementation should POST files to your server."
      );
    } catch (err) {
      console.error(err);
      alert("Submission failed.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!personal && !docs) {
    return (
      <Box>
        <Typography variant="body1">
          No KYC data found. Please complete previous steps.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", maxWidth: 920 }}>
      <Typography variant="h6" gutterBottom>
        Review & Submit
      </Typography>

      <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
        <Typography variant="subtitle2">Personal details</Typography>
        <Divider sx={{ my: 1 }} />
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Full name
            </Typography>
            <Typography>{personal?.fullName || "—"}</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Date of birth
            </Typography>
            <Typography>{personal?.dob || "—"}</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Phone
            </Typography>
            <Typography>{personal?.phone || "—"}</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Email
            </Typography>
            <Typography>{personal?.email || "—"}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Address
            </Typography>
            <Typography>{personal?.address || "—"}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              ID number
            </Typography>
            <Typography>{personal?.idNumber || "—"}</Typography>
          </Grid>
        </Grid>
      </Paper>

      <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
        <Typography variant="subtitle2">Uploaded documents</Typography>
        <Divider sx={{ my: 1 }} />
        <Grid container spacing={2} alignItems="center">
          {docs?.selfie ? (
            <Grid item xs={12} sm={4}>
              <Typography variant="caption">Selfie</Typography>
              <Box sx={{ mt: 1 }}>
                <Avatar
                  src={docs.selfie.dataUrl}
                  alt="selfie"
                  sx={{ width: 120, height: 120 }}
                />
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {docs.selfie.name}
                </Typography>
              </Box>
            </Grid>
          ) : null}

          {docs?.idFront ? (
            <Grid item xs={12} sm={4}>
              <Typography variant="caption">ID front</Typography>
              <Box sx={{ mt: 1 }}>
                <Avatar
                  src={docs.idFront.dataUrl}
                  alt="id front"
                  variant="rounded"
                  sx={{ width: 120, height: 80 }}
                />
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {docs.idFront.name}
                </Typography>
              </Box>
            </Grid>
          ) : null}

          {docs?.idBack ? (
            <Grid item xs={12} sm={4}>
              <Typography variant="caption">ID back</Typography>
              <Box sx={{ mt: 1 }}>
                <Avatar
                  src={docs.idBack.dataUrl}
                  alt="id back"
                  variant="rounded"
                  sx={{ width: 120, height: 80 }}
                />
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {docs.idBack.name}
                </Typography>
              </Box>
            </Grid>
          ) : null}

          {docs?.other ? (
            <Grid item xs={12} sm={4}>
              <Typography variant="caption">Other</Typography>
              <Box sx={{ mt: 1 }}>
                <Avatar
                  src={docs.other.dataUrl}
                  alt="other"
                  variant="rounded"
                  sx={{ width: 120, height: 80 }}
                />
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {docs.other.name}
                </Typography>
              </Box>
            </Grid>
          ) : null}
        </Grid>
      </Paper>

      <Box sx={{ display: "flex", gap: 2 }}>
        <SecondaryButton
          btnText="EDIT"
          onClick={() => {
            // encourage editing: scroll up to forms
            window.scrollTo({ top: 0, behavior: "smooth" });
            alert("Use the Previous button to edit specific fields.");
          }}
        />
        <PrimaryButton
          variant="contained"
          onClick={handleSubmit}
          disabled={submitting}
          btnText={submitting ? "Submitting…" : "Submit KYC"}
        />
      </Box>
    </Box>
  );
}
