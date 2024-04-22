import React, { useState } from "react";
import "./style/useraction.css";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import { Button } from "react-bootstrap";
import Sidenav from "../Sidenav";
import Header from "../Header";
import axios from "axios";

const steps = [
  // "Choose Channel",
  "Set Audience",
  "Add Content",
  "Publish Notification",
];

function UserAction() {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [bannerImage, setBannerImage] = useState(null);
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [title, settitle] = useState("");
  const [body, setbody] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const PublishNotification = async (e) => {
    e.preventDefault();
    try {
      const config = {
        url: "/notification/fcmpushnotificationoutvendor",
        method: "post",
        baseURL: "https://api.vijayhomeservicebengaluru.in/api",
        headers: { "content-type": "application/json" },
        data: { title: title, body: body },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          alert("Succesfulll");
          window.location.assign("/notification");
        } else {
          // alert(data.response);
          alert(response.data.error);
        }
      });
    } catch (error) {
      console.log("error notifin", error);
    }
  };

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    // setActiveStep(0);
    window.location.assign("/campaigns/list");
  };

  const styles = {
    uploadImage: {
      // border: "1px dashed #25cff2",
      padding: "12px 18px",
      backgroundColor: "rgba(21, 192, 230, 0.1)",
      width: "155px",
      // height: "150px",
      display: "flex",
      justifyContent: "center",
      borderRadius: "8px",
      fontSize: "12px",
      cursor: "pointer",
    },
    insideBox: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#25cff2",
    },

    bannerImageCont: {
      width: "200px",
      height: "150px",
    },
    imgStateText: {
      fontSize: "14px",
      fontStyle: "normal",
      fontFamily: "inherit",
      fontWeight: "600",
      lineHeight: "16px",
      paddingLeft: "11px",
      color: "rgb(239, 105, 30)",
    },
    selectField: {
      width: "100%",
      border: "1px solid rgb(216, 224, 240)",
      // borderRadius: "16px",
      fontSize: "16px",
      backgroundColor: "white",
      outline: "none",
      backgroundPosition: "10px 10px",
      backgroundRepeat: "no-repeat",
      padding: "12px 18px 11px 13px",
      lineHeight: "20px",
      // boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    },
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Typography variant="body1">
            <div
              class="addCourseSection-0-1-699 mt-4"
              style={{ height: "60vh" }}
            >
              <div class="addCourseForm-0-1-700">
                <div class="sectionContainer-0-1-723">
                  <div class="marginLeft-0-1-718">
                    <div class="abountInfo-0-1-719">
                      I want to select my target audience based on user activity
                    </div>
                    <div>
                      <select
                        className="form-select mt-3"
                        checked={selectedOption === "1"}
                        onChange={handleOptionChange}
                        // style={{ borderRadius: "19px" }}
                      >
                        <option>Select</option>
                        <option>All vendors</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Typography>
        );
      case 1:
        return (
          <>
            {selectedOption ? (
              <div className="mt-4 mb-5">
                <div class="content">
                  <div class="headingInfoText-0-1-701">Title</div>
                  <div class="editInput-0-1-729 undefined" tabindex="0">
                    <div class="labelContainer-0-1-730">
                      <label class="editInputLabel-0-1-731" for="title"></label>
                    </div>
                    <div>
                      <textarea
                        className="textarea-0-1-732 textAreaDesc-0-1-724"
                        placeholder="Yay! New offer available."
                        onChange={(e) => settitle(e.target.value)}
                      />
                    </div>
                  </div>
                  <div class="headingInfoText-0-1-701">
                    Description (optional)
                  </div>
                  <textarea
                    className="textarea-0-1-732 textAreaDesc-0-1-724"
                    onChange={(e) => setbody(e.target.value)}
                  />

                  {/* <div
                    class="headingInfoText-0-1-701"
                    style={{ marginBottom: "12px" }}
                  >
                    Image (optional)
                  </div> */}
                  {/* <div style={styles.uploadImage}>
                    <div className="d-flex p-2" style={styles.insideBox}>
                      <i class="fa-solid fa-upload me-1"></i>{" "}
                      <input
                        accept="image/gif,image/jpeg,image/jpeg,image/png,image/webp,image/vnd.wap.wbmp,image/svg+xml,image/tiff"
                        style={{ display: "none" }}
                        id="icon-button-file"
                        type="file"
                        onChange={(e) => handleBannerImageChange(e)}
                      />
                      <label
                        htmlFor="icon-button-file"
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        Upload Image
                      </label>
                    </div>
                  </div> */}

                  {bannerImage && (
                    <img
                      className="mt-2"
                      src={URL.createObjectURL(bannerImage)}
                      style={{
                        width: "155px",
                        height: "150px",
                        borderRadius: "5px",
                      }}
                      alt=""
                    />
                  )}

                  {error ? (
                    <span style={{ color: "red", fontSize: "12px" }}>
                      {error}
                    </span>
                  ) : null}
                </div>
              </div>
            ) : selectedOption === "2" ? (
              <div>two</div>
            ) : selectedOption === "3" ? (
              <div>three</div>
            ) : null}
          </>
        );
      case 2:
        return (
          <>
            <>
              {selectedOption ? (
                <div className="mt-5 mb-5">
                  <div class="content">
                    <div class="headingInfoText-0-1-701">Design</div>
                    <br />
                    <div
                      style={{
                        border: "1px solid black",
                        height: "450px",
                        width: "250px",
                        borderRadius: "10px",
                        padding: "10px",
                        background: "lightgrey",
                      }}
                    >
                      <div
                        style={{
                          borderBottom: "1px solid black",
                          height: "50px",
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "10px",
                        }}
                      >
                        <p>
                          {" "}
                          <i class="fa-solid fa-wifi"></i>
                        </p>
                        <i class="fa-brands fa-bluetooth-b"></i>
                        <p>
                          <i class="fa-solid fa-location-dot"></i>
                        </p>
                        <p>
                          <i class="fa-solid fa-plane-lock"></i>
                        </p>
                      </div>
                      <div
                        style={{
                          background: "white",
                          borderRadius: "10px",
                          paddingLeft: "10px",
                        }}
                      >
                        <img
                          src="/images/vhs.png"
                          className="img-fluid"
                          style={{ width: "15px" }}
                        />
                        <span style={{ fontSize: "10px" }}>Vendor APP .1m</span>
                        <h6 style={{ marginBottom: "0px" }}>{title}</h6>
                        <p style={{ marginTop: "0px", fontSize: "11px" }}>
                          {body}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : selectedOption === "2" ? (
                <div>two</div>
              ) : selectedOption === "3" ? (
                <div>three</div>
              ) : null}
            </>
          </>
        );
      default:
        return null;
    }
  };

  const handleBannerImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file type
      const fileType = file.type;
      if (!fileType.startsWith("image/")) {
        // Display an error message on the screen
        setError("Please upload a valid image file (PNG or JPEG).");
        return;
      }
      // Check file size
      const maxSize = 800 * 600; // 800px x 600px
      if (file.size > maxSize) {
        // Display an error message on the screen
        setError("Image size should be 800px x 600px or smaller.");
        return;
      }
      // Clear any previous errors
      setError(null);
      // Set thumbnail image
      setBannerImage(file);
    }
  };

  return (
    <div div className="row">
      <div className="col-md-2">
        <Sidenav />
      </div>
      <div className="col-md-10 ">
        <Header />
        <div className="addCourseMain-0-1-698 mt-3 p-5">
          <Box sx={{ width: "100%" }}>
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                }
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            <div>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    All steps completed - you&apos;re finished
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button onClick={handleReset}>Reset</Button>
                  </Box>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {getStepContent(activeStep)}
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Button
                      className="px-5 py-2"
                      variant="outline-info"
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      <i class="fa-solid fa-arrow-left-long"></i> &nbsp;Back
                    </Button>
                    {activeStep === steps.length - 1 ? (
                      ""
                    ) : (
                      <Button
                        className="ms-2 px-5"
                        onClick={handleNext}
                        variant="info"
                      >
                        NEXT
                      </Button>
                    )}

                    {activeStep === steps.length - 1 ? (
                      <Button
                        className="ms-2 px-5"
                        onClick={PublishNotification}
                        variant="info"
                      >
                        Publish Notification
                      </Button>
                    ) : (
                      ""
                    )}
                  </Box>
                </React.Fragment>
              )}
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default UserAction;
