"use client";
import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import { CREATE_AGENCY } from '@/graphql/mutations/agency';
import Box from "@/components/Layout/Box/Box";
import MainNavigation from "@/components/MainNavigation/MainNavigation";
import Typography from "@/components/DataDisplay/Typography/Typography";
import Container from "@/components/Layout/Container/Container";
import Stack from "@/components/Layout/Stack/Stack";
import { Building2, User } from "lucide-react";
import Input from "@/components/Inputs/Input/Input";
import Button from "@/components/Inputs/Button/Button";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import client from "@/lib/apolloclient";

const Page = () => {
  const [activeTab, setActiveTab] = useState<"agency" | "myself">("agency");
  const [companyName, setCompanyName] = useState("");
  const [website, setWebsite] = useState("");
  const [error, setError] = useState({ company: "", website: "", general: "" });
  const router = useRouter();
  const formState = useSelector((state: any) => state.form);

  const [createAgency] = useMutation(CREATE_AGENCY, {
    client, // Add Apollo client instance
  });

  const validateWebsite = (url: string) => {
    if (!url) return false;
    try {
      // Add http:// if not present
      const urlToTest = url.startsWith('http') ? url : `https://${url}`;
      new URL(urlToTest);
      return true;
    } catch {
      return false;
    }
  };

  const handleNavigate = () => {
    router.push("/dashboardEmpty");
  };

  const handleCreateAgency = async () => {
    try {
      setError({ company: "", website: "", general: "" });
      console.log('FormState:', formState); // Add this to debug
      if (!formState.userId) {
        setError(prev => ({ ...prev, general: "User ID is required" }));
        return;
      }

      // Validation checks
      if (!companyName.trim()) {
        setError(prev => ({ ...prev, company: "Company name is required" }));
        return;
      }

      if (!website.trim()) {
        setError(prev => ({ ...prev, website: "Website URL is required" }));
        return;
      }

      const websiteUrl = website.trim().startsWith('http') 
        ? website.trim() 
        : `https://${website.trim()}`;

      const input = {
        name: companyName.trim(),
        website: websiteUrl,
        ownerId: formState.userId,
      };
      
      console.log('Mutation Input:', input); // Add this to debug

      const response = await createAgency({
        variables: { input }
      });

      if (response.data?.createAgency) {
        router.push("/dashboardEmpty");
      }
    } catch (error: any) {
      const message = error.graphQLErrors?.[0]?.message || error.message;
      setError(prev => ({ ...prev, general: message }));
      console.error('Error creating agency:', error);
    }
  };

  const handleClick = (tab: "agency" | "myself") => {
    setActiveTab(tab);
  };

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
                  <Input 
                    label="Company Name" 
                    sx={{ width: "438px" }} 
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    error={error.company ? true : undefined}
                    statusText={error.company}
                  />
                  <Input 
                    label="Custom URL" 
                    sx={{ width: "438px" }} 
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    error={error.website ? true : undefined}
                    statusText={error.website}
                    placeholder="example.com"
                  />
                </Stack>
                {error.general && (
                  <Typography color="error" sx={{ marginTop: "12px" }}>
                    {error.general}
                  </Typography>
                )}
                <Button
                  onClick={handleCreateAgency}
                  variant="contained"
                  sx={{ display: "block", marginTop: "24px" }}
                >
                  Continue
                </Button>
              </Box>
            )}
            {activeTab === "myself" && (
              <Box>
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
