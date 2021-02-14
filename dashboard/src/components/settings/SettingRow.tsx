import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '../icons';

interface SettingRowProps {
	name: string;
	screenTo: string;
	displayValue?: string;
}

const SettingRow: React.FC<SettingRowProps> = ({
	name,
	screenTo,
	displayValue
}) => {
	const { navigate } = useNavigation();

	return (
		<TouchableOpacity
			style={styles.container}
			onPress={() => navigate(screenTo)}
		>
			<Text style={styles.settingName}>{name}</Text>
			<View>
				<View>{displayValue && <Text>{displayValue}</Text>}</View>
				<Icon
					name='chevronRight'
					color='#505050'
					size={14}
					style={{ marginLeft: 8 }}
				/>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: 40,
		paddingHorizontal: 8,
		backgroundColor: '#FFFFFF',
		borderTopWidth: 1,
		borderTopColor: '#D3D3D3',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	settingName: {
		fontSize: 16
	}
});

export default SettingRow;
