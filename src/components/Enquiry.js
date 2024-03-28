import React, { useEffect, useState } from 'react'
import Sidenav from './Sidenav'
import Header from './Header'
import Table from 'react-bootstrap/Table';
import axios from 'axios';
function Enquiry() {
    const [data, setdata] = useState([]);

    useEffect(() => {
        getenquiry();

    }, [])


    const getenquiry = async () => {
        let res = await axios.get("https://api.vijayhomesuperadmin.in/api/getVendorEnquiry");
        if ((res.status = 200)) {

            setdata(res.data?.Vendorenquiry);

        }
    };

    const update = async (i) => {



        try {
            const config = {
                url: `/updateStatus/${i._id}`,
                method: "put",
                baseURL: "https://api.vijayhomesuperadmin.in/api",
                // data: formdata,
                headers: { "content-type": "application/json" },
                data: {


                },
            };
            await axios(config).then(function (response) {
                if (response.status === 200) {
                    console.log("success");
                    alert(" updated");
                    getenquiry();
                }
            });
        } catch (error) {
            console.error(error); // Log the error to the browser console
            alert("An error occurred: " + error.message);
        }

    };
    return (
        <div div className="row">
            <div className="col-md-2">
                <Sidenav />
            </div>
            <div className="col-md-10 ">
                <Header />
                <h4 className='mt-4'>Enquiry</h4>
                <div>

                    <Table responsive="md">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Date & Time</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Number</th>
                                <th>Comment</th>

                                <th>Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((i, index) => (


                                <tr style={i.type === "updated" ? { backgroundColor: 'green' } : {}}>
                                    <td>{index + 1}</td>
                                    <td>{i.date}<br></br>  {i.Time}</td>
                                    <td>{i.name}</td>
                                    <td>{i.email}</td>
                                    <td>{i.mobile}</td>
                                    <td>{i.comment}</td>


                                    <td>
                                        <button className='bln' onClick={() => i.type !== "update" && update(i)}>
                                            {i.type === "updated" ? "Resolved" : "Update"}
                                        </button>
                                    </td>

                                </tr>
                            ))}

                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default Enquiry