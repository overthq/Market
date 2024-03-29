import { Typography } from '@market/components';
import React from 'react';
import { View, StyleSheet } from 'react-native';

import { StoreQuery } from '../../types/api';

interface StoreProfileProps {
	store: StoreQuery['currentStore'];
}

const StoreProfile: React.FC<StoreProfileProps> = ({ store }) => {
	return (
		<View style={styles.container}>
			<View style={styles.avatar}>
				<Typography weight='medium' size='xxxlarge' style={styles.avatarText}>
					{store.name[0]}
				</Typography>
			</View>
			<Typography weight='medium' size='xxlarge' style={styles.name}>
				{store.name}
			</Typography>
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
		color: '#505050'
	},
	name: {
		marginTop: 4,
		textAlign: 'center'
	}
});

export default StoreProfile;
