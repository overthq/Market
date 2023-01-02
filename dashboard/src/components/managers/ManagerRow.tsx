import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ManagersQuery } from '../../types/api';

interface ManagerRowProps {
	manager: ManagersQuery['currentStore']['managers'][number]['manager'];
	you: boolean;
}

const ManagerRow: React.FC<ManagerRowProps> = ({ manager, you }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.name}>{manager.name}</Text>
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
		paddingHorizontal: 16,
		paddingVertical: 12,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	name: {
		fontSize: 16
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