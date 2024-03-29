import { Button, Screen, Typography } from '@market/components';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from '../styles/auth';
import { useAuthenticateMutation } from '../types/api';
import { AppStackParamList } from '../types/navigation';

const Authenticate: React.FC = () => {
	const [phone, setPhone] = React.useState('');
	const { navigate } = useNavigation<NavigationProp<AppStackParamList>>();
	const [{ fetching }, authenticate] = useAuthenticateMutation();

	const handleSubmit = async () => {
		try {
			await authenticate({ input: { phone } });
			navigate('Verify', { phone });
		} catch (error) {
			console.log(error);
		}
	};

	return (
		// <SafeAreaView>
		<Screen style={styles.container}>
			<Typography style={styles.title}>Enter your phone number.</Typography>
			<Typography style={styles.description}>
				{`We'll send your verification code here.`}
			</Typography>
			<View>
				<Text style={styles.inputLabel}>Phone number</Text>
				<TextInput
					style={styles.input}
					placeholder='08012345678'
					value={phone}
					onChangeText={setPhone}
					keyboardType='number-pad'
				/>
			</View>
			<Button loading={fetching} text='Next' onPress={handleSubmit} />
		</Screen>
		// </SafeAreaView>
	);
};

export default Authenticate;
