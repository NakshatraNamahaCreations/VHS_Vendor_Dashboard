

// import React, { useEffect, useState } from "react";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/esm/Button";
// import { Modal, Table } from "react-bootstrap";
// import axios from "axios";
// import { v4 as uuidv4 } from 'uuid';

// import Multiselect from "multiselect-react-dropdown";
// import { pink } from '@mui/material/colors';
// import Switch from '@mui/material/Switch';
// import { alpha, styled } from '@mui/material/styles';

// import Sidenav from "./Sidenav";
// function DirectSales() {
//     const [selectedCategory, setSelectedCategory] = useState({});
//     const [allsalesorder, setallsalesorder] = useState([]);
//     const [salesOrderNumber, setSalesOrderNumber] = useState(1);
//     const [citydata, setcitydata] = useState([]);
//     const [itemDetails, setitemDetails] = useState([
//         {
//             itemId: uuidv4(),
//             city: "",
//             category: "",

//             discount: 0,
//             action: true,

//         },
//     ]);

//     console.log("itemDetails====", itemDetails)

//     const addTableRow = () => {
//         const newRow = {
//             itemId: uuidv4(), // Generate a unique ID
//             city: "",
//             category: "",
//             discount: 0,
//             action: true,
//         };
//         setitemDetails((prevTableSet) => [...prevTableSet, newRow]);

//         // Initialize the switch state for the new row
//         setSwitchStates((prevSwitchStates) => [...prevSwitchStates, false]);
//     };



//     useEffect(() => {
//         const salesLength = allsalesorder.filter(
//             (item) => item.salestype === "Sales"
//         ).length;
//         setSalesOrderNumber(salesLength + 1);
//     }, [allsalesorder]);




//     useEffect(() => {
//         getallsalesorder();
//         getcity();
//         getvendorauomatedoption();
//     }, []);

//     const getallsalesorder = async () => {
//         try {
//             const response = await axios.get(
//                 "http://localhost:9001/api/transaction/salesorder/getallsalesorder"
//             );
//             if (response.status === 200) {
//                 setallsalesorder(response.data.salesorder);
//             }
//         } catch (error) {
//             console.warn(error);
//         }
//     };





//     const getcity = async () => {
//         let res = await axios.get("https://api.vijayhomesuperadmin.in/api/master/getcity");
//         if (res.status === 200) {
//             setcitydata(res.data?.mastercity);
//         }
//     };

//     const handleCityChange = (e, index) => {
//         const newCity = e.target.value;

//         setitemDetails((prevTableSet) => {
//             const newTableSet = [...prevTableSet];

//             newTableSet[index] = {
//                 ...newTableSet[index],
//                 city: newCity,
//                 category: [], // Reset category when city changes
//             };

//             return newTableSet;
//         });
//     };



//     // const handleQuantityChange = (e, index,ele) => {
//     //     const newQuantity = e.target.value;


//     //     console.log("newQunatiuyt",ele)
//     //     setitemDetails((prevTableSet) => {
//     //         const newTableSet = [...prevTableSet];

//     //         newTableSet[index] = {
//     //             ...newTableSet[index],
//     //             discount: newQuantity,

//     //         };
//     //         return newTableSet;
//     //     });
//     // };

//     const handleQuantityChange = (e, index, ele) => {
//         const newDiscount = e.target.value;

//         setitemDetails((prevTableSet) => {
//             const newTableSet = [...prevTableSet];

//             newTableSet[index] = {
//                 ...newTableSet[index],
//                 discount: newDiscount,
//             };

//             return newTableSet;
//         });
//     };








//     const handleDeleteRow = (index) => {
//         setitemDetails((prevTableSet) => {
//             const updatedTableSet = [
//                 ...prevTableSet.slice(0, index),
//                 ...prevTableSet.slice(index + 1),
//             ];
//             console.log("Updated rows:", updatedTableSet);
//             return updatedTableSet;
//         });
//     };


//     const PinkSwitch = styled(Switch)(({ theme }) => ({
//         '& .MuiSwitch-switchBase.Mui-checked': {
//             color: pink[600],
//             '&:hover': {
//                 backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
//             },
//         },
//         '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
//             backgroundColor: pink[600],
//         },
//     }));
//     const label = { inputProps: { 'aria-label': 'Color switch demo' } };
//     const [switchStates, setSwitchStates] = useState([]);
//     const [categorydata, setcategorydata] = useState([]);



//     const onSelectCategory = (selectedList, index) => {



//         setitemDetails((prevTableSet) => {
//             const newTableSet = [...prevTableSet];
//             newTableSet[index] = {
//                 ...newTableSet[index],
//                 category: selectedList,
//             };
//             console.log("Updated itemDetails:", newTableSet);
//             return newTableSet;
//         });

//     };

//     const onRemoveCategory = (selectedList, index) => {
//         setitemDetails((prevTableSet) => {
//             const newTableSet = [...prevTableSet];
//             newTableSet[index] = {
//                 ...newTableSet[index],
//                 category: selectedList,
//             };
//             console.log("Updated itemDetails:", newTableSet);
//             return newTableSet;
//         });
//     };


//     const handleSwitchChange = (index) => {
//         setitemDetails((prevTableSet) => {
//             const newTableSet = [...prevTableSet];

//             // Toggle the value between "Switch On" and "Switch Off"
//             newTableSet[index] = {
//                 ...newTableSet[index],
//                 action: !newTableSet[index].action, // Toggle the value

//             };

//             return newTableSet;
//         });
//     };

//     const handleSwitchChange1 = (index, ele) => {
//         setitemDetails((prevTableSet) => {
//             const newTableSet = [...prevTableSet];

//             newTableSet[index] = {
//                 ...newTableSet[index],
//                 action: !newTableSet[index].action,
//             };

//             // Update the switch state based on the new action value
//             const updatedSwitchStates = [...switchStates];
//             updatedSwitchStates[index] = newTableSet[index].action;

//             setSwitchStates(updatedSwitchStates);

//             return newTableSet;
//         });
//     };





//     useEffect(() => {
//         getcategory();
//     }, [])

//     const getcategory = async () => {
//         let res = await axios.get("https://api.vijayhomesuperadmin.in/api/getcategory");
//         if (res.status === 200) {
//             setcategorydata(res.data?.category);
//         }
//     };


//     const UpdateVendorConfigure = async (e) => {
//         e.preventDefault();
//         try {
//             console.log("hit thr apisss")
//             const config = {
//                 url: `/updatevendorconfigure`,
//                 method: "post",
//                 baseURL: "https://api.vijayhomeservicebengaluru.in/api",
//                 headers: { "content-type": "application/json" },
//                 data: {
//                     vData: itemDetails,


//                 },
//             };
//             await axios(config).then(function (response) {
//                 if (response.status === 200) {
//                     alert("Successfully Added");
//                     window.location.reload("");
//                 }
//             });
//         } catch (error) {
//             console.error(error);
//             alert(" Not Added");
//         }
//     };




//     const [vendorAutoOptiondata, setvendorAutoOptiondata] = useState([]);
//     const getvendorauomatedoption = async () => {
//         let res = await axios.get("https://api.vijayhomeservicebengaluru.in/api/getAutomateddata");
//         if ((res.status = 200)) {
//             console.log("res.data", res.data?.AutomatedService)
//             setvendorAutoOptiondata(res.data?.AutomatedService);
//         }
//     };





//     const handleUpdateClick = (index, itemid, vendor) => {
//         const updatedRowData = itemDetails[index];

//         console.log('Updated Row Data:', updatedRowData);
//         console.log('Vendor ID:', vendor._id);
//         console.log('Item ID:', itemid._id);


//         fetch(`https://api.vijayhomeservicebengaluru.in/api/update-item/${vendor._id}/${itemid._id}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(updatedRowData),
//         })
//             .then(response => response.json())
//             .then(data => {
//                 // Handle success
//                 console.log('Update successful', data);
//             })
//             .catch(error => {
//                 // Handle error
//                 console.error('Error updating data', error);
//             });
//     };

//     return (
//         <div className="row">
//             <div className="col-md-2">
//                 <Sidenav />
//             </div>
//             <div className="col-md-10">
//                 <div>
//                     <h3 >Vendors Settings    </h3>
//                 </div>
//                 <Table className="col-md-12 mt-3">
//                     <thead>
//                         <th className="td_S th_C p-2">City</th>
//                         <th className="td_S th_C p-2">Category</th>

//                         <th className="td_S th_C p-2">Discount</th>

//                         <th className="td_S th_C p-2">Action</th>
//                     </thead>
//                     <tbody>
//                         {vendorAutoOptiondata.map((vendor, vendorIndex) => {
//                             return vendor.vData.map((ele, index) => {
//                                 return (
//                                     <tr key={`${vendorIndex}-${index}`}>
//                                         <td className="td_S m-auto th_C">
//                                             {ele.city}
//                                         </td>
//                                         <td className="td_S m-auto th_C">
//                                             <Multiselect
//                                                 options={categorydata.map((category) => ({
//                                                     name: category.category,
//                                                 }))}
//                                                 placeholder="Select Category"
//                                                 displayValue="name"
//                                                 showCheckbox={true}
//                                                 selectedValues={ele.category}
//                                                 onSelect={(selectedList) => onSelectCategory(selectedList, index)}
//                                                 onRemove={(selectedList) => onRemoveCategory(selectedList, index)}
//                                             />
//                                         </td>
//                                         <td className="td_S m-auto th_C">
//                                             <Form.Control
//                                                 placeholder={ele.discount}
//                                                 type="number"
//                                                 min={20}
//                                                 style={{
//                                                     border: "1px solid #dee2e6",
//                                                     padding: "11px",
//                                                     outline: 0,
//                                                     borderRadius: "8px",
//                                                 }}
//                                                 // value={ele.discount}
//                                                 onChange={(e) => handleQuantityChange(e, index,ele)}
//                                             />

//                                         </td>
//                                         <td className="td_S m-auto th_C">
//                                             <PinkSwitch
//                                                 {...label}
//                                                 checked={ switchStates? ele.action: ele.action }
//                                                 onChange={() => handleSwitchChange1(index,ele)}
//                                             />
//                                         </td>
//                                         <td className="td_S m-auto th_C">
//                                             <button onClick={() => handleUpdateClick(index, ele, vendor)} style={{
//                                                 background: "cadetblue",
//                                                 color: "white",
//                                                 border: "none",
//                                                 padding: "2px 10px 2px 10px"
//                                             }}>
//                                                 Update
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 );
//                             });
//                         })}

//                     </tbody>
//                 </Table>
//                 <div className="row mb-2">
//                     <div className="col-md-2 text-start">
//                         <button
//                             className="sale-order-add-item-btn"
//                             style={{
//                                 padding: "5px 17px 10px",
//                                 border: "1px solid #f9f9fb",
//                                 borderRadius: "5px",
//                             }}
//                             onClick={addTableRow}
//                         >
//                             <i class="fa-solid fa-circle-plus" style={{ color: "#188dfa" }}></i>
//                             Add
//                         </button>
//                     </div>
//                     <div className="col-md-8 m-auto "></div>

//                 </div>

//                 <Table className="col-md-12">
//                     <thead>
//                         <th className="td_S th_C p-2">City</th>
//                         <th className="td_S th_C p-2">Category</th>

//                         <th className="td_S th_C p-2">Discount</th>

//                         <th className="td_S th_C p-2">Action</th>
//                     </thead>
//                     <tbody>
//                         {itemDetails.map((ele, index) => {

//                             return (
//                                 <tr>


//                                     <td className="td_S m-auto th_C">
//                                         <Form.Control
//                                             as="select"
//                                             onChange={(e) => handleCityChange(e, index)}
//                                         >
//                                             <option>--select--</option>
//                                             {citydata.map((item) => (
//                                                 <option key={item.city} value={item.city}>
//                                                     {item.city}
//                                                 </option>
//                                             ))}
//                                         </Form.Control>

//                                     </td>
//                                     <td className="td_S m-auto th_C">

//                                         <Multiselect
//                                             options={categorydata.map((category) => ({
//                                                 name: category.category,
//                                             }))}
//                                             placeholder="Select Category"
//                                             displayValue="name"
//                                             showCheckbox={true}
//                                             selectedValues={selectedCategory[index] || []}
//                                             onSelect={(selectedList) => onSelectCategory(selectedList, index)}
//                                             // onChange={(selectedList) => onSelectCategory(selectedList, index)}
//                                             onRemove={(selectedList) => onRemoveCategory(selectedList, index)}
//                                         />

//                                     </td>
//                                     <td className="td_S m-auto th_C">




//                                         <Form.Control
//                                             placeholder="Vendor Discount"
//                                             type="number"
//                                             min={20}
//                                             style={{
//                                                 border: "1px solid #dee2e6",
//                                                 padding: "11px",
//                                                 outline: 0,
//                                                 borderRadius: "8px",
//                                             }}
//                                             value={ele.quantity}
//                                             onChange={(e) => handleQuantityChange(e, index)}
//                                         />
//                                     </td>
//                                     <td className="td_S m-auto th_C">
//                                         <PinkSwitch
//                                             {...label}
//                                             checked={ele.action}
//                                             onChange={() => handleSwitchChange(index)}
//                                         />
//                                     </td>

//                                     <td className="td_S m-auto th_C">
//                                         <button
//                                             onClick={() => handleDeleteRow(index)}
//                                             className="delete-row-button"
//                                         >
//                                             Delete
//                                         </button>
//                                     </td>
//                                 </tr>
//                             );
//                         })}
//                     </tbody>
//                 </Table>

//                 <div className="row">
//                     <div className="col-md-4"></div>
//                     <div className="col-md-4">
//                         <div className="row">
//                             <div className="col-md-5">
//                                 <Button
//                                     className=" textbld m-auto m-2 bg_color"
//                                     onClick={UpdateVendorConfigure}
//                                 >
//                                     Done
//                                 </Button>
//                             </div>

//                         </div>
//                     </div>
//                     <div className="col-md-4"></div>
//                 </div>
//             </div>
//         </div>

//     );
// }
// export default DirectSales;


import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidenav from "./Sidenav";
import Header from "./Header";
import DataTable from "react-data-table-component";
import Modal from "react-bootstrap/Modal";
import Multiselect from "multiselect-react-dropdown";
import Switch from '@mui/material/Switch';
import { alpha, styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
function VendorSetting() {

    const [data1, setdata1] = useState([]);
    const [category, setcategory] = useState("");
    const [discount, setdiscount] = useState("");
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
    const [citydata, setcitydata] = useState([]);
    const [city, setcity] = useState("");
    const [categorydata, setcategorydata] = useState([]);
    const formdata = new FormData();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleEdit = (subcategory) => {
        seteditTrainingvideo(subcategory);
        handleShow(true);
    };
    const [data, setdata] = useState([]);

    const [city1, setcity1] = useState(data.city);
    const [discount1, setdiscount1] = useState(data?.discount);

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
        let res = await axios.get("https://api.vijayhomesuperadmin.in/api/getcategory");
        if ((res.status = 200)) {
            setdata1(res.data?.category);
        }
    };

    const PinkSwitch = styled(Switch)(({ theme }) => ({
        '& .MuiSwitch-switchBase.Mui-checked': {
            color: pink[600],
            '&:hover': {
                backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
            },
        },
        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
            backgroundColor: pink[600],
        },
    }));
    const label = { inputProps: { 'aria-label': 'Color switch demo' } };



    const UpdateVendorConfigure = async (e) => {
        e.preventDefault();
        // Check if required fields are filled
        if (!city || !selectedCatagory || !discount) {
            alert("Please fill all data");
            return;
        }
        try {
            console.log("hit thr apisss")
            const config = {
                url: `/updatevendorconfigure`,
                method: "post",
                baseURL: "https://api.vijayhomeservicebengaluru.in/api",
                headers: { "content-type": "application/json" },
                data: {
                    city: city,
                    category: selectedCatagory,
                    discount: discount,
                    action: true


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

    const [isChecked, setIsChecked] = useState();

    // useEffect to update isChecked when data?.action changes
    useEffect(() => {
        if (data?.action !== undefined) {
            setIsChecked(data.action);
        }
    }, [data?.action]);

    const handleToggle = () => {
        setIsChecked((prevChecked) => !prevChecked);
    };

    console.log("data?.action---", data?.action);
    console.log("isChecked--", isChecked);




    const getsubcategory = async () => {
        let res = await axios.get("https://api.vijayhomeservicebengaluru.in/api/getAutomateddata");
        if ((res.status = 200)) {

            setsubcategorydata(res.data?.AutomatedService);
            setfilterdata(res.data?.AutomatedService);
        }
    };


    const editthedata = async () => {
        try {
            const response = await axios.post(
                `https://api.vijayhomeservicebengaluru.in/api/editAutomated/${data._id}`,
                {
                    category: selectedCatagory1,
                    discount: discount1,
                    action: isChecked,
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
            alert("An error occurred while editing category");
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
            cell: (row) => (
                <div>
                    {row.category.map((i) => (
                        <div> {i.name},</div>
                    ))}
                </div>
            ),
        },
        {
            name: "Vendor Discount  ",
            selector: (row) => row.discount,
        },


        {
            name: "Status",
            cell: (row) => (
                <div>
                    <PinkSwitch
                        {...label}
                        checked={row.action}
                        onChange={handleToggle}
                    />
                    {/* <a onClick={() => deleteservices(row._id)} className="hyperlink mx-1">
                        Delete
                    </a> */}
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

                    <a
                        onClick={() => deleteautomate(row._id)}
                        className="hyperlink mx-1"
                    >
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
    const onEditCatagory = (selectedList, selectedItem) => {
        // Handle select event
        setSelectedCatagory1(selectedList);
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
            url: "https://api.vijayhomeservicebengaluru.in/api/updatevendorconfiguredelete/" + id,
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
        let res = await axios.get("https://api.vijayhomesuperadmin.in/api/master/getcity");
        if ((res.status = 200)) {
            setcitydata(res.data?.mastercity);
        }
    };

    const onSelectCatagory = (selectedList, selectedItem) => {
        // Handle select event
        setSelectedCatagory(selectedList);
        console.log(selectedList);
        console.log(selectedItem);
    };

    const onRemoveCatagory = (selectedList, removedItem) => {
        // Handle remove event
        setSelectedCatagory(selectedList);

    };

    const onRemoveCatagory1 = (selectedList, removedItem) => {
        // Handle remove event
        setSelectedCatagory1(selectedList);

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
                                        <div className="col-md-4">
                                            <div className="vhs-input-label">
                                                Category <span className="text-danger"> *</span>
                                            </div>
                                            <div className="group pt-1">
                                                <Multiselect
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
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-4">
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



                                    </div>

                                    <div className="row pt-3 justify-content-center">
                                        <div className="col-md-2">
                                            <button className="vhs-button" onClick={UpdateVendorConfigure}>
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
                                    <div className="col-md-12 mt-3">
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
                                    </div>


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
                                            Status <span className="text-danger"> *</span>
                                        </div>
                                        <div className="group pt-1">



                                            <label className="switch">
                                                <input type="checkbox" defaultChecked={data.action} onChange={handleToggle} />
                                                <span className="slider"></span>
                                            </label>
                                        </div>
                                    </div>


                                    <div className="row pt-3">
                                        <div className="col-md-2">
                                            <button className="vhs-button" onClick={editthedata} >
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
