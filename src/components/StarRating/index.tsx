import React from 'react';
import { StarStar } from '../../assets/svg';

type StarsProps = {
	rating?: number;
};

const StarRating = ({ rating=0 }: StarsProps) => {

	const formatter = new Intl.NumberFormat('en-US', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});

	const asPercentage = formatter.format((rating * .01) * 5);
	let starComponents = [];

	for(let i=0; i<5; i++) {
		if(Math.floor(rating/20) > 0) {
			rating -= 20;
			starComponents.push( <StarStar key={i} type="full" /> );

		} else if(Math.floor(rating/10) > 0) {
			rating -= 10;
			starComponents.push( <StarStar key={i} type="half" /> );

		} else {
			starComponents.push( <StarStar key={i} type="empty" /> );
		}

		if(i === 4) {
			starComponents.push( <div key={i+1}>{asPercentage} out of 5</div> );
		};
	};

	function handleClick() {
		console.log(`Rating: ${asPercentage} out of 5`) 
	};

	return (
		<div
			className="container-padding-2-border-1 flex-row flex-nowrap star-rating pl-1 pr-1 width-fit-content cursor-pointer"
			onClick={handleClick}
		>
			{starComponents}
		</div>
	);
};

export default StarRating;
