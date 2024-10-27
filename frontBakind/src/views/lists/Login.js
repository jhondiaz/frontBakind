// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
} from "reactstrap";
import React, { useState } from "react";
import api from 'axiosConfig' ;

const Login = () => {
  const [username, setUsername] = useState("Admin");
  const [password, setPassword] = useState("Admin");
  const [error, setError] = useState("");

  const onClickLogIn = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/Authentication/Login",
        {
          username,
          password,
        }
      );
      console.log(response.data);

      const { code } = response.data;

      if (code === "Success") {
        const { token } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        window.location.href = "/admin/index";
      }
    } catch (err) {
      console.error("Error logging in:", err);
      setError("Invalid username or password");
    }
  };

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-3">
              <small>Iniciar sesión</small>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-circle-08" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="User"
                    type="text"
                    autoComplete="new-email"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    required
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                  />
                </InputGroup>
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                {error && <p style={{ color: "red" }}>{error}</p>}
              </div>
              <div className="text-center">
                <Button
                  className="my-4"
                  color="primary"
                  type="button"
                  onClick={onClickLogIn}
                >
                  Entrar
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Login;
