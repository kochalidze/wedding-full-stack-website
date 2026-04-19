import React, {useEffect, useState}  from 'react';
import axios from 'axios';

function Packages() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
const fetchPackages = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8428/api/packages/get-packages',
          { withCredentials: true }
        );

        // setPackages(response.data.packages || []);
	  	setPackages(response.data.packages || response.data || []);

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

  return (
<div className="packages-container">
<div className="wedding-packages">
  <div className="packages-header">
    <h2>ჩვენი საქორწინო პაკეტები</h2>
    <p>
      შეარჩიეთ იდეალური პაკეტი და აქციეთ თქვენი განსაკუთრებული დღე დაუვიწყარ მოგონებად
    </p>
  </div>

  {packages.length === 0 ? (
    <p className="no-packages">ამ ეტაპზე პაკეტები არ არის ხელმისაწვდომი.</p>
  ) : (
    <div className="packages-grid">
      {packages.map((pkg) => (
        <div key={pkg._id} className="package-card">
          
          {/* ზედა ნაწილი */}
          <div className="package-top">
            <h3 className="package-name">{pkg.name}</h3>
            <p className="package-price">{pkg.price}₾</p>
          </div>

          {/* აღწერა */}
          <p className="package-description">
            {pkg.description}
          </p>

          {/* დამატებითი შესაძლებლობები */}
          {pkg.features && (
            <ul className="package-features">
              {pkg.features.map((feature, index) => (
                <li key={index}>✔ {feature}</li>
              ))}
            </ul>
          )}

          {/* ღილაკი */}
          <button className="package-btn">
            დაჯავშნა
          </button>

        </div>
      ))}
    </div>
  )}
</div>
</div>
  )
}

export default Packages