import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import moment from "moment";

function Login() {
  const [emailOrName, setEmailOrName] = useState("");
  const [password, setpassword] = useState("");
  const date1 = moment("01-02-2020", "DD-MM-YYYY").valueOf();
  const date2 = moment("01-03-2020", "DD-MM-YYYY").valueOf();

  if (date1 >= date2) {
    console.log("date1 is greater...");
  } else {
    console.log("date2 is greater...");
  }

  const Login = async (e) => {
    e.preventDefault();
    try {
      const config = {
        url: "/super/loginSuperadmin",
        method: "post",
        baseURL: "https://api.vijayhomesuperadmin.in/api",
        headers: { "content-type": "application/json" },
        data: { emailorphone: emailOrName, password: password },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          toast("🦄 Login succesfull", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          localStorage.setItem("admin1", JSON.stringify(response.data.user));

          window.location.assign("/home");
        } else {
          // alert(data.response);
          alert(response.data.error);
        }
      });
    } catch (error) {
      toast.error("Invalid email or password", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div style={{ height: "100vh" }}>
      <div
        className="row justify-content-center"
        style={{ alignItems: "center", height: "100vh" }}
      >
        <div className="col-10" style={{ marginTop: "" }}>
          <ToastContainer position="top-right" />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{}} className="">
              <h1
                style={{
                  color: "rgb(169, 4, 46)",
                  fontSize: "50px",
                  textAlign: "center",
                }}
              >
                Vendor Dashboard
              </h1>
              <Card
                style={{
                  boxShadow: "0px 0px 5px 1px lightgray",
                  backgroundColor: "rgb(232, 232, 232)",
                  padding: 50,
                  width: 600,
                }}
              >
                <div>
                  <div
                    style={{
                      textAlign: "center",
                    }}
                  >
                    {/* <img src="/images/vhs.png" style={{ width: "80px" }} /> */}

                    <h4 className="mt-3">LOGIN TO YOUR ACCOUNT</h4>
                  </div>
                  <div className="inputlogin " style={{ marginTop: "50px" }}>
                    <div
                      class="input-group mb-4 mt-3"
                      style={{ display: "block", width: "100%" }}
                    >
                      <input
                        type="email"
                        class="form-control"
                        placeholder="Email/Name"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        style={{
                          width: "60%",
                          marginLeft: "20%",
                          borderRadius: "3px",
                          borderLeft: "2px solid #a9042e",
                          marginTop: "10px",
                        }}
                        onChange={(e) => setEmailOrName(e.target.value)}
                      />
                      <input
                        type="password"
                        class="form-control mt-4"
                        placeholder="Password"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        style={{
                          width: "60%",
                          marginLeft: "20%",
                          borderRadius: "3px",
                          borderLeft: "2px solid #a9042e",
                        }}
                        onChange={(e) => setpassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div class="form-check" style={{ textAlign: "center" }}>
                    <div>
                      <input
                        className="mx-1"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label class="vhs-sub-heading " for="flexCheckDefault">
                        Remember me
                      </label>
                    </div>
                  </div>

                  <div className="text-center pt-3">
                    <Button
                      style={{
                        width: "200px",
                        padding: "4px",
                        backgroundColor: "#a9042e",
                        border: "none",
                        fontWeight: "bold",
                      }}
                      onClick={Login}
                    >
                      Login
                    </Button>
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      marginTop: "10px",
                      textAlign: "center",
                    }}
                  >
                    <b>Never share your login details with anyone.</b>
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
