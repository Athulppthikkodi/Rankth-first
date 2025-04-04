"use client";
import Stack from "@/components/Layout/Stack/Stack";
import MainNavigation from "@/components/MainNavigation/MainNavigation";
import React from "react";
import Input from "@/components/Inputs/Input/Input";
import Button from "@/components/Inputs/Button/Button";
import Typography from "@/components/DataDisplay/Typography/Typography";
import Grid from "@/components/Layout/Grid/Grid";
import Box from "@/components/Layout/Box/Box";
import Container from "@/components/Layout/Container/Container";
import Logo from "@/components/DataDisplay/Logo/Logo";
import bbdo from "@/public/bbdo.svg";
import semrush from "@/public/semrush.svg";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/name");
  };

  return (
    <Box sx={{ background: "#F1F5F8" }}>
      <MainNavigation items={[]} />
      <Box sx={{ padding: "72px 0 296px" }}>
        <Container>
          <Grid
            container
            spacing={66}
            cols={9}
            size={{ md: { cols: 1 } }}
          >
            <Grid
              sx={{
                background: "#fff",
                padding: "44px",
                boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.05)",
                border: "1px solid #E4E4E7",
                borderRadius: "12px",
                gridColumn: "span 4",
                "@media (max-width: 1024px)": {
                  gridColumn: "span 4",
                },
              }}
              size={{ md: { cols: 1 } }}
            >
              <form onSubmit={handleSubmit}>
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{ textAlign: "center", paddingBottom: "4px" }}
                >
                  Create an account
                </Typography>
                <Typography
                  paragraph
                  sx={{ textAlign: "center", fontSize: "14px", color: "#666" }}
                >
                  Enter your email below to create your account
                </Typography>{" "}
                <Stack
                  direction="row"
                  justifyContent="center"
                  spacing={10}
                  sx={{ padding: "24px 0 23px" }}
                >
                  <Button
                    onClick={() => {
                      console.log("click");
                    }}
                    variant="outlined"
                    sx={{
                      borderColor: "#E4E4E7",
                      textTransform: "capitalize",
                      color: "#09090B",
                      width: "100%",
                    }}
                  >
                    Apple
                  </Button>
                  <Button
                    onClick={() => {
                      console.log("click");
                    }}
                    variant="outlined"
                    sx={{
                      borderColor: "#E4E4E7",
                      textTransform: "capitalize",
                      color: "#09090B",
                      width: "100%",
                    }}
                  >
                    Google
                  </Button>
                </Stack>
                <Typography
                  component="span"
                  sx={{
                    display: "block",
                    fontSize: "12px",
                    textAlign: "center",
                    textTransform: "capitalize",
                    position: "relative",
                    color: "#71717A",
                    marginBottom: "20px",
                    "&::before": {
                      content: '""',
                      display: "block",
                      width: "calc(50% - 12px)",
                      height: "1px",
                      backgroundColor: "#E4E4E7",
                      margin: "0 auto",
                      position: "absolute",
                      left: "0",
                      top: "50%",
                      transform: "translateY(-50%)",
                    },
                    "&::after": {
                      content: '""',
                      display: "block",
                      width: "calc(50% - 12px)",
                      height: "1px",
                      backgroundColor: "#E4E4E7",
                      margin: "0 auto",
                      position: "absolute",
                      right: "0",
                      top: "50%",
                      transform: "translateY(-50%)",
                    },
                  }}
                >
                  or
                </Typography>
                <Input
                  label="Email"
                  placeholder="m@example.com"
                  fullWidth
                  sx={{ marginBottom: "16px" }}
                />
                <Input
                  label="Password"
                  fullWidth
                  sx={{ marginBottom: "24px", fontSize: "14px" }}
                />
                <Button
                  type="submit"
                  onClick={() => {}}
                  sx={{
                    width: "100%",
                    textTransform: "capitalize",
                    background: "#00BC74",
                  }}
                >
                  Create account
                </Button>
              </form>
            </Grid>
            <Grid
              sx={{
                gridColumn: "span 5",
                "@media (max-width: 1024px)": {
                  gridColumn: "span 9",
                },
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontSize: "28px",
                  fontWeight: "500",
                  padding: "116px 0 64px",
                }}
              >
                “30% of SEO projects fail due to{" "}
                <Typography sx={{ color: "#00BC74" }}>
                  inadequate task planning
                </Typography>{" "}
                and management”
              </Typography>
              <Typography sx={{ fontSize: "14px" }}>
                Rankth is recommended by top companies like BBDO, Semrush etc..
              </Typography>
              <Stack direction="row" spacing={32} sx={{ padding: "35px 0" }}>
                <Logo src={bbdo} />
                <Logo src={semrush} />
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Page;
