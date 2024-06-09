import { Button, Flex, Image, Text, TextInput } from "@mantine/core";
import Logo from "../../assets/imgs/Logo.svg";
import LoginImg from "../../assets/imgs/LoginImg.svg";
import { IconLock, IconUser } from "@tabler/icons-react";
import { useState } from "react";
import { requestLogin } from "../../utils/apiCalls";
import { currState, showNotification } from "../../utils/helpers";
import useRouteTypeContext from "../../context/RouteTypeContext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const { setType } = useRouteTypeContext();
  const reqLogin = async () => {
    try {
      if (email === "" || password === "") {
        showNotification("info", "please enter user and password!", "info");
        return;
      }
      const response = await requestLogin({ email, password });
      if (response.status === 200) {
        console.log(response.data);
        if (response.data.employeeType === "user") {
          showNotification("Success", "Logged in successfully!", "success");
          setType(currState.USER);
          Cookies.set("token", response.data.token, {
            expires: 7,
            secure: true,
          });
          navigate("/user/home");
        } else if (response.data.employeeType === "admin") {
          setType(currState.ADMIN);
          showNotification("Success", "Logged in successfully!", "success");
          Cookies.set("token", response.data.token, {
            expires: 7,
            secure: true,
          });
          navigate("/admin/home");
        }
        return;
      } else {
        showNotification("Error", response.data.error, "error");
        setType(currState.UNPROTECTED);
        navigate("/auth/student");
        return;
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Flex className="w-[100vw] h-[100vh] flex-col justify-center items-center">
      <Flex className="w-[100%] h-[25%] justify-center items-center">
        <Image src={Logo} />
      </Flex>
      <Flex className="w-[100%] h-[75%] justify-center items-start">
        <Flex className="w-[50%] h-[100%] flex-col justify-start pt-12 gap-6 items-center">
          <Text fw={900} className=" text-4xl">
            Login
          </Text>
          <TextInput
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            leftSection={<IconUser color="black" />}
            variant="unstyled"
            className=" placeholder:text-black px-3 rounded-xl  bg-[#F0EDFF]"
            placeholder="email"
          />
          <TextInput
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            leftSection={<IconLock color="black" />}
            variant="unstyled"
            className=" placeholder:text-black px-3 rounded-xl  bg-[#F0EDFF]"
            placeholder="password"
          />
          <Button
            onClick={reqLogin}
            color="orange"
            radius={"md"}
            className=" drop-shadow-md"
          >
            <Text c="white" size="md" fw={700}>
              Login
            </Text>
          </Button>
          <Button variant="transparent" color="black">
            Forgot Password
          </Button>
        </Flex>
        <Flex className="w-[50%] h-[100%] justify-center items-start">
          <Image className="w-[70%]" src={LoginImg} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Login;
