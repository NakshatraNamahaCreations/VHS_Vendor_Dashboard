import React from "react";
import moment from "moment";

export default function Header() {
  return (
    <div className="row m-auto">
      <div style={{ background: "rgb(176, 39, 39)", padding: "10px" }}>
        <div className="row ">
          <div className="col-md-4">
            <p
              style={{
                color: "white",
                fontSize: "18px",
                padding: "3px",
                marginBottom: "0",
              }}
            >
              VIJAYA HOME SERVICE
            </p>
          </div>
          <div className="col-md-4">
            <p
              style={{
                color: "white",
                fontSize: "18px",
                padding: "3px",
                marginBottom: "0",
                textAlign: "center",
              }}
            >
              {" "}
              {moment().format("MMMM Do YYYY, h:mm:ss a")}
            </p>
          </div>
          <div className="col-md-4" style={{ textAlign: "end" }}>
            {/* <img
              src="/images/vhs.png"
              className="img-fluid"
              style={{ width: "40px", textAlign: "end" }}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
