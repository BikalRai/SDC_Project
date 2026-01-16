import React from "react";
import { Card, Avatar, Typography, Box, Divider } from "@mui/material";

const BADGE_CONFIG = {
  verifiedRenter: {
    title: "Verified Renter",
    img: "https://cdn-icons-png.flaticon.com/512/456/456212.png",
    text: "Successfully rented from 10+ owners",
    color: "#2196f3",
    gradient: "linear-gradient(135deg, #2196f3 0%, #21cbf3 100%)",
    icon: "👑",
    stat: "15 Rentals",
  },
  trustedLender: {
    title: "Trusted Lender",
    img: "https://cdn-icons-png.flaticon.com/512/929/929564.png",
    text: "5-star trusted rental provider",
    color: "#4caf50",
    gradient: "linear-gradient(135deg, #4caf50 0%, #8bc34a 100%)",
    icon: "⭐",
    stat: "4.9/5 Rating",
  },
  idVerified: {
    title: "ID Verified",
    img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    text: "Government ID verified",
    color: "#ff9800",
    gradient: "linear-gradient(135deg, #ff9800 0%, #ffb74d 100%)",
    icon: "🛡️",
    stat: "100% Secure",
  },
  securePayments: {
    title: "Secure Payments",
    img: "https://cdn-icons-png.flaticon.com/512/1157/1157109.png",
    text: "Wallet transactions enabled",
    color: "#9c27b0",
    gradient: "linear-gradient(135deg, #9c27b0 0%, #ba68c8 100%)",
    icon: "💳",
    stat: "24/7 Support",
  },
};

export default function UserBadges({ badges }) {
  const selectedBadges = badges.map((b) => BADGE_CONFIG[b]).filter(Boolean);

  return (
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
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
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
          {selectedBadges.length} Achievements
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
        {selectedBadges.map((badge, i) => (
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
              boxShadow: `0 4px 15px ${badge.color}40`,
              border: `2px solid ${badge.color}30`,
            }}
          >
            {/* Ribbon Icon */}
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
              }}
            >
              {badge.icon}
            </Box>

            {/* Avatar */}
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
              }}
            >
              <Avatar src={badge.img} sx={{ width: 50, height: 50 }} />
            </Box>

            {/* Title */}
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

            {/* Stat */}
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
                sx={{ color: "white" }}
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
              }}
            >
              {badge.text}
            </Typography>
          </Card>
        ))}
      </Box>

      {/* Progress bar */}
      <Box sx={{ mt: 3, pt: 2, borderTop: "1px dashed rgba(0,0,0,0.1)" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography fontSize={14} color="text.secondary">
            Achievement Progress
          </Typography>
          <Typography fontSize={14} fontWeight="600" color="#0094b6">
            {selectedBadges.length}/{Object.keys(BADGE_CONFIG).length} Badges
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
              width: `${
                (selectedBadges.length / Object.keys(BADGE_CONFIG).length) * 100
              }%`,
              height: "100%",
              background: "linear-gradient(90deg, #2196f3, #4caf50, #ff9800)",
            }}
          />
        </Box>
      </Box>
    </Card>
  );
}
