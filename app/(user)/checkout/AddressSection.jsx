"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { 
  FaUser, 
  FaMapMarkerAlt, 
  FaCity, 
  FaPhone, 
  FaHome,
  FaSave,
  FaTimes
} from "react-icons/fa";
import { baseurl } from "@/app/admin/components/apis";

axios.defaults.withCredentials = true;

export default function AddressForm({ 
  addressData = null, 
  onSave, 
  onCancel,
  mode = "create" 
}) {
  const [loading, setLoading] = useState(false);
  const [isDefault, setIsDefault] = useState(addressData?.default || false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm({
    defaultValues: addressData || {
      firstName: "",
      lastName: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      phone: "",
      default: false
    }
  });

  // Pre-fill form when editing
  useEffect(() => {
    if (addressData) {
      Object.keys(addressData).forEach(key => {
        setValue(key, addressData[key]);
      });
      setIsDefault(addressData.default || false);
    }
  }, [addressData, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = {
        ...data,
        default: isDefault
      };

      let response;
      if (mode === "edit" && addressData?._id) {
        response = await axios.put(`${baseurl}/address/update/${addressData._id}`,formData);
      } else {
        response = await axios.post(
          `${baseurl}/address/create`,
          formData
        );
      }

      if (response.data.success) {
        toast.success(
          mode === "edit" 
            ? "Address updated successfully" 
            : "Address added successfully"
        );
        reset();
        onSave?.(response.data.data);
      } else {
        toast.error(response.data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error saving address:", error);
      toast.error(
        error.response?.data?.message || "Failed to save address"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
<>




 {
    <div className=" mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <FaMapMarkerAlt className="text-blue-600" />
          {mode === "edit" ? "Edit Address" : "Add New Address"}
        </h2>
        <p className="text-gray-600 mt-1">
          {mode === "edit" 
            ? "Update your address information" 
            : "Fill in your address details"
          }
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First Name */}
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              First Name *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="firstName"
                {...register("firstName", {
                  required: "First name is required",
                  maxLength: {
                    value: 50,
                    message: "First name cannot exceed 50 characters"
                  }
                })}
                className={`block w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.firstName ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="Enter first name"
              />
            </div>
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="lastName"
                {...register("lastName", {
                  required: "Last name is required",
                  maxLength: {
                    value: 50,
                    message: "Last name cannot exceed 50 characters"
                  }
                })}
                className={`block w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.lastName ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="Enter last name"
              />
            </div>
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        {/* Address Line 1 */}
        <div>
          <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700 mb-1">
            Address Line 1 *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaHome className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="addressLine1"
              {...register("addressLine1", {
                required: "Address line 1 is required",
                maxLength: {
                  value: 200,
                  message: "Address line 1 cannot exceed 200 characters"
                }
              })}
              className={`block w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.addressLine1 ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="Street address, P.O. box, company name"
            />
          </div>
          {errors.addressLine1 && (
            <p className="mt-1 text-sm text-red-600">{errors.addressLine1.message}</p>
          )}
        </div>

        {/* Address Line 2 */}
        <div>
          <label htmlFor="addressLine2" className="block text-sm font-medium text-gray-700 mb-1">
            Address Line 2
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaHome className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="addressLine2"
              {...register("addressLine2", {
                maxLength: {
                  value: 200,
                  message: "Address line 2 cannot exceed 200 characters"
                }
              })}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Apartment, suite, unit, building, floor, etc."
            />
          </div>
          {errors.addressLine2 && (
            <p className="mt-1 text-sm text-red-600">{errors.addressLine2.message}</p>
          )}
        </div>

        {/* City, State, Postal Code Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* City */}
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              City *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaCity className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="city"
                {...register("city", {
                  required: "City is required",
                  maxLength: {
                    value: 100,
                    message: "City cannot exceed 100 characters"
                  }
                })}
                className={`block w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.city ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="Enter city"
              />
            </div>
            {errors.city && (
              <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
            )}
          </div>

          {/* State */}
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
              State *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaMapMarkerAlt className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="state"
                {...register("state", {
                  required: "State is required",
                  maxLength: {
                    value: 100,
                    message: "State cannot exceed 100 characters"
                  }
                })}
                className={`block w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.state ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="Enter state"
              />
            </div>
            {errors.state && (
              <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
            )}
          </div>

          {/* Postal Code */}
          <div>
            <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
              Postal Code *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaMapMarkerAlt className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="postalCode"
                {...register("postalCode", {
                  required: "Postal code is required",
                  maxLength: {
                    value: 20,
                    message: "Postal code cannot exceed 20 characters"
                  }
                })}
                className={`block w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.postalCode ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="ZIP / Postal code"
              />
            </div>
            {errors.postalCode && (
              <p className="mt-1 text-sm text-red-600">{errors.postalCode.message}</p>
            )}
          </div>
        </div>

        {/* Country and Phone Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Country */}
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
              Country *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaMapMarkerAlt className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="country"
                {...register("country", {
                  required: "Country is required",
                  maxLength: {
                    value: 100,
                    message: "Country cannot exceed 100 characters"
                  }
                })}
                className={`block w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.country ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="Enter country"
              />
            </div>
            {errors.country && (
              <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaPhone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="tel"
                id="phone"
                {...register("phone", {
                  pattern: {
                    value: /^\+?[\d\s\-\(\)]{10,}$/,
                    message: "Please provide a valid phone number"
                  }
                })}
                className={`block w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.phone ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>
        </div>

        {/* Default Address Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="default"
            checked={isDefault}
            onChange={(e) => setIsDefault(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="default" className="ml-2 block text-sm text-gray-900">
            Set as default address
          </label>
        </div>

        {/* Form Actions */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"


            disabled={loading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition duration-300"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                <FaSave />
                {mode === "edit" ? "Update Address" : "Save Address"}
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="flex-1 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition duration-300"
          >
            <FaTimes />
            Cancel
          </button>
        </div>
      </form>
    </div>

        }

</>
  );
}