import React, { useState } from "react";
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
  Email as EmailIcon,
  Phone as PhoneIcon,
  Description as DescriptionIcon,
  LocationOn as LocationOnIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

export default function UserProfile() {
  const [editMode, setEditMode] = useState(false);

  // user state includes avatar and cover so they can be edited and saved
  const [user, setUser] = useState({
    username: "sujal bajracharya",
    email: "sujal.bajracharya@gmail.com",
    phone: "+977 9800000000",
    bio: "Renting sneakers, cameras, tools, and apartments!",
    location: "Lalitpur, Nepal",
    password: "********",
    avatar: "/default-avatar.png",
    cover: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80",
  });

  const [tempUser, setTempUser] = useState({ ...user });

  // helper to read files as data URL for preview and local save
  const readFileAsDataURL = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleAvatarUpload = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    try {
      const dataUrl = await readFileAsDataURL(file);
      setTempUser((prev) => ({ ...prev, avatar: dataUrl }));
    } catch (err) {
      console.error("Failed reading avatar", err);
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
    }
  };

  const handleSave = () => {
    // In a real app you'd POST to an API and handle errors
    setUser({ ...tempUser });
    setEditMode(false);
  };

  const handleCancel = () => {
    setTempUser({ ...user });
    setEditMode(false);
  };

  // detect if any changes were made so Save button can be enabled/disabled
  const isDirty = JSON.stringify(user) !== JSON.stringify(tempUser);

  return (
    <Box sx={{ backgroundColor: "#f2f6fa", minHeight: "100vh", pb: 5 }}>
      {/* Banner */}
      <Box
        sx={{
          height: "260px",
          backgroundImage: `url('${editMode ? tempUser.cover : user.cover}')`,
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
            src={editMode ? tempUser.avatar : user.avatar}
            sx={{
              width: 110,
              height: 110,
              border: "4px solid white",
              boxShadow: 2,
            }}
          />

          {editMode && (
            <Box sx={{ display: "flex", gap: 1, justifyContent: "center", mt: 1 }}>
              <Button
                component="label"
                startIcon={<PhotoCameraIcon />}
                size="small"
                sx={{ px: 2 }}
              >
                Update Photo
                <input hidden type="file" accept="image/*" onChange={handleAvatarUpload} />
              </Button>

              <Button
                component="label"
                startIcon={<PhotoCameraIcon />}
                size="small"
                sx={{ px: 2 }}
              >
                Change Cover
                <input hidden type="file" accept="image/*" onChange={handleCoverUpload} />
              </Button>
            </Box>
          )}

          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              mt: 1,
              color: "a3a3a3",
            }}
          >
            {user.username}
          </Typography>

          <Typography sx={{ color: "#0090b8", opacity: 0.9 }}>
            {user.location}
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

      {/* Verified Badges */}
      <Card
        sx={{
          mt: 3,
          mx: "auto",
          width: { xs: "90%", md: "90%" },
          borderRadius: 4,
          p: 3,
          boxShadow: "0 4px 18px rgba(0,0,0,0.08)",
          background: "linear-gradient(135deg, #ffffff 0%, #f8fdff 100%)",
        }}
      >
        <Typography
          variant="h6"
          fontSize={18}
          fontWeight={600}
          mb={2}
          color="#36454F"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          🏅 Verified Badges
          <Typography
            component="span"
            fontSize={12}
            sx={{
              bgcolor: "#0094b6",
              color: "white",
              px: 1,
              py: 0.5,
              borderRadius: 4,
              ml: 1,
            }}
          >
            4 Achievements
          </Typography>
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            justifyContent: { xs: "center", md: "space-around" },
          }}
        >
          {[
            {
              title: "Verified Renter",
              img: "https://cdn-icons-png.flaticon.com/512/456/456212.png",
              text: "Successfully rented from 10+ owners",
              color: "#2196f3",
              gradient: "linear-gradient(135deg, #2196f3 0%, #21cbf3 100%)",
              icon: "👑",
              stat: "15 Rentals",
              glow: true,
            },
            {
              title: "Trusted Lender",
              img: "https://cdn-icons-png.flaticon.com/512/929/929564.png",
              text: "5-star trusted rental provider",
              color: "#4caf50",
              gradient: "linear-gradient(135deg, #4caf50 0%, #8bc34a 100%)",
              icon: "⭐",
              stat: "4.9/5 Rating",
              glow: true,
            },
            {
              title: "ID Verified",
              img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
              text: "Government ID verified",
              color: "#ff9800",
              // gradient: "linear-gradient(135deg, #9c27b0 0%, #ba68c8 100%)",
              gradient: "linear-gradient(135deg, #ff9800 0%, #ffb74d 100%)",

              icon: "🛡️",
              stat: "100% Secure",
              glow: true,
            },
            {
              title: "Secure Payments",
              img: "https://cdn-icons-png.flaticon.com/512/1157/1157109.png",
              text: "Wallet transactions enabled",
              // color: "#ff9800",
              color: "#9c27b0",
              // gradient: "linear-gradient(135deg, #ff9800 0%, #ffb74d 100%)",
              gradient: "linear-gradient(135deg, #9c27b0 0%, #ba68c8 100%)",
              icon: "💳",
              stat: "24/7 Support",
              glow: true,
            },
          ].map((badge, i) => (
            <Card
              key={i}
              sx={{
                p: 2.5,
                width: { xs: "100%", sm: "220px" },
                borderRadius: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
                overflow: "visible",
                transition: "all 0.3s ease",
                cursor: "pointer",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: `0 8px 25px ${badge.color}40`,
                },
                background: badge.gradient,
                boxShadow: badge.glow
                  ? `0 4px 15px ${badge.color}40, inset 0 1px 0 ${badge.color}20`
                  : "0 2px 10px rgba(0,0,0,0.08)",
                border: `2px solid ${badge.color}30`,
              }}
            >
              {/* Badge Ribbon Effect */}
              <Box
                sx={{
                  position: "absolute",
                  top: -10,
                  right: -10,
                  width: 40,
                  height: 40,
                  background: badge.color,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: 20,
                  boxShadow: `0 3px 10px ${badge.color}80`,
                }}
              >
                {badge.icon}
              </Box>

              {/* Badge Icon */}
              <Box
                sx={{
                  width: 70,
                  height: 70,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.2)",
                  backdropFilter: "blur(10px)",
                  border: `2px solid ${badge.color}40`,
                  mb: 2,
                  position: "relative",
                }}
              >
                <Avatar
                  src={badge.img}
                  sx={{
                    width: 50,
                    height: 50,
                    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
                  }}
                />
              </Box>

              {/* Badge Title */}
              <Typography
                fontWeight="700"
                fontSize={16}
                sx={{
                  color: "white",
                  textShadow: "0 1px 3px rgba(0,0,0,0.3)",
                  mb: 1,
                  textAlign: "center",
                }}
              >
                {badge.title}
              </Typography>

              {/* Stat Chip */}
              <Box
                sx={{
                  background: "rgba(255,255,255,0.2)",
                  backdropFilter: "blur(5px)",
                  borderRadius: 20,
                  px: 2,
                  py: 0.5,
                  mb: 1.5,
                }}
              >
                <Typography
                  fontSize={12}
                  fontWeight="600"
                  sx={{
                    color: "white",
                    textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                  }}
                >
                  {badge.stat}
                </Typography>
              </Box>

              {/* Description */}
              <Typography
                fontSize={12}
                sx={{
                  color: "rgba(255,255,255,0.95)",
                  textAlign: "center",
                  lineHeight: 1.4,
                  textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                }}
              >
                {badge.text}
              </Typography>

              {/* Sparkle Effect */}
              <Box
                sx={{
                  position: "absolute",
                  top: 10,
                  left: 10,
                  fontSize: 12,
                  color: "rgba(255,255,255,0.8)",
                }}
              ></Box>
            </Card>
          ))}
        </Box>

        {/* Progress Bar */}
        <Box sx={{ mt: 3, pt: 2, borderTop: "1px dashed rgba(0,0,0,0.1)" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography fontSize={14} color="text.secondary">
              Achievement Progress
            </Typography>
            <Typography fontSize={14} fontWeight="600" color="#0094b6">
              4/4 Badges
            </Typography>
          </Box>
          <Box
            sx={{
              width: "100%",
              height: 8,
              backgroundColor: "rgba(0,148,182,0.1)",
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                background: "linear-gradient(90deg, #2196f3, #4caf50, #ff9800)",
                borderRadius: 4,
              }}
            />
          </Box>
          <Typography fontSize={12} color="text.secondary" mt={1}>
            Completed all 4 achievements. Elite Status unlocked
          </Typography>
        </Box>
      </Card>

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
                label="Username"
                editMode={editMode}
                value={tempUser.username}
                displayValue={user.username}
                onChange={(v) => setTempUser({ ...tempUser, username: v })}
                icon={<PersonIcon />}
                placeholder="Enter your username"
                helperText="Your unique identifier"
                color="#0094b6"
              />
            </div>

            <Field
              label="Email"
              editMode={editMode}
              value={tempUser.email}
              displayValue={user.email}
              onChange={(v) => setTempUser({ ...tempUser, email: v })}
              icon={<EmailIcon />}
              placeholder="Enter your email"
              type="email"
              helperText="Used for notifications"
              color="#2196f3"
            />
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} md={6}>
            <div className="mb-4">
              <Field
                label="Phone"
                editMode={editMode}
                value={tempUser.phone}
                displayValue={user.phone}
                onChange={(v) => setTempUser({ ...tempUser, phone: v })}
                icon={<PhoneIcon />}
                placeholder="Enter phone number"
                helperText="For important updates"
                color="#9c27b0"
              />
            </div>

            <Field
              label="Bio"
              editMode={editMode}
              value={tempUser.bio}
              displayValue={user.bio}
              onChange={(v) => setTempUser({ ...tempUser, bio: v })}
              icon={<DescriptionIcon />}
              placeholder="Tell us about yourself..."
              multiline
              rows={3}
              helperText="Max 200 characters"
              color="#ff9800"
              counter
              maxLength={200}
              currentLength={tempUser.bio.length}
            />
          </Grid>
        </Grid>

        {/* Additional Fields in Edit Mode */}
        {editMode && (
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <Field
                label="Location"
                editMode={editMode}
                value={tempUser.location || ""}
                displayValue={user.location}
                onChange={(v) => setTempUser({ ...tempUser, location: v })}
                icon={<LocationOnIcon />}
                placeholder="Enter your city"
                color="#4caf50"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  background:
                    "linear-gradient(135deg, #fff8e1 0%, #fff3e0 100%)",
                  border: "1px solid #ffecb3",
                }}
              >
                <Typography fontWeight="600" color="#ff9800" mb={1}>
                  Password Update
                </Typography>
                <TextField
                  fullWidth
                  type="password"
                  placeholder="Enter new password"
                  size="small"
                  sx={{ mb: 1 }}
                />
                <TextField
                  fullWidth
                  type="password"
                  placeholder="Confirm new password"
                  size="small"
                />
                <Typography fontSize={11} color="text.secondary" mt={1}>
                  Leave blank to keep current password
                </Typography>
              </Box>
            </Grid>
          </Grid>
        )}

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
                disabled={!isDirty}
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
                Save Changes
              </Button>
            </Box>
          </Box>
        )}

        {/* View Mode Actions */}
        {!editMode && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 3,
              pt: 2,
              borderTop: "1px dashed rgba(0,0,0,0.08)",
            }}
          >
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
        value={value}
        multiline={multiline}
        onChange={(e) => onChange(e.target.value)}
      />
    ) : (
      <Typography>{displayValue}</Typography>
    )}
  </Box>
);
