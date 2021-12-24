import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';

interface ListEmptyButtonProps {
	text: string;
	onPress(): void;
}

const ListEmptyButton: React.FC<ListEmptyButtonProps> = ({ text, onPress }) => (
	<Pressable style={styles.container} onPress={onPress}>
		<Text style={styles.text}>{text}</Text>
	</Pressable>
);

const styles = StyleSheet.create({
	container: {
		paddingVertical: 8,
		paddingHorizontal: 16,
		marginVertical: 4,
		backgroundColor: '#D3D3D3',
		borderRadius: 4,
		justifyContent: 'center',
		alignItems: 'center'
	},
	text: {
		fontSize: 16,
		fontWeight: '500',
		color: '#2B2B2B'
	}
});

export default ListEmptyButton;