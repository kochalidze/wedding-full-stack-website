import React, { useState, useEffect } from 'react';
import axios from 'axios';


import './componentsStyle/Cart.css';

function Cart() {
	const [cartItems, setCartItems] = useState([]);

	useEffect(() => {
		const fetchCartItems = async () => {
			try {
				const response = await axios.get('http://localhost:8428/api/cart/:userId');
				setCartItems(response.data);
			}catch(error) {
				console.error('კალათის მიღება ვერ მოხერხდა:', error);
			}
		};
		fetchCartItems();
	}, []);


  return (
	<div>
		<h2>კალათა</h2>
		{cartItems.length === 0 ? (
			<p>კალათა ცარიელია</p>
		) : (
			<ul>
				{cartItems.map(item => (
					<li key={item.id}>
						{item.dress_id ? `კაბა ID: ${item.dress_id}` : `დეკორაცია ID: ${item.decoration_id}`} - რაოდენობა: {item.quantity}
					</li>
				))}
			</ul>
		)}
	</div>
  )
}

export default Cart