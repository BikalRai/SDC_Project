import React, { useEffect } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  InputAdornment,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useForm } from "react-hook-form";

export default function KycPersonalForm({
  formData,
  onStepSubmit,
  registerSubmitHandler,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: formData,
    mode: "onBlur",
  });

  useEffect(() => {
    registerSubmitHandler(() => handleSubmit(onSubmit)());
  }, [handleSubmit, registerSubmitHandler]);

  const onSubmit = (data) => {
    onStepSubmit(data);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 700 }}>
      <Typography gutterBottom fontSize={20} mb={2}>
        Personal details
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label='First name'
            name='firstName'
            {...register("firstName", {
              required: "First name is required.",
              minLength: { value: 3, message: "At least 3 characters." },
            })}
            error={!!errors.fullname}
            helperText={errors.fullname?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
            placeholder='First name here'
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label='Last name'
            name='lastName'
            {...register("lastName", {
              required: "Last name is required.",
              minLength: { value: 3, message: "At least 3 characters." },
            })}
            error={!!errors.fullname}
            helperText={errors.fullname?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
            placeholder='Last name here'
          />
        </Grid>

        <Grid size={{ sm: 12 }}>
          <TextField
            fullWidth
            label='Father name'
            name='fatherName'
            {...register("fatherName", {
              required: "Father name is required.",
              minLength: { value: 3, message: "At least 3 characters." },
            })}
            error={!!errors.fullname}
            helperText={errors.fullname?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
            placeholder='Father name here'
          />
        </Grid>

        {/* Date of birth */}
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label='Date of birth'
            name='dob'
            {...register("dob", {
              required: "Date of birth is required.",
            })}
            helperText={errors.dob?.message}
            error={!!errors.dob}
            type='date'
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <CalendarTodayIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <FormControl>
            <FormLabel id='demo-radio-buttons-group-label'>Gender</FormLabel>
            <RadioGroup
              aria-labelledby='demo-radio-buttons-group-label'
              defaultValue='female'
              name='radio-buttons-group'
              row
            >
              <FormControlLabel
                value='female'
                control={<Radio {...register("gender")} />}
                label='Female'
              />
              <FormControlLabel
                value='male'
                control={<Radio {...register("gender")} />}
                label='Male'
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        {/* email */}
        {/* <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label='Email address'
            name='email'
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            helperText={errors.email?.message}
            error={!!errors.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
            placeholder='you@example.com'
          />
        </Grid> */}

        {/* phone */}
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label='Phone number'
            name='phone'
            {...register("phone", {
              required: "Phone number is required.",
              pattern: {
                value: /^9[6-8][0-9]{8}$/,
                message: "Invalid phone number.",
              },
            })}
            helperText={errors.phone?.message}
            error={!!errors.phone}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <PhoneIcon />
                </InputAdornment>
              ),
            }}
            placeholder='9800000000'
          />
        </Grid>
      </Grid>
    </Box>
  );
}
