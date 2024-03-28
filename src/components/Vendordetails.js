import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Sidenav from "./Sidenav";
import Header from "./Header";
import { Button, ButtonToolbar } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import DataTable from "react-data-table-component";
import * as XLSX from "xlsx";

function Vendordetails() {
  const [show, setShow] = useState(false);
  const [amt, setamt] = useState("")
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { id } = useParams();
  const [data, setdata] = useState({});
  const [servicedata, setservicedata] = useState([]);
  const [totalRecords, setTotalRecords] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterdata, setfilterdata] = useState([]);
  console.log("servicedata", servicedata)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const rowDataString = urlParams.get("rowData");
    const rowData = JSON.parse(rowDataString);
    setdata(rowData);
    // Use rowData in your component

  }, [id]);

  console.log("id", id)
  useEffect(() => {
    const getVendorServices = async () => {
      try {
        const res = await axios.get(`https://api.vijayhomeservicebengaluru.in/api/getfindwithtechid/${id}`);
        if (res.status === 200) {
          setservicedata(res.data?.techservicedata);
          setfilterdata(res.data?.techservicedata);
        }
      } catch (error) {
        // Handle error if needed
        console.error("Error fetching vendor services:", error);
      }
    };

    getVendorServices();

    // Cleanup function (if needed)
    return () => {
      // Cleanup code (if needed)
    };
  }, [id, setservicedata]);


  const updateRecharge = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `https://api.vijayhomesuperadmin.in/api/updatevendorAmt/${id}`,
        { vendorAmt: amt },
        { headers: { "content-type": "application/json" } }
      );

      if (response.status === 200) {
        handleClose();
        alert("Successfully Added");
        window.location.reload("/vendor");
      }
    } catch (error) {
      console.log("Error response:", error.response);
      handleClose();

      if (error.response) {
        alert(error.response.data.error || "Something went wrong");
      } else {
        alert("Network error or something went wrong");
      }
    }
  };


  const [penaltydata, setvendorPenaltydata] = useState([]);

  useEffect(() => {
    getpenality();
  }, []);

  const getpenality = async () => {
    let res = await axios.get(`https://api.vijayhomeservicebengaluru.in/api/getvPenalty/${id}`);
    if (res.status === 200) {
      setvendorPenaltydata(res.data?.vPenalty);
    }
  };



  const totalPenalty = penaltydata.reduce((total, item) => {
    return total + parseInt(item?.vPenalty);
  }, 0);



  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-based, so we add 1
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const columns = [
    {
      name: "Sl  No",
      selector: (row, index) => (currentPage - 1) * 15 + index + 1,
    },
    {
      name: "Customer Name",
      selector: (row) => row.serviceInfo[0]?.customerData[0]?.customerName,
    },
    {
      name: "Email",
      selector: (row) => row.serviceInfo[0]?.customerData[0]?.email,
    },
    {
      name: "City",
      selector: (row) => row.serviceInfo[0]?.city,
    },

    {
      name: "Contact",
      selector: (row) => row.serviceInfo[0]?.customerData[0]?.mainContact,
    },

    {
      name: "Service ",
      selector: (row) => row.serviceInfo[0]?.service,
    },
    {
      name: "SG ",
      selector: (row) => row.serviceInfo[0]?.GrandTotal,
    },
    {
      name: "Vendor Charge",
      selector: (row) => {
        const vendorChargeAmount = parseFloat(row.vendorChargeAmount);
        return vendorChargeAmount.toFixed(1);
      },
    },
    {
      name: "PM ",
      selector: (row) => row.serviceInfo[0]?.paymentMode,
    },
    {
      name: "Booked Date",

      cell: (row) => (


        <div >{row.serviceInfo[0]?.date} <br />{row.serviceInfo[0]?.time}</div>

      ),
    },

    {
      name: "Before Img",

      cell: (row) => (


        <div >
          <img src={`https://api.vijayhomeservicebengaluru.in/addcall/${row?.bImg}`} width={100} height={100} />
        </div>

      ),
    },
    {
      name: "After Img",

      cell: (row) => (


        <div >
          <img src={`https://api.vijayhomeservicebengaluru.in/addcall/${row?.sImg}`} width={100} height={100} />
        </div>

      ),
    },
    {
      name: "payment Img",

      cell: (row) => (


        <div >
          <img src={`https://api.vijayhomeservicebengaluru.in/addcall/${row?.pImg}`} width={100} height={100} />
        </div>

      ),
    },
    {
      name: "DS",

      cell: (row) => (


        <div >
          <img src={row?.dsImg} width={100} height={100} />
        </div>

      ),
    },
    {
      name: "Service Date",
      selector: (row) => row.serviceDate,
    },

  ];

  const exportData = () => {
    const fileName = "Vendor_Report.xlsx";

    // Assuming each object in searchResults has properties like 'category' and 'img'
    const filteredData1 = filterdata?.map(item => ({
      CustomerName: item.serviceInfo[0]?.customerData[0]?.customerName,
      category: item?.category,

      city: item?.serviceInfo[0]?.city,
      number: item?.serviceInfo[0]?.customerData[0]?.mainContact,
      desc: item?.serviceInfo[0]?.desc,
      amount: item?.serviceInfo[0]?.GrandTotal,
      vendorCharge: item.vendorChargeAmount,
      BD: item.serviceInfo[0]?.date,
      SD: item.serviceDate,
      service: item?.serviceInfo[0]?.service,
      paymentmode: (item?.serviceInfo[0]?.paymentMode),

    }));

    const worksheet = XLSX.utils.json_to_sheet(filteredData1);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Category Data");
    XLSX.writeFile(workbook, fileName);
  };

  return (
    <div div className="row">
      <div className="col-md-2">
        <Sidenav />
      </div>
      <div className="col-md-10">
        <Header />

        <div>
          <h5 style={{ color: "#a33535" }}>Vendor Details</h5>
        </div>
        <div className="row">
          <div className="col-6">
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              className="img"
            />
            <p className="vp">
              Name:
              <b>{data?.vhsname}</b>
            </p>
            <p className="vp">
              Number:
              <b>{data?.number}</b>
            </p>
            <p className="vp">
              Experiance:
              <b>{data?.experiance}</b>
            </p>
            <p className="vp">
              Language:
              <b>{data?.languagesknow}</b>
            </p>
            <p className="vp">
              Password:
              <b>{data?.password}</b>
            </p>
          </div>
          <div className="mt-5 col-6">
            <div className="wallet">
              <div>
                <i
                  class="fa-solid fa-wallet fa-beat"
                  style={{ color: "rgb(139, 20, 20)", fontSize: "60px" }}
                ></i>
              </div>
              <div>
                <h5>
                  <b>Wallet Balance</b>
                </h5>
                <div>
                  <b style={{ fontSize: "25px" }}>
                    <i class="fa-solid fa-indian-rupee-sign"></i>{data?.vendorAmt}
                  </b>
                </div>

                <Button
                  style={{
                    background: "rgb(176, 39, 39)",
                    marginTop: "10px",
                    border: "none",
                  }}
                  onClick={handleShow}
                >
                  Recharge{" "}
                </Button>
              </div>
            </div>
            <div>
              <h4>Penalty Charges= {totalPenalty} Rs</h4>
            </div>
          </div>
        </div>
        <h5 className="mt-4">Services list</h5>

        <button
          className="ps-3 pt-2 pb-2 pe-3 ms-2"
          style={{
            border: 0,
            color: "white",
            backgroundColor: "#a9042e",
            borderRadius: "5px",
            width: "150px",
            float: "right"
          }}
          onClick={exportData}
        >
          <i
            class="fa-solid fa-download"
            title="Download"
          // style={{ color: "white", fontSize: "27px" }}
          ></i>{" "}
          Export
        </button>
        <div className="mt-1 border">
          <DataTable
            columns={columns}
            data={filterdata}
            pagination
            paginationServer
            paginationTotalRows={totalRecords}
            paginationPerPage={15}
            paginationRowsPerPageOptions={[15, 30, 50]}
            onChangePage={(current) => setCurrentPage(current)}
            selectableRowsHighlight
            subHeaderAlign="left"
            highlightOnHover
          />
        </div>

        {/* <table className="table">
          <thead className="table-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Customer Name</th>
              <th scope="col">Email</th>
              <th scope="col">City</th>
              <th scope="col">Contact</th>
              <th scope="col">Service</th>
              <th scope="col">SG</th>
              <th scope="col">Vendor Charge</th>
              <th scope="col">PM</th>
              <th scope="col">Booked Date</th>
              <th scope="col">Before Img</th>
              <th scope="col">After Img</th>
              <th scope="col">payment Img</th>
              <th scope="col">Service Date</th>
            </tr>
          </thead>
          <tbody>
            {
              filterdata?.map((i, index) => (

                <tr>
                  <th scope="row">{index + 1}</th>
                  <td> {i.serviceInfo[0]?.customerData[0]?.customerName} </td>
                  <td> {i.serviceInfo[0]?.customerData[0]?.email} </td>
                  <td>  {i.serviceInfo[0]?.city}</td>
                  <td> {i.serviceInfo[0]?.customerData[0]?.mainContact}  </td>
                  <td>{i.serviceInfo[0]?.service}  </td>
                  <td>{i.serviceInfo[0]?.GrandTotal}  </td>
                  <td> {i.vendorChargeAmount} </td>
                  <td>{i.serviceInfo[0]?.paymentMode}  </td>
                  <td>{i.serviceInfo[0]?.date} <br />{i.serviceInfo[0]?.time} </td>
                  <td>  <div >
                    <img src={`https://api.vijayhomeservicebengaluru.in/addcall/${i?.bImg}`} width={100} height={100} />
                  </div> </td>
                  <td>  <div >
                    <img src={`https://api.vijayhomeservicebengaluru.in/addcall/${i?.sImg}`} width={100} height={100} />
                  </div>
                  </td>
                  <td>   <div >
                    <img src={`https://api.vijayhomeservicebengaluru.in/addcall/${i?.pImg}`} width={100} height={100} />
                  </div></td>
                  <td> {i.serviceDate} </td>

                </tr>

              ))
            }
          </tbody>
        </table> */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Recharge to vendor wallet</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              type="number"
              class="form-control mt-4"
              placeholder="100"
              aria-label="Username"
              onChange={(e) => setamt(e.target.value)}
              aria-describedby="basic-addon1"
              style={{
                width: "100%",

                borderRadius: "3px",
                borderLeft: "2px solid #a9042e",
              }}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              CANCLE
            </Button>
            <Button variant="primary" onClick={updateRecharge}>
              ADD
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Vendordetails;
