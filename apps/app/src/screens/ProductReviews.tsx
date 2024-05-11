import { Screen, Typography } from '@market/components';
import { useRoute } from '@react-navigation/native';
import React from 'react';

const ProductReviews = () => {
	const { params } = useRoute();

	return (
		<Screen>
			<Typography>Reviews</Typography>
		</Screen>
	);
};

export default ProductReviews;