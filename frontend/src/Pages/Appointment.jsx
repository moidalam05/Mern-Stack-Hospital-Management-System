import React from 'react';
import Hero from '../components/Hero';
import AppointmentForm from '../components/AppointmentForm';
import Navbar from '../components/Navbar';
import signImage from '/signin.png';

const Appointment = () => {
	return (
		<>
			<Navbar />
			<Hero
				title={'Schedule Your Appointment | ZeeCare Medical Institute'}
				imageUrl={signImage}
			/>
			<AppointmentForm />
		</>
	);
};

export default Appointment;
