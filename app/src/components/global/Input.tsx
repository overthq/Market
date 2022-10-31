import React from 'react';
import {
	View,
	Text,
	TextInput,
	TextInputProps,
	StyleSheet
} from 'react-native';

export interface InputProps extends TextInputProps {
	label?: string;
	textArea?: boolean;
}

const Input: React.FC<InputProps> = ({ label, textArea, ...props }) => {
	const style = React.useMemo(
		() => [styles.input, textArea ? styles.textArea : {}, props.style],
		[textArea, props.style]
	);

	return (
		<View>
			{label && <Text style={styles.label}>{label}</Text>}
			<TextInput
				placeholderTextColor='#696969'
				multiline={textArea}
				textAlignVertical={textArea ? 'top' : undefined}
				{...props}
				style={style}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	label: {
		marginBottom: 4,
		fontSize: 14,
		color: '#505050',
		fontWeight: '500'
	},
	input: {
		fontSize: 16,
		paddingLeft: 8,
		height: 40,
		borderRadius: 4,
		backgroundColor: '#EDEDED',
		color: '#505050'
	},
	textArea: {
		paddingTop: 8,
		height: 80
	}
});

export default Input;