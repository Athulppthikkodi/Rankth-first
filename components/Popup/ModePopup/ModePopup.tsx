import React, { useState } from "react";
import { Sparkles, Wrench } from "lucide-react";
import Box from "../../Layout/Box/Box";
import Typography from "../../DataDisplay/Typography/Typography";
import Button from "../../Inputs/Button/Button";
import Grid from "@/components/Layout/Grid/Grid";

interface ModePopup{
  handleClose: ()=> void;
  handleContinue: ()=> void;
  handleSkip: ()=> void;
}
const ModePopup: React.FC<ModePopup> = ({ handleClose, handleContinue, handleSkip }) => {
  const [selectedMode, setSelectedMode] = useState<"ai" | "manual">("ai");

  const handleModeSelect = (mode: "ai" | "manual") => {
    setSelectedMode(mode);
  };

 
  return (
    <Box
      width="843px"
      padding="80px 52px 57px"
      bgcolor="#fff"
      borderRadius="8px"
      boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
      sx={{
        position: "relative",
      }}
    >
      <Button
        variant="outlined"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: "20px",
          top: "20px",
          minWidth: "auto",
          padding: "6px 12px",
          color: "#374151",
          border: "none",
          fontSize: "20px",
          ":focus": { outline: "none", boxShadow: "none" },
        }}
      >
        ✕
      </Button>

      <Typography
        variant="h3"
        component="h4"
        sx={{
          marginBottom: "48px",
          fontWeight: 600,
        }}
      >
        Finally, Choose your mode of Setup
      </Typography>

      <Grid
        container
        cols={2}
        sx={{
          justifyContent: "center",
          gap: "51px",
          marginBottom: "42px",
          maxWidth:"503px"
        }}
      >
        <Box
          onClick={() => handleModeSelect("ai")}
          sx={{
            border: `${selectedMode === "ai" ? "6px" : "2px"} solid ${
              selectedMode === "ai" ? "#10B981" : "#D1D5DB"
            }`,
            borderRadius: "9px",
            padding: "40px 20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "226px",
            height: "216px",
            cursor: "pointer",
          }}
        >
          <Box
            sx={{
              marginBottom: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #000000",
            }}
          >
            <Sparkles size={48} strokeWidth={1} />
          </Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              fontSize: "21px",
            }}
          >
            Rankth Ai
          </Typography>
        </Box>

        <Box
          onClick={() => handleModeSelect("manual")}
          sx={{
            border: `${selectedMode === "manual" ? "6px" : "2px"} solid ${
              selectedMode === "manual" ? "#10B981" : "#D1D5DB"
            }`,
            borderRadius: "9px",
            padding: "40px 20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "226px",
            height: "216px",
            cursor: "pointer",
          }}
        >
          <Box
            sx={{
              marginBottom: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Wrench size={48} strokeWidth={1} />
          </Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              fontSize: "21px",
            }}
          >
            Set Manually
          </Typography>
        </Box>
      </Grid>
      {selectedMode === "ai" && (
           <Typography paragraph sx={{ marginBottom: "38px" }}>
           Rankth Ai will automatically setup your projects based on your input
         </Typography>
      )}
    {
      selectedMode === "manual" && (
        <Typography paragraph sx={{ marginBottom: "38px" }}>
           Rankth Manual will allow you to set up your projects manually
         </Typography>
      )
    }
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          display="flex"
          sx={{
            gap: "12px",
          }}
        >
          <Button
            variant="contained"
            size="medium"
            onClick={handleContinue}
            sx={{
              width: "158px",
              backgroundColor: "#10B981", // Green continue button
              ":hover": {
                backgroundColor: "#059669", // Darker green on hover
              },
            }}
          >
            Continue
          </Button>
          <Button
            variant="ghost"
            size="medium"
            onClick={handleSkip}
            sx={{
              borderRadius: "6px",
              border: "1px solid rgba(0, 0, 0, 0.26)",
              color: "#37415180",
            }}
          >
            Skip
          </Button>
        </Box>
        <Typography variant="h6" sx={{ fontSize: "14px" }}>
          Phase Planner
        </Typography>
      </Box>
    </Box>
  );
};

export default ModePopup;
