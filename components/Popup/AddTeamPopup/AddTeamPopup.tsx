import React, { useState } from "react";
import Box from "../../Layout/Box/Box";
import Typography from "../../DataDisplay/Typography/Typography";
import Input from "../../Inputs/Input/Input";
import Button from "../../Inputs/Button/Button";
import Select from "../../Inputs/Select/Select"; // Assuming you have a Select component
import Stack from "@/components/Layout/Stack/Stack";
import Grid from "@/components/Layout/Grid/Grid";

interface AddTeamPopup{
  handleClose: ()=> void;
  handleNextPopup: ()=> void;
  handleSkip: ()=> void;
}
const AddTeamPopup = ({ handleClose, handleNextPopup, handleSkip }: AddTeamPopup) => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Project Manager");
  const [emailError, setEmailError] = useState("");
  const [teamMembers, setTeamMembers] = useState<
    Array<{ name: string; email: string; role: string; status: string }>
  >([]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("Email is required");
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    if (teamMembers.some((member) => member.email === email)) {
      setEmailError("This email is already added");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleEmailChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEmail(event.target.value);
    if (emailError) {
      validateEmail(event.target.value);
    }
  };

  const handleRoleChange = (value: string | string[]) => {
    if (typeof value === "string") {
      setRole(value);
    }
  };

  const handleAddTeamMember = () => {
    if (validateEmail(email.trim())) {
      setTeamMembers([
        ...teamMembers,
        { email, role, name: "Rajeesh", status: "active" },
      ]);
      setEmail(""); // Reset email input after adding
      setEmailError("");
    }
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
        Add Your Team Members
      </Typography>
      <Typography variant="h6" sx={{ fontSize: "14px", marginBottom: "17px" }}>
        Add your team & role
      </Typography>
      <Box
        sx={{
          display: "flex",
          marginBottom: "26px",
          justifyContent: "space-between",
        }}
      >
        <Grid
          container
          cols={8}
          sx={{ width: "calc(100% - 142px)", alignItems: "flex-end" }}
        >
          <Grid sx={{ gridColumn: "span 6" }}>
            <Box sx={{ position: "relative", width: "100%" }}>
              <Input
                type="email"
                placeholder="hello@ranked.com"
                fullWidth
                size="large"
                required
                value={email}
                onChange={handleEmailChange}
                error={emailError ? true : undefined}
                sx={{
                  borderTopRightRadius: "0",
                  borderBottomRightRadius: "0",
                  color: "#374151",
                  fontWeight: "400",
                }}
              />
              {emailError && (
                <Typography
                  variant="caption"
                  color="error"
                  sx={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    marginTop: "4px",
                  }}
                >
                  {emailError}
                </Typography>
              )}
            </Box>
          </Grid>
          <Grid sx={{ gridColumn: "span 2" }} container>
            <Select
              value={role}
              onValueChange={handleRoleChange}
              selectSize="large"
              options={[
                { value: "Project Manager", label: "Project Manager" },
                { value: "Designer", label: "Designer" },
                { value: "Developer", label: "Developer" },
                { value: "Marketing", label: "Marketing" },
              ]}
              sx={{
                minWidth: "200px",
                fontWeight: 400,
                fontSize: "14px",
                color: "#374151",
                borderTopLeftRadius: "0",
                borderBottomLeftRadius: "0",
                borderLeft: "none",
                alignItems: "flex-end",
              }}
            />
          </Grid>
        </Grid>

        <Button
          variant="outlined"
          size="large"
          onClick={handleAddTeamMember}
          sx={{ alignSelf: "flex-end", color: "#37415180" }}
        >
          Add
        </Button>
      </Box>

      {teamMembers.length > 0 && (
        <Box sx={{ marginBottom: "46px" }}>
          <Stack direction="column" spacing={15}>
            {teamMembers.map((member, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "8px 12px",
                  backgroundColor: "#EEFBFF",
                  borderRadius: "6px",
                  border: "1px solid #BED9D9",
                  overflowX: "auto",
                }}
              >
                <Typography
                  sx={{
                    marginRight: "10px",
                    fontSize: "16px",
                    color: "#374151",
                    fontWeight: "400",
                  }}
                >
                  {member.name}
                </Typography>
                <Typography
                  sx={{
                    margin: "0 10px",
                    fontSize: "16px",
                    color: "#374151",
                    fontWeight: "400",
                  }}
                >
                  {member.email}
                </Typography>
                <Typography
                  sx={{
                    margin: "0 10px",
                    fontSize: "16px",
                    color: "#374151",
                    fontWeight: "400",
                  }}
                >
                  {member.role}
                </Typography>
                <Typography
                  sx={{
                    marginLeft: "10px",
                    fontSize: "16px",
                    color: "#374151",
                    fontWeight: "400",
                  }}
                >
                  {member.status}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      )}

      <Typography
        paragraph
        sx={{
          marginBottom: "17px",
          fontSize: "14px",
          fontWeight: 700,
        }}
      >
        Or share below link to invite your team members to Rankth
      </Typography>

      <Box
        sx={{
          marginBottom: "33px",
          position: "relative",
        }}
      >
        <Input
          value="https://rankth.com/join/dd99fc74-174a5"
          fullWidth
          size="large"
          readOnly
          sx={{ flex: 1 }}
        />
        <Button
          variant="outlined"
          size="medium"
          onClick={() => {
            navigator.clipboard.writeText(
              "https://rankth.com/join/dd99fc74-174a5"
            );
            console.log("Link copied to clipboard");
          }}
          sx={{
            minWidth: "auto",
            color: "#374151",
            position: "absolute",
            right: "0",
            top: "50%",
            transform: "translateY(-50%)",
            border: "none",
            padding: "5px 0 5px 0",
            marginRight: "13px",
            ":hover": {
              backgroundColor: "transparent",
            },
            ":focus": {
              outline: "none",
              boxShadow: "none",
            },
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
          >
            <path
              d="M9.75 6.49998V5.41654C9.75 4.21989 10.72 3.24987 11.9167 3.24987H20.5833C21.78 3.24987 22.75 4.21989 22.75 5.41654V14.0833C22.75 15.2799 21.78 16.2499 20.5834 16.25L19.5 16.25M14.0833 22.75H5.41667C4.22002 22.75 3.25 21.78 3.25 20.5833V11.9166C3.25 10.7201 4.22002 9.74998 5.41667 9.74998H14.0833C15.28 9.74998 16.25 10.7201 16.25 11.9166V20.5833C16.25 21.78 15.28 22.75 14.0833 22.75Z"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
      </Box>

      <Box
        display="flex"
        sx={{
          justifyContent: "space-between",
          maxWidth: "255px",
        }}
      >
        <Button
          variant="contained"
          size="medium"
          onClick={handleNextPopup}
          sx={{ width: "158px" }}
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
    </Box>
  );
};

export default AddTeamPopup;
