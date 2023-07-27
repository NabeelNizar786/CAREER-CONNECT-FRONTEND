import React from 'react'
import Layout from '../../components/Layout'

function adminHome() {

  const dummyDashboardItems = [
    { title: 'Total Users', value: 245, icon: '👥', color: 'bg-blue-500' },
    { title: 'Revenue', value: '$12,345', icon: '💵', color: 'bg-green-500' },
    { title: 'New Orders', value: 32, icon: '🛒', color: 'bg-yellow-500' },
    { title: 'Pending Tasks', value: 8, icon: '📋', color: 'bg-red-500' },
  ];

  return (
    <Layout>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          {dummyDashboardItems.map((item, index) => (
            <div
              key={index}
              className={`p-4 shadow-md rounded-lg text-center ${item.color}`}
            >
              <div className="text-4xl mb-2">{item.icon}</div>
              <div className="text-dark text-xl font-semibold">{item.title}</div>
              <div className="text-dark text-3xl mt-2">{item.value}</div>
            </div>
          ))}
        </div>
    </Layout>
  )
}

export default adminHome