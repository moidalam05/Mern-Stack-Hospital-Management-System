import React from 'react';
import Hero from '../components/Hero';
import Biography from '../components/Biography';
import Navbar from '../components/Navbar';
import whoweare from '/whoweare.png';

const AboutUs = () => {
	return (
		<>
			<Navbar />
			<Hero
				title={'Learn More About Us | ZeeCare Medical Institute'}
				imageUrl={'/about.png'}
			/>
			<Biography imageUrl={whoweare} />
		</>
	);
};

export default AboutUs;
