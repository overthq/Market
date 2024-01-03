import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ManagersQuery } from '../../types/api';
import Typography from '../global/Typography';

interface ManagerRowProps {
	manager: ManagersQuery['currentStore']['managers'][number]['manager'];
	you: boolean;
}

const ManagerRow: React.FC<ManagerRowProps> = ({ manager, you }) => {
	return (
		<View style={styles.container}>
			<Typography>{manager.name}</Typography>
			{you && (
				<View style={styles.you}>
					<Text style={styles.youText}>You</Text>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	you: {
		marginLeft: 8,
		paddingVertical: 4,
		backgroundColor: '#D3D3D3',
		borderRadius: 16,
		paddingHorizontal: 8
	},
	youText: {
		fontSize: 14,
		fontWeight: '500',
		color: '#505050'
	}
});

export default ManagerRow;
