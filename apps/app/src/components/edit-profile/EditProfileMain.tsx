import { FormInput, Screen, TextButton } from '@market/components';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';

import { CurrentUserQuery, useEditProfileMutation } from '../../types/api';

interface EditProfileMainProps {
	currentUser: CurrentUserQuery['currentUser'];
}

interface EditProfileFormValues {
	name: string;
	phone: string;
}

const EditProfileMain: React.FC<EditProfileMainProps> = ({ currentUser }) => {
	const navigation = useNavigation();
	const [, editProfile] = useEditProfileMutation();

	const { control, handleSubmit, formState } = useForm<EditProfileFormValues>({
		defaultValues: {
			name: currentUser.name,
			phone: currentUser.phone
		}
	});

	const onSubmit = async (values: EditProfileFormValues) => {
		editProfile({ input: values });
	};

	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<TextButton
					onPress={handleSubmit(onSubmit)}
					disabled={!formState.isDirty}
					style={{ marginRight: 16 }}
				>
					Save
				</TextButton>
			)
		});
	}, [formState.isDirty]);

	return (
		<Screen style={styles.container}>
			<FormInput
				name='name'
				label='Name'
				control={control}
				style={styles.input}
			/>
			<FormInput name='phone' label='Phone' control={control} />
		</Screen>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 16
	},
	input: {
		marginBottom: 8
	}
});

export default EditProfileMain;
