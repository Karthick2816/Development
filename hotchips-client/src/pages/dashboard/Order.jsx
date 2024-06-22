import React from "react";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const Order = () => {
  const { user } = useAuth();

  // console.log(user.email);
  const token = localStorage.getItem("access-token");

  const { data: orders = [] } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:8000/payments?email=${user?.email}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      return res.json();
    },
  });
  // console.log(orders);
  const formatDate = (createdAt) => {
    const createdAtDate = new Date(createdAt);
    return createdAtDate.toLocaleDateString();
  };
  return (
    <div className="container px-4 mx-auto max-w-screen-2xl xl:px-24">
      <div className=" bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
        <div className="flex flex-col items-center justify-center py-28">
          {/* content */}
          <div className="px-4 text-center space-y-7">
            <h2 className="text-4xl font-bold leading-snug md:text-5xl md:leading-snug">
              Track All your Orders<span className="text-green"> Orders</span>
            </h2>
          </div>
        </div>
      </div>
      <div>
        {orders.length > 0 ? (
          <div>
            <div className="">
              <div className="overflow-x-auto">
                <table className="table">
                  {/* head */}
                  <thead className="text-white rounded-sm bg-green">
                    <tr>
                      <th>#</th>
                      <th>Order time</th>
                      <th>Transaction ID</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{formatDate(item.createdAt)}</td>

                        <td className="font-medium">{item.transitionId}</td>

                        <td>{item.status}</td>
                        <td>₹{item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                  {/* foot */}
                </table>
              </div>
            </div>
            <hr />
            <div className="flex flex-col items-start justify-between gap-8 my-12 md:flex-row">
              <div className="space-y-3 md:w-1/2">
                <h3 className="text-lg font-semibold">Customer Details</h3>
                <p>Name: {user?.displayName || "None"}</p>
                <p>Email: {user?.email}</p>
                <p>
                  User_id: <span className="text-sm">{user?.uid}</span>
                </p>
              </div>
              <div className="space-y-3 md:w-1/2">
                <h3 className="text-lg font-semibold">Shopping Details</h3>
                <p>Total Items: </p>
                <p>
                  Total Price: <span id="total-price">₹</span>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-20 text-center">
            <p>Cart is empty. Please add products.</p>
            <Link to="/menu">
              <button className="mt-3 text-white btn bg-green">
                Back to Menu
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
