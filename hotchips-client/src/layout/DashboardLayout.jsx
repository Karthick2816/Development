import React from "react";
import { Link, Outlet } from "react-router-dom";
import { MdDashboard, MdDashboardCustomize } from "react-icons/md";
import {
  FaEdit,
  FaLocationArrow,
  FaPlusCircle,
  FaQuestionCircle,
  FaRegUser,
  FaShoppingBag,
  FaUser,
} from "react-icons/fa";

import logo from "/logo.png";
import { FaCartShopping } from "react-icons/fa6";
import Login from "../components/Login";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";

const sharedLinks = (
  <>
    <li className="mt-3">
      <Link to="/">
        <MdDashboard /> Home
      </Link>
    </li>
    <li>
      <Link to="/menu">
        <FaCartShopping /> Menu
      </Link>
    </li>
    <li>
      <Link to="/menu">
        <FaLocationArrow /> Orders Tracking
      </Link>
    </li>
    <li>
      <Link to="/menu">
        <FaQuestionCircle /> Customer Support
      </Link>
    </li>
  </>
);

const DashboardLayout = () => {
  const { loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  return (
    <div>
      {isAdmin ? (
        <div className="drawer sm:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="flex flex-col my-2 drawer-content sm:items-start sm:justify-start">
            {/* Page content here */}
            <div className="flex items-center justify-between mx-4">
              <label
                htmlFor="my-drawer-2"
                className="btn btn-primary drawer-button lg:hidden"
              >
                <MdDashboardCustomize />
              </label>
              <button className="flex items-center gap-2 px-6 text-white rounded-full btn bg-green sm:hidden">
                <FaRegUser /> Logout
              </button>
            </div>
            <div className="mx-4 mt-5 md:mt-2">
              <Outlet />
            </div>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="min-h-full p-4 menu w-80 bg-base-200 text-base-content">
              {/* Sidebar content here */}
              <li>
                <Link to="/dashboard" className="flex justify-start mb-3">
                  <img src={logo} alt="" className="w-20" />
                  <span className="badge badge-primary">admin</span>
                </Link>
              </li>
              <hr />
              <li className="mt-3">
                <Link to="/dashboard">
                  <MdDashboard /> Dashboard
                </Link>
              </li>
              <li>
                <Link to="/dashboard/manage-bookings">
                  <FaShoppingBag /> Manage Bookings
                </Link>
              </li>
              <li>
                <Link to="/dashboard/add-menu">
                  <FaPlusCircle />
                  Add Menu
                </Link>
              </li>
              <li>
                <Link to="/dashboard/manage-items">
                  <FaEdit /> Manage Items
                </Link>
              </li>
              <li className="mb-3">
                <Link to="/dashboard/users">
                  <FaUser /> All Users
                </Link>
              </li>

              <hr />

              {/* shared nav links */}
              {sharedLinks}
            </ul>
          </div>
        </div>
      ) : loading ? (
        <Login />
      ) : (
        <div className="flex items-center justify-center h-screen">
          <Link to="/">
            <button className="text-white btn bg-green">Back to Home</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
