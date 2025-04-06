'use client'

import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

export default function AdminOrders() {
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  
  // This would be populated from Redux store in a real implementation
  const orders = [
    {
      id: 1,
      customer: {
        name: 'John Doe',
        email: 'john@example.com'
      },
      total: 95.00,
      items: [
        { name: 'Chamomile Tea', quantity: 2, price: 12.99 },
        { name: 'Lavender Essential Oil', quantity: 1, price: 24.99 }
      ],
      status: 'Processing',
      date: '2024-03-15',
      shippingAddress: '123 Main St, City, Country'
    },
    {
      id: 2,
      customer: {
        name: 'Jane Smith',
        email: 'jane@example.com'
      },
      total: 120.00,
      items: [
        { name: 'Peppermint Extract', quantity: 3, price: 18.99 },
        { name: 'Lavender Essential Oil', quantity: 1, price: 24.99 }
      ],
      status: 'Delivered',
      date: '2024-03-14',
      shippingAddress: '456 Oak St, City, Country'
    },
  ]

  const handleViewDetails = (order) => {
    setSelectedOrder(order)
    setIsDetailsModalOpen(true)
  }

  const handleUpdateStatus = (orderId, newStatus) => {
    // This would dispatch an update action to Redux in a real implementation
    console.log('Update order status:', orderId, newStatus)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Orders</h1>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">#{order.id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{order.customer.name}</div>
                  <div className="text-sm text-gray-500">{order.customer.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">${order.total.toFixed(2)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                    order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{order.date}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleViewDetails(order)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    View Details
                  </button>
                  <select
                    value={order.status}
                    onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                    className="text-sm border rounded p-1"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      {isDetailsModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-[600px] shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Order Details #{selectedOrder.id}
                </h3>
                <button
                  onClick={() => {
                    setIsDetailsModalOpen(false)
                    setSelectedOrder(null)
                  }}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="mt-2">
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-500">Customer Information</h4>
                  <p className="mt-1">{selectedOrder.customer.name}</p>
                  <p className="text-gray-500">{selectedOrder.customer.email}</p>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-500">Shipping Address</h4>
                  <p className="mt-1">{selectedOrder.shippingAddress}</p>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-500">Order Items</h4>
                  <table className="mt-2 min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                        <th className="text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                        <th className="text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                        <th className="text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.items.map((item, index) => (
                        <tr key={index}>
                          <td className="py-2">{item.name}</td>
                          <td className="py-2">{item.quantity}</td>
                          <td className="py-2">${item.price.toFixed(2)}</td>
                          <td className="py-2">${(item.quantity * item.price).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 flex justify-end">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-500">Total Amount</p>
                    <p className="text-lg font-bold">${selectedOrder.total.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}