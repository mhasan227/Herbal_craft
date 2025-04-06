'use client'

import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

export default function AdminSettings() {
  // This would be populated from Redux store in a real implementation
  const [settings, setSettings] = useState({
    general: {
      storeName: 'Herbal Craft',
      storeEmail: 'contact@herbalcraft.com',
      phoneNumber: '+1 234 567 8900',
      address: '123 Herbal Lane, Nature City, 12345'
    },
    notifications: {
      orderConfirmation: true,
      orderShipped: true,
      orderDelivered: true,
      lowStock: true,
      newCustomer: true
    },
    shipping: {
      freeShippingThreshold: 50,
      defaultShippingRate: 5.99,
      internationalShipping: false,
      processingTime: '1-2 business days'
    },
    payment: {
      currency: 'USD',
      acceptedMethods: ['credit_card', 'paypal'],
      taxRate: 8.5
    },
    inventory: {
      lowStockThreshold: 10,
      outOfStockBehavior: 'hide',
      trackInventory: true
    }
  })

  const handleSettingChange = (section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }))
  }

  const handleSaveSettings = () => {
    // This would dispatch an update action to Redux in a real implementation
    console.log('Save settings:', settings)
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <button
          onClick={handleSaveSettings}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          Save Changes
        </button>
      </div>

      <div className="space-y-6">
        {/* General Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">General Settings</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Store Name</label>
              <input
                type="text"
                value={settings.general.storeName}
                onChange={(e) => handleSettingChange('general', 'storeName', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Store Email</label>
              <input
                type="email"
                value={settings.general.storeEmail}
                onChange={(e) => handleSettingChange('general', 'storeEmail', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                value={settings.general.phoneNumber}
                onChange={(e) => handleSettingChange('general', 'phoneNumber', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <textarea
                value={settings.general.address}
                onChange={(e) => handleSettingChange('general', 'address', e.target.value)}
                rows={2}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Notification Settings</h2>
          <div className="space-y-4">
            {Object.entries(settings.notifications).map(([key, value]) => (
              <div key={key} className="flex items-center">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => handleSettingChange('notifications', key, e.target.checked)}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  {key.split(/(?=[A-Z])/).join(' ')}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Shipping Settings</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Free Shipping Threshold ($)
              </label>
              <input
                type="number"
                value={settings.shipping.freeShippingThreshold}
                onChange={(e) => handleSettingChange('shipping', 'freeShippingThreshold', parseFloat(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Default Shipping Rate ($)
              </label>
              <input
                type="number"
                value={settings.shipping.defaultShippingRate}
                onChange={(e) => handleSettingChange('shipping', 'defaultShippingRate', parseFloat(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={settings.shipping.internationalShipping}
                onChange={(e) => handleSettingChange('shipping', 'internationalShipping', e.target.checked)}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">
                Enable International Shipping
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Processing Time</label>
              <input
                type="text"
                value={settings.shipping.processingTime}
                onChange={(e) => handleSettingChange('shipping', 'processingTime', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
          </div>
        </div>

        {/* Payment Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Payment Settings</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Currency</label>
              <select
                value={settings.payment.currency}
                onChange={(e) => handleSettingChange('payment', 'currency', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tax Rate (%)</label>
              <input
                type="number"
                value={settings.payment.taxRate}
                onChange={(e) => handleSettingChange('payment', 'taxRate', parseFloat(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
          </div>
        </div>

        {/* Inventory Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Inventory Settings</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Low Stock Threshold
              </label>
              <input
                type="number"
                value={settings.inventory.lowStockThreshold}
                onChange={(e) => handleSettingChange('inventory', 'lowStockThreshold', parseInt(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Out of Stock Behavior
              </label>
              <select
                value={settings.inventory.outOfStockBehavior}
                onChange={(e) => handleSettingChange('inventory', 'outOfStockBehavior', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              >
                <option value="hide">Hide Product</option>
                <option value="show">Show as Out of Stock</option>
                <option value="backorder">Allow Backorder</option>
              </select>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={settings.inventory.trackInventory}
                onChange={(e) => handleSettingChange('inventory', 'trackInventory', e.target.checked)}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">
                Track Inventory
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 