import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from '../icons';

interface CartProductProps {
	product: {
		name: string;
		unitPrice: number;
	};
	quantity: number;
}

const CartProduct: React.FC<CartProductProps> = ({ product, quantity }) => (
	<View style={styles.container}>
		<View style={{ flexDirection: 'row' }}>
			<View style={styles.imagePlaceholder} />
			<View>
				<Text style={styles.name}>{product.name}</Text>
				<Text style={styles.price}>
					{quantity} {product.unitPrice} NGN
				</Text>
			</View>
		</View>
		<Icon name='chevronRight' color='#D3D3D3' />
	</View>
);

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginVertical: 4
	},
	imagePlaceholder: {
		height: 50,
		width: 50,
		marginRight: 8,
		borderRadius: 4,
		backgroundColor: '#D3D3D3'
	},
	name: {
		fontSize: 16
	},
	price: {
		fontSize: 16,
		marginTop: 4,
		color: '#777777'
	}
});

export default CartProduct;