import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useAppSelector } from '../redux/store';
import { useStoreQuery } from '../types/api';
import StoreProfile from '../components/store/StoreProfile';

const Store: React.FC = () => {
	const activeStore = useAppSelector(
		({ preferences }) => preferences.activeStore
	);

	const [{ data, fetching }] = useStoreQuery({
		variables: { storeId: activeStore as string }
	});

	const store = data?.store;

	if (fetching || !store) {
		return <ActivityIndicator />;
	}

	return (
		<View style={styles.container}>
			<StoreProfile store={store} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 16
	}
});

export default Store;
