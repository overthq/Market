import React from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	FlatList,
	StyleSheet
} from 'react-native';
import { useUserOrdersQuery, OrderStatus } from '../../types';
import textStyles from '../../styles/text';

const getStatusColor = (status: OrderStatus) => {
	switch (status) {
		case OrderStatus.Pending:
			return '#F4CF0B';
		case OrderStatus.Processing:
			return '#C4C4C4';
		case OrderStatus.Fulfilled:
			return '#37DB0F';
	}
};

const RecentOrders = () => {
	const [{ data }] = useUserOrdersQuery();

	return (
		<View>
			<Text style={[textStyles.sectionHeader, { marginLeft: 20 }]}>
				Recent Orders
			</Text>
			<FlatList
				data={data?.userOrders}
				keyExtractor={({ id }) => id}
				horizontal
				showsHorizontalScrollIndicator={false}
				renderItem={({ item }) => (
					<TouchableOpacity activeOpacity={0.8} key={item.id}>
						<View style={styles.orderContainer}>
							<View style={styles.storeAvatar}></View>
							<View style={styles.orderInformation}>
								<Text>{item.cart[0].item.name}</Text>
								<Text>
									{item.cart.length > 1 && ` (and ${item.cart.length} others)`}
								</Text>
								<Text style={{ color: getStatusColor(item.status) }}>
									{item.status}
								</Text>
							</View>
						</View>
					</TouchableOpacity>
				)}
				ListEmptyComponent={
					<Text style={styles.emptyText}>
						No recent orders to view. Order some items to view them here
					</Text>
				}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	orderContainer: {
		flexDirection: 'row'
	},
	storeAvatar: {
		height: 50,
		width: 50,
		borderRadius: 25,
		backgroundColor: '#D3D3D3'
	},
	orderInformation: {
		marginLeft: 10
	},
	emptyText: {
		color: '#C4C4C4',
		fontSize: 16,
		marginHorizontal: 20,
		marginVertical: 5
	}
});

export default RecentOrders;
