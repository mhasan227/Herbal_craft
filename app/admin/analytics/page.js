import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

export default function AdminAnalytics() {
  // This would be populated from Redux store in a real implementation
  const analyticsData = {
    salesOverview: {
      totalSales: 12345.67,
      totalOrders: 150,
      averageOrderValue: 82.30,
      conversionRate: 3.2
    },
    topProducts: [
      { name: 'Chamomile Tea', sales: 45, revenue: 584.55 },
      { name: 'Lavender Essential Oil', sales: 38, revenue: 949.62 },
      { name: 'Peppermint Extract', sales: 32, revenue: 607.68 }
    ],
    monthlySales: [
      { month: 'Jan', sales: 2100 },
      { month: 'Feb', sales: 2400 },
      { month: 'Mar', sales: 2900 }
    ],
    customerStats: {
      totalCustomers: 89,
      newCustomers: 12,
      returningCustomers: 77,
      churnRate: 2.1
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Analytics</h1>

      {/* Sales Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard
          title="Total Sales"
          value={`$${analyticsData.salesOverview.totalSales.toFixed(2)}`}
          icon={
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <MetricCard
          title="Total Orders"
          value={analyticsData.salesOverview.totalOrders}
          icon={
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          }
        />
        <MetricCard
          title="Average Order Value"
          value={`$${analyticsData.salesOverview.averageOrderValue.toFixed(2)}`}
          icon={
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          }
        />
        <MetricCard
          title="Conversion Rate"
          value={`${analyticsData.salesOverview.conversionRate}%`}
          icon={
            <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          }
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Sales Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Monthly Sales</h2>
          <div className="h-64">
            {/* Chart would go here - using a placeholder visualization */}
            <div className="h-full flex items-end space-x-2">
              {analyticsData.monthlySales.map((data) => (
                <div key={data.month} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-green-500 rounded-t"
                    style={{ height: `${(data.sales / 3000) * 100}%` }}
                  ></div>
                  <div className="mt-2 text-sm text-gray-600">{data.month}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Top Products</h2>
          <div className="space-y-4">
            {analyticsData.topProducts.map((product, index) => (
              <div key={product.name} className="flex items-center">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">{product.name}</div>
                  <div className="text-sm text-gray-500">{product.sales} sales</div>
                </div>
                <div className="text-sm font-medium text-gray-900">
                  ${product.revenue.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Overview */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Customer Overview</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded">
              <div className="text-sm text-gray-500">Total Customers</div>
              <div className="text-xl font-semibold">{analyticsData.customerStats.totalCustomers}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded">
              <div className="text-sm text-gray-500">New Customers</div>
              <div className="text-xl font-semibold">{analyticsData.customerStats.newCustomers}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded">
              <div className="text-sm text-gray-500">Returning Customers</div>
              <div className="text-xl font-semibold">{analyticsData.customerStats.returningCustomers}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded">
              <div className="text-sm text-gray-500">Churn Rate</div>
              <div className="text-xl font-semibold">{analyticsData.customerStats.churnRate}%</div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Performance Metrics</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">Revenue Growth</span>
                <span className="text-sm font-medium text-green-600">+15.3%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">Customer Satisfaction</span>
                <span className="text-sm font-medium text-green-600">92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">Order Fulfillment</span>
                <span className="text-sm font-medium text-yellow-600">87%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '87%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MetricCard({ title, value, icon }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        {icon}
      </div>
      <p className="text-2xl font-semibold text-gray-900">{value}</p>
    </div>
  )
} 