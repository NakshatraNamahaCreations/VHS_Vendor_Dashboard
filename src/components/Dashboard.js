import React, { useState, useEffect } from "react";
import Header from "./Header";
import Sidenav from "./Sidenav";

import { useContext } from "react";
import { CreateToggle } from "./TogglerProvider";
import axios from "axios";

function Dashboard() {
  const [userdata, setuserdata] = useState();
  const [techniciandata, settechniciandata] = useState([]);
  const [vendordata, setvendordata] = useState();

  useEffect(() => {
    getappcustomer();
    gettechnician();
    getapppauyments();
  }, []);

  const getappcustomer = async () => {
    let res = await axios.get(
      "https://api.vijayhomesuperadmin.in/api/gettotalcustomerlength"
    );
    if ((res.status = 200)) {
      setuserdata(res.data?.totalRecords);
    }
  };

  const getapppauyments = async () => {
    let res = await axios.get(
      "https://api.vijayhomesuperadmin.in/api/totalvendors"
    );
    if ((res.status = 200)) {
      setvendordata(res.data?.totalRecords);
    }
  };

  const gettechnician = async () => {
    let res = await axios.get(
      "https://api.vijayhomesuperadmin.in/api/getalltechnician"
    );
    if ((res.status = 200)) {
      settechniciandata(
        res.data?.technician.filter((i) => i.Type === "outVendor")
      );
    }
  };

  return (
    <div className="row ">
      <div className="col-md-2 ">
        <Sidenav />
      </div>
      <div className="col-md-10 ">
        <Header />
        <div className="row ">
          <div className="col-6">
            <div className="row m-auto  mt-3">
              <div className="col-md-6">
                <div className="card home-col shadow p-3 mb-5  rounded">
                  <div className="card-body">
                    <img src="customer.png" width="50px" />

                    <div className="home-content">Customer</div>
                    <div className="home-desc">{userdata}</div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card home-col shadow p-3 mb-5  rounded">
                  <div className="card-body">
                    <img src="vendor.png" width="50px" />

                    <div className="home-content">Vendor</div>
                    <div className="home-desc">{techniciandata?.length}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
