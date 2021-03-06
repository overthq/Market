import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RecentOrders from '../components/home/RecentOrders';
import Watchlist from '../components/home/Watchlist';
// import FollowedStores from '../components/home/FollowedStores';

const Home = () => (
	<SafeAreaView style={styles.container}>
		<ScrollView bounces={false}>
			<View style={styles.header}>
				<Text style={styles.title}>For You</Text>
			</View>
			<RecentOrders />
			{/* <FollowedStores /> */}
			<Watchlist />
		</ScrollView>
	</SafeAreaView>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF'
	},
	header: {
		paddingVertical: 15,
		paddingHorizontal: 20,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	title: {
		fontWeight: 'bold',
		fontSize: 32
	}
});

export default Home;
