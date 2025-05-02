"use client";
import Register from "@/components/register/Register";
import User from "@/components/user/User";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "@/graphql/mutations/createUser";
import client from "@/lib/apolloclient";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setNameData } from "@/store/slices/formSlice";

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [createUser] = useMutation(CREATE_USER, {
    client,
    onCompleted: (data) => {
      console.log("User created successfully:", data);

      dispatch(
        setNameData({
          firstName: data.createUser.firstName,
          lastName: data.createUser.lastName,
          userId: data.createUser.id,
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

  const [data, setData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const [initalClicked, setInitalClicked] = useState(false);

  const initialOnClick = () => {
    setInitalClicked(true);
  };

  const onUpdate = (data: {
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
  }) => {
    setData((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { email, password, firstName, lastName } = data;
      await createUser({
        variables: {
          input: {
            email,
            password,
            firstName,
            lastName,
            role: "SYSTEM_ADMIN",
          },
        },
      });
      // Handle successful user creation (e.g., redirect or show success message)
      console.log("User created successfully:", data);
    } catch (error: any) {
      console.error("Error creating user:", error);
      // Handle specific error cases if needed
      const message = error.graphQLErrors?.[0]?.message || error.message;
      alert(`Failed to create user: ${message}`);
    }
  };

  return initalClicked ? (
    <User onUpdateFristNameAndLastName={onUpdate} onSubmit={onSubmit} />
  ) : (
    <Register
      initalOnClick={initialOnClick}
      onUpdateEmailAndPassword={onUpdate}
    />
  );
};
export default Page;
