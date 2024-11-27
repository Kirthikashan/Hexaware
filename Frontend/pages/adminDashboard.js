import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './adminDashboard.module.css'; // Import CSS module
import SidebarAdmin from '../components/SidebarAdmin';
import '../App.css';
import UserChart from './UserChart'; // Import the UserChart component
import { saveAs } from 'file-saver'; // Import file-saver for exporting CSV

// System Performance Component
const SystemPerformance = ({ stats, loading, error }) => (
  <section className={`${styles.card} ${styles['system-performance']}`}>
    <h2>System Performance</h2>
    {loading ? (
      <p>Loading system statistics...</p>
    ) : error ? (
      <p className={styles['error-message']}>{error}</p>
    ) : (
      <div className={styles['side']}>
        <p><strong>Total Users:</strong> {stats.totalUsers}</p>
        <p><strong>Active Users:</strong> {stats.activeUsers}</p>
        <p><strong>Server Status:</strong> {stats.serverStatus}</p>
      </div>
    )}
  </section>
);

// User Management Component
const UserManagement = ({ users, loading, error, deleteUser, addUser }) => (
  <section className={`${styles.card} ${styles['user-management']}`}>
    <h2>User Management</h2>
    {loading ? (
      <p>Loading users...</p>
    ) : error ? (
      <p className={styles['error-message']}>{error}</p>
    ) : (
      <>
        <form onSubmit={(e) => {
          e.preventDefault();
          const newUserData = {
            email: e.target.email.value,
            password: e.target.password.value,
            role: e.target.role.value,
          };
          addUser(newUserData);
        }}>
          <input type="email" name="email" placeholder="Email" required />
          <input type="password" name="password" placeholder="Password" required />
          <select name="role" required>
            <option value="administrator">Administrator</option>
            <option value="employee">Employee</option>
            <option value="trainer">Trainer</option>
          </select>
          <button type="submit" className={styles.btn}>Add User</button>
        </form>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button onClick={() => deleteUser(user._id)} className={styles['btn-danger']}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
        <button onClick={() => exportUsersToCSV(users)} className={styles.btn}>Export Users to CSV</button>
      </>
    )}
  </section>
);

// Export users to CSV function
const exportUsersToCSV = (users) => {
  const headers = 'Email,Role\n';
  const rows = users.map(user => `${user.email || ''},${user.role || ''}`).join('\n');
  const csvContent = headers + rows;
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, 'users_data.csv');
};

// Static System Monitoring Component
const SystemMonitoring = () => {
  // Static metrics data
  const metrics = {
    cpuUsage: [20, 30, 40], // Example CPU usage percentages
    freeMemory: '2 GB',
    totalMemory: '8 GB',
    uptime: '72 hours',
    diskUsage: [
      { fs: '/dev/sda1', used: '10 GB', size: '100 GB' },
      { fs: '/dev/sdb1', used: '5 GB', size: '50 GB' },
    ],
    networkStats: [
      { iface: 'eth0', rx_bytes: 2048, tx_bytes: 1024 },
      { iface: 'wlan0', rx_bytes: 512, tx_bytes: 256 },
    ],
  };

  return (
    <section className={styles['system-monitoring']}>
      <h2>System Monitoring</h2>
      <div className={styles.metric}>CPU Usage (1, 5, 15 mins): {metrics.cpuUsage.join(', ')}</div>
      <div className={styles.metric}>Memory: Free {metrics.freeMemory} / Total {metrics.totalMemory}</div>
      <div className={styles.metric}>Uptime: {metrics.uptime}</div>
      <div className={styles.metric}>
        Disk Usage: {metrics.diskUsage.map(disk => `Disk ${disk.fs}: Used ${disk.used} / Total ${disk.size}`).join(', ')}
      </div>
      <div className={styles.metric}>
        Network Stats: {metrics.networkStats.map(net => `Interface ${net.iface}: Rx ${net.rx_bytes} bytes, Tx ${net.tx_bytes} bytes`).join(', ')}
      </div>
    </section>
  );
};

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get('http://localhost:5006/api/admin/stats');
        setStats(data);
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to load statistics.');
      } finally {
        setLoadingStats(false);
      }
    };

    const fetchUsers = async () => {
      try {
        const { data } = await axios.get('http://localhost:5006/api/admin/users');
        setUsers(data.users);
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to load users.');
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchStats();
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:5006/api/admin/users/${id}`);
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      } catch (error) {
        setError('Failed to delete user.');
      }
    }
  };

  const addUser = async (userData) => {
    try {
      const { data } = await axios.post('http://localhost:5006/api/admin/users', userData);
      setUsers((prevUsers) => [...prevUsers, data.user]);
    } catch (error) {
      setError('Failed to add user.');
    }
  };

  return (
    <div className={styles['admin-dashboard']}>
      <SidebarAdmin />
      <header className={styles['dashboard-header']}>
        <h1>Administrator Dashboard</h1>
      </header>
      <p className={styles['welcome-message']}>Welcome back, Chief Navigator! Your control center awaits.</p>
      <div className={styles['dashboard-content']}>
        <SystemPerformance stats={stats} loading={loadingStats} error={error} />
        <UserManagement users={users} loading={loadingUsers} error={error} deleteUser={deleteUser} addUser={addUser} />

        {/* Static System Monitoring Section */}
        <SystemMonitoring />

        {/* Usage Statistics Section */}
        <section className={`${styles.card} ${styles['usage-statistics']}`}>
          <h2>Usage Statistics</h2>
          <p><strong>Total Questions Generated:</strong> {stats.totalQuestions || 'Loading...'}</p>
        </section>

        {/* Integrate the UserChart component */}
        <section className={styles['card user-chart']}>
          <h2>User Statistics Chart</h2>
          <UserChart stats={{ activeUsers: stats.activeUsers, totalUsers: stats.totalUsers }} />
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
