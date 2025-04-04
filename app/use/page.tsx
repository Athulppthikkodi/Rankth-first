"use client";
import React, { useState } from "react";
import Box from "@/components/Layout/Box/Box";
import MainNavigation from "@/components/MainNavigation/MainNavigation";
import Typography from "@/components/DataDisplay/Typography/Typography";
import Container from "@/components/Layout/Container/Container";
import Stack from "@/components/Layout/Stack/Stack";
import { Building2, User } from "lucide-react";
import Input from "@/components/Inputs/Input/Input";
import Button from "@/components/Inputs/Button/Button";
import { useRouter } from "next/navigation";

const Page = () => {
  const [activeTab, setActiveTab] = useState<"agency" | "myself">("agency");
const router = useRouter();
  const handleClick = (tab: "agency" | "myself") => {
    setActiveTab(tab);
  };
function handleNavigate(): void {
  router.push("/dashboardEmpty");
}
  return (
    <Box sx={{ background: "#F1F5F8" }}>
      <MainNavigation items={[]} />
      <Box sx={{ padding: "0 0 100px" }}>
        <Container>
          <Typography
            variant="h3"
            component="h1"
            sx={{ paddingTop: "51px", paddingBottom: "57px" }}
          >
            How will you use Rankth for SEO Projects?
          </Typography>
          <Stack direction="row" spacing={24}>
            <Box
              onClick={() => handleClick("agency")}
              sx={{
               background:"#FFFFFF",
                padding: "24px",
                border:
                  activeTab === "agency"
                    ? "4px solid #00BC74"
                    : "1px solid #E4E4E7",
                borderRadius: "9px",
                width: "226px",
                height: "216px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                cursor: "pointer",
              }}
            >
              <Building2
                size={63}
                strokeWidth={0.75}
                color={activeTab === "agency" ? "#00BC74" : "currentColor"}
              />
              <Typography
                variant="h3"
                sx={{
                  fontSize: "21px",
                  paddingTop: "20px",
                  color: activeTab === "agency" ? "#00BC74" : "inherit",
                }}
              >
                Agency
              </Typography>
            </Box>
            <Box
              onClick={() => handleClick("myself")}
              sx={{
                background: activeTab === "myself" ? "#E8FFF8" : "#fff",
                padding: "24px",
                border:
                  activeTab === "myself"
                    ? "4px solid #00BC74"
                    : "1px solid #E4E4E7",
                borderRadius: "9px",
                width: "226px",
                height: "216px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <User
                size={63}
                strokeWidth={0.75}
                color={activeTab === "myself" ? "#00BC74" : "currentColor"}
              />
              <Typography
                variant="h3"
                sx={{
                  fontSize: "21px",
                  paddingTop: "20px",
                  color: activeTab === "myself" ? "#00BC74" : "inherit",
                }}
              >
                Myself
              </Typography>
            </Box>
          </Stack>

          <Box sx={{ marginTop: "40px" }}>
            {activeTab === "agency" && (
              <Box>
                <Typography paragraph sx={{ marginBottom: "50px", maxWidth: "588px"}}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Laboriosam consequuntur, veniam provident, nam ad optio ea
             
                </Typography>
                <Typography variant="h4" sx={{ marginBottom: "24px" }}>
                  Add Company Info
                </Typography>
                <Stack spacing={24}>
                  <Input label="Company Name" sx={{ width: "438px" }} />
                  <Input label="Custome URL" sx={{ width: "438px" }} />
                </Stack>
                <Button
                  onClick={handleNavigate}
                  variant="contained"
                  sx={{ display: "block", marginTop: "24px" }}
                >
                  Continue
                </Button>
              </Box>
            )}
            {activeTab === "myself" && (
              <Box
                
              >
                <Typography variant="h4" sx={{ marginBottom: "24px" }}>
                  Personal Project
                </Typography>
                <Typography>
                  Get started with managing your personal SEO projects and track
                  your website&apos;s performance.
                </Typography>
                <Box sx={{ marginTop: "24px" }}>
                  <Button onClick={handleNavigate} variant="contained">
                    Continue
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Page;
