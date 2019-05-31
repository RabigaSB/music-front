import React from 'react';
import {NavLink} from 'react-router-dom';

const Toolbar = () => {
	return (
		<div className='p-3 bg-dark  mb-5'>
			<NavLink className='text-light' to="/">Artists</NavLink>
		</div>
	);
};

export default Toolbar;
