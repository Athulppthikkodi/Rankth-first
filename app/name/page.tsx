"use client";
import React from "react";
import Box from "@/components/Layout/Box/Box";
import MainNavigation from "@/components/MainNavigation/MainNavigation";
import Typography from "@/components/DataDisplay/Typography/Typography";
import Input from "@/components/Inputs/Input/Input";
import Button from "@/components/Inputs/Button/Button";
import Container from "@/components/Layout/Container/Container";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setNameData } from "@/store/slices/formSlice";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "@/graphql/mutations/createUser";
import client from "@/lib/apolloclient";

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const formState = useSelector((state: any) => state.form);
console.log("formState", formState);
  const [createUser] = useMutation(CREATE_USER, {
    client,
    onCompleted: (data) => {
      dispatch(
        setNameData({
          firstName: data.createUser.firstName,
          lastName: data.createUser.lastName,
          userId: data.createUser.id // Store the user ID
        })
      );
      router.push("/use");
    },
    onError: (error) => {
      console.error("Error creating user:", error);
      // Handle specific error cases if needed
      const message = error.graphQLErrors?.[0]?.message || error.message;
      alert(`Failed to create user: ${message}`);
    },
  });

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();
    try {
      await createUser({
        variables: {
          input: {
            firstName: formState.firstName,
            lastName: formState.lastName,
            email: formState.email,
            password: formState.password,
            role: formState.role,
          
          },
        },
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    const { name, value } = e.target as HTMLInputElement;
    dispatch(setNameData({
      firstName: name === 'firstName' ? value : formState.firstName,
      lastName: name === 'lastName' ? value : formState.lastName,
    }));
  }

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
          <form action="" onSubmit={handleSubmit}>
            <Input
              name="firstName"
              label="First Name"
              sx={{ marginBottom: "19px", width: "438px" }}
              value={formState.firstName}
              onChange={handleChange}
            />
            <Input
              name="lastName"
              label="Last Name"
              sx={{ marginBottom: "23px", width: "438px" }}
              value={formState.lastName}
              onChange={handleChange}
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

export default Page;
