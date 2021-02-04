import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import ItemsListItem from '../components/items/ItemsListItem';
import { useItemsQuery } from '../types/api';

const Items: React.FC = () => {
	const [{ data }] = useItemsQuery();

	return (
		<View style={styles.container}>
			<FlatList
				data={data?.items}
				renderItem={({ item }) => <ItemsListItem item={item} />}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});

export default Items;