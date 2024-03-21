import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";

import ServiceBooking from "./components/ServiceBooking";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Vendordetails from "./components/Vendordetails";
import Vendor from "./components/Vendor";
import Training from "./components/Training"
import VendorSetting from "./components/VendorSetting";
import OfferAnnouncement from "./components/OfferAnnouncement";
import Report from "./components/Report"
import ReportList from "./components/ReportList";
import Enquiry from "./components/Enquiry";



function App() {


  return (
    <BrowserRouter>
      <Routes>

        <Route path="/ServiceBooking" element={<ServiceBooking />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/vendordetails/:id" element={<Vendordetails />} />
        <Route path="/vendor" element={<Vendor />} />
        <Route path="/Training" element={<Training />} />
        <Route path="/VendorSetting" element={<VendorSetting />} />
        <Route path="/reportlist/:date/:category" element={<ReportList />} />
        <Route path="/" element={<Login />} />
        <Route path="/report" element={<Report />} />
        <Route path="/offerAnnouncement" element={<OfferAnnouncement />} />
        <Route path="/enquiry" element={<Enquiry />} />

      </Routes>

    </BrowserRouter>
  );
}
export default App;