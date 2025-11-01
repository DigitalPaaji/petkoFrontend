"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FaPercent,
  FaShippingFast,
  FaDollarSign,
  FaReceipt,
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
} from "react-icons/fa";
import { baseurl } from "../../components/apis";
import { toast } from "react-toastify";

const Page = () => {
  const [chargeType, setChargeType] = useState("tax");
  const [chargeAmount, setChargeAmount] = useState("");
  const [maxvalue, setmaxvalue] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [chagedata, setChageData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handelcreatCharges = async () => {
    try {
      if (!chargeType || !chargeAmount) {
        toast.error("Please fill in all required fields");
        return;
      }

      setLoading(true);
      const response = await axios.post(`${baseurl}/charges/create`, {
        chargetype: chargeType,
        chargeamount: chargeAmount,
        maxvalue: maxvalue || null,
      });
      const data = await response.data;
      if (data.success) {
        toast.success(data.message);
        getCharge();
        setShowCreate(false);
        resetForm();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const getCharge = async () => {
    try {
      const response = await axios.get(`${baseurl}/charges`);
      const data = await response.data;
      if (data.success) {
        setChageData(data.charges);
      } else {
        setChageData([]);
      }
    } catch (error) {
      setChageData([]);
    }
  };

  const handleDelete = async (chargeId) => {
    if (window.confirm("Are you sure you want to delete this charge?")) {
      try {
        const response = await axios.delete(`${baseurl}/charges/${chargeId}`);
        const data = await response.data;
        if (data.success) {
          toast.success(data.message);
          getCharge();
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      }
    }
  };

  const resetForm = () => {
    setChargeType("tax");
    setChargeAmount("");
    setmaxvalue("");
  };

  useEffect(() => {
    getCharge();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Main Content */}
      {!showCreate ? (
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Charges Management</h1>
              <p className="text-gray-600 mt-2">Manage tax and shipping charges for your application</p>
            </div>
            
            <button 
              onClick={() => setShowCreate(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200 mt-4 sm:mt-0"
            >
              <FaPlus className="text-lg" />
              Create New Charge
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Charges</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{chagedata.length}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <FaReceipt className="text-blue-600 text-xl" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tax Charges</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {chagedata.filter(charge => charge.chargetype === 'tax').length}
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <FaPercent className="text-green-600 text-xl" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Shipping Charges</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {chagedata.filter(charge => charge.chargetype === 'shipping').length}
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <FaShippingFast className="text-purple-600 text-xl" />
                </div>
              </div>
            </div>
          </div>

          {/* Charges Grid */}
          {chagedata.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {chagedata.map((charge) => (
                <div 
                  key={charge._id} 
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
                >
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          charge.chargetype === 'tax' ? 'bg-green-100' : 'bg-purple-100'
                        }`}>
                          {charge.chargetype === 'tax' ? (
                            <FaPercent className={`text-lg ${
                              charge.chargetype === 'tax' ? 'text-green-600' : 'text-purple-600'
                            }`} />
                          ) : (
                            <FaShippingFast className="text-purple-600 text-lg" />
                          )}
                        </div>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          charge.chargetype === 'tax' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-purple-100 text-purple-800'
                        }`}>
                          {charge.chargetype === 'tax' ? 'Tax' : 'Shipping'}
                        </span>
                      </div>
                      <button
                        onClick={() => handleDelete(charge._id)}
                        className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-1"
                      >
                        <FaTrash className="text-sm" />
                      </button>
                    </div>

                    {/* Charge Details */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Amount:</span>
                        <span className="text-xl font-bold text-gray-900">
                          {charge.chargetype === 'tax' ? (
                            `${charge.chargeamount}%`
                          ) : (
                            `$${charge.chargeamount}`
                          )}
                        </span>
                      </div>

                      {charge.maxvalue && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Max Value:</span>
                          <span className="font-semibold text-green-600">
                            ${charge.maxvalue}
                          </span>
                        </div>
                      )}

                      {/* Created Date */}
                      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                        <span className="text-xs text-gray-500">Created</span>
                        <span className="text-xs text-gray-500">
                          {new Date(charge.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Empty State
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <FaReceipt className="text-gray-400 text-6xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Charges Found</h3>
              <p className="text-gray-600 mb-6">Get started by creating your first charge configuration</p>
              <button 
                onClick={() => setShowCreate(true)}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                <FaPlus className="text-lg" />
                Create First Charge
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Create Charge Form */
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Create Charge</h1>
                <p className="text-gray-600 mt-2">Set up tax or shipping charges for your application</p>
              </div>
              <button
                onClick={() => {
                  setShowCreate(false);
                  resetForm();
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-2"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            {/* Configuration Card */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Charge Type Select */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Charge Type *
                  </label>
                  <div className="relative">
                    <select
                      value={chargeType}
                      onChange={(e) => setChargeType(e.target.value)}
                      className="w-full appearance-none bg-white border border-gray-300 rounded-xl px-4 py-3 pr-12 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 cursor-pointer shadow-sm"
                    >
                      <option value="tax">Tax</option>
                      <option value="shipping">Shipping</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                      {chargeType === "tax" ? (
                        <FaPercent className="text-blue-500 text-lg" />
                      ) : (
                        <FaShippingFast className="text-blue-500 text-lg" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Charge Amount Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    {chargeType === "tax" ? "Tax Rate (%) *" : "Amount ($) *"}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={chargeAmount}
                      onChange={(e) => setChargeAmount(e.target.value)}
                      placeholder={chargeType === "tax" ? "0.00" : "0.00"}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 pl-12 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                      min="0"
                      step={chargeType === "tax" ? "0.01" : "0.01"}
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                      {chargeType === "tax" ? (
                        <FaPercent className="text-gray-400 text-lg" />
                      ) : (
                        <FaDollarSign className="text-gray-400 text-lg" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Maximum Value Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Max Value ($)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={maxvalue}
                      onChange={(e) => setmaxvalue(e.target.value)}
                      placeholder="0.00"
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 pl-12 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                      min="0"
                      step="0.01"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                      <FaDollarSign className="text-gray-400 text-lg" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Preview Section */}
              <div className="mt-6 p-4 bg-white rounded-lg border border-gray-300">
                <div className="flex items-center gap-3 mb-3">
                  <FaReceipt className="text-blue-500 text-xl" />
                  <h3 className="text-lg font-semibold text-gray-800">Charge Preview</h3>
                </div>

                <div className="space-y-2">
                  {chargeType === "tax" ? (
                    <>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Tax Rate:</span>
                        <span className="font-semibold text-blue-600">
                          {chargeAmount || "0.00"}%
                        </span>
                      </div>
                      {maxvalue && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Maximum Tax:</span>
                          <span className="font-semibold text-green-600">
                            ${maxvalue}
                          </span>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Shipping Fee:</span>
                        <span className="font-semibold text-blue-600">
                          ${chargeAmount || "0.00"}
                        </span>
                      </div>
                      {maxvalue && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Maximum Shipping:</span>
                          <span className="font-semibold text-green-600">
                            ${maxvalue}
                          </span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Helper Text */}
              <div className="mt-4 text-sm text-gray-500">
                {chargeType === "tax"
                  ? "Tax will be calculated as a percentage of the total amount"
                  : "Shipping fee will be added as a fixed amount to the total"}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handelcreatCharges}
                disabled={loading || !chargeType || !chargeAmount}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-6 rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <FaPlus />
                    Create Charge
                  </>
                )}
              </button>
              <button
                onClick={() => {
                  setShowCreate(false);
                  resetForm();
                }}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;