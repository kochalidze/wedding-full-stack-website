import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import './pagesStyle/Login.css';

const highlights = [
  'დაჯავშნე სერვისები ერთ სივრცეში',
  'ნახე შენი პირადი ინფორმაცია სწრაფად',
  'მართე ქორწილის დეტალები უფრო მარტივად',
];

function Login() {
  const navigate = useNavigate();

  const login = useAuthStore((s) => s.login);
  const isLoading = useAuthStore((s) => s.isLoading);
  const error = useAuthStore((s) => s.error);
  const clearError = useAuthStore((s) => s.clearError);

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    clearError();

    try {
      const res = await login(form);
      if (res?.user?.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch {
      
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-background-orb login-background-orb-left" />
      <div className="login-background-orb login-background-orb-right" />

      <div className="login-layout">
        <motion.section
          className="login-showcase"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <span className="login-showcase-tag">Wedding Space</span>
          <h1>შედით თქვენს ქორწილის სივრცეში</h1>
          <p className="login-showcase-text">
            ერთი ლოგინით გააკონტროლე შენი პროფილი, მომსახურებები და ყველა ის
            დეტალი, რაც ამ დღისთვის მნიშვნელოვანია.
          </p>

          <div className="login-showcase-grid">
            <div className="showcase-stat-card">
              <strong>24/7</strong>
              <span>წვდომა შენს პროფილთან</span>
            </div>
            <div className="showcase-stat-card">
              <strong>1 ადგილი</strong>
              <span>ყველა საჭირო ინფორმაციისთვის</span>
            </div>
          </div>

          <div className="login-benefits">
            {highlights.map((item) => (
              <div key={item} className="login-benefit-item">
                <span className="login-benefit-dot" />
                <p>{item}</p>
              </div>
            ))}
          </div>

          <div className="login-quote-card">
            <p>
              "ყველაზე ლამაზი მომენტები იწყება მაშინ, როცა ყველაფერი ერთ სივრცეში
              დალაგებულია."
            </p>
          </div>
        </motion.section>

        <motion.div
          className="login-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
        >
          <div className="login-card-top">
            <span className="login-badge">ანგარიშზე შესვლა</span>
            <header>
              <h2 className="login-title">კეთილი დაბრუნება</h2>
              <p className="login-subtitle">
                შეიყვანე მონაცემები და გააგრძელე იქიდან, სადაც შეჩერდი
              </p>
            </header>
          </div>

          <form className="login-form" onSubmit={handleLogin}>
            <label className="login-field">
              <div className="login-field-row">
                <span>ელ-ფოსტა</span>
                <span className="login-field-hint">აუცილებელია</span>
              </div>
              <input
                className="login-input"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="name@example.com"
                required
              />
            </label>

            <label className="login-field">
              <div className="login-field-row">
                <span>პაროლი</span>
                <span className="login-field-hint">აუცილებელია</span>
              </div>
              <input
                className="login-input"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="შეიყვანე პაროლი"
                required
              />
            </label>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="login-button"
              disabled={isLoading}
            >
              {isLoading ? 'მიმდინარეობს...' : 'შესვლა'}
            </motion.button>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="error-message"
              >
                {error}
              </motion.p>
            )}
          </form>

          <div className="login-footer">
            <p>ჯერ არ გაქვს ანგარიში?</p>
            <Link to="/register" className="login-register-link">
              რეგისტრაცია
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;
