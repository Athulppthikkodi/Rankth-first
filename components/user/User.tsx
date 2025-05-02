"use client";
import React, { useState } from "react";
import Box from "@/components/Layout/Box/Box";
import MainNavigation from "@/components/MainNavigation/MainNavigation";
import Typography from "@/components/DataDisplay/Typography/Typography";
import Input from "@/components/Inputs/Input/Input";
import Button from "@/components/Inputs/Button/Button";
import Container from "@/components/Layout/Container/Container";

const User = ({
  onUpdateFristNameAndLastName,
  onSubmit,
}: {
  onUpdateFristNameAndLastName: (data: {
    firstName: string;
    lastName: string;
  }) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
  });

  return (
    <Box sx={{ background: "#F1F5F8", height: "100svh" }}>
      <MainNavigation items={[]} />
      <Box sx={{ padding: "51px 0 296px" }}>
        <Container>
          <Typography
            variant="h3"
            component="h1"
            sx={{ paddingBottom: "26px" }}
          >
            Tell Us Who You Are
          </Typography>
          <form action="" onSubmit={onSubmit}>
            <Input
              name="firstName"
              label="First Name"
              sx={{ marginBottom: "19px", width: "438px" }}
              value={formData.firstName}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  firstName: e.target.value,
                }));
                onUpdateFristNameAndLastName({
                  firstName: e.target.value,
                  lastName: formData.lastName,
                });
              }}
            />
            <Input
              name="lastName"
              label="Last Name"
              sx={{ marginBottom: "23px", width: "438px" }}
              value={formData.lastName}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  lastName: e.target.value,
                }));
                onUpdateFristNameAndLastName({
                  firstName: formData.firstName,
                  lastName: e.target.value,
                });
              }}
            />
            <Button
              type="submit"
              sx={{ background: "#00BC74", textTransform: "capitalize" }}
            >
              Continue
            </Button>
          </form>
        </Container>
      </Box>
    </Box>
  );
};

export default User;
