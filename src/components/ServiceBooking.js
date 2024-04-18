import React, { useEffect, useState } from "react";
import Header from "./Header";
import Sidenav from "./Sidenav";
import Button from "react-bootstrap/Button";
import axios from "axios";
import DataTable from "react-data-table-component";

function ServiceBooking() {
  const [servicedata, setServicedata] = useState([]);

  const [searchItems, setSearchItems] = useState("");
  const [totalRecords, setTotalRecords] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterdata, setfilterdata] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.vijayhomesuperadmin.in/api/getbookingservicepagewise?page=${currentPage}&search=${searchItems}`
        );
        const result = await response.json();

        setServicedata(result?.service);
        setfilterdata(result?.service);
        setTotalRecords(result?.totalRecords); // Assuming you have a state variable for total records
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentPage, searchItems]);

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
      selector: (row) => row.customerData[0]?.customerName,
    },
    {
      name: "Email",
      selector: (row) => row.customerData[0]?.email,
    },
    {
      name: "City",
      selector: (row) => row.city,
    },

    {
      name: "Contact",
      selector: (row) => row.customerData[0]?.mainContact,
    },

    {
      name: "Service ",
      selector: (row) => row.service,
    },
    {
      name: "SG ",
      selector: (row) => row.serviceCharge,
    },
    {
      name: "PM ",
      selector: (row) => row.paymentMode,
    },
    {
      name: "Booked Date",
      // selector: (row) => row.date,
      cell: (row) => (
        <div>
          {row.date} <br />
          {row.time}
        </div>
      ),
    },
    {
      name: "Service Date",
      cell: (row) => (
        <div>
          {row?.dividedDates?.map((dateInfo) => (
            <div key={dateInfo.id}>{formatDate(dateInfo.date)}</div>
          ))}
        </div>
      ),
    },
    {
      name: "GT ",
      selector: (row) => row.GrandTotal,
    },
  ];

  return (
    <div className="row">
      <div className="col-md-2">
        <Sidenav />
      </div>
      <div className="col-md-10">
        <Header />
        <div className="row  set_margin ">
          <div>
            <div className="d-flex  mt-3">
              <h4 style={{ color: "#FF0060" }}>Service Orders </h4>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="mt-5">
            <input
              type="text"
              placeholder="Search by name /number"
              className="w-25 form-control"
              value={searchItems}
              onChange={(e) => setSearchItems(e.target.value)}
            />
          </div>
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
        </div>
      </div>
    </div>
  );
}

export default ServiceBooking;
