import { Box, Card, Typography } from "@mui/material";
import React from "react";

const UserStats = ({ userStats }) => {
  return (
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
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {sm: "repeat(3, 1fr)" },
          gap: 2,
          justifyItems: "center",
        }}
      >
        {userStats.map((item, i) => (
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
  );
};

export default UserStats;
