import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { HomeQuery } from '../../types/api';
import textStyles from '../../styles/text';
import RecentOrder from './RecentOrder';
import ListEmpty from '../global/ListEmpty';
import { AppStackParamList, HomeTabParamList } from '../../types/navigation';

interface RecentOrdersProps {
	orders: HomeQuery['currentUser']['orders'];
}

// This should only query the last three orders.
// We should have a "view all" button that navigates to a more in-depth view
// (infinite scrolling and filters) of all previous orders.

const RecentOrders: React.FC<RecentOrdersProps> = ({ orders }) => {
	const { navigate } = useNavigation<NavigationProp<HomeTabParamList>>();

	const appNavigation = useNavigation<NavigationProp<AppStackParamList>>();

	const handleOrderPress = React.useCallback(
		(orderId: string) => () => {
			appNavigation.navigate('Order', { orderId });
		},
		[]
	);

	return (
		<View style={styles.container}>
			<Text style={[textStyles.sectionHeader, { marginLeft: 16 }]}>
				Recent Orders
			</Text>
			{!orders || orders?.length === 0 ? (
				<ListEmpty
					description='When you have pending orders, they will be displayed here.'
					cta={{
						text: 'View your carts',
						action: () => navigate('Carts')
					}}
				/>
			) : (
				orders.map(order => (
					<RecentOrder
						key={order.id}
						order={order}
						onPress={handleOrderPress(order.id)}
					/>
				))
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {}
});

export default RecentOrders;