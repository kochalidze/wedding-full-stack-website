import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

import Cart from '../components/Cart';

import './pagesStyle/UserDashboard.css';

function UserDashboard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const authUser = useAuthStore((s) => s.user);
  const isAdmin = useAuthStore((s) => s.isAdmin);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: '', last_name: '', email: '' });

  useEffect(() => {
    const profileId = Number(id);

    if (!Number.isInteger(profileId)) {
      setError('Invalid user id');
      setLoading(false);
      return;
    }

    if (!isAdmin && authUser?.id !== profileId) {
      navigate(`/profile/${authUser?.id || ''}`, { replace: true });
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:8428/api/users/${profileId}`, {
          withCredentials: true,
        });
        setUser(res.data);
        setForm({
          name: res.data.name,
          last_name: res.data.last_name,
          email: res.data.email,
        });
      } catch (err) {
        setError(err?.response?.data?.error || 'Failed to load user');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, authUser?.id, isAdmin, navigate]);

  const updateUserInfo = async () => {
    try {
      await axios.patch(
        `http://localhost:8428/api/users/info/${user.id}`,
        form,
        { withCredentials: true }
      );
      setUser((u) => ({ ...u, ...form }));
      setEditMode(false);
    } catch (err) {
      setError(err?.response?.data?.error || 'Failed to update user info');
    }
  };

  const initials = user
    ? `${user.name?.[0] ?? ''}${user.last_name?.[0] ?? ''}`.toUpperCase()
    : '';

  if (loading) return <p className="status-message">იტვირთება...</p>;
  if (error)   return <p className="status-message error">{error}</p>;
  if (!user)   return <p className="status-message">მომხმარებელი ვერ მოიძებნა</p>;

  return (
    <div className="user-dashboard-page">
      <div className="dashboard-panel">

        {/* ── Header ── */}
        <header className="dashboard-header">
          <div className="dashboard-header-left">
            <div className="dashboard-avatar">{initials}</div>
            <div>
              <p className="dashboard-subtitle">პირადი პროფილი</p>
              <h1>{user.name} {user.last_name}</h1>
            </div>
          </div>
          <span className={`role-pill ${user.role === 'admin' ? 'role-admin' : 'role-user'}`}>
            {user.role === 'admin' ? 'ადმინისტრატორი' : 'მომხმარებელი'}
          </span>
        </header>

        {/* ── Stats ── */}
        <div className="dashboard-stats">
          <div className="stat-block">
            <p className="stat-block-label">შეკვეთები</p>
            <p className="stat-block-value">0</p>
          </div>
          <div className="stat-block">
            <p className="stat-block-label">სტატუსი</p>
            <p className="stat-block-value status-active">
              <span className="status-dot" />
              {user.status}
            </p>
          </div>
          <div className="stat-block">
            <p className="stat-block-label">ჯამი</p>
            <p className="stat-block-value">₾0</p>
          </div>
        </div>

        {/* ── Orders ── */}
        <div className="orders-section">
          <div className="section-header">
            <span className="section-label">ჩემი შეკვეთები</span>
            <button className="section-link">ყველა →</button>
          </div>
          <div>
            <Cart />
          </div>
          {/* TODO: map over real orders */}
          <p style={{ fontSize: 13, color: '#aaa', padding: '0.75rem 0' }}>
            შეკვეთები არ მოიძებნა.
          </p>
        </div>

        {/* ── Personal info ── */}
        <div className="info-section">
          <div className="section-header">
            <span className="section-label">პირადი ინფორმაცია</span>
            <button className="section-link" onClick={() => setEditMode((v) => !v)}>
              {editMode ? 'გაუქმება' : 'რედაქტირება'}
            </button>
          </div>

          {editMode ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingTop: '0.5rem' }}>
              <div className="info-grid">
                <div className="info-row">
                  <span className="info-key">სახელი</span>
                  <input
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    style={{ fontSize: 14, border: '1px solid rgba(0,0,0,0.15)', borderRadius: 6, padding: '5px 8px', fontFamily: 'inherit', background: 'transparent' }}
                  />
                </div>
                <div className="info-row">
                  <span className="info-key">გვარი</span>
                  <input
                    value={form.last_name}
                    onChange={(e) => setForm((f) => ({ ...f, last_name: e.target.value }))}
                    style={{ fontSize: 14, border: '1px solid rgba(0,0,0,0.15)', borderRadius: 6, padding: '5px 8px', fontFamily: 'inherit', background: 'transparent' }}
                  />
                </div>
                <div className="info-row full-width">
                  <span className="info-key">ელ.ფოსტა</span>
                  <input
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    style={{ fontSize: 14, border: '1px solid rgba(0,0,0,0.15)', borderRadius: 6, padding: '5px 8px', fontFamily: 'inherit', background: 'transparent' }}
                  />
                </div>
              </div>
              <div>
                <button className="btn-edit" onClick={updateUserInfo}>
                  შენახვა
                </button>
              </div>
            </div>
          ) : (
            <div className="info-grid">
              <div className="info-row">
                <span className="info-key">სახელი</span>
                <span className="info-val">{user.name}</span>
              </div>
              <div className="info-row">
                <span className="info-key">გვარი</span>
                <span className="info-val">{user.last_name}</span>
              </div>
              <div className="info-row full-width">
                <span className="info-key">ელ.ფოსტა</span>
                <span className="info-val">{user.email}</span>
              </div>
            </div>
          )}
        </div>

        {/* ── Nav links ── */}
        <div className="profile-actions">
          <Link to="/register" className="nav-button secondary">რეგისტრაცია</Link>
          <Link to="/login" className="nav-button secondary">შესვლა</Link>
        </div>

      </div>
    </div>
  );
}

export default UserDashboard;