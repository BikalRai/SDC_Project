import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { MdVerifiedUser } from "react-icons/md";

export default function Info({ Title }) {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { xs: "100%", md: 360 }, // Full width on mobile, fixed on desktop
        position: { md: "sticky" }, // Sticky only on desktop
        top: 20,
        p: { xs: 2, md: 3 }, // Smaller padding on mobile
        borderRadius: 2,
        border: "1px solid #e0e0e0",
        bgcolor: "#fff",
        mx: { xs: "auto", md: 0 }, // Center on mobile
      }}
    >
      <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
        Perfect Rental
      </Typography>

      <List disablePadding sx={{ width: "100%", mt: 2 }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" }, // Stack on mobile
            justifyContent: "space-between",
            alignItems: { xs: "flex-start" },
            gap: 1,
            mb: 2,
          }}
        >
          <ListItemText
            sx={{ mr: 2 }}
            primary={
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                KYC Verification Steps
              </Typography>
            }
            secondary="Follow the steps to complete your verification process."
          />

          <MdVerifiedUser
            style={{
              fontSize: 32,
              color: "#1976d2",
              marginTop: 5,
            }}
          />
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Step Items */}
        <ListItem disablePadding sx={{ mb: 2 }}>
          <ListItemText secondary="Provide your personal details to get started." />
        </ListItem>

        <ListItem disablePadding sx={{ mb: 2 }}>
          <ListItemText secondary="Upload your government-issued identity documents." />
        </ListItem>

        <ListItem disablePadding sx={{ mb: 2 }}>
          <ListItemText secondary="Verify your contact information for security purposes." />
        </ListItem>

        <ListItem disablePadding sx={{ mb: 2 }}>
          <ListItemText secondary="Review all provided information before submission." />
        </ListItem>

        <ListItem disablePadding>
          <ListItemText secondary="Submit your details and wait for approval from our team." />
        </ListItem>
      </List>
    </Box>
  );
}