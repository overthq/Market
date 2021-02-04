import React from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { verifyCode } from '../utils/auth';
import { login } from '../redux/auth/actions';

// In the future: use a third party solution with SMS support
const Verify: React.FC = () => {
	const [code, setCode] = React.useState(new Array(5).fill(undefined));
	const { params } = useRoute<any>();
	const dispatch = useDispatch();

	const { phone } = params;

	const codeRef = React.useRef<(TextInput | null)[]>();

	const handleKeyPress = (key: string, index: number) => {
		if (key === 'Backspace' && index !== 0 && codeRef.current) {
			codeRef.current[index - 1]?.focus();
		}
	};

	const handleFieldChange = (value: string, index: number) => {
		if (codeRef.current) {
			if (index < 5 && value) {
				codeRef.current[index + 1]?.focus();
			}

			if (index === codeRef.current.length - 1) {
				codeRef.current[index]?.blur();
			}

			const newCode = [...code];
			newCode[index] = Number(value);
			setCode(newCode);
		}
	};

	const handleSubmit = async () => {
		try {
			const accessToken = await verifyCode({ phone, code: code.join('') });
			dispatch(login(accessToken));
			// Also fetch managed stores, and dispatch an action to set them BEFORE navigating to the main screen.
			// It would be wise to use a loading indicator while this is happening, however, awaits do not work on the dispatch function for some reason.

			// navigate('Main'); (This should work automatically, because of the way the navigator is built).
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<View style={styles.container}>
			<Text>Your verification code</Text>
			<View style={styles.inputs}>
				{code.map((value, index) => (
					<TextInput
						key={index}
						ref={el => codeRef.current?.push(el)}
						style={styles.input}
						value={value}
						onChangeText={val => handleFieldChange(val, index)}
						onKeyPress={e => handleKeyPress(e.nativeEvent.key, index)}
					/>
				))}
			</View>
			<TouchableOpacity onPress={handleSubmit}>
				<Text>Verify</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20
	},
	inputs: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	input: {
		height: 50,
		width: 50,
		borderRadius: 8,
		backgroundColor: '#505050'
	}
});

export default Verify;