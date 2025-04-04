import React, { useState, useRef } from "react";
import Box from "../../Layout/Box/Box";
import Typography from "../../DataDisplay/Typography/Typography";
import Input from "../../Inputs/Input/Input";
import Checkbox from "../../Inputs/Checkbox/Checkbox";
import Button from "../../Inputs/Button/Button";

interface TimelinePopupProps {
  handleClose: () => void;
  handleNextPopup: () => void;
  handleSkip: () => void;
}

const TimelinePopup: React.FC<TimelinePopupProps> = ({
  handleClose,
  handleNextPopup,
  handleSkip,
}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);

  const handleStartDateClick = () => {
    startDateRef.current?.showPicker();
  };

  const handleEndDateClick = () => {
    endDateRef.current?.showPicker();
  };

  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (event.target instanceof HTMLInputElement) {
      setStartDate(new Date(event.target.value));
    }
  };

  const handleEndDateChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (event.target instanceof HTMLInputElement) {
      setEndDate(new Date(event.target.value));
    }
  };

  const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    return (
      <Box sx={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          sx={{ marginBottom: "4px", fontSize: "40px", fontWeight: 400 }}
        >
          {day}
        </Typography>
        <Typography>{month}</Typography>
      </Box>
    );
  };

  const formatDateForInput = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const calculateDays = () => {
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Box
      display="flex"
      width="843px"
      padding="80px 52px 57px"
      bgcolor="#fff"
      borderRadius="8px"
      boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
      sx={{ flexDirection: "column", position: "relative" }}
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
      <Typography variant="h3" component="h4" sx={{ marginBottom: "41px" }}>
        Project Settings
      </Typography>
      <Input
        label="Name your project"
        placeholder="My First SEO Project"
        fullWidth
        size="large"
        sx={{ marginBottom: "28px" }}
      />
      <Typography
        paragraph
        sx={{ marginBottom: "18px", fontSize: "14px", fontWeight: 700 }}
      >
        Set start and end date of the project
      </Typography>
      <Box
        sx={{
          justifyContent: "space-between",
          marginBottom: "29px",
          position: "relative",
          flexDirection: "column",
          gap: "2px",
        }}
        display="flex"
      >
        <Box display="flex" sx={{ justifyContent: "space-between" }}>
          <Box
            onClick={handleStartDateClick}
            sx={{
              cursor: "pointer",
              padding: "8px 10px",
              border: "1px solid #AFD5E1",
              borderRadius: "7px",
              minWidth: "80px",
              position: "relative",
              color: "#374151",
              fontSize: "12px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "normal",
              textTransform: "uppercase",
              background: "#EEFBFF",
            }}
          >
            {formatDate(startDate)}
            <Input
              type="date"
              ref={startDateRef}
              onChange={handleStartDateChange}
              max={formatDateForInput(endDate)}
              sx={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
            />
          </Box>
          <Typography
            sx={{
              textAlign: "center",
              textTransform: "capitalize",
              color: "#DF5353",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: "700",
              lineHeight: "normal",
              position: "relative",
              width: "calc(100% - 160px)",
              paddingTop: "12px",
              ":before": {
                content: "''",
                position: "absolute",
                width: "100%",
                borderBottom: "2px dotted #000000",
                top: "50%",
                left: 0,
              },
            }}
          >
            {calculateDays()} days
          </Typography>
          <Box
            onClick={handleEndDateClick}
            sx={{
              cursor: "pointer",
              padding: "8px 10px",
              border: "1px solid #AFD5E1",
              borderRadius: "7px",
              minWidth: "80px",
              position: "relative",
              color: "#374151",
              fontSize: "12px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "normal",
              textTransform: "uppercase",
              background: "#EEFBFF",
            }}
          >
            {formatDate(endDate)}
            <Input
              type="date"
              ref={endDateRef}
              onChange={handleEndDateChange}
              min={formatDateForInput(startDate)}
              sx={{
                position: "absolute",
                opacity: 0,
                width: 0,
                height: 0,
              }}
            />
          </Box>
        </Box>
      </Box>

      <Checkbox
        label="I would like to setup my project in Phases"
        size="medium"
        sx={{ marginBottom: "35px", fontSize: "14px", fontWeight: "700" }}
      />
      
      <Box
        display="flex"
        sx={{
          justifyContent: "space-between",
          maxWidth: "204px",
        }}
      >
        <Button variant="contained" size="medium" onClick={handleNextPopup}>
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
    </Box>
  );
};

export default TimelinePopup;
