import React from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	KeyboardAvoidingView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/auth';
import { authenticate } from '../utils/auth';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppStackParamList } from '../types/navigation';
import Button from '../components/global/Button';

const Authenticate = () => {
	const [loading, setLoading] = React.useState(false);
	const [phone, setPhone] = React.useState('');
	const { navigate } =
		useNavigation<StackNavigationProp<AppStackParamList, 'Authenticate'>>();

	const handleSubmit = async () => {
		setLoading(true);
		await authenticate(phone);
		setLoading(false);
		navigate('Verify', { phone });
	};

	const goToRegister = () => navigate('Register');

	return (
		<View style={styles.container}>
			<KeyboardAvoidingView style={{ width: '100%' }} behavior='padding'>
				<Text style={styles.title}>Enter your phone number.</Text>
				<Text
					style={styles.description}
				>{`We'll send your verification code here.`}</Text>
				<View>
					<Text style={styles.inputLabel}>Phone</Text>
					<TextInput
						placeholder='08012345678'
						keyboardType='number-pad'
						style={styles.input}
						value={phone}
						onChangeText={setPhone}
					/>
				</View>
				<Button
					text='Send verification code'
					onPress={handleSubmit}
					loading={loading}
				/>
				<TouchableOpacity
					style={{ alignSelf: 'center', marginTop: 8 }}
					onPress={goToRegister}
				>
					<Text
						style={{ fontWeight: '500', fontSize: 15 }}
					>{`Don't have an account?`}</Text>
				</TouchableOpacity>
			</KeyboardAvoidingView>
		</View>
	);
};

export default Authenticate;
