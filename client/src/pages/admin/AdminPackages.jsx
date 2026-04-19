import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCheck } from 'react-icons/fa';

import AdminSidebar from '../../components/AdminSidebar';
import '../pagesStyle/AdminPackages.css';

function AdminPackages() {
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const [packageName, setPackageName] = useState('');
  const [packageDescription, setPackageDescription] = useState('');
  const [packagePrice, setPackagePrice] = useState('');
  const [packageFeatures, setPackageFeatures] = useState('');

  // 📦 GET PACKAGES
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8428/api/packages/get-packages',
          { withCredentials: true }
        );

        setPackages(response.data.packages || []);
	  	// setPackages(response.data.packages || response.data || []);

      } catch (error) {
        if (error.response?.status === 401) {
          console.error('❌ Unauthorized - გაიარე login');
        } else {
          console.error('Error fetching packages:', error);
        }
      }
    };

    fetchPackages();
  }, []);

  // 🔄 RESET
  const resetForm = () => {
    setSelectedPackage(null);
    setPackageName('');
    setPackageDescription('');
    setPackagePrice('');
    setPackageFeatures('');
  };

  // ✏️ SELECT
  const handleSelectPackage = (pkg) => {
    const featureText = Array.isArray(pkg.features)
      ? pkg.features.join('\n')
      : pkg.features || '';

    setSelectedPackage(pkg);
    setPackageName(pkg.name || '');
    setPackageDescription(pkg.description || '');
    setPackagePrice(pkg.price?.toString() || '');
    setPackageFeatures(featureText);
  };

  // ➕ CREATE
  const handleCreatePackage = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8428/api/packages/create-packages',
        {
          name: packageName,
          description: packageDescription,
          price: packagePrice ? parseFloat(packagePrice) : 0,
          features: packageFeatures
            ? packageFeatures.split('\n').map(f => f.trim()).filter(Boolean)
            : [],
        },
        { withCredentials: true }
      );

    //   const newPackage = response.data.package || response.data;

      //   setPackages(prev => [...prev, newPackage]);
	  setPackages(response.data.packages || response.data || []);

      resetForm();

    } catch (error) {
      console.error('Error creating package:', error);
    }
  };

  // ❌ DELETE
  const handleDeletePackage = async (packageId) => {
    try {
      await axios.delete(
        `http://localhost:8428/api/packages/delete-packages/${packageId}`,
        { withCredentials: true }
      );

      setPackages(prev => prev.filter(pkg => pkg.id !== packageId));

      if (selectedPackage?.id === packageId) {
        resetForm();
      }

    } catch (error) {
      console.error('Error deleting package:', error);
    }
  };

  // 🔄 UPDATE
  const handleUpdatePackage = async () => {
    if (!selectedPackage) return;

    try {
      const response = await axios.put(
        `http://localhost:8428/api/packages/update-packages/${selectedPackage.id}`,
        {
          name: packageName,
          description: packageDescription,
          price: packagePrice ? parseFloat(packagePrice) : 0,
          features: packageFeatures
            ? packageFeatures.split('\n').map(f => f.trim()).filter(Boolean)
            : [],
        },
        { withCredentials: true }
      );

      const updated = response.data.package || response.data;

      setPackages(prev =>
        prev.map(pkg =>
          pkg.id === selectedPackage.id ? updated : pkg
        )
      );

      setSelectedPackage(updated);

    } catch (error) {
      console.error('Error updating package:', error);
    }
  };

  // 📋 FEATURES (FIXED - აღარ იყენებს packageFeatureMap)
  const getPackageFeatures = (pkg) => {
    if (!pkg?.features) return [];

    const features = Array.isArray(pkg.features)
      ? pkg.features
      : pkg.features.toString().split('\n');

    return features.map(f => f.trim()).filter(Boolean);
  };

  // 🎨 VARIANT
  const packageVariant = (name) => {
    const normalized = name?.toLowerCase() || '';

    if (normalized.includes('starter')) return 'package-card--starter';
    if (normalized.includes('business')) return 'package-card--business';
    if (normalized.includes('professional')) return 'package-card--professional';
    if (normalized.includes('premium')) return 'package-card--premium';

    return 'package-card--standard';
  };

  return (
    <div className="admin-dashboard">
      <AdminSidebar />

      <main className="admin-content">
        <header className="packages-header">
          <h1>პაკეტების მართვა</h1>
          <p>
            სტილიზებული პაკეტის ბარათები თითოეული ქორწილის გეგმისთვის,
            პლუს მოსახერხებელი ადმინისტრატორის ფორმა ნებისმიერი შეთავაზების
            დასამატებლად ან რედაქტირებისთვის.
          </p>
        </header>

        {/* FORM */}
        <section className="package-form-card">
          <h2>
            {selectedPackage
              ? 'პაკეტის რედაქტირება'
              : 'ახალი პაკეტის შექმნა'}
          </h2>

          <div className="package-form-row">
            <label>გეგმის სახელი</label>
            <input
              type="text"
              value={packageName}
              onChange={(e) => setPackageName(e.target.value)}
			  placeholder=''
            />
          </div>

          <div className="package-form-row">
            <label>აღწერა</label>
            <textarea
              value={packageDescription}
              onChange={(e) => setPackageDescription(e.target.value)}
            />
          </div>

          <div className="package-form-row">
            <label>ფუნქციები</label>
            <textarea
              value={packageFeatures}
              onChange={(e) => setPackageFeatures(e.target.value)}
            />
          </div>

          <div className="package-form-row">
            <label>ფასი</label>
            <input
              type="number"
              value={packagePrice}
              onChange={(e) => setPackagePrice(e.target.value)}
            />
          </div>

          <div className="package-form-actions">
            {selectedPackage ? (
              <>
                <button className="primary-btn" onClick={handleUpdatePackage}>
                  განახლება
                </button>
                <button className="secondary-btn" onClick={resetForm}>
                  გაუქმება
                </button>
              </>
            ) : (
              <button className="primary-btn" onClick={handleCreatePackage}>
                შექმნა
              </button>
            )}
          </div>
        </section>

        {/* PACKAGES */}
        <section className="packages-list">
          <h2>ხელმისაწვდომი პაკეტები</h2>

          <div className="package-grid">
            {packages.length > 0 ? (
              packages.map((pkg) => (
                <article
                  key={pkg.id}
                  className={`package-card ${packageVariant(pkg.name)}`}
                >
                  <div className="package-card-top">
                    <h3>{pkg.name}</h3>
                    <span className="package-price">
                      ${pkg.price ? Number(pkg.price).toFixed(0) : 0}
                    </span>
                  </div>

                  <p className="package-description">
                    {pkg.description}
                  </p>

                  <ul className="package-features">
                    {getPackageFeatures(pkg).map((feature, index) => (
                      <li key={index}>
                        <FaCheck />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="package-card-actions">
                    <button
                      className="edit-btn"
                      onClick={() => handleSelectPackage(pkg)}
                    >
                      რედაქტირება
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDeletePackage(pkg.id)}
                    >
                      წაშლა
                    </button>
                  </div>
                </article>
              ))
            ) : (
              <div className="empty-state">
                პაკეტები ჯერ არ არის ხელმისაწვდომი
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminPackages;