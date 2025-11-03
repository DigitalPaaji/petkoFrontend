'use client';

import axios from 'axios';
import React, { useState } from 'react';
import { FaTag, FaPercentage, FaDollarSign, FaCalendarAlt, FaSave, FaPlus, FaInfoCircle } from 'react-icons/fa';
import { baseurl } from '../../components/apis';
import { toast } from 'react-toastify';

const CreateCouponPage = () => {
  const [formData, setFormData] = useState({
    code: '',
    description: '',
    discountType: 'percentage',
    discountValue: '',
    minPurchaseAmount: '',
    maxDiscountAmount: '',
    validTill: '',
    usageLimit: '',
    perUserLimit: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.code.trim()) {
      newErrors.code = 'Coupon code is required';
    } else if (formData.code.length < 3) {
      newErrors.code = 'Coupon code must be at least 3 characters';
    }

    if (!formData.discountValue || parseFloat(formData.discountValue) <= 0) {
      newErrors.discountValue = 'Discount value must be greater than 0';
    }

    if (formData.discountType === 'percentage' && parseFloat(formData.discountValue) > 100) {
      newErrors.discountValue = 'Percentage discount cannot exceed 100%';
    }

    if (formData.minPurchaseAmount && parseFloat(formData.minPurchaseAmount) < 0) {
      newErrors.minPurchaseAmount = 'Minimum purchase cannot be negative';
    }

    if (formData.maxDiscountAmount && parseFloat(formData.maxDiscountAmount) < 0) {
      newErrors.maxDiscountAmount = 'Max discount cannot be negative';
    }

    if (!formData.validTill) {
      newErrors.validTill = 'Valid until date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);


    try {


 const response = await axios.post(`${baseurl}/coupon/create`,{

          ...formData,
          discountValue: parseFloat(formData.discountValue),
          minPurchaseAmount: formData.minPurchaseAmount ? parseFloat(formData.minPurchaseAmount) : 0,
          maxDiscountAmount: formData.maxDiscountAmount ? parseFloat(formData.maxDiscountAmount) : 0,
          usageLimit: formData.usageLimit ? parseInt(formData.usageLimit) : 0,
          perUserLimit: formData.perUserLimit ? parseInt(formData.perUserLimit) : 0,

 })

 const data = await response.data;
 if(data.success){

    toast.success("Coupon created successfully!")

      setFormData({
          code: '',
          description: '',
          discountType: 'percentage',
          discountValue: '',
          minPurchaseAmount: '',
          maxDiscountAmount: '',
          validTill: '',
          usageLimit: '',
          perUserLimit: '',
        });

 }else{
        throw new Error('Failed to create coupon');

 }

     
   
    } catch (error) {
      toast.error('Error creating coupon: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateRandomCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData(prev => ({ ...prev, code: result }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className=" mx-auto px-4 sm:px-6 lg:px-36">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <FaTag className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Create New Coupon</h1>
          </div>
          <p className="text-gray-600">Create discount coupons for your customers</p>
        </div>

        {/* Form */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 px-20 space-y-6">
            {/* Coupon Code */}
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
                Coupon Code *
              </label>
              <div className="flex space-x-3">
                <input
                  type="text"
                  id="code"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  className={`flex-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.code ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="SUMMER25"
                />
                <button
                  type="button"
                  onClick={generateRandomCode}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm font-medium"
                >
                  Generate
                </button>
              </div>
              {errors.code && <p className="mt-1 text-sm text-red-600">{errors.code}</p>}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe the purpose of this coupon..."
              />
            </div>

            {/* Discount Type and Value */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="discountType" className="block text-sm font-medium text-gray-700 mb-2">
                  Discount Type *
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="discountType"
                      value="percentage"
                      checked={formData.discountType === 'percentage'}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <FaPercentage className="text-green-600 mr-1" />
                    Percentage
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="discountType"
                      value="fixed"
                      checked={formData.discountType === 'fixed'}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <FaDollarSign className="text-blue-600 mr-1" />
                    Fixed Amount
                  </label>
                </div>
              </div>

              <div>
                <label htmlFor="discountValue" className="block text-sm font-medium text-gray-700 mb-2">
                  Discount Value *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="discountValue"
                    name="discountValue"
                    value={formData.discountValue}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.discountValue ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder={formData.discountType === 'percentage' ? '10' : '5.00'}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">
                      {formData.discountType === 'percentage' ? '%' : '$'}
                    </span>
                  </div>
                </div>
                {errors.discountValue && <p className="mt-1 text-sm text-red-600">{errors.discountValue}</p>}
              </div>
            </div>

            {/* Minimum Purchase and Max Discount */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="minPurchaseAmount" className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Purchase Amount
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="minPurchaseAmount"
                    name="minPurchaseAmount"
                    value={formData.minPurchaseAmount}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.minPurchaseAmount ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="0.00"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <FaDollarSign className="text-gray-400" />
                  </div>
                </div>
                {errors.minPurchaseAmount && <p className="mt-1 text-sm text-red-600">{errors.minPurchaseAmount}</p>}
              </div>

              <div>
                <label htmlFor="maxDiscountAmount" className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum Discount Amount
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="maxDiscountAmount"
                    name="maxDiscountAmount"
                    value={formData.maxDiscountAmount}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.maxDiscountAmount ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="No limit"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <FaDollarSign className="text-gray-400" />
                  </div>
                </div>
                {errors.maxDiscountAmount && <p className="mt-1 text-sm text-red-600">{errors.maxDiscountAmount}</p>}
              </div>
            </div>

            {/* Validity Date */}
            <div>
              <label htmlFor="validTill" className="block text-sm font-medium text-gray-700 mb-2">
                Valid Until *
              </label>
              <div className="relative">
                <input
                  type="datetime-local"
                  id="validTill"
                  name="validTill"
                  value={formData.validTill}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.validTill ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <FaCalendarAlt className="text-gray-400" />
                </div>
              </div>
              {errors.validTill && <p className="mt-1 text-sm text-red-600">{errors.validTill}</p>}
            </div>

            {/* Usage Limits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="usageLimit" className="block text-sm font-medium text-gray-700 mb-2">
                  Total Usage Limit
                </label>
                <input
                  type="number"
                  id="usageLimit"
                  name="usageLimit"
                  value={formData.usageLimit}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Unlimited"
                />
              </div>

              <div>
                <label htmlFor="perUserLimit" className="block text-sm font-medium text-gray-700 mb-2">
                  Uses Per Customer
                </label>
                <input
                  type="number"
                  id="perUserLimit"
                  name="perUserLimit"
                  value={formData.perUserLimit}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Unlimited"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaSave className="mr-2" />
                {isSubmitting ? 'Creating Coupon...' : 'Create Coupon'}
              </button>
            </div>
          </form>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <FaInfoCircle className="text-blue-600 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-medium text-blue-800">Coupon Creation Tips</h3>
              <ul className="mt-2 text-sm text-blue-700 list-disc list-inside space-y-1">
                <li>Use clear, memorable coupon codes</li>
                <li>Set reasonable usage limits to prevent abuse</li>
                <li>Consider minimum purchase amounts to increase order value</li>
                <li>Test coupons before launching campaigns</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCouponPage;