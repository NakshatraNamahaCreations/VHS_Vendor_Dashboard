import { React, useEffect, useState } from "react";

import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Sidenav from "./Sidenav";
import Header from "./Header";
import axios from "axios";

const active1 = {
    backgroundColor: "rgb(169, 4, 46)",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
};


function OfferAnnouncement() {
    const [selected1, setSelected1] = useState(0);
    const [categorydata, setcategorydata] = useState([]);
    const [banner, setBanner] = useState("");
    const [type, setType] = useState("");

    const [bannerdata, setBannerdata] = useState([]);
    const formdata = new FormData();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const postbanner = async (e) => {
        e.preventDefault();

        if (!banner || !type) {
            alert("Please select all fields")
        }
        else {
            formdata.append("img", banner);
            formdata.append("type", "Vendor");

            try {
                const config = {
                    url: "/userapp/addofferAnnouncement",
                    method: "post",
                    baseURL: "https://api.vijayhomesuperadmin.in/api",

                    data: formdata,
                };
                await axios(config).then(function (response) {
                    if (response.status === 200) {
                        alert("Successfully Added");
                        window.location.assign("/offerAnnouncement");
                    }
                });
            } catch (error) {
                console.error(error);
                alert("  Not Added");
            }
        }

    };

    useEffect(() => {
        getcategory();
    }, []);

    const getcategory = async () => {
        let res = await axios.get("https://api.vijayhomesuperadmin.in/api/userapp/getappsubcat");
        if ((res.status = 200)) {
            setcategorydata(res.data?.subcategory);
        }
    };

    useEffect(() => {
        getbannerimg();
    }, []);

    const getbannerimg = async () => {
        let res = await axios.get("https://api.vijayhomesuperadmin.in/api/userapp/getallofferAnnouncement");
        if ((res.status = 200)) {
            setBannerdata(res.data?.offerAnnouncement.filter((i)=>i.type ==="Vendor"));

        }
    }

    const deletebannerimg = async (id) => {
        axios({
            method: "post",
            url: "https://api.vijayhomesuperadmin.in/api/userapp/deleteofferAnnouncement/" + id,
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

    return (
        <div className="row">
            <div className="col-md-2">
                <Sidenav />
            </div>
            <div className="col-md-10 ">
                <Header />
                <div className="row  set_margin ">
                    <div>
                        <div className="d-flex  mt-3">
                            <h4 style={{ color: "#FF0060" }}>OfferAnnouncement  for vendors</h4>
                        </div>
                    </div>
                </div>
                <div className="row pt-3 m-auto" style={{ marginLeft: "-72px" }}>
                    <div className="row  set_margin">
                        <div>
                            <div className="d-flex  mt-3 mb-3">
                                <Button
                                    className="btn-primary-button mx-2"
                                    variant="danger"
                                    onClick={handleShow}
                                >
                                    Add Images
                                </Button>
                            </div>
                        </div>

                        <div className="row  justify-content-center ">
                            <div className="col-md-12">
                                <Table
                                    className="table_container table_data text-center"
                                    bordered
                                    size="sm"
                                    centered
                                    variant
                                >
                                    <thead>
                                        <tr>
                                            <th>SI.No</th>
                                            <th>Type</th>
                                            <th> Images</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bannerdata.map((element, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>{i + 1}</td>
                                                    <td>{element.type}</td>
                                                    <td>
                                                        <img
                                                            className="header_logo"
                                                            src={`https://api.vijayhomesuperadmin.in/offerAnnouncement/${element.img}`}
                                                            width={"100px"}
                                                            height={"50px"}
                                                        />
                                                    </td>

                                                    <td>
                                                        <Button
                                                            style={{
                                                                margin: "5px",
                                                                fontSize: "12px",
                                                                padding: "6px",
                                                            }}
                                                            onClick={() => deletebannerimg(element._id)}
                                                            variant="danger"
                                                            key={i}
                                                        >
                                                            Delete
                                                        </Button>{" "}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Image</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* <div className="vhs-input-label mt-3">
                            Sub-Catagory <span className="text-danger"> *</span>
                        </div>
                        <div className="group pt-1">
                            <select
                                className="col-md-6 vhs-input-value"
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option>-- Select type--</option>

                                <option value="Vendor">Vendor</option>
                                <option value="Technician">Technician</option>
                                <option value="Executive">Executive</option>

                            </select>
                        </div> */}
                        <div className="group pt-1 mt-4">
                            <input
                                className="col-md-6 vhs-input-value"
                                type="file"
                                onChange={(e) => setBanner(e.target.files[0])}
                            />
                            <div className="mt-3" style={{ fontSize: "13px" }}>
                                <b>Note :</b> width=350px,height=150px
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={postbanner}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        </div>
    );
}

export default OfferAnnouncement;
