import React from 'react';

const Biography = ({ imageUrl }) => {
	return (
		<div className='container biography'>
			<div className='banner'>
				<img src={imageUrl} alt='about image' />
			</div>
			<div className='banner'>
				<p>Biography</p>
				<h3>Who We Are</h3>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
					aliquam reiciendis nam eius dolorem quia earum, nostrum quisquam
					libero soluta totam rerum quod magnam facere blanditiis, iste enim
					animi amet tenetur! Fugiat nesciunt nulla repellendus obcaecati,
					tempore cum eum illo voluptatibus, adipisci accusamus deleniti aliquid
					facilis sunt inventore quo libero?
				</p>
				<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
				<p>Lorem ipsum dolor sit amet.</p>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
					recusandae, magnam ratione libero asperiores exercitationem
					consectetur expedita quasi placeat, ipsum blanditiis quos at atque?
					Reiciendis vitae velit accusantium consectetur amet sapiente adipisci
					tempore ea illo?
				</p>
				<p>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident,
					accusamus.
				</p>
				<p>Lorem, ipsum dolor.</p>
			</div>
		</div>
	);
};

export default Biography;
