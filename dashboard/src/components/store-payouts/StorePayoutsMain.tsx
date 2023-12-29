import React from 'react';
import { StyleSheet } from 'react-native';
import { FormProvider, useForm } from 'react-hook-form';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import Screen from '../global/Screen';
import FormInput from '../global/FormInput';
import Input from '../global/Input';
import Button from '../global/Button';
import { useEditStoreMutation } from '../../types/api';
import BankSelect from './BankSelect';
import BankSelectButton from './BankSelectButton';

interface EditPayoutInfoValues {
	accountNumber: string;
	bank: string;
}

interface StorePayoutsMainProps {
	bankAccountNumber?: string | null;
	bankCode?: string | null;
}

const StorePayoutsMain: React.FC<StorePayoutsMainProps> = ({
	bankAccountNumber,
	bankCode
}) => {
	const [, editStore] = useEditStoreMutation();
	const selectModalRef = React.useRef<BottomSheetModal>(null);

	const methods = useForm<EditPayoutInfoValues>({
		defaultValues: {
			accountNumber: bankAccountNumber ?? '',
			bank: bankCode ?? ''
		}
	});

	const { control, setValue, handleSubmit } = methods;

	const handleSetBank = React.useCallback((code: string) => {
		setValue('bank', code);
	}, []);

	const onSubmit = React.useCallback((values: EditPayoutInfoValues) => {
		editStore({
			input: { bankAccountNumber: values.accountNumber, bankCode: values.bank }
		});
	}, []);

	const toggleSelect = React.useCallback(() => {
		selectModalRef.current?.present();
	}, []);

	return (
		<Screen style={styles.container}>
			<FormProvider {...methods}>
				<FormInput
					name='accountNumber'
					label='Account Number'
					control={control}
					style={styles.input}
					keyboardType='number-pad'
				/>
				<Input style={styles.input} label='Bank' />
				<BankSelectButton control={control} onPress={toggleSelect} />
				<Button text='Update information' onPress={handleSubmit(onSubmit)} />
				<BankSelect modalRef={selectModalRef} setBank={handleSetBank} />
			</FormProvider>
		</Screen>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingTop: 16,
		paddingHorizontal: 16
	},
	input: {
		marginBottom: 8
	}
});

export default StorePayoutsMain;
