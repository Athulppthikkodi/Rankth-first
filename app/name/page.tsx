"use client";
import React from "react";
import Box from "@/components/Layout/Box/Box";
import MainNavigation from "@/components/MainNavigation/MainNavigation";
import Typography from "@/components/DataDisplay/Typography/Typography";
import Input from "@/components/Inputs/Input/Input";
import Button from "@/components/Inputs/Button/Button";
import Container from "@/components/Layout/Container/Container";
import { useRouter } from "next/navigation";
const Page = () => {
 const router = useRouter();
  function handleNavigate(): void {
    console.log("Navigating to the next step...");
    router.push("/use");
  }

  return (
    <Box sx={{ background: "#F1F5F8", height: "100svh" }}>
      <MainNavigation items={[]} />
      <Box sx={{ padding: "51px 0 296px" }}>
        <Container>
          <Typography variant="h3" component="h1" sx={{paddingBottom: "26px"}}>
            Tell Us Who You Are
          </Typography>
          <Input label="First Name" sx={{marginBottom: "19px", width: "438px"}}/>
          <Input label="Last Name" sx={{marginBottom: "23px", width: "438px"}} />
          <Button onClick={handleNavigate} sx={{background: "#00BC74", textTransform: "capitalize"}}>Continue</Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Page;
