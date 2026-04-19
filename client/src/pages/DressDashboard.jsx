import React, {useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { IoMdArrowRoundBack } from "react-icons/io";

import './pagesStyle/DressDashboard.css';

function DressDashboard() {
	const {id} = useParams();
	const [dress, setDress] = useState([]);
	const [otherDress, setOtherDress] = useState([]);
	const [error, setError] = useState(null);

	const navigate = useNavigate();

	useEffect(() => {
		const fetchDressDetails = async () => {
			try {
				const response = await axios.get(`http://localhost:8428/api/dress/dresses/${id}`, {
				withCredentials: true
				});
				setDress(response.data);
			} catch (err) {
				setError("ინფორმაციის წამოღება ვერ მოხერხდა");
			}
		};
    	fetchDressDetails();
	}, [id]);

    useEffect(() => {
        const fetchDresses = async () => {
            try {
                const response = await axios.get('http://localhost:8428/api/dress/dresses', {
                    withCredentials: true
                });
                
                if (response.data && response.data.length > 0) {
                    // 1. ავურიოთ მასივი (Shuffling)
                    const shuffled = [...response.data].sort(() => 0.5 - Math.random());
                    
                    // 2. ავიღოთ პირველი 3 ელემენტი (ან რამდენიც გინდათ)
                    const selected = shuffled.slice(0, 3);
                    
                    // 3. შევინახოთ როგორც მასივი
                    setOtherDress(selected);
                }
            } catch (error) {
                console.error('Error fetching dresses:', error);
            }
        };
        fetchDresses();
    }, [id]);
	


  return (
	<div className='dress-dashboard-container'>
    {/* მარცხენა მხარე */}
	<div className='navigate-container'>
		
		<button onClick={() => navigate('/dresses')}><IoMdArrowRoundBack className='navigate-icon' />უკან დაბრუნება</button>
	</div>

    <section className="images-container">
        <div className="breadcrumb">Dresses / {dress.category}</div>
        <img src={dress.image_url} alt={dress.name} />

        <div className="similar-styles-section">
            <h3>მსგავსი კაბები</h3>
            <div className='other-image-container'>
                {otherDress.slice(0, 3).map((d) => (
                    <img key={d.id} src={d.image_url} onClick={() => navigate(`/dress/${d.id}`)} />
                ))}
            </div>
        </div>
    </section>

    {/* მარჯვენა მხარე */}
    <section className="info-section">
        <h2>{dress.name}</h2>
        <div className="price-box">{dress.price} GEL</div>
        
        <div className="color-selection">
            <label>ფერი: {dress.color}</label>
            <div className="color-circle" style={{backgroundColor: dress.color}}></div>
        </div>

        <div className="size-selection">
            <label>ზომა: {dress.size}</label>
            {/* <div className="size-grid">
                <div className="size-box">XS</div>
                <div className="size-box">S</div>
                <div className="size-box">M</div>
                <div className="size-box">L</div>
            </div> */}
        </div>

        <button className="add-to-cart-btn">კალათში დამატება</button> 

        <div className="details-accordion">
            <h4>დეტალები</h4>
           
            <p>{dress.description}</p>
            <ul>
                <li>კატეგორია: {dress.category}</li>
                <li>ზომა: {dress.size}</li>
                <li>ფერი: {dress.color}</li>
            </ul>
            <br />
             <p>დაგვიკავშირდით: 598-09-69-75</p>
        </div>
        
    </section>
</div>
  )
}

export default DressDashboard