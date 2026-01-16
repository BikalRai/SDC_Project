import {
  Box,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import {
  MdAddHomeWork,
  MdApartment,
  MdLocationCity,
  MdNumbers,
} from "react-icons/md";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const KycAddressForm = ({ formData, onStepSubmit, registerSubmitHandler }) => {
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
        Address details
      </Typography>

      <Grid container spacing={2}>
        {/* Province */}
        <Grid size={{ xs: 12, md: 12 }}>
          <TextField
            fullWidth
            label='Province'
            {...register("province", {
              required: "Province is required.",
            })}
            error={!!errors.province}
            helperText={errors.province?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <MdLocationCity />
                </InputAdornment>
              ),
            }}
            placeholder='Province name'
          />
        </Grid>

        {/* District */}
        <Grid size={{ xs: 12, md: 12 }}>
          <TextField
            fullWidth
            label='District'
            {...register("district", {
              required: "District is required.",
            })}
            error={!!errors.district}
            helperText={errors.district?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <MdAddHomeWork />
                </InputAdornment>
              ),
            }}
            placeholder='District name'
          />
        </Grid>

        {/* Municipality */}
        <Grid size={{ xs: 12, md: 12 }}>
          <TextField
            fullWidth
            label='Municipality'
            {...register("municipality", {
              required: "Municipality is required.",
            })}
            error={!!errors.municipality}
            helperText={errors.municipality?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <MdApartment />
                </InputAdornment>
              ),
            }}
            placeholder='Municipality name'
          />
        </Grid>

        {/* Ward Number */}
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label='Ward Number'
            type='number'
            {...register("wardNumber", {
              required: "Ward number is required.",
              min: { value: 1, message: "Ward number must be at least 1" },
            })}
            error={!!errors.wardNumber}
            helperText={errors.wardNumber?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <MdNumbers />
                </InputAdornment>
              ),
            }}
            placeholder='e.g. 5'
          />
        </Grid>

        {/* Street */}
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label='Street'
            {...register("street", {
              required: "Street is required.",
              minLength: { value: 3, message: "At least 3 characters." },
            })}
            error={!!errors.street}
            helperText={errors.street?.message}
            placeholder='Street name / number'
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default KycAddressForm;
