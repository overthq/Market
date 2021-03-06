import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useUserOrdersQuery } from '../../types/api';
import textStyles from '../../styles/text';
import RecentOrder from './RecentOrder';

const RecentOrders = () => {
	const [{ data }] = useUserOrdersQuery();

	return (
		<View>
			<Text style={[textStyles.sectionHeader, { marginLeft: 16 }]}>
				Recent Orders
			</Text>
			<FlatList
				data={data?.orders}
				keyExtractor={({ id }) => id}
				horizontal
				showsHorizontalScrollIndicator={false}
				renderItem={({ item }) => <RecentOrder order={item} />}
				ListFooterComponent={<View style={{ width: 16 }} />}
				ListEmptyComponent={
					<Text style={styles.empty}>
						No recent orders to view. Order some items to view them here
					</Text>
				}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	empty: {
		color: '#C4C4C4',
		fontSize: 16,
		marginHorizontal: 20,
		marginVertical: 5
	}
});

export default RecentOrders;
