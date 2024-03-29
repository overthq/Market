import React from 'react';
import { View, StyleSheet } from 'react-native';

import EditStoreMain from '../components/edit-store/EditStoreMain';
import useGoBack from '../hooks/useGoBack';
import { useStoreQuery } from '../types/api';

const EditStore: React.FC = () => {
	const [{ data, fetching }] = useStoreQuery();
	useGoBack();

	if (fetching || !data?.currentStore) {
		return <View style={styles.loading} />;
	}

	return <EditStoreMain store={data.currentStore} />;
};

const styles = StyleSheet.create({
	loading: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FFFFFF'
	}
});

export default EditStore;
