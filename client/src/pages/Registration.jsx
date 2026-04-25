import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import './pagesStyle/Registration.css';

const registrationSteps = [
  'შექმენი შენი პირადი ანგარიში რამდენიმე წამში',
  'მიიღე წვდომა დაჯავშნებსა და ქორწილის დეტალებზე',
  'გააერთიანე ყველა მნიშვნელოვანი ინფორმაცია ერთ სივრცეში',
];

function Registration() {
  const register = useAuthStore((s) => s.register);
  const isLoading = useAuthStore((s) => s.isLoading);
  const error = useAuthStore((s) => s.error);
  const message = useAuthStore((s) => s.message);
  const clearError = useAuthStore((s) => s.clearError);
  const clearMessage = useAuthStore((s) => s.clearMessage);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

const handleRegister = async (e) => {
  e.preventDefault();
  clearError();
  clearMessage();

  // მომხმარებლის შეყვანილი ტექსტის გაყოფა (მაგ: "ნიკა ბერიძე" -> ["ნიკა", "ბერიძე"])
  const nameParts = form.name.trim().split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ') || '—'; // თუ გვარი არ ჩაწერა, დააყენებს ტირეს

  try {
    // ვაგზავნით დაშლილ მონაცემებს ბექენდში
    await register({ 
      name: firstName, 
      // last_name: lastName, // ეს უნდა ემთხვეოდეს ბაზის სვეტს
      email: form.email, 
      password: form.password 
    });
    setForm({ name: '', email: '', password: '' });
  } catch (err) {
    console.error(err);
  }
};

  return (
    <div className="register-page">
      <div className="register-background-orb register-background-orb-top" />
      <div className="register-background-orb register-background-orb-bottom" />

      <div className="register-layout">
        <motion.section
          className="register-showcase"
          initial={{ opacity: 0, x: -28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <span className="register-tag">Create Account</span>
          <h1>დაიწყე შენი სივრცის შექმნა</h1>
          <p className="register-lead">
            რეგისტრაციის შემდეგ შენს სივრცეში მოაქცევ ყველაზე მნიშვნელოვან
            ინფორმაციას და უფრო მარტივად დაგეგმავ ყველაფერს.
          </p>

          <div className="register-feature-panel">
            <div className="register-feature-card">
              <strong>სწრაფი დაწყება</strong>
              <span>ფორმის შევსებას მხოლოდ რამდენიმე წამი სჭირდება</span>
            </div>
            <div className="register-feature-card accent">
              <strong>მარტივი მართვა</strong>
              <span>ერთი პროფილი ყველა მნიშვნელოვანი დეტალისთვის</span>
            </div>
          </div>

          <div className="register-steps">
            {registrationSteps.map((step, index) => (
              <div key={step} className="register-step">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.div
          className="register-card"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: 'easeOut', delay: 0.08 }}
        >
          <span className="register-badge">რეგისტრაცია</span>
          <h2 className="register-title">შექმენი ახალი ანგარიში</h2>
          <p className="register-subtitle">
            შეავსე ინფორმაცია და დაიწყე ქორწილის სივრცის გამოყენება.
          </p>

          <form className="register-form" onSubmit={handleRegister}>
            <label className="register-field">
              <span>სახელი და გვარი</span>
              <input
                className="register-input"
                type="text"
                name="name"
                placeholder="მაგ: ნინო ბერიძე"
                value={form.name}
                onChange={handleChange}
                required
              />
            </label>

            <label className="register-field">
              <span>ელ-ფოსტა</span>
              <input
                className="register-input"
                type="email"
                name="email"
                placeholder="name@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </label>

            <label className="register-field">
              <div className="register-field-row">
                <span>პაროლი</span>
                <span className="register-field-hint">მინიმუმ 1 სიმბოლო</span>
              </div>
              <input
                className="register-input"
                type="password"
                name="password"
                placeholder="შეიყვანე პაროლი"
                value={form.password}
                onChange={handleChange}
                required
              />
            </label>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="register-button"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'მუშავდება...' : 'ანგარიშის შექმნა'}
            </motion.button>

            {message && <p className="message">{message}</p>}
            {error && <p className="error">{error}</p>}
          </form>

          <div className="register-footer">
            <p>უკვე გაქვს ანგარიში?</p>
            <Link to="/login" className="register-link">
              შესვლა
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Registration;
