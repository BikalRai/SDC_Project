import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  InputAdornment,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SecondaryButton from "../buttons/SecondaryButton";
import PrimaryButton from "../buttons/PrimaryButton";

const STORAGE_KEY = "kyc_personal_v1";

const initialState = {
  fullName: "",
  dob: "",
  phone: "",
  email: "",
  address: "",
  idNumber: "",
};

export default function KycPersonalForm() {
  const [data, setData] = useState(initialState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setData(JSON.parse(stored));
    } catch (e) {
      console.warn("Failed to parse personal KYC from localStorage", e);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const validateField = (name, value) => {
    switch (name) {
      case "fullName":
        return value.trim().length < 3 ? "Enter your full name" : "";
      case "dob":
        return !value ? "Date of birth required" : "";
      case "phone":
        return !/^\+?\d{7,15}$/.test(value) ? "Invalid phone number" : "";
      case "email":
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "Invalid email" : "";
      case "address":
        return value.trim().length < 5 ? "Provide a valid address" : "";
      case "idNumber":
        return value.trim().length < 4 ? "Enter government ID/number" : "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((s) => ({ ...s, [name]: value }));
    setErrors((s) => ({ ...s, [name]: validateField(name, value) }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors((s) => ({ ...s, [name]: validateField(name, value) }));
  };

  // Public helper: quick client-side validity check (not exported, but useful)
  const isValid = () => {
    const next = {};
    let ok = true;
    Object.keys(initialState).forEach((k) => {
      const err = validateField(k, data[k]);
      if (err) ok = false;
      next[k] = err;
    });
    setErrors(next);
    return ok;
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 700 }}>
      <Typography gutterBottom fontSize={20} mb={2}>
        Personal details
      </Typography>

      <Grid container spacing={2}>
        <Grid item size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Full name"
            name="fullName"
            value={data.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={errors.fullName}
            error={Boolean(errors.fullName)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
            placeholder="As shown on your ID"
          />
        </Grid>

        <Grid item size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Date of birth"
            name="dob"
            value={data.dob}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={errors.dob}
            error={Boolean(errors.dob)}
            type="date"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarTodayIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={data.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={errors.phone || "Include country code, e.g. +91..."}
            error={Boolean(errors.phone)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon />
                </InputAdornment>
              ),
            }}
            placeholder="+912345678900"
          />
        </Grid>

        <Grid item size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Email (optional)"
            name="email"
            value={data.email}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={errors.email}
            error={Boolean(errors.email)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
            placeholder="you@example.com"
          />
        </Grid>

        <Grid item size={{ xs: 12 }}>
          <TextField
            fullWidth
            multiline
            minRows={2}
            label="Address"
            name="address"
            value={data.address}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={errors.address}
            error={Boolean(errors.address)}
            placeholder="Street, city, state, postal code"
          />
        </Grid>

        <Grid item size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Government ID / Citizen number"
            name="idNumber"
            value={data.idNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={errors.idNumber}
            error={Boolean(errors.idNumber)}
            placeholder="NID / Passport / Driving licence"
          />
        </Grid>

        <Grid item xs={12} sx={{ mt: 1 }}>
          <SecondaryButton
            btnText="RESET"
            className="mr-3"
            onClick={() => {
              setData(initialState);
              setErrors({});
              localStorage.removeItem(STORAGE_KEY);
            }}
          />
          <PrimaryButton
            btnText="SAVE DETAILS"
            className="mr-3"
            onClick={() => {
              const ok = isValid();
              if (!ok) {
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                const el = document.createElement("div");
                el.innerText = "Personal details saved";
                el.style.position = "fixed";
                el.style.right = "1rem";
                el.style.top = "4rem";
                el.style.background = "rgba(0,0,0,0.7)";
                el.style.color = "white";
                el.style.padding = "8px 12px";
                el.style.borderRadius = "6px";
                document.body.appendChild(el);
                setTimeout(() => document.body.removeChild(el), 1500);
              }
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
