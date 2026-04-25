import React, {useEffect, useState}  from 'react';
import axios from 'axios';

function Packages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false); 

  const fetchPackages = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/packages/get-packages`,
        { withCredentials: true }
      );
      setPackages(response.data.packages || response.data || []);
    } catch (error) {
      if (error.response?.status === 401) {
        console.error('❌ Unauthorized - გაიარე login');
      } else {
        console.error('Error fetching packages:', error);
      }
    } finally {
      setLoading(false); // ← ყოველთვის გამოიძახება, error-ზეც
    }
  };

return (
  <div className="packages-container">
    <div className="wedding-packages">

      <div className="packages-header">
        <h2>ჩვენი საქორწინო პაკეტები</h2>
        <div className="packages-header-divider">
          <div className="packages-header-divider-line"></div>
          <div className="packages-header-divider-diamond"></div>
          <div className="packages-header-divider-line"></div>
        </div>
        <p>შეარჩიეთ იდეალური პაკეტი და აქციეთ თქვენი განსაკუთრებული დღე დაუვიწყარ მოგონებად</p>
      </div>

      {loading ? (
        <p className="packages-loading">იტვირთება...</p>
      ) : packages.length === 0 ? (
        <p className="no-packages">ამ ეტაპზე პაკეტები არ არის ხელმისაწვდომი.</p>
      ) : (
        <div className="packages-grid">
          {packages.map((pkg) => (
            <div key={pkg._id} className={`package-card ${pkg.featured ? 'featured' : ''}`}>

              {pkg.featured && (
                <div className="package-featured-badge">ყველაზე პოპულარული</div>
              )}

              <div className="package-top">
                <h3 className="package-name">{pkg.name}</h3>
                <div className="package-price-wrap">
                  <span className="package-price">{pkg.price}</span>
                  <span className="package-currency">₾</span>
                </div>
              </div>

              <p className="package-description">{pkg.description}</p>

              {pkg.features && (
                <ul className="package-features">
                  {pkg.features.map((feature) => (
                    <li key={feature}>
                      <svg className="feature-check" viewBox="0 0 12 12" fill="none">
                        <polyline points="2,6 5,9 10,3" stroke="#c9a97a" strokeWidth="1.2" strokeLinecap="round"/>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              )}

              <button className="package-btn">დაჯავშნა</button>

            </div>
          ))}
        </div>
      )}

    </div>
  </div>
);
  
}

export default Packages