import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import pedia from '/departments/pedia.jpg';
import ortho from '/departments/ortho.jpg';
import cardo from '/departments/cardio.jpg';
import neuro from '/departments/neuro.jpg';
import onco from '/departments/onco.jpg';
import radio from '/departments/radio.jpg';
import therapy from '/departments/therapy.jpg';
import derma from '/departments/derma.jpg';
import ent from '/departments/ent.jpg';

const Department = () => {
	const departmentsArray = [
		{
			name: 'Pediatrics',
			imageUrl: pedia,
		},
		{
			name: 'Orthopedics',
			imageUrl: ortho,
		},
		{
			name: 'Cardiology',
			imageUrl: cardo,
		},
		{
			name: 'Neurology',
			imageUrl: neuro,
		},
		{
			name: 'Oncology',
			imageUrl: onco,
		},
		{
			name: 'Radiology',
			imageUrl: radio,
		},
		{
			name: 'Physical Therapy',
			imageUrl: therapy,
		},
		{
			name: 'Dermatology',
			imageUrl: derma,
		},
		{
			name: 'ENT',
			imageUrl: ent,
		},
	];

	const responsive = {
		extraLarge: {
			breakpoint: { max: 3000, min: 1324 },
			items: 4,
			slidesToSlide: 1, // optional, default to 1.
		},
		large: {
			breakpoint: { max: 1324, min: 1005 },
			items: 3,
			slidesToSlide: 1, // optional, default to 1.
		},
		medium: {
			breakpoint: { max: 1005, min: 700 },
			items: 2,
			slidesToSlide: 1, // optional, default to 1.
		},
		small: {
			breakpoint: { max: 700, min: 0 },
			items: 1,
			slidesToSlide: 1, // optional, default to 1.
		},
	};
	return (
		<div className='container departments'>
			<h2>Departments</h2>
			<Carousel
				responsive={responsive}
				removeArrowOnDeviceType={['medium', 'small']}
			>
				{departmentsArray.map((department, index) => {
					return (
						<div className='card' key={index}>
							<div className='depart-name'>{department.name}</div>
							<img src={department.imageUrl} alt={department.name} />
						</div>
					);
				})}
			</Carousel>
		</div>
	);
};

export default Department;
