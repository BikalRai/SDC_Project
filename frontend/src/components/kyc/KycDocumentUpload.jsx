import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Button, TextField } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useForm } from "react-hook-form";

export default function KycDocumentUpload({
  onStepSubmit,
  formData,
  registerSubmitHandler,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    defaultValues: formData || {
      citizenshipId: "",
      issuedDistrict: "",
      issuedDate: "",
    },
    mode: "onBlur",
  });

  const [citizenshipFrontFile, setCitizenshipFrontFile] = useState(null);
  const [citizenshipBackFile, setCitizenshipBackFile] = useState(null);
  const [citizenshipFrontPreview, setCitizenshipFrontPreview] = useState(null);
  const [citizenshipBackPreview, setCitizenshipBackPreview] = useState(null);

  useEffect(() => {
    if (registerSubmitHandler) {
      registerSubmitHandler(() => handleSubmit(onSubmit)());
    }
  }, [
    handleSubmit,
    registerSubmitHandler,
    citizenshipFrontFile,
    citizenshipBackFile,
  ]);

  const onSubmit = (data) => {
    let hasError = false;
    if (!citizenshipFrontFile) {
      setError("citizenshipFrontFile", {
        type: "manual",
        message: "Front image is required.",
      });
      hasError = true;
    }
    if (!citizenshipBackFile) {
      setError("citizenshipBackFile", {
        type: "manual",
        message: "Back image is required.",
      });
      hasError = true;
    }

    if (hasError) return;

    clearErrors(["citizenshipFrontFile", "citizenshipBackFile"]);

    // Pass the full data including the file objects to parent
    onStepSubmit({
      ...data,
      citizenshipFrontFile,
      citizenshipBackFile,
    });
  };

  const handleFileChange = (e, setFile, setPreview, fieldName) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      setPreview(URL.createObjectURL(file));
      clearErrors(fieldName);
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 700 }}>
      <Typography variant='h6' gutterBottom>
        Citizenship Details
      </Typography>

      <div>
        <Grid container spacing={2}>
          <Grid size={{ sm: 12 }}>
            <TextField
              label='Citizenship ID'
              fullWidth
              {...register("citizenshipNumber", {
                required: "Citizenship ID is required.",
              })}
              error={!!errors.citizenshipId}
              helperText={errors.citizenshipId?.message}
              placeholder='Enter your citizenship ID'
            />
          </Grid>

          <Grid size={{ sm: 12, md: 6 }}>
            <TextField
              label='Issued District'
              fullWidth
              {...register("issuedDistrict", {
                required: "Issued district is required.",
              })}
              error={!!errors.issuedDistrict}
              helperText={errors.issuedDistrict?.message}
              placeholder='Enter the district where issued'
            />
          </Grid>

          <Grid size={{ sm: 12, md: 6 }}>
            <TextField
              label='Issued Date'
              type='date'
              fullWidth
              {...register("issuedDate", {
                required: "Issued date is required.",
              })}
              error={!!errors.issuedDate}
              helperText={errors.issuedDate?.message}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid>
            <Button
              variant='outlined'
              component='label'
              fullWidth
              startIcon={<UploadFileIcon />}
            >
              Upload Citizenship Front Image *
              <input
                type='file'
                hidden
                accept='image/*'
                onChange={(e) =>
                  handleFileChange(
                    e,
                    setCitizenshipFrontFile,
                    setCitizenshipFrontPreview,
                    "citizenshipFrontFile"
                  )
                }
              />
            </Button>

            {citizenshipFrontFile && (
              <Typography variant='body2' mt={1}>
                Selected: {citizenshipFrontFile.name}
              </Typography>
            )}

            {citizenshipFrontPreview && (
              <Box mt={1}>
                <img
                  src={citizenshipFrontPreview}
                  alt='Citizenship Front Preview'
                  style={{ maxWidth: "100%", maxHeight: 150, borderRadius: 8 }}
                />
              </Box>
            )}

            {errors.citizenshipFrontFile && (
              <Typography color='error' variant='body2'>
                {errors.citizenshipFrontFile.message}
              </Typography>
            )}
          </Grid>

          <Grid size={{ sm: 12, md: 6 }}>
            <Button
              variant='outlined'
              component='label'
              fullWidth
              startIcon={<UploadFileIcon />}
            >
              Upload Citizenship Back Image *
              <input
                type='file'
                hidden
                accept='image/*'
                onChange={(e) =>
                  handleFileChange(
                    e,
                    setCitizenshipBackFile,
                    setCitizenshipBackPreview,
                    "citizenshipBackFile"
                  )
                }
              />
            </Button>
            {citizenshipBackFile && (
              <Typography variant='body2' mt={1}>
                Selected: {citizenshipBackFile.name}
              </Typography>
            )}

            <Box mt={1}>
              <img
                src={citizenshipBackPreview}
                alt='Citizenship back Preview'
                style={{ maxWidth: "100%", maxHeight: 150, borderRadius: 8 }}
              />
            </Box>
            {errors.citizenshipBackFile && (
              <Typography color='error' variant='body2'>
                {errors.citizenshipBackFile.message}
              </Typography>
            )}
          </Grid>
        </Grid>
      </div>
    </Box>
  );
}
