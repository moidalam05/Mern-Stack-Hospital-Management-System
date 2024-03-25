import React from 'react';
import Hero from '../components/Hero';
import Biography from '../components/Biography';
import Departments from '../components/Departments';
import MessageForm from '../components/MessageForm';
import heroImage from '/hero.png';
import aboutImage from '/about.png';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
	return (
		<>
			<Navbar />
			<Hero
				title={
					'Welcome to HealthLink Medical Institute | Your Trusted Heathcare provider'
				}
				imageUrl={heroImage}
			/>
			<Biography imageUrl={aboutImage} />
			<Departments />
			<MessageForm />
			<Footer />
		</>
	);
};

export default Home;
