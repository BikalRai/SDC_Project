import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  IconButton,
  Avatar,
  Paper,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteIcon from "@mui/icons-material/Delete";
import SecondaryButton from "../buttons/SecondaryButton";
import PrimaryButton from "../buttons/PrimaryButton";

const STORAGE_KEY = "kyc_docs_v1";

// helper to convert File -> dataURL
function fileToDataUrl(file) {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => res(reader.result);
    reader.onerror = rej;
    reader.readAsDataURL(file);
  });
}

const emptyState = {
  selfie: null,
  idFront: null,
  idBack: null,
  other: null, // optional extra doc
};

export default function KycDocumentUpload() {
  const [files, setFiles] = useState(emptyState);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setFiles(JSON.parse(stored));
    } catch (e) {
      console.warn("Failed to parse KYC docs from localStorage", e);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(files));
  }, [files]);

  const handleFile = async (e, key) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // accept images and pdfs
    const validTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "application/pdf",
    ];
    if (!validTypes.includes(file.type)) {
      alert("Only JPG/PNG/PDF files are accepted.");
      return;
    }
    setUploading(true);
    try {
      const dataUrl = await fileToDataUrl(file);
      setFiles((s) => ({
        ...s,
        [key]: { name: file.name, mime: file.type, dataUrl },
      }));
    } catch (err) {
      console.error(err);
      alert("Failed to read file.");
    } finally {
      setUploading(false);
    }
  };

  const removeFile = (key) => {
    setFiles((s) => ({ ...s, [key]: null }));
  };

  const previewBox = (label, key) => {
    const f = files[key];
    return (
      <Paper
        variant="outlined"
        sx={{
          p: 1,
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box
          sx={{
            width: 84,
            height: 84,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {f ? (
            f.mime === "application/pdf" ? (
              <Avatar variant="rounded">{/* PDF icon fallback */}PDF</Avatar>
            ) : (
              <Avatar
                variant="rounded"
                src={f.dataUrl}
                sx={{ width: 82, height: 82 }}
              />
            )
          ) : (
            <Avatar
              variant="rounded"
              sx={{ width: 82, height: 82, bgcolor: "background.default" }}
            >
              <UploadFileIcon />
            </Avatar>
          )}
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle2">{label}</Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {f ? f.name : "No file uploaded"}
          </Typography>
        </Box>

        <Box>
          <label>
            <input
              accept="image/*,application/pdf"
              style={{ display: "none" }}
              type="file"
              onChange={(e) => handleFile(e, key)}
            />
            <Button component="span" size="small" variant="outlined">
              Upload
            </Button>
          </label>

          {f && (
            <IconButton
              aria-label="delete"
              size="small"
              onClick={() => removeFile(key)}
              sx={{ ml: 1 }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
      </Paper>
    );
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 700 }}>
      <Typography variant="h6" gutterBottom>
        Document upload
      </Typography>

      <Typography variant="body2" sx={{ mb: 2 }}>
        Upload clear pictures of your ID (front and back) and a selfie for
        identity verification. We accept JPG, PNG, PDF.
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6} width={"100%"}>
          {previewBox("Selfie (clear face)", "selfie")}
        </Grid>

        <Grid item xs={12} md={6} width={"100%"}>
          {previewBox("ID / Passport (front)", "idFront")}
        </Grid>

        <Grid item xs={12} md={6} width={"100%"}>
          {previewBox("ID / Passport (back)", "idBack")}
        </Grid>

        <Grid item xs={12} md={6} width={"100%"}>
          {previewBox("Optional: additional document", "other")}
        </Grid>

        <Grid item xs={12}>
          <Typography variant="caption" color="text.secondary">
            Tip: Use a well-lit, straight-on photo. Photos that are blurred or
            cropped may be rejected.
          </Typography>
        </Grid>

        <Grid item xs={12} sx={{ mt: 1 }}>
          {/* MYBUTTON */}
          <PrimaryButton
            btnText="SAVE UPLOADS"
            className="mr-3"
            onClick={() => {
              setFiles(emptyState);
              localStorage.removeItem(STORAGE_KEY);
            }}
          />

          <SecondaryButton
            btnText="CLEAR ALL"
            className="mr-3"
            onClick={() => {
              setFiles(emptyState);
              localStorage.removeItem(STORAGE_KEY);
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
