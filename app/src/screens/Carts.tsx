import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CartsListItem from '../components/carts/CartsListItem';
import ListEmpty from '../components/global/ListEmpty';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from '../redux/store';
import { useCartsQuery } from '../types/api';

const Carts = () => {
	const userId = useAppSelector(({ auth }) => auth.userId);
	const [{ data, error }] = useCartsQuery({ variables: { userId } });
	const { navigate } = useNavigation();

	React.useEffect(() => {
		console.log({ data, error });
	}, [data, error]);

	const carts = data?.carts;

	if (error) console.log(error);

	if (!carts) return <View />;

	return (
		<SafeAreaView style={styles.container}>
			<FlatList
				bounces={false}
				keyExtractor={c => c.store_id}
				ListHeaderComponent={
					<View style={styles.header}>
						<Text style={styles.title}>Carts</Text>
					</View>
				}
				renderItem={({ item }) => <CartsListItem cart={item} />}
				data={carts}
				ListEmptyComponent={
					<ListEmpty
						title='Empty cart'
						description={`Looks like your cart is empty. Let's change that.`}
						cta={{
							text: 'Discover new stores',
							action: () => navigate('Explore')
						}}
					/>
				}
				ItemSeparatorComponent={() => <View style={styles.separator} />}
			/>
		</SafeAreaView>
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
	separator: {
		width: '100%',
		height: 1,
		backgroundColor: '#D3D3D3'
	}
});

export default Carts;
