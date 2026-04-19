import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './componentsStyle/AdminStatistics.css';

function AdminStatistics() {
  const [usersCount, setUsersCount] = useState(0);
  const [dressesCount, setDressesCount] = useState(0);

  useEffect(() => {
	const fetchUsersCount = async () => {
		try {
			const response = await axios.get('http://localhost:8428/api/statistic/users-count', {
				withCredentials: true,
				headers: {
					'Content-Type': 'application/json'
				}
			});
			setUsersCount(response.data.count);
		}catch (error) {
			console.error('Error fetching users count:', error);
		}
	}
	fetchUsersCount();
  }, []);

  useEffect(() => {
	const fetchDressesCount = async () => {
		try {
			const response = await axios.get('http://localhost:8428/api/statistic/dresses-count', {
				withCredentials: true,
				headers: {
					'Content-Type': 'application/json'
				}
			});
			setDressesCount(response.data.count);
		}catch (error) {
			console.error('Error fetching dresses count:', error);
		}
	}
	fetchDressesCount();
  }, []);

  return (
	<div className='statistics'>
		<div className='statistics-container'>
			<section className='stat-section' id='users-count'>
				<h3>{usersCount}</h3>
				<h4>Users</h4>
			</section>
			<section className='stat-section' id='orders-count'>
				<h3>{dressesCount}</h3>
				<h4>Dresses</h4>
			</section>
			<section className='stat-section' id='decorate-post-count'>
				<h3>20</h3>
				<h4>Decorates</h4>
			</section>
			<section className='stat-section' id='revenue'>$0</section>
		</div>
			
		<div className='admin-dashboard-line'></div>
	</div>
  )
}

export default AdminStatistics