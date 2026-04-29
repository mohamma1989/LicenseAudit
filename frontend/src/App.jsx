import { useState, useEffect } from 'react'

function App() {
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)

  // Form State
  const [licenseName, setLicenseName] = useState("")
  const [licenseCount, setLicenseCount] = useState("")
  const [ignoreName, setIgnoreName] = useState("")

  // 1. The Core Fetch Function (Wrapped so we can call it on demand)
  const fetchDashboardData = () => {
    fetch('http://localhost:8000/api/dashboard_data')
      .then(response => response.json())
      .then(data => {
        setDashboardData(data)
        setLoading(false)
      })
      .catch(error => console.error("Failed to fetch data:", error))
  }

  // Fetch on initial load
  useEffect(() => {
    fetchDashboardData()
  }, [])

  // 2. The API Messenger for Licenses
  const handleAddLicense = (e) => {
    e.preventDefault()
    fetch('http://localhost:8000/api/add_license', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        software_name: licenseName,
        allowed_count: parseInt(licenseCount)
      })
    })
    .then(() => {
      setLicenseName("") // Clear the form
      setLicenseCount("")
      fetchDashboardData() // Instantly recalculate the math!
    })
  }

  // 3. The API Messenger for the Allowlist
  const handleIgnoreSoftware = (e) => {
    e.preventDefault()
    fetch('http://localhost:8000/api/ignore_software', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        software_name: ignoreName
      })
    })
    .then(() => {
      setIgnoreName("") // Clear the form
      fetchDashboardData() // Instantly recalculate the math!
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-xl font-semibold text-gray-600 animate-pulse">Loading LicenseAudit...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-slate-800 text-white p-6 rounded-xl shadow-lg flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">LicenseAudit Control Center</h1>
            <p className="text-slate-400 mt-1">Enterprise Software Asset Management</p>
          </div>
          <div className="bg-slate-700 px-4 py-2 rounded-lg font-mono text-emerald-400">
            System Online
          </div>
        </div>

        {/* --- NEW: ADMIN CONTROLS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Add License Form */}
          <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-blue-500">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Add Purchased License</h2>
            <form onSubmit={handleAddLicense} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-1">Software Name (Exact Match)</label>
                <input 
                  type="text" 
                  required
                  value={licenseName}
                  onChange={(e) => setLicenseName(e.target.value)}
                  placeholder="e.g., Microsoft Office" 
                  className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-1">Total Licenses Owned</label>
                <input 
                  type="number" 
                  required
                  min="0"
                  value={licenseCount}
                  onChange={(e) => setLicenseCount(e.target.value)}
                  placeholder="e.g., 50" 
                  className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">
                Save License Rule
              </button>
            </form>
          </div>

          {/* Ignore Software Form */}
          <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-slate-400">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Ignore Software (Allowlist)</h2>
            <p className="text-sm text-slate-500 mb-4">Add freeware or system tools here so they do not trigger compliance alerts.</p>
            <form onSubmit={handleIgnoreSoftware} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-1">Software Name</label>
                <input 
                  type="text" 
                  required
                  value={ignoreName}
                  onChange={(e) => setIgnoreName(e.target.value)}
                  placeholder="e.g., VLC Media Player" 
                  className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-slate-500 focus:outline-none"
                />
              </div>
              <button type="submit" className="w-full bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded transition-colors mt-auto">
                Add to Allowlist
              </button>
            </form>
          </div>

        </div>

        {/* --- EXISTING: COMPLIANCE ALERTS --- */}
        <div className="bg-white p-8 rounded-xl shadow-lg border-t border-slate-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Compliance Alerts</h2>
            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-bold">
              {dashboardData.alerts.length} Action Items
            </span>
          </div>
          
          {dashboardData.alerts.length === 0 ? (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-lg font-semibold flex items-center">
              <span className="text-2xl mr-3">✅</span> All tracked software is currently compliant.
            </div>
          ) : (
            <div className="space-y-4">
              {dashboardData.alerts.map((alert, index) => (
                <div key={index} className="bg-amber-50 border-l-4 border-red-500 p-5 rounded-r-lg shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <strong className="text-lg text-red-700">🚨 {alert.allowed === 0 ? "UNAPPROVED SOFTWARE" : "LICENSE SHORTFALL"}: {alert.software}</strong>
                    <span className="bg-red-100 text-red-800 text-sm font-bold px-3 py-1 rounded-full">
                      {alert.allowed === 0 ? "Not Licensed" : `Short ${alert.shortfall} licenses`}
                    </span>
                  </div>
                  <div className="text-slate-700 mb-3 text-sm flex space-x-6">
                    <span>Installed: <strong className="text-slate-900">{alert.installed}</strong></span>
                    <span>Purchased: <strong className="text-slate-900">{alert.allowed}</strong></span>
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

        {/* --- EXISTING: DEVICES LIST --- */}
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
                    <div className="text-slate-500 text-sm mt-1">OS: {device.os_type} | Last Check-in: {new Date(device.last_seen).toLocaleString()}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono bg-slate-100 px-3 py-1 rounded text-slate-700 font-semibold text-sm border border-slate-200">
                      {device.software_count} packages
                    </div>
                  </div>
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-bold text-blue-600 hover:text-blue-800">
                    View Installed Software
                  </summary>
                  <div className="mt-3 bg-slate-800 p-4 rounded-lg max-h-48 overflow-y-auto">
                    <ul className="text-emerald-400 font-mono text-sm space-y-1">
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