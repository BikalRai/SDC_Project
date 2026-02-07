import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  TextField,
  Typography,
  Divider,
  Grid,
} from "@mui/material";
import {
  Person as PersonIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateUser } from "@/slices/user.slice";
import { loadUserFromToken } from "@/slices/auth.slice";
import { uploadToCloudinary } from "@/utils/cloudinary";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();

  const [avatarFile, setAvatarFile] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.user); // Get loading state

  const [tempUser, setTempUser] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    location: user?.location || "",
    image: user?.image || "",
  });

  const navigate = useNavigate();

  // ✅ Sync tempUser with user from Redux whenever user changes
  useEffect(() => {
    if (user) {
      setTempUser({
        fullName: user.fullName || "",
        email: user.email || "",
        phone: user.phone || "",
        location: user.location || "",
        image: user.image || "",
      });
    }
  }, [user]); // Re-run when user changes

  // ✅ Load user on mount
  useEffect(() => {
    dispatch(loadUserFromToken());
  }, [dispatch]);

  // helper to read files as data URL for preview and local save
  const readFileAsDataURL = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleAvatarSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Optional validation
    if (!file.type.startsWith("image/")) {
      toast.error("Only image files allowed");
      return;
    }

    // Preview only
    const preview = URL.createObjectURL(file);

    setTempUser((prev) => ({
      ...prev,
      image: preview, // preview only
    }));

    setAvatarFile(file); // store file for later upload
  };

  const uploadAvatar = async () => {
    if (!avatarFile) return null;

    setUploadingImage(true);
    try {
      const uploaded = await uploadToCloudinary(avatarFile);
      return uploaded.secure_url;
    } finally {
      setUploadingImage(false);
    }
  };

  const handleCoverUpload = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    try {
      const dataUrl = await readFileAsDataURL(file);
      setTempUser((prev) => ({ ...prev, cover: dataUrl }));
    } catch (err) {
      console.error("Failed reading cover", err);
      toast.error("Failed to upload cover image");
    }
  };
  const handleSave = async () => {
    try {
      let imageUrl = user?.image || "";

      // Upload only if a new file was selected
      if (avatarFile) {
        const uploadedUrl = await uploadAvatar();
        console.log(uploadedUrl, "uploadurl");
        if (!uploadedUrl) {
          toast.error("Image upload failed");
          return;
        }
        imageUrl = uploadedUrl;
      }

      const updateData = {
        fullName: tempUser.fullName,
        phone: tempUser.phone,
        location: tempUser.location,
        image: imageUrl,
      };

      const resultAction = await dispatch(updateUser(updateData));

      if (updateUser.fulfilled.match(resultAction)) {
        toast.success("Profile updated successfully!");
        setEditMode(false);
        setAvatarFile(null);
        await dispatch(loadUserFromToken());
      } else {
        toast.error(resultAction.payload || "Failed to update profile");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    }
  };

  const handleCancel = () => {
    // ✅ Reset to current user data from Redux
    setTempUser({
      fullName: user?.fullName || "",
      phone: user?.phone || "",
      location: user?.location || "",
      image: user?.image || "",
      email: user?.email || "",
    });
    setEditMode(false);
  };

  // detect if any changes were made so Save button can be enabled/disabled
  const isDirty =
    tempUser.fullName !== user?.fullName ||
    tempUser.phone !== user?.phone ||
    tempUser.location !== user?.location ||
    tempUser.image !== user?.image;

  return (
    <Box sx={{ backgroundColor: "#f2f6fa", minHeight: "100vh", pb: 5 }}>
      {/* Banner */}
      <Box
        sx={{
          height: "260px",
          backgroundImage: `url('${editMode ? tempUser?.cover : user?.cover}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          position: "relative",
        }}
      >
        {/* Edit Button */}
        {!editMode && (
          <Button
            onClick={() => setEditMode(true)}
            startIcon={<EditIcon />}
            sx={{
              position: "absolute",
              top: 20,
              right: 20,
              bgcolor: "#0094b6",
              color: "white",
              borderRadius: "20px",
              px: 2,
              "&:hover": { bgcolor: "#007a95" },
            }}
          >
            Edit Profile
          </Button>
        )}

        {/* Avatar + Name */}
        <Box
          sx={{
            position: "absolute",
            bottom: -110,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            src={editMode ? tempUser.image : user?.image}
            sx={{ width: 110, height: 110 }}
          />

          {editMode && (
            <Box
              sx={{ display: "flex", gap: 1, justifyContent: "center", mt: 1 }}
            >
              <Button
                component="label"
                startIcon={<PhotoCameraIcon />}
                size="small"
                sx={{ px: 2 }}
              >
                Update Photo
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarSelect}
                  // disabled={!isDirty || loading || uploadingImage}
                />
              </Button>

              <Button
                component="label"
                startIcon={<PhotoCameraIcon />}
                size="small"
                sx={{ px: 2 }}
              >
                Change Cover
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={handleCoverUpload}
                />
              </Button>
            </Box>
          )}

          <Typography variant="h5" sx={{ fontWeight: 700, mt: 1 }}>
            {user?.fullName}
          </Typography>

          <Typography sx={{ color: "#0090b8", opacity: 0.9 }}>
            {user?.location}
          </Typography>
        </Box>
      </Box>

      {/* User Stats */}
      <Card
        sx={{
          mx: "auto",
          width: { xs: "90%", md: "90%" },
          borderRadius: 4,
          p: 2,
          marginTop: 16,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          {[
            { label: "Total Rentals", value: "42" },
            { label: "Active Listings", value: "6" },
            { label: "Reviews", value: "128" },
          ].map((item, i) => (
            <Box key={i} textAlign="center">
              <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
                {item.value}
              </Typography>
              <Typography sx={{ color: "gray", fontSize: "14px" }}>
                {item.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Card>

      {/* Rest of your component stays the same... */}

      {/* User Editable Info */}
      <Card
        sx={{
          mt: 3,
          mx: "auto",
          width: { xs: "90%", md: "90%" },
          borderRadius: 4,
          p: 3,
          background: "linear-gradient(135deg, #ffffff 0%, #f9fcff 100%)",
          boxShadow: "0 8px 32px rgba(0, 148, 182, 0.12)",
          border: "1px solid rgba(0, 148, 182, 0.1)",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #0094b6, #4caf50, #2196f3)",
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
          },
        }}
      >
        {/* Header with Icon */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #0094b6, #21cbf3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mr: 2,
              boxShadow: "0 3px 10px rgba(0, 148, 182, 0.3)",
            }}
          >
            <PersonIcon sx={{ color: "white", fontSize: 20 }} />
          </Box>
          <Box>
            <Typography variant="h6" fontWeight="bold" color="#36454F">
              Profile Details
            </Typography>
            <Typography fontSize={12} color="text.secondary">
              Manage your personal information
            </Typography>
          </Box>

          {!editMode && (
            <Box
              sx={{ ml: "auto", display: "flex", alignItems: "center", gap: 1 }}
            >
              <CheckCircleIcon sx={{ color: "#4caf50", fontSize: 16 }} />
              <Typography fontSize={12} color="#4caf50" fontWeight="500">
                Profile Complete
              </Typography>
            </Box>
          )}
        </Box>

        <Divider sx={{ mb: 3, borderColor: "rgba(0,0,0,0.08)" }} />

        <Grid container spacing={6}>
          {/* Left Column */}
          <Grid item xs={12} md={6}>
            <div className="mb-4">
              <Field
                label="Full Name"
                editMode={editMode}
                value={tempUser.fullName}
                displayValue={user?.fullName}
                onChange={(v) => setTempUser({ ...tempUser, fullName: v })}
              />
            </div>

            <Field
              label="Email"
              value={tempUser.email}
              displayValue={user?.email}
              disabled={true}
              onChange={(v) => setTempUser({ ...tempUser, email: v })}
            />
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} md={6}>
            <div className="mb-4">
              <Field
                label="Phone"
                editMode={editMode}
                value={tempUser.phone}
                displayValue={user?.phone}
                onChange={(v) => setTempUser({ ...tempUser, phone: v })}
              />
            </div>

            <Field
              label="Location"
              editMode={editMode}
              value={tempUser?.location}
              displayValue={user?.location}
              onChange={(v) => setTempUser({ ...tempUser, location: v })}
            />
          </Grid>
        </Grid>

        {/* Action Buttons */}
        {editMode && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 4,
              pt: 3,
              borderTop: "1px solid rgba(0,0,0,0.08)",
            }}
          >
            <Box>
              <Typography fontSize={12} color="text.secondary">
                Last updated: {new Date().toLocaleDateString()}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="outlined"
                onClick={handleCancel}
                startIcon={<CancelIcon />}
                disabled={loading}
                sx={{
                  borderRadius: 2,
                  px: 3,
                  borderColor: "#f44336",
                  color: "#f44336",
                  "&:hover": {
                    borderColor: "#d32f2f",
                    background: "rgba(244, 67, 54, 0.04)",
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleSave}
                startIcon={<SaveIcon />}
                disabled={!isDirty || loading}
                sx={{
                  borderRadius: 2,
                  px: 3,
                  background: "linear-gradient(135deg, #0094b6, #21cbf3)",
                  boxShadow: "0 3px 10px rgba(0, 148, 182, 0.3)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #007a95, #1ab5d8)",
                    boxShadow: "0 5px 15px rgba(0, 148, 182, 0.4)",
                  },
                  "&:disabled": {
                    background: "#cccccc",
                    boxShadow: "none",
                  },
                }}
              >
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </Box>
          </Box>
        )}

        {/* View Mode Actions */}
        {!editMode && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 3,
              pt: 2,
              borderTop: "1px dashed rgba(0,0,0,0.08)",
            }}
          >
            <Button
              variant="outlined"
              onClick={() => navigate('/kyc')}
              sx={{
                px: 3,
                border: "none",
                color: "#0094b6",
                "&:hover": {
                  background: "rgba(0, 148, 182, 0.04)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 3px 10px rgba(0, 148, 182, 0.2)",
                },
                transition: "all 0.2s ease",
              }}
            >
              KYC Verification
            </Button>
            <Button
              variant="outlined"
              onClick={() => setEditMode(true)}
              startIcon={<EditIcon />}
              sx={{
                borderRadius: 2,
                px: 3,
                borderColor: "#0094b6",
                color: "#0094b6",
                "&:hover": {
                  borderColor: "#007a95",
                  background: "rgba(0, 148, 182, 0.04)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 3px 10px rgba(0, 148, 182, 0.2)",
                },
                transition: "all 0.2s ease",
              }}
            >
              Edit Profile
            </Button>
          </Box>
        )}
      </Card>
    </Box>
  );
}

/* Reusable field component */
const Field = ({
  label,
  editMode,
  value,
  displayValue,
  onChange,
  multiline,
}) => (
  <Box>
    <Typography sx={{ fontWeight: 600 }}>{label}</Typography>

    {editMode ? (
      <TextField
        fullWidth
        value={value || ""}
        multiline={multiline}
        onChange={(e) => onChange(e.target.value)}
      />
    ) : (
      <Typography>{displayValue || "Not set"}</Typography>
    )}
  </Box>
);
