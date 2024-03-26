import React, { useState, useEffect } from "react";

import {
  ProSidebar, Menu,
  MenuItem,
  SubMenu,
} from 'react-pro-sidebar';

import "react-pro-sidebar/dist/css/styles.css";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

function Sidenav() {
  const admin = JSON.parse(localStorage.getItem("admin"));
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const Logout = async (e) => {
    e.preventDefault();
    try {
      const config = {
        url: `/super/logout/${admin?._id}`,
        method: "post",
        baseURL: "https://api.vijayhomesuperadmin.in/api",
        headers: { "content-type": "application/json" },
        data: {},
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          alert("Signout succesfully");

          window.location.assign("/");
          localStorage.removeItem("admin");
        } else {
          // alert(data.response);
          alert(response.data.error);
        }
      });
    } catch (error) {
      alert("something went wrong");
    }
  };
  return (
    <div>
      <ProSidebar>
        <div className="row justify-content-center mt-2">
          {/* <img
            src="/images/vhs.png"
            className="img-fluid"
            style={{ width: "100px" }}
          /> */}
          <h6
            className="text-center pt-1"
            style={{ color: "black", fontWeight: "bold", fontSize: "21px" }}
          >
            Vijay Home Services
          </h6>
        </div>
        <Menu iconShape="square">
          <MenuItem>
            Dashboard <Link to="/home" />
          </MenuItem>

          <SubMenu title="Banners">
            {/* <MenuItem>
              First Slider <Link to="/banner" />
            </MenuItem> */}
          
            <MenuItem>
              offerAnnouncement
              <Link to="/offerAnnouncement" />
            </MenuItem>
          </SubMenu>

         
        
        
       

          <MenuItem>
            Services Booking
            <Link to="/ServiceBooking" />
          </MenuItem>
          <MenuItem>
           Enquiry
            <Link to="/enquiry" />
          </MenuItem>
          <MenuItem>
           Help Numbers
            <Link to="/whatsappandphonenumber" />
          </MenuItem>
            <MenuItem>
              Vendors  <Link to="/vendor" />
            </MenuItem>
            <MenuItem>
              Training  <Link to="/Training" />
            </MenuItem>
            <MenuItem>
              Vendor Settings  <Link to="/VendorSetting" />
            </MenuItem>
      
            <MenuItem>
              Reports  <Link to="/report" />
            </MenuItem>
          {/* <MenuItem>
            Settings <Link to="/settings" />{" "}
          </MenuItem> */}
          <MenuItem>
            <a onClick={handleShow}> Logout </a>
          </MenuItem>
        </Menu>
      </ProSidebar>

      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Body style={{ fontSize: "20px", textAlign: "center" }}>
            Are you sure you wnat to logout
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              NO
            </Button>
            <Button variant="primary" onClick={Logout}>
              YES
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Sidenav;
