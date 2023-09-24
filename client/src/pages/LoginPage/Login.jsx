import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
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
import axios from "axios";
import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation";
const Login = () => {
  const { handleGoogle, loading, error, setError } = useFetch(
    "http://localhost:8080/login"
  );

  useEffect(() => {
    if (window.google) {
      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleGoogle,
      });

      google.accounts.id.renderButton(document.getElementById("loginDiv"), {
        // type: "standard",
        theme: "filled_black",
        // size: "small",
        text: "signin_with",
        shape: "pill",
      });

      google.accounts.id.prompt();
    }
  }, [handleGoogle]);

  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  async function handleLogin() {
    try {
      const res = await axios.post(
        "http://localhost:8080/user/login",
        {
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
      } else {
      }
    } catch (error) {
      setError("User Not Found, Please register");
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
                Sign In
              </Typography>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
              <div
                id="loginDiv"
                data-text="login_with"
                className=" flex items-center justify-center"
              ></div>

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
                <Checkbox label="Remember Me" />
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              <Button variant="gradient" fullWidth onClick={handleLogin}>
                Sign In
              </Button>
              {error && (
                <p className="m-2 flex justify-center text-red-900">{error}</p>
              )}
              <Typography variant="small" className="mt-6 flex justify-center">
                Don&apos;t have an account?
                <Typography
                  as="a"
                  href="/signup"
                  variant="small"
                  color="blue-gray"
                  className="ml-1 font-bold"
                >
                  Register
                </Typography>
              </Typography>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  );
  // <>
  //   <nav style={{ padding: "2rem" }}>
  //     <Link to="/">Go Back</Link>
  //   </nav>
  //   <header style={{ textAlign: "center" }}>
  //     <h1>Login to continue</h1>
  //   </header>
  //   <main
  //     style={{
  //       display: "flex",
  //       justifyContent: "center",
  //       flexDirection: "column",
  //       alignItems: "center",
  //     }}
  //   >
  //     {error && <p style={{ color: "red" }}>{error}</p>}
  //     {loading ? <div>Loading....</div> : <div id="loginDiv"></div>}
  //   </main>
  //   <footer></footer>
  // </>
};

export default Login;
