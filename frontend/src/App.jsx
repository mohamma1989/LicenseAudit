import { useState, useEffect } from 'react'

function App() {
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/dashboard_data')
      .then(response => response.json())
      .then(data => {
        setDashboardData(data)
        setLoading(false)
      })
      .catch(error => console.error("Failed to fetch data:", error))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-xl font-semibold text-gray-600 animate-pulse">Loading LicenseAudit...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="bg-slate-800 text-white p-6 rounded-t-xl shadow-lg">
          <h1 className="text-3xl font-bold tracking-tight">LicenseAudit Control Center</h1>
          <p className="text-slate-400 mt-1">Enterprise Software Asset Management</p>
        </div>

        {/* Alerts Section (Unchanged) */}
        <div className="bg-white p-8 rounded-b-xl shadow-lg mb-8 border-t border-slate-200">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Compliance Alerts</h2>
          {dashboardData.alerts.length === 0 ? (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-lg font-semibold">
              ✅ All purchased licenses are currently compliant.
            </div>
          ) : (
            <div className="space-y-4">
              {dashboardData.alerts.map((alert, index) => (
                <div key={index} className="bg-amber-50 border-l-4 border-red-500 p-5 rounded-r-lg shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <strong className="text-lg text-red-700">🚨 AUDIT FAILURE: {alert.software}</strong>
                    <span className="bg-red-100 text-red-800 text-sm font-bold px-3 py-1 rounded-full">
                      Short {alert.shortfall} licenses
                    </span>
                  </div>
                  <div className="text-slate-700 mb-3 text-sm">
                    Installed: <span className="font-bold">{alert.installed}</span> | Purchased: <span className="font-bold">{alert.allowed}</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold text-slate-600">📍 Found on Devices:</span> 
                    <span className="ml-2 font-mono text-red-600 bg-red-50 px-2 py-1 rounded border border-red-100">
                      {alert.devices.join(", ")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Devices Section (Updated with Dropdown) */}
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Monitored Devices</h2>
            <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm font-bold">
              {dashboardData.devices.length} Total
            </span>
          </div>
          
          <div className="divide-y divide-slate-100">
            {dashboardData.devices.map((device, index) => (
              <div key={index} className="py-4 hover:bg-slate-50 transition-colors px-4 rounded-lg -mx-4">
                
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-bold text-slate-800 text-lg">{device.hostname}</div>
                    <div className="text-slate-500 text-sm mt-1">OS: {device.os_type}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono bg-slate-100 px-3 py-1 rounded text-slate-700 font-semibold text-sm border border-slate-200">
                      {device.software_count} packages
                    </div>
                  </div>
                </div>

                {/* THE NEW DROPDOWN LIST */}
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-bold text-blue-600 hover:text-blue-800">
                    View Installed Software
                  </summary>
                  <div className="mt-3 bg-slate-800 p-4 rounded-lg max-h-48 overflow-y-auto">
                    <ul className="text-green-400 font-mono text-sm space-y-1">
                      {device.software_list.map((pkg, i) => (
                        <li key={i}>&gt; {pkg}</li>
                      ))}
                    </ul>
                  </div>
                </details>

              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default App