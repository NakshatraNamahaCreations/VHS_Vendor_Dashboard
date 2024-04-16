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

// import React, { useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";

// const Sidebar = ({ children }) => {
//   const admin = JSON.parse(sessionStorage.getItem("admin"));
//   const [isOpen, setIsOpen] = useState(
//     JSON.parse(sessionStorage.getItem("sidebarOpen")) ?? true
//   );

//   useEffect(() => {
//     sessionStorage.setItem("sidebarOpen", JSON.stringify(isOpen));
//   }, [isOpen]);

//   const toggle = () => setIsOpen(!isOpen);

//   const menuItem = [
//     {
//       path: "/home",
//       name: "Home",
//     },
//     {
//       path: "/offerAnnouncement",
//       name: "Banners",
//     },
//     {
//       path: "/ServiceBooking",
//       name: "Services Booking",
//     },
//     {
//       path: "/enquiry",
//       name: "Enquiry",
//     },
//     {
//       path: "/whatsappandphonenumber",
//       name: "Help Numbers",
//     },
//     {
//       path: "/vendor",
//       name: "Vendors",
//     },
//     {
//       path: "/Training",
//       name: "Training",
      
//     },
//     {
//       path: "/VendorSetting",
//       name: "Vendor Settings",
      
//     },
//     {
//       path: "/report",
//       name: "Reports",
      
//     },
//     // Add other menu items here...
//   ];

//   // Define active tab CSS class
//   const activeClassName = 'active';

//   return (
//     <div className="row">
//       <div className="col-md-12">
//         <div style={{ width: isOpen ? "180px" : "80px" }} className="sidebar">
//           <div className="top_section">
//             <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
//               Vijay Home Services
//             </h1>
//           </div>
//           {menuItem.map((item, index) => (
//             <NavLink to={item.path} key={index} className="link">
//               <div className="icon">{item.icon}</div>
//               <div
//                 style={{ display: isOpen ? "block" : "none" }}
//                 className="link_text"
//               >
//                 {item.name}
//               </div>
//             </NavLink>
//           ))}
//         </div>
//       </div>
//       <div className="col-md-12">
//         <main style={{ width: "-webkit-fill-available" }}>{children}</main>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
