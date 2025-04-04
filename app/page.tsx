"use client";
import React from "react";
import MainNavigation from "@/components/MainNavigation/MainNavigation";
import Box from "@/components/Layout/Box/Box";
import Container from "@/components/Layout/Container/Container";
import Typography from "@/components/DataDisplay/Typography/Typography";
import Input from "@/components/Inputs/Input/Input";
import Button from "@/components/Inputs/Button/Button";
import { useRouter } from "next/navigation";
const Page = () => {
  const navigationItems = [
    { label: "Phase Planner", to: "/phase-planner" },
    { label: "Tasks", to: "/tasks" },
    { label: "Link Building", to: "/link-building" },
    { label: "Content", to: "/content" },
    { label: "File Manager", to: "/file-manager" },
    { label: "Reports", to: "/reports" },
  ];

  const router = useRouter();


  const handleAvatarClick = () => {
    console.log("Avatar clicked");
    // Open profile menu or other actions
  };
  const handleAnalyse = () => {
    console.log("Analyse clicked");
    router.push("/register");
  };
  return (
    <>
      <MainNavigation
        items={navigationItems}
        logoUrl="/"
        onAvatarClick={handleAvatarClick}
        // Custom logo example:
        // logo={<YourLogoComponent />}
        // Avatar image example:
        // avatarSrc="https://example.com/avatar.jpg"
        
      />
      <Box sx={{ background: "#F1F5F8", padding: "70px 0 207px" }}>
        <Box>
          <Container maxWidth="lg">
            <Typography variant="h1" sx={{ paddingBottom: "59px" }}>
              30% of SEO projects fail due to inadequate
              <br /> task planning and management
            </Typography>
            <Typography
              variant="h3"
              sx={{ paddingBottom: "47px" }}
              component="h2"
            >
              Analyse your website to start
            </Typography>
            <Box display="flex" sx={{ paddingBottom: "79px" }}>
              <Input
                placeholder="abc.com"
                sx={{
                  width: "310px",
                  fontSize: "14px",
                  borderRight: "none",
                  borderTopRightRadius: "0",
                  borderBottomRightRadius: "0",
                }}
              />
              <Button
                onClick={handleAnalyse}
                sx={{ background: "#00BC74", textTransform: "capitalize" }}
              >
                Analyse
              </Button>
            </Box>
            <Typography variant="h3" sx={{ paddingBottom: "40px" }}>
              Key Insights
            </Typography>
            <Box
              display="flex"
              sx={{ gap: "47px", alignItems: "center", paddingBlock: "43px" }}
            >
              <Typography
                component="span"
                sx={{
                  display: "block",
                  fontSize: "53px",
                  fontWeight: "light",
                  border: "1px solid #00D47E",
                  lineHeight: "85px",
                  padding: "3px 21px 4px 16px",
                  borderRadius: "9px",
                }}
              >
                2.5x
              </Typography>
              <Typography paragraph className="max-w-[554px]">
                SEO campaigns with structured project management are 2.5x more
                likely to achieve their goals
              </Typography>
            </Box>
            <Box display="flex" sx={{ gap: "47px", alignItems: "center" }}>
              <Typography
                component="span"
                sx={{
                  display: "block",
                  fontSize: "53px",
                  fontWeight: "light",
                  border: "1px solid #00D47E",
                  lineHeight: "85px",
                  padding: "3px 10px 4px 16px",
                  borderRadius: "9px",
                }}
              >
                40%
              </Typography>
              <Typography paragraph sx={{ maxWidth: "554px" }}>
                Companies using dedicated SEO project management tools see a 40%
                increase in organic traffic growth
              </Typography>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Page;
