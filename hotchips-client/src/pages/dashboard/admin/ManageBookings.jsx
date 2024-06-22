import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import Swal from "sweetalert2";
const ManageBookings = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { refetch, data: orders = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments/all");
      return res.data;
    },
  });
  console.log;
  const handleConfirm = async (item) => {
    await axiosSecure.patch(`/payments/${item._id}`).then((res) => {
      console.log(res.data);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Payment Success",
        showConfirmButton: false,
        timer: 1500,
      });
      refetch();
    });
  };
  const handleDeleteUser = (user) => {
    axiosSecure.delete(`/users/${user._id}`).then((res) => {
      alert(`${user.name} is removed from database`);
      refetch();
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between m-4">
        <h5>All Orders</h5>
        <h5>Total Orders: {orders.length}</h5>
      </div>

      {/* table */}
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra md:w-[870px]">
            {/* head */}
            <thead className="text-white rounded-lg bg-green">
              <tr>
                <th>#</th>
                <th>user</th>
                <th>Transaction Id</th>
                <th>Price</th>
                <th>Status</th>
                <th>Confirm Order</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{item.email}</td>
                  <td>{item.transitionId}</td>
                  <td>{item.price}</td>
                  <td>{item.status}</td>
                  <td className="text-center">
                    {item.status === "confirmed" ? (
                      "done"
                    ) : (
                      <button
                        onClick={() => handleConfirm(item)}
                        className="text-white bg-orange-500 btn btn-xs"
                      >
                        <GiConfirmed />
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteUser(user)}
                      className="text-white bg-orange-500 btn btn-xs"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageBookings;
