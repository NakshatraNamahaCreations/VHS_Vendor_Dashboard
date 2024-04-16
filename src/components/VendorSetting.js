import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidenav from "./Sidenav";
import Header from "./Header";
import DataTable from "react-data-table-component";
import Modal from "react-bootstrap/Modal";
import Multiselect from "multiselect-react-dropdown";
import Switch from "@mui/material/Switch";
import { alpha, styled } from "@mui/material/styles";
import { pink } from "@mui/material/colors";

function VendorSetting() {
  const [data1, setdata1] = useState([]);

  const [discount, setdiscount] = useState("");
  const [search, setsearch] = useState("");
  const [filterdata, setfilterdata] = useState([]);
  const [subcategorydata, setsubcategorydata] = useState([]);
  const [citydata, setcitydata] = useState([]);
  const [city, setcity] = useState("");
  const [category, setcategory] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [data, setdata] = useState({});

  const [city1, setcity1] = useState(data.city);
  const [discount1, setdiscount1] = useState(data?.discount);
  const [category1, setcategory1] = useState(data?.category);
  const [dateWise, setdateWise] = useState("");
  const [dateWise1, setdateWise1] = useState(data?.category);

  const [selectedCatagory, setSelectedCatagory] = useState(
    data?.category || []
  );
  const [selectedCatagory1, setSelectedCatagory1] = useState(
    data?.category || []
  );
  useEffect(() => {
    getcategory();
    getsubcategory();
    getcity();
  }, []);

  const getcategory = async () => {
    let res = await axios.get(
      "https://api.vijayhomesuperadmin.in/api/getcategory"
    );
    if ((res.status = 200)) {
      setdata1(res.data?.category);
    }
  };

  const UpdateVendorConfigure = async (e) => {
    e.preventDefault();
    if (!city || !category || !discount || !dateWise) {
      alert("Please fill all data");
      return;
    }
    try {
      const config = {
        url: `/updatevendorconfigure`,
        method: "post",
        baseURL: "https://api.vijayhomeservicebengaluru.in/api",
        headers: { "content-type": "application/json" },
        data: {
          city: city,
          category: category,
          discount: discount,
          datewise: dateWise,
          action: true,
        },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          alert("Successfully Added");
          window.location.reload("");
        }
      });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Display the error message for City already added
        alert(error.response.data.error);
      } else {
        // Display a generic error message for other errors
        alert("Something went wrong");
      }
    }
  };

  const [isChecked, setIsChecked] = useState(true);

  useEffect(() => {
    if (data?.action !== undefined) {
      setIsChecked(data.action);
    }
  }, [data?.action, isChecked]);

  const handleToggle = () => {
    setIsChecked((prevChecked) => !prevChecked);
  };

  const handleToggle1 = (data) => {
    setdata(data);
    setSelectedCatagory1(data?.category);
    editthedata(data);
  };

  const getsubcategory = async () => {
    let res = await axios.get(
      "https://api.vijayhomeservicebengaluru.in/api/getAutomateddata"
    );
    if ((res.status = 200)) {
      setsubcategorydata(res.data?.AutomatedService);
      setfilterdata(res.data?.AutomatedService);
    }
  };

  const editthedata = async (data) => {
    try {
      const response = await axios.post(
        `https://api.vijayhomeservicebengaluru.in/api/editAutomated/${data?._id}`,
        {
          category: category1 ? category1 : data?.category,
          discount: discount1,
          datewise: dateWise1,
          action: data?.action == true ? false : true,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status === 200) {
        alert("Successfully Edited");
        window.location.reload("");
      } else {
        alert("Failed to edit category");
      }
    } catch (error) {
      console.error("Error while editing data:", error);
      // alert("An error occurred while editing category",error);
    }
  };

  const columns = [
    {
      name: "Sl  No",
      selector: (row, index) => index + 1,
    },
    {
      name: "City  ",
      selector: (row) => row.city,
    },
    {
      name: "Category ",
      selector: (row) => row.category,
    },
    {
      name: "Vendor Discount  ",
      selector: (row) => row.discount,
    },
    {
      name: "Date Range  ",
      selector: (row) => row.datewise,
    },

    {
      name: "Status",
      cell: (row) => (
        <div>
          <label className="switch">
            <input
              type="checkbox"
              defaultChecked={row.action}
              onChange={() => {
                handleToggle1(row);
                console.log("Selected row", row);
              }}
            />
            <span className="slider"></span>
          </label>
        </div>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <a className="hyperlink" onClick={() => edit(row)}>
            Edit |
          </a>

          <a onClick={() => deleteautomate(row._id)} className="hyperlink mx-1">
            Delete
          </a>
        </div>
      ),
    },
  ];

  const edit = (data) => {
    setdata(data);
    setSelectedCatagory1(data.category);

    handleShow(true);
  };

  useEffect(() => {
    const result = subcategorydata.filter((item) => {
      return item.city.toLowerCase().match(search.toLowerCase());
    });
    setfilterdata(result);
  }, [search]);

  const deleteautomate = async (id) => {
    axios({
      method: "post",
      url:
        "https://api.vijayhomeservicebengaluru.in/api/updatevendorconfiguredelete/" +
        id,
    })
      .then(function (response) {
        //handle success
        console.log(response);
        alert("Deleted successfully");
        window.location.reload();
      })
      .catch(function (error) {
        //handle error
        console.log(error.response.data);
      });
  };

  const getcity = async () => {
    let res = await axios.get(
      "https://api.vijayhomesuperadmin.in/api/master/getcity"
    );
    if ((res.status = 200)) {
      setcitydata(res.data?.mastercity);
    }
  };

  return (
    <div div className="row">
      <div className="col-md-2">
        <Sidenav />
      </div>
      <div className="col-md-10 ">
        <Header />

        <div className="row m-auto">
          <h3>Vendor Configuration</h3>
          <div className="col-md-12">
            <div className="card" style={{ marginTop: "30px" }}>
              <div className="card-body p-3">
                <form>
                  <div className="row">
                    <div className="col-md-3">
                      <div className="vhs-input-label">
                        City <span className="text-danger"> *</span>
                      </div>
                      <div className="group pt-1">
                        <select
                          className="col-md-12 vhs-input-value"
                          onChange={(e) => setcity(e.target.value)}
                        >
                          <option>---SELECT---</option>
                          {citydata.map((i) => (
                            <option value={i.city}>{i.city}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="vhs-input-label">
                        Category <span className="text-danger"> *</span>
                      </div>
                      <div className="group pt-1">
                        {/* <Multiselect
                                                    className=""
                                                    options={data1.map((category) => ({
                                                        name: category.category,
                                                        // id: category._id,
                                                    }))}
                                                    placeholder="Select Catagory"
                                                    selectedValues={selectedCatagory}
                                                    onSelect={onSelectCatagory}
                                                    onRemove={onRemoveCatagory}
                                                    displayValue="name"
                                                    // disablePreSelectedValues={true}
                                                    showCheckbox={true}
                                                /> */}

                        <select
                          className="col-md-12 vhs-input-value"
                          onChange={(e) => setcategory(e.target.value)}
                        >
                          <option>---SELECT---</option>
                          {data1.map((i) => (
                            <option value={i.category}>{i.category}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="vhs-input-label">
                        Discount <span className="text-danger"> *</span>
                      </div>
                      <div className="group pt-1">
                        <input
                          type="text"
                          className="vhs-input-value col-md-12"
                          onChange={(e) => setdiscount(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="vhs-input-label">
                        Date Wise <span className="text-danger"> *</span>
                      </div>
                      <div className="group pt-1">
                        <select
                          className="col-md-12 vhs-input-value"
                          onChange={(e) => setdateWise(e.target.value)}
                        >
                          <option>---SELECT---</option>
                          <option value="Today">Today</option>
                          <option value="Tomorrow">Tomorrow</option>
                          <option value="Both">Both</option>
                          <option value="All">All</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="row pt-3 justify-content-center">
                    <div className="col-md-2">
                      <button
                        className="vhs-button"
                        onClick={UpdateVendorConfigure}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="mt-5">
              <input
                type="text"
                placeholder="Search city.."
                className="w-25 form-control"
                value={search}
                onChange={(e) => setsearch(e.target.value)}
              />
            </div>
            <div className="mt-1 border">
              <DataTable
                columns={columns}
                data={filterdata}
                // pagination
                fixedHeader
                selectableRowsHighlight
                subHeaderAlign="left"
                highlightOnHover
              />
            </div>
          </div>
        </div>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Update</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="card" style={{ marginTop: "30px" }}>
              <div className="card-body p-3">
                <form>
                  <div className="col-md-12">
                    <div className="vhs-input-label">
                      City <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <select
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setcity1(e.target.value)}
                      >
                        <option value={data.city}>{data.city}</option>
                        {citydata.map((item) => (
                          <option value={item.city}>{item.city}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-12 mt-2">
                    <div className="vhs-input-label">
                      Category <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <select
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setcategory1(e.target.value)}
                        defaultValue={data.category}
                      >
                        {data1.map((item) => (
                          <option value={item.category}>{item.category}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {/* <div className="col-md-12 mt-3">
                                        <Multiselect
                                            className="mt-3"
                                            options={data1.map((category) => ({
                                                name: category.category,
                                                // id: category._id,
                                            }))}
                                            selectedValues={selectedCatagory1}
                                            onSelect={onEditCatagory}
                                            onRemove={onRemoveCatagory1}
                                            displayValue="name"
                                            showCheckbox={true}
                                        />
                                    </div> */}

                  <div className="col-md-12 mt-3">
                    <div className="vhs-input-label">
                      Discount <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="vhs-input-value col-md-12"
                        defaultValue={data?.discount}
                        onChange={(e) => setdiscount1(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-12 mt-3">
                    <div className="vhs-input-label">
                      DateWise <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <select
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setdateWise1(e.target.value)}
                        defaultValue={data?.datewise}
                      >
                        <option value="Today">Today</option>
                        <option value="Tomorrow">Tomorrow</option>
                        <option value="Both">Both</option>
                        <option value="All">All</option>
                      </select>
                    </div>
                  </div>

                  {/* <div className="col-md-12 mt-3">
                                        <div className="vhs-input-label">
                                            Status <span className="text-danger"> *</span>
                                        </div>
                                        <div className="group pt-1">



                                            <label className="switch">
                                                <input type="checkbox" defaultChecked={data.action} onChange={handleToggle} />
                                                <span className="slider"></span>
                                            </label>
                                        </div>
                                    </div> */}

                  <div className="row pt-3">
                    <div className="col-md-2">
                      <button
                        className="vhs-button"
                        onClick={() => editthedata(data)}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default VendorSetting;
