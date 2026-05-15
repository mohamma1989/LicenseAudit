import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // 1. Set up the state to hold our cloud data
  const [dashboardData, setDashboardData] = useState({ alerts: [], devices: [] });
  const [loading, setLoading] = useState(true);

  // 2. Point this directly to your live Render server!
  const API_URL = "https://licenseaudit.onrender.com/api";

  // 3. When the website first opens, run the fetch command
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch(`${API_URL}/dashboard_data`);
      const data = await response.json();
      setDashboardData(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch from cloud:", error);
      setLoading(false);
    }
  };

  // 4. THE CTO TRICK: We extract every single app from every device, 
  // put them in a Set (to remove duplicates), and sort them alphabetically.
  const allDiscoveredApps = Array.from(
    new Set(dashboardData.devices.flatMap(device => device.software_list))
  ).sort();

  // 5. Placeholder functions for our new buttons (We will wire these up next!)
  const handleAddLicense = (appName) => {
    alert(`We will wire this up to tell the database: I bought a license for ${appName}`);
  };

  const handleIgnoreApp = (appName) => {
    alert(`We will wire this up to tell the database: Hide ${appName} forever`);
  };

  if (loading) {
    return <h2>📡 Connecting to Cloud Fortress...</h2>;
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>LicenseAudit Dashboard ☁️</h1>

      {/* SECTION 1: Connected Devices */}
      <div style={{ background: '#f0f4f8', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
        <h2>💻 Connected Devices ({dashboardData.devices.length})</h2>
        {dashboardData.devices.map(device => (
          <div key={device.hostname} style={{ marginBottom: '10px' }}>
            <strong>{device.hostname}</strong> ({device.os_type}) - Found {device.software_count} apps
          </div>
        ))}
      </div>

      {/* SECTION 2: The Master Software List */}
      <h2>📦 Discovered Software Master List</h2>
      <p>Click an action for each app found on your network.</p>

      <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #ccc' }}>
            <th style={{ padding: '10px' }}>Application Name</th>
            <th style={{ padding: '10px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allDiscoveredApps.map(appName => (
            <tr key={appName} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px' }}>
                <strong>{appName}</strong>
              </td>
              <td style={{ padding: '10px' }}>
                <button
                  onClick={() => handleAddLicense(appName)}
                  style={{ background: '#4CAF50', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '4px', marginRight: '10px', cursor: 'pointer' }}
                >
                  + Add License
                </button>
                <button
                  onClick={() => handleIgnoreApp(appName)}
                  style={{ background: '#f44336', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  🚫 Ignore
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App