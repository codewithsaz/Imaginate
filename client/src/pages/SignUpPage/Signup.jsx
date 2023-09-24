import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const Signup = () => {
  const { handleGoogle, loading, error } = useFetch(
    "http://localhost:8080/signup"
  );
  // console.log(import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID);
  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleGoogle,
      });

      google.accounts.id.renderButton(document.getElementById("signUpDiv"), {
        // type: "standard",
        theme: "filled_black",
        // size: "small",
        text: "continue_with",
        shape: "pill",
      });

      google.accounts.id.prompt();
    }
  }, [handleGoogle]);

  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  async function handleSignUp() {
    console.log(name, email, password);
    try {
      const res = await axios.post(
        "http://localhost:8080/user/signup",
        {
          name: name,
          email: email,
          password: password,
        },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data);
      if (res) {
        const data = res.data;
        if (data?.user) {
          localStorage.setItem("user", JSON.stringify(data?.user));
          window.location.reload();
        }
        throw new Error(data?.message || data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-5 pt-11">
      <Card className=" w-80 sm:w-96 m-5 mt-10">
        {loading ? (
          <>
            <CardBody className="flex flex-col gap-4">
              <div
                id="loginDiv"
                data-text="login_with"
                className=" flex items-center justify-center"
              ></div>
              <div className=" flex items-center justify-center">
                <LoadingAnimation />
              </div>
            </CardBody>
          </>
        ) : (
          <>
            <CardHeader
              variant="gradient"
              color="gray"
              className="mb-4 grid h-28 place-items-center"
            >
              <Typography variant="h3" color="white">
                Sign Up
              </Typography>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
              <div
                id="signUpDiv"
                data-text="signup_with"
                className=" flex items-center justify-center"
              ></div>
              <Input
                label="Name"
                size="lg"
                onChange={(event) => {
                  setname(event.target.value);
                }}
              />

              <Input
                label="Email"
                size="lg"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
              <Input
                label="Password"
                size="lg"
                onChange={(event) => {
                  setpassword(event.target.value);
                }}
              />
              <div className="-ml-2.5">
                <Checkbox label="I agree the Terms and Conditions" />
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              <Button variant="gradient" fullWidth onClick={handleSignUp}>
                Sign Up
              </Button>
              <Typography variant="small" className="mt-6 flex justify-center">
                Already have an account?
                <Typography
                  as="a"
                  href="/login"
                  variant="small"
                  color="blue-gray"
                  className="ml-1 font-bold"
                >
                  Login
                </Typography>
              </Typography>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  );
  {
    /* return (
    <>
      <nav style={{ padding: "2rem" }}>
        <Link to="/">Go Back</Link>
      </nav>
      <header style={{ textAlign: "center" }}>
        <h1>Register to continue</h1>
      </header>
      <main
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {error && <p style={{ color: "red" }}>{error}</p>}
        {loading ? (
          <div>Loading....</div>
        ) : (
          <div id="signUpDiv" data-text="signup_with"></div>
        )}
      </main>
      <footer></footer>
    </>
  ); */
  }
};

export default Signup;
