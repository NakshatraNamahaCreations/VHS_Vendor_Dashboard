import React, { useState, useEffect, useContext } from "react";
import Header from "./Header";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { useParams, Link, NavLink } from "react-router-dom";
import * as XLSX from "xlsx";
import Sidenav from "./Sidenav";
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from "moment";


function ReportList() {


    const { date, category } = useParams();
    const [searchResults, setSearchResults] = useState([]);
    const [treatmentData, settreatmentData] = useState([]);

    const [searchJobCatagory, setSearchJobCatagory] = useState("");
    const [searchCustomerName, setSearchCustomerName] = useState("");
    const [city, setcity] = useState("");
    const [searchAddress, setSearchAddress] = useState("");
    const [searchContact, setSearchContact] = useState("");
    const [searchTechName, setSearchTechName] = useState("");
    const [searchJobType, setSearchJobType] = useState("");
    const [searchDesc, setSearchDesc] = useState("");
    const [searchpaymentMode, setsearchpaymentMode] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [Totalcount, setTotalcount] = useState();




    useEffect(() => {
        getservicedata();
    }, []);

    const getservicedata = async () => {
        try {
            let res = await axios.get("https://api.vijayhomeservicebengaluru.in/api/getVendorSeviceReport", {
                params: {
                    category: category,
                    date: date,
                },
            });

            if (res.status === 200) {
                const allData = res.data?.runningdata;

                console.log("res.data?.runningdata", res.data?.runningdata)
                setSearchResults(allData);
                settreatmentData(allData);
            }
        } catch (error) {
            console.log("Error in Search", error);
        }
    };



    useEffect(() => {
        async function filterResults() {
            try {
                let results = treatmentData;
                if (searchJobCatagory) {
                    results = results.filter(
                        (item) =>
                            item.jobCategory &&
                            item.jobCategory
                                .toLowerCase()
                                .includes(searchJobCatagory.toLowerCase())
                    );
                }
                if (searchCustomerName) {
                    results = results.filter(
                        (item) =>
                            item.serviceInfo[0]?.customerData[0]?.customerName &&
                            item.serviceInfo[0]?.customerData[0]?.customerName
                                .toLowerCase()
                                .includes(searchCustomerName.toLowerCase())
                    );
                }
                if (city) {
                    results = results.filter(
                        (item) =>
                            item.city && item.city.toLowerCase().includes(city.toLowerCase())
                    );
                }
                if (searchAddress) {
                    results = results.filter(
                        (item) =>
                            (item.customerData[0]?.cnap &&
                                item.customerData[0]?.cnap
                                    .toLowerCase()
                                    .includes(searchAddress.toLowerCase())) ||
                            (item.customerData[0]?.rbhf &&
                                item.customerData[0]?.rbhf
                                    .toLowerCase()
                                    .includes(searchAddress.toLowerCase()))
                    );
                }
                if (searchContact) {
                    results = results.filter((item) => {
                        const mainContact = item.serviceInfo[0]?.customerData[0]?.mainContact;
                        if (typeof mainContact === "string") {
                            return mainContact
                                .toLowerCase()
                                .includes(searchContact.toLowerCase());
                        } else if (typeof mainContact === "number") {
                            const stringMainContact = String(mainContact); // Convert number to string
                            return stringMainContact
                                .toLowerCase()
                                .includes(searchContact.toLowerCase());
                        }
                        return false; // Exclude if mainContact is neither string nor number
                    });
                }

                if (searchTechName) {
                    results = results.filter(
                        (item) =>
                            // item.dsrdata[0]?.TechorPMorVendorName &&
                            item.dsrdata[0]?.TechorPMorVendorName === searchTechName
                    );
                }
                if (searchJobType) {
                    results = results.filter(
                        (item) =>
                            item.service &&
                            item.service.toLowerCase().includes(searchJobType.toLowerCase())
                    );
                }
                if (searchDesc) {
                    results = results.filter(
                        (item) =>
                            item.desc &&
                            item.desc.toLowerCase().includes(searchDesc.toLowerCase())
                    );
                }
                if (searchpaymentMode) {
                    results = results.filter(
                        (item) =>
                            item.paymentMode &&
                            item.paymentMode
                                .toLowerCase()
                                .includes(searchpaymentMode.toLowerCase())
                    );
                }
                setSearchResults(results);
            } catch (error) {
                console.log("Error in Search", error);
            }
        }
        filterResults();
    }, [
        searchJobCatagory,
        searchCustomerName,
        city,
        searchAddress,
        searchContact,
        searchJobType,
        searchDesc,
        searchpaymentMode,
        searchTechName,
    ]);








    const exportData = () => {
        const fileName = "Vendor_Reports_Datewise.xlsx";

        // Assuming each object in searchResults has properties like 'category' and 'img'
        const filteredData1 = searchResults?.map(item => ({
            date: date,
            category: item?.serviceInfo[0]?.category,
            customerName: item?.serviceInfo[0]?.customerData[0]?.customerName,
            city: item?.serviceInfo[0]?.city,
            number: item?.serviceInfo[0]?.customerData[0]?.mainContact,
            desc: item?.serviceInfo[0]?.desc,
            amount: item?.serviceInfo[0]?.GrandTotal,
            vendorCharge: item?.vendorChargeAmount,
            Technician: item?.TechorPMorVendorName,
            paymentmode: item.serviceInfo[0]?.paymentMode,
            startTime: moment(item?.startJobTime).format('lll') ,
            EndTime:moment( item?.endJobTime).format('lll')

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


                <div className="row m-auto">


                    <button
                        className="ps-3 pt-2 pb-2 pe-3 ms-2"
                        style={{
                            border: 0,
                            color: "white",
                            backgroundColor: "#a9042e",
                            borderRadius: "5px",
                            width: "150px",
                            marginTop: "25px"
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

                </div>
                <div className="col-md-12">
                    <Table responsive

                    >
                        <thead >
                            <tr className="table-secondary">

                                <th className="table-head" scope="col"></th>

                                <th
                                    className="table-head"
                                    style={{ width: "7%" }}
                                    scope="col"
                                ></th>
                                <th scope="col" className="table-head" style={{ width: "7%" }}>

                                </th>

                                <th scope="col" className="table-head">
                                    <input
                                        className="vhs-table-input"
                                        value={searchCustomerName}
                                        onChange={(e) => setSearchCustomerName(e.target.value)}
                                    />{" "}
                                </th>
                                <th scope="col" className="table-head">
                                    <input
                                        className="vhs-table-input"
                                        value={searchContact}
                                        onChange={(e) => setSearchContact(e.target.value)}
                                    />{" "}
                                </th>
                                <th scope="col" className="table-head">
                                    <select
                                        className="vhs-table-input"
                                        value={city}
                                        onChange={(e) => setcity(e.target.value)}
                                    >
                                        <option value="">Select</option>
                                        {Array.isArray(treatmentData?.serviceInfo) &&
                                            treatmentData.serviceInfo[0] &&
                                            [...new Set(treatmentData?.serviceInfo[0]?.map((city) => city.city))].map(
                                                (uniqueCity) => (
                                                    <option value={uniqueCity} key={uniqueCity}>
                                                        {uniqueCity}
                                                    </option>
                                                )
                                            )}
                                    </select>

                                </th>
                                <th scope="col" style={{ width: "15%" }} className="table-head">
                                    <input
                                        className="vhs-table-input"
                                        value={searchAddress}
                                        onChange={(e) => setSearchAddress(e.target.value)}
                                    />{" "}
                                </th>

                                <th scope="col" className="table-head">
                                    <select
                                        className="vhs-table-input"
                                        value={searchTechName}
                                        onChange={(e) => setSearchTechName(e.target.value)}
                                    >
                                        <option value="">Select</option>
                                        {[
                                            ...new Set(
                                                treatmentData?.map(
                                                    (item) => item?.TechorPMorVendorName
                                                )
                                            ),
                                        ].map((uniqueName) => (
                                            <option value={uniqueName} key={uniqueName}>
                                                {uniqueName}
                                            </option>
                                        ))}
                                    </select>
                                </th>
                                {/* <th scope="col" className="table-head">
                
                </th> */}
                                <th scope="col" className="table-head">

                                </th>

                                <th scope="col" className="table-head"></th>
                                <th scope="col" className="table-head">

                                </th>
                                <th scope="col" className="table-head">

                                </th>
                                <th></th>
                                <th></th>
                                <th></th>

                                <th></th>


                            </tr>

                            <tr >
                                <th >
                                    Sr.No
                                </th>

                                <th >
                                    Catagory
                                </th>
                                <th >
                                    Slot
                                </th>

                                <th  >
                                    Customer Name
                                </th>
                                <th  >
                                    Contact No.
                                </th>
                                <th  >
                                    City
                                </th>
                                <th style={{ width: "15%" }} >
                                    Address
                                </th>


                                <th  >
                                    Technician
                                </th>


                                <th  >
                                    Before Service
                                </th>
                                <th  >
                                    After Service
                                </th>
                                <th  >
                                    Payment Proof
                                </th>
                                <th  >
                                    Job Amount

                                </th>
                                <th  >
                                    Vendor Charge
                                </th>
                                <th  >
                                    Payment mode
                                </th>

                                <th  >
                                    Description
                                </th>
                            </tr>
                        </thead>
                        <tbody>

                            {searchResults
                                .map((selectedData, index) => (

                                    <tr

                                        key={index}


                                    >

                                        <td>{index + 1}</td>
                                        <td>{selectedData.serviceInfo[0]?.category}</td>


                                        <td>{selectedData?.serviceInfo[0]?.selectedSlotText}</td>

                                        <td>{selectedData?.serviceInfo[0]?.customerData[0]?.customerName}</td>
                                        <td>{selectedData?.serviceInfo[0]?.customerData[0]?.mainContact}</td>

                                        <td>{selectedData?.serviceInfo[0]?.city}</td>

                                        <td>
                                            {selectedData?.serviceInfo[0]?.deliveryAddress
                                                ? `
${selectedData?.serviceInfo[0]?.deliveryAddress?.platNo},
${selectedData?.serviceInfo[0]?.deliveryAddress?.address} - 
${selectedData?.serviceInfo[0]?.deliveryAddress?.landmark}
`
                                                : ""}
                                        </td>
                                        <td>{selectedData?.TechorPMorVendorName}</td>
                                        <td>  <div >
                                            <img src={`https://api.vijayhomeservicebengaluru.in/addcall/${selectedData?.bImg}`} width={100} height={100} />
                                        </div> </td>
                                        <td>  <div >
                                            <img src={`https://api.vijayhomeservicebengaluru.in/addcall/${selectedData?.sImg}`} width={100} height={100} />
                                        </div>
                                        </td>
                                        <td>   <div >
                                            <img src={`https://api.vijayhomeservicebengaluru.in/addcall/${selectedData?.pImg}`} width={100} height={100} />
                                        </div></td>
                                        <td>{selectedData?.serviceInfo[0]?.GrandTotal}</td>
                                        <td>{parseFloat(selectedData.vendorChargeAmount).toFixed(1)}</td>


                                        <td>{selectedData?.serviceInfo[0]?.paymentMode}</td>
                                        <td>{selectedData?.serviceInfo[0]?.desc}</td>
                                    </tr>
                                ))}
                        </tbody>

                    </Table>{" "}
                </div>
            </div>
        </div>
    );
}

export default ReportList;


