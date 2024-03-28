import React, { useState, PureComponent, useEffect } from "react";
import Header from "../components/Header";
// import Sidenav from "./Sidenav";
import Chart from "react-apexcharts";

import { useContext } from "react";
// import { CreateToggle } from "./TogglerProvider";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Sidenav from "./Sidenav";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgb(176, 39, 39)",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function Dashboard() {
  // const { light } = useContext(CreateToggle);

  const [userdata, setuserdata] = useState();
  const [Servicedata, setServicedata] = useState();
  const [paymentdata, setpaymentdata] = useState([]);
  const [displayedRows, setDisplayedRows] = useState(5);

  const showAllRows = () => {
    setDisplayedRows(paymentdata.length);
  };
  const showFewerRows = () => {
    setDisplayedRows(5);
  };

  useEffect(() => {
    getappcustomer();
    getservicemanagement();
    getapppauyments();
  }, []);

  const getappcustomer = async () => {
    let res = await axios.get("https://api.vijayhomesuperadmin.in/api/gettotalcustomerlength");
    if ((res.status = 200)) {
      setuserdata(res.data?.totalRecords);
    }
  };

  const getapppauyments = async () => {
    let res = await axios.get(
      "https://api.vijayhomesuperadmin.in/api/payment/service/paywithuserdata"
    );
    if ((res.status = 200)) {
      setpaymentdata(res.data?.userdata);
    }
  };

  const totalAmount = paymentdata.reduce(
    (total, item) => total + item.data.amount,
    0
  );
  const formattedAmt = totalAmount / 100;

  const getservicemanagement = async () => {
    let res = await axios.get("https://api.vijayhomesuperadmin.in/api/getbookingservicelength");
    if ((res.status = 200)) {
      console.log("res.data?.totalRecords",res.data?.totalRecords)
      setServicedata(res.data?.totalRecords);
    }
  };

  const formatdate = (fdate) => {
    const date = new Date(fdate);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  };

  const [state, setState] = useState({
    options: {
      colors: ["rgb(176, 39, 39)", "#fff"],
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
    },
    series: [
      {
        name: "Payment Counts",
        data: [],
      },
    ],
  });

  useEffect(() => {
    const dateCounts = {};

    // Count payments for each date
    paymentdata.forEach((payment) => {
      const createdAt = new Date(payment.createdAt);
      const month = createdAt.getMonth();
      dateCounts[month] = (dateCounts[month] || 0) + 1;
    });

    // Extract the counts for each month
    const counts = Array.from(
      { length: 12 },
      (_, month) => dateCounts[month] || 0
    );

    // Update the state with the new data
    setState((prevState) => ({
      ...prevState,
      series: [
        {
          ...prevState.series[0],
          data: counts,
        },
      ],
    }));
  }, [paymentdata]);

  return (
    <div className="row black container_box">
      <div className="col-md-2 ">
        <Sidenav />
      </div>
      <div className="col-md-10 ">
        <Header />
      
       <h6>Dashboard</h6>
      </div>
    </div>
  );
}

export default Dashboard;
