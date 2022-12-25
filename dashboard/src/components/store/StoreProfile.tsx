import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StoreQuery } from '../../types/api';

interface StoreProfileProps {
	store: StoreQuery['currentStore'];
}

const StoreProfile: React.FC<StoreProfileProps> = ({ store }) => {
	return (
		<View style={styles.container}>
			<View style={styles.avatar}>
				<Text style={styles.avatarText}>{store.name[0]}</Text>
			</View>
			<Text style={styles.name}>{store.name}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginVertical: 16,
		alignItems: 'center'
	},
	avatar: {
		height: 80,
		width: 80,
		borderRadius: 40,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#D3D3D3',
		marginRight: 8
	},
	avatarText: {
		fontSize: 36,
		fontWeight: '500',
		color: '#505050'
	},
	name: {
		marginTop: 4,
		fontSize: 24,
		fontWeight: '500',
		textAlign: 'center'
	}
});

export default StoreProfile;
