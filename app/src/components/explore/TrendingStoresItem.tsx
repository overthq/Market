import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { StoresQuery } from '../../types/api';

interface TrendingStoresItemProps {
	store: StoresQuery['stores'][number];
	onPress(): void;
}

const TrendingStoresItem: React.FC<TrendingStoresItemProps> = ({
	store,
	onPress
}) => (
	<Pressable style={styles.container} onPress={onPress}>
		<View style={styles.placeholder}>
			<Image source={{ uri: store.image?.path }} style={styles.image} />
		</View>
		<Text style={styles.name}>{store.name}</Text>
	</Pressable>
);

const styles = StyleSheet.create({
	container: {
		marginLeft: 16,
		marginRight: 16
	},
	placeholder: {
		backgroundColor: '#D3D3D3',
		width: 70,
		height: 70,
		borderRadius: 35
	},
	image: {
		height: '100%',
		width: '100%'
	},
	name: {
		fontSize: 15,
		marginTop: 4,
		textAlign: 'center'
	}
});

export default TrendingStoresItem;
