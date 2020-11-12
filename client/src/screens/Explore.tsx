import React from 'react';
import {
	View,
	StyleSheet,
	FlatList,
	ScrollView,
	Image,
	Text,
	TouchableOpacity,
	Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useStoresQuery } from '../types';
import { Icon } from '../components/icons';

const { width } = Dimensions.get('window');

const Explore = () => {
	const [{ data }] = useStoresQuery();
	const { navigate } = useNavigation();

	return (
		<ScrollView style={{ backgroundColor: '#FFFFFF' }}>
			<SafeAreaView style={styles.container}>
				<View style={styles.header}>
					<Text style={styles.title}>Explore</Text>
				</View>
				<TouchableOpacity
					activeOpacity={0.8}
					style={styles.searchBar}
					onPress={() => navigate('Search')}
				>
					<Icon name='search' color='#505050' size={20} />
					<Text style={{ fontSize: 16, paddingLeft: 5, color: '#777777' }}>
						Search stores and items
					</Text>
				</TouchableOpacity>
				<View style={{ marginTop: 16 }}>
					<Text style={styles.sectionHeader}>Trending Stores</Text>
					<FlatList
						horizontal
						data={data?.stores}
						keyExtractor={({ id }) => id}
						contentContainerStyle={{ paddingLeft: 20, height: 120 }}
						renderItem={({ item }) => (
							<TouchableOpacity
								activeOpacity={0.8}
								style={{
									justifyContent: 'center',
									height: '100%'
								}}
								onPress={() => navigate('Store', { storeId: item.id })}
							>
								<View key={item.id} style={styles.featuredStoreContainer}>
									<Image
										source={{
											uri: `https://twitter.com/${item.profile.twitter_username}/profile_image?size=original`
										}}
										style={{ height: 80, width: 80, borderRadius: 40 }}
									/>
								</View>
								<Text style={styles.storeName}>{item.name}</Text>
							</TouchableOpacity>
						)}
						ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
						ListEmptyComponent={
							<View style={{ height: '100%', width: '100%' }}>
								<Text
									style={{
										alignSelf: 'center',
										marginHorizontal: 'auto',
										fontSize: 16
									}}
								>
									There are no stores trending currently.
								</Text>
							</View>
						}
					/>
				</View>
				<View
					style={{
						height: 250,
						margin: 20,
						borderRadius: 8,
						backgroundColor: '#D3D3D3',
						padding: 20
					}}
				>
					<Text style={{ color: '#505050', fontWeight: 'bold', fontSize: 24 }}>
						Item of the day
					</Text>
				</View>
				<View style={{ marginTop: 16 }}>
					<Text style={styles.sectionHeader}>Featured Items</Text>
				</View>
			</SafeAreaView>
		</ScrollView>
	);
};

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
	},
	sectionHeader: {
		marginVertical: 10,
		fontSize: 18,
		fontWeight: 'bold',
		color: '#505050',
		paddingLeft: 20
	},
	searchBar: {
		alignSelf: 'center',
		borderRadius: 10,
		backgroundColor: '#D3D3D3',
		flexDirection: 'row',
		padding: 10,
		width: width - 40,
		height: 40
	},
	featuredStoreContainer: {
		backgroundColor: '#D3D3D3',
		width: 80,
		height: 80,
		borderRadius: 40,
		justifyContent: 'center',
		alignItems: 'center'
	},
	storeImageContainer: {
		flexDirection: 'column',
		alignItems: 'center',
		marginLeft: 20
	},
	storeName: {
		fontWeight: '500',
		fontSize: 15,
		marginTop: 5,
		textAlign: 'center'
	}
});

export default Explore;
