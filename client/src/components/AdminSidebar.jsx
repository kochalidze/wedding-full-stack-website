import React from 'react'
import { Link } from 'react-router-dom';
import './componentsStyle/AdminSidebar.css';


//* import icons
import { FaRegUser } from "react-icons/fa";
import { GiAmpleDress } from "react-icons/gi";
import { MdDesignServices } from "react-icons/md";
import { SlBasket } from "react-icons/sl";
import { TbPackages } from "react-icons/tb";

const panel_links = [
  { to: '/admin', icon: <FaRegUser />, label: 'Users' },
  { to: '/admin/orders', icon: <SlBasket />, label: 'Orders' },
  { to: '/admin/dresses', icon: <GiAmpleDress />, label: 'dresses' },
  { to: '/admin/decorates', icon: <MdDesignServices />, label: 'Decorates' },
  { to: '/admin/packages', icon: <TbPackages />, label: 'Packages' },
  { to: '/admin/gallery', icon: <TbPackages />, label: 'Gallery' }
];

function AdminSidebar() {
  return (
	<aside className="sidebar">
		<div className='sidebar-footer'>        
		  <h2>Admin Panel</h2>
		  <div className='admin-dashboard-line'></div>
		  <p>Manage dresses, orders and packages with style.</p>
		</div>
		<nav className='sidebar-nav'>
		  <ul>
			{panel_links.map((link) => (
			  <li key={link.to}>
				<span className="sidebar-icon">{link.icon}</span>
				<Link className='sidebar-link' to={link.to}>{link.label}</Link>
			  </li>
			))}
		  </ul>
		</nav>
	</aside>)
}

export default AdminSidebar