import React, {useState, useEffect} from 'react';
import axios from 'axios';

import AdminSidebar from '../../components/AdminSidebar';
import AdminStatistics from '../../components/AdminStatistics';

import { FaRegUserCircle } from "react-icons/fa";

//* import styles
import '../pagesStyle/AdminDashboard.css';



function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [search, setSearch] = useState("");



  const formatRegistrationDate = (value) => {
    if (!value) return 'N/A';
    const isoUtc = value.includes('T') ? value : value.replace(' ', 'T') + 'Z';
    const date = new Date(isoUtc);
    if (Number.isNaN(date.getTime())) return 'N/A';

    return new Intl.DateTimeFormat('ka-GE', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'Asia/Tbilisi',
    }).format(date);
  };


  const handleEdit = (user) => {
    setSelectedUser(user);
  };

  useEffect(() => {
    const fetchUsers = async () => {
     try {
        const response = await axios.get('http://localhost:8428/api/auth/users', {
          withCredentials: true, // აუცილებელია HttpOnly Cookie-სთვის
          headers: {
            'Content-Type': 'application/json'
          }
        });
        setUsers(response.data);
        console.log('Fetched users:', response.data);
      }catch (error) {
        console.error('Error fetching users:', error);
      }
    }
    fetchUsers();
    
  }, []);
  
  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:8428/api/auth/delete/${userId}`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));

      if (selectedUser?.id === userId) {
        setSelectedUser(null);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "blocked" : "active";
    try {
      await axios.patch(
        `http://localhost:8428/api/users/status/${id}`,
        { status: newStatus },
        { withCredentials: true }
      );

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, status: newStatus } : user
        )
      );

      setSelectedUser((prev) =>
        prev && prev.id === id ? { ...prev, status: newStatus } : prev
      );
    } catch (err) {
      console.error(err);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='admin-dashboard'>
      <AdminSidebar />

      <main className='content'>
        <AdminStatistics />

        <div className='users-layout'>
          <section className='users-panel'>
            <div className='users-search-bar'>
              <label htmlFor='users-search'>Search users</label>
              <input
                type='text'
                id='users-search'
                className='users-search-input'
                placeholder='Search by name or email'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className='users-card'>
              <div className='user-head-container'>
                <span>Name</span>
                <span>Email</span>
                <span>Role</span>
                <span>Registered</span>
                <span>Actions</span>
              </div>

              <div className='users-list-section'>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <article key={user.id} className='user-row'>
                      <span>{user.name}</span>
                      <span>{user.email}</span>
                      <span>{user.role}</span>
                      <span>{formatRegistrationDate(user.created_at)}</span>
                      <div className='actions'>
                        <button className='edit-btn' onClick={() => handleEdit(user)}>
                          View
                        </button>
                        <button className='delete-btn' onClick={() => handleDelete(user.id)}>
                          Delete
                        </button>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className='empty-state'>No users match your search.</div>
                )}
              </div>
            </div>
          </section>

          <aside className='user-edit-section'>
            {selectedUser ? (
              <div className='edit-panel'>
                <FaRegUserCircle size={52} className='edit-user-icon' />
                <div className='edit-panel-info'>
                  <p><strong>Name:</strong> {selectedUser.name}</p>
                  <p><strong>Email:</strong> {selectedUser.email}</p>
                  <p><strong>Role:</strong> {selectedUser.role}</p>
                  <p><strong>Registered:</strong> {formatRegistrationDate(selectedUser.created_at)}</p>
                </div>

                <div className='edit-panel-actions'>
                  <span className={`status-chip ${selectedUser.status === 'active' ? 'active' : 'blocked'}`}>
                    {selectedUser.status}
                  </span>
                  <button
                    className='status-toggle-btn'
                    onClick={() => toggleStatus(selectedUser.id, selectedUser.status)}
                  >
                    {selectedUser.status === 'active' ? 'Block' : 'Unblock'}
                  </button>
                </div>
              </div>
            ) : (
              <div className='edit-placeholder'>
                Select a user to view details and perform actions.
              </div>
            )}
          </aside>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard
