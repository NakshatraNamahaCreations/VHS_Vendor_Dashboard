import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidenav from "./Sidenav";
import Header from "./Header";
import DataTable from "react-data-table-component";
import Modal from "react-bootstrap/Modal";



function Subcategory() {

  const [data1, setdata1] = useState([]);
  const [category, setcategory] = useState("");
  const [header, setheader] = useState("");
  const [search, setsearch] = useState("");
  const [videolink, setvideolink] = useState([]);

  const [filterdata, setfilterdata] = useState([]);
  const [subcategorydata, setsubcategorydata] = useState([]);
  const [trainingvideo, settrainingvideo] = useState("");
  const [titledata, settitledata] = useState([]);
  const [editCategory, setEditCategory] = useState("");
  const [Editheader, setEditheader] = useState("");
  const [editdesc, setEditdesc] = useState("");
  const [EdittrainingVideo, setEdittrainingVideo] = useState("");
  const [editvideolink, seteditvideolink] = useState("");
  const [editTrainingvideo, seteditTrainingvideo] = useState({});
  const [desc, setdesc] = useState("");



  const formdata = new FormData();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEdit = (subcategory) => {
    seteditTrainingvideo(subcategory);
    handleShow(true);
  };

  useEffect(() => {
    getcategory();
    getsubcategory();
  }, []);

  const getcategory = async () => {
    let res = await axios.get("https://api.vijayhomesuperadmin.in/api/getcategory");
    if ((res.status = 200)) {
      setdata1(res.data?.category);
    }
  };

  const postsubcategory = async (e) => {
    e.preventDefault();

    if (!category || !header || !videolink) {
      alert("Please Select all fields");
    } else {
      formdata.append("category", category);
      formdata.append("header", header);
      formdata.append("desc", desc);
      formdata.append("trainingvideo", trainingvideo);
      formdata.append("videolink", videolink);


      try {
        const config = {
          url: "/vendor/addtrainingCenter",
          method: "post",
          baseURL: "https://api.vijayhomesuperadmin.in/api",
          data: formdata,
          headers: {
            "Content-Type": "multipart/form-data", // Important for file uploads
          },
        };
        await axios(config).then(function (response) {
          if (response.status === 200) {
            alert("Successfully Added");
            window.location.reload();
          }
        });
      } catch (error) {
        if (error.response) {
          // Server responded with a status code outside of the 2xx range
          alert(error.response.data.error);
          console.log("Error response data:", error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          alert("Network error. Please try again later.");
          console.log("Error response data:", error.response.data);
          console.log("No response received:", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          alert("An unexpected error occurred. Please try again later.");
          console.log("Error:", error.message);
        }
      }
    }
  };



  const getsubcategory = async () => {
    let res = await axios.get("https://api.vijayhomesuperadmin.in/api/vendor/gettrainingCenter");
    if ((res.status = 200)) {

      setsubcategorydata(res.data?.trainingCenter);
      setfilterdata(res.data?.trainingCenter);
    }
  };
  // const otgerServiceNAME = othservice1.Map(e =>e.name)

  const editservices = async (e) => {
    e.preventDefault();
    try {
      formdata.append("category", editCategory);
      formdata.append("header", Editheader);
      formdata.append("desc", editdesc);
      formdata.append("videolink", editvideolink);


      if (EdittrainingVideo) {
        formdata.append("trainingVideo", EdittrainingVideo);
      }

      const config = {
        url: `/vendor/edittrainingCenter/${editTrainingvideo._id}`,
        method: "post",
        baseURL: "https://api.vijayhomesuperadmin.in/api",
        headers: { "Content-Type": "multipart/form-data" },
        data: formdata,
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          alert("Successfully Added");
          window.location.reload("");
          // onupdate();
          // handleClose();
        }
      });
    } catch (error) {
      console.error(error);
      alert("Not Added");
    }
  };

  const columns = [
    {
      name: "Sl  No",
      selector: (row, index) => index + 1,
    },
    {
      name: "Category ",
      selector: (row) => row.category,
    },
    {
      name: "Header  ",
      selector: (row) => row.header,
    },
    {
      name: "Desc  ",
      selector: (row) => row.desc,
    },

    {
      name: "Video link  ",
      selector: (row) => row.videolink,
    },
    {
      name: "Training video",
      cell: (row) => (
        // <div style={{ width: '200px', height: '200px', overflow: 'hidden' }}>

        // </div>
        <iframe
          src={row.videolink}
          title="Your Video"
          loading="lazy"
          style={{
            // width: '100%',
            // height: '100%',
            objectFit: 'cover', // or 'contain' depending on your preference
          }}
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
          allowFullScreen
        ></iframe>
      ),
    },


    {
      name: "Action",
      cell: (row) => (
        <div>
          <a
            className="hyperlink"
            style={{ cursor: "pointer" }}
            onClick={() => handleEdit(row)}
          >
            Edit |
          </a>
          <a onClick={() => deleteservices(row._id)} className="hyperlink mx-1">
            Delete
          </a>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const result = subcategorydata.filter((item) => {
      return item.category.toLowerCase().match(search.toLowerCase());
    });
    setfilterdata(result);
  }, [search]);

  const deleteservices = async (id) => {
    axios({
      method: "post",
      url: "https://api.vijayhomesuperadmin.in/api/vendor/deletetrainingCenter/" + id,
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
    <div div className="row">
      <div className="col-md-2">
        <Sidenav />
      </div>
      <div className="col-md-10 ">
        <Header />

        <div className="row m-auto">
          <h3>Training Center</h3>
          <div className="col-md-12">
            <div className="card" style={{ marginTop: "30px" }}>
              <div className="card-body p-3">

                <form>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="vhs-input-label">
                        Category <span className="text-danger"> *</span>
                      </div>
                      <div className="group pt-1">
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

                    <div className="col-md-4">
                      <div className="vhs-input-label">
                        Header <span className="text-danger"> *</span>
                      </div>
                      <div className="group pt-1">
                        <input
                          type="text"
                          className="vhs-input-value col-md-12"
                          onChange={(e) => setheader(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="vhs-input-label">
                        Video link <span className="text-danger"> *</span>
                      </div>
                      <div className="group pt-1">
                        <input
                          type="text"
                          className="vhs-input-value col-md-12"
                          onChange={(e) => setvideolink(e.target.value)}
                        />
                      </div>
                    </div>
                    {/* <div className="col-md-4 ">
                      <div className="vhs-input-label">Training Video</div>
                      <div className="group pt-1">
                        <input
                          type="file"
                          accept="video/*"
                          className="col-md-12 vhs-input-value"
                          onChange={(e) => settrainingvideo(e.target.files[0])}
                        />
                      </div>
                     
                    </div> */}
                  </div>
                  <div className="col-md-4 mt-3">
                    <div className="vhs-input-label">
                      Description <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="vhs-input-value col-md-12"
                        onChange={(e) => setdesc(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row pt-3 justify-content-center">
                    <div className="col-md-2">
                      <button className="vhs-button" onClick={postsubcategory}>
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
                placeholder="Search here.."
                className="w-25 form-control"
                value={search}
                onChange={(e) => setsearch(e.target.value)}
              />
            </div>
            <div className="mt-1 border">
              <DataTable
                columns={columns}
                data={filterdata}
                pagination
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
            <Modal.Title>Edit </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="card-body p-3">
              <form>
                <div className="col-md-12">
                  <div className="vhs-input-label">
                    Category <span className="text-danger"> *</span>
                  </div>
                  <div className="group pt-1">
                    <div className="group pt-1">
                      <select
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setEditCategory(e.target.value)}
                        defaultValue={editTrainingvideo.category}
                      >
                        {data1.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.category}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 mt-4">
                  <div className="vhs-input-label">
                    Header  <span className="text-danger"> *</span>
                  </div>
                  <div className="group pt-1">
                    <input
                      type="text"
                      className="col-md-12 vhs-input-value"
                      onChange={(e) => setEditheader(e.target.value)}

                      defaultValue={
                        Editheader || editTrainingvideo
                          ? editTrainingvideo.header
                          : ""
                      }
                    />
                  </div>
                </div>


                <div className="col-md-12 mt-4">
                  <div className="vhs-input-label">
                    Desc  <span className="text-danger"> *</span>
                  </div>
                  <div className="group pt-1">
                    <input
                      type="text"
                      className="col-md-12 vhs-input-value"
                      onChange={(e) => setEditdesc(e.target.value)}

                      defaultValue={
                        editdesc || editTrainingvideo
                          ? editTrainingvideo.desc
                          : ""
                      }
                    />
                  </div>
                </div>
                <div className="col-md-12 mt-4">
                  <div className="vhs-input-label">
                    videolink  <span className="text-danger"> *</span>
                  </div>
                  <div className="group pt-1">
                    <input
                      type="text"
                      className="col-md-12 vhs-input-value"
                      onChange={(e) => seteditvideolink(e.target.value)}

                      defaultValue={
                        editvideolink || editTrainingvideo
                          ? editTrainingvideo.videolink
                          : ""
                      }
                    />
                  </div>
                </div>


                <div className="row pt-3">
                  <div className="col-md-2">
                    <button className="vhs-button" onClick={editservices}>
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default Subcategory;
