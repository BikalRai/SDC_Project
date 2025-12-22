import React, { useState } from "react";
import { Box, Typography, Grid, Paper, Avatar, Divider } from "@mui/material";
import { uploadToCloudinary } from "@/utils/cloudinary";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import { useDispatch } from "react-redux";
import { createKyc } from "@/slices/kyc.slice";

export default function KycReview({ formData, onBack, onSubmitComplete }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  if (!formData || Object.keys(formData).length === 0) {
    return <Typography>No KYC data found</Typography>;
  }

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // both images upload in parallel
      const [frontUrl, backUrl] = await Promise.all([
        uploadToCloudinary(formData.citizenshipFrontFile),
        uploadToCloudinary(formData.citizenshipBackFile),
      ]);

      const finalData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        fatherName: formData.fatherName,
        dob: formData.dob,
        gender: formData.gender,
        email: formData.email,
        phone: formData.phone,

        province: formData.province,
        district: formData.district,
        municipality: formData.municipality,
        wardNumber: formData.wardNumber,
        street: formData.street,

        citizenshipNumber: formData.citizenshipNumber,
        issuedDistrict: formData.issuedDistrict,
        issuedDate: formData.issuedDate,

        // ------ CLOUDINARY FINAL VALUES ------
        citizenshipFrontImageUrl: frontUrl,
        citizenshipBackImageUrl: backUrl,
      };

      dispatch(createKyc(finalData));

      onSubmitComplete(finalData);
    } catch (error) {
      console.error("Cloudinary upload failed:", error);
      alert("Image upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const getPreview = (file) => {
    if (!file) return "";
    if (typeof file === "string") return file;
    return file.dataUrl || URL.createObjectURL(file);
  };

  return (
    <Box sx={{ maxWidth: 920, width: "100%" }}>
      <Typography variant='h6' gutterBottom>
        Review & Submit
      </Typography>

      {/* PERSONAL INFO */}
      <Paper variant='outlined' sx={{ p: 2, mb: 2 }}>
        <Typography variant='subtitle2'>Personal Information</Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={1}>
          {[
            ["First Name", formData.firstName],
            ["Last Name", formData.lastName],
            ["Father's Name", formData.fatherName],
            ["Date of Birth", formData.dob],
            ["Gender", formData.gender],
            ["Email", formData.email],
            ["Phone", formData.phone],
          ].map(([label, value]) => (
            <Grid item xs={12} sm={6} key={label}>
              <Typography variant='body2' color='text.secondary'>
                {label}
              </Typography>
              <Typography>{value || "—"}</Typography>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* ADDRESS INFO */}
      <Paper variant='outlined' sx={{ p: 2, mb: 2 }}>
        <Typography variant='subtitle2'>Address Information</Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={1}>
          {[
            ["Province", formData.province],
            ["District", formData.district],
            ["Municipality", formData.municipality],
            ["Ward Number", formData.wardNumber],
            ["Street", formData.street],
          ].map(([label, value]) => (
            <Grid item xs={12} sm={6} key={label}>
              <Typography variant='body2' color='text.secondary'>
                {label}
              </Typography>
              <Typography>{value || "—"}</Typography>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* CITIZENSHIP INFO */}
      <Paper variant='outlined' sx={{ p: 2, mb: 2 }}>
        <Typography variant='subtitle2'>Citizenship Details</Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={1}>
          {[
            ["Citizenship Number", formData.citizenshipNumber],
            ["Issued District", formData.issuedDistrict],
            ["Issued Date", formData.issuedDate],
          ].map(([label, value]) => (
            <Grid item xs={12} sm={6} key={label}>
              <Typography variant='body2' color='text.secondary'>
                {label}
              </Typography>
              <Typography>{value || "—"}</Typography>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* DOCUMENT PREVIEW */}
      <Paper variant='outlined' sx={{ p: 2, mb: 2 }}>
        <Typography variant='subtitle2'>Uploaded Documents</Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          {formData.citizenshipFrontFile && (
            <Grid item xs={12} sm={6}>
              <Typography variant='caption'>Citizenship Front</Typography>
              <Avatar
                src={getPreview(formData.citizenshipFrontFile)}
                variant='rounded'
                sx={{ width: 140, height: 90, mt: 1 }}
              />
            </Grid>
          )}

          {formData.citizenshipBackFile && (
            <Grid item xs={12} sm={6}>
              <Typography variant='caption'>Citizenship Back</Typography>
              <Avatar
                src={getPreview(formData.citizenshipBackFile)}
                variant='rounded'
                sx={{ width: 140, height: 90, mt: 1 }}
              />
            </Grid>
          )}
        </Grid>
      </Paper>

      {/* BUTTONS */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
        <SecondaryButton btnText={`Back`} onClick={onBack} disabled={loading} />

        <PrimaryButton
          btnText={loading ? "Uploading…" : "Submit"}
          onClick={handleSubmit}
          disabled={loading}
        />
      </Box>
    </Box>
  );
}
