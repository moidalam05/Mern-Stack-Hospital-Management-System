import React from 'react';
import Vector from '/Vector.png';

const Hero = ({ title, imageUrl }) => {
	return (
		<div className='hero container'>
			<div className='banner'>
				<h1>{title}</h1>
				<p>
					HealthLink is your premier hospital appointment management system
					designed to streamline and enhance your healthcare experience. With
					intuitive features and user-friendly interface, HealthLink empowers
					you to effortlessly schedule, manage, and track your appointments,
					ensuring you receive timely and personalized care.
				</p>
			</div>

			<div className='banner'>
				<img className='animated-image' src={imageUrl} alt='home image' />
				<span>
					<img src={Vector} alt='vetcor' />
				</span>
			</div>
		</div>
	);
};

export default Hero;
