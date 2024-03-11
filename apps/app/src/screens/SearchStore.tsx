import { Screen } from '@market/components';
import {
	NavigationProp,
	RouteProp,
	useNavigation,
	useRoute
} from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { ActivityIndicator } from 'react-native';

import SearchStoreHeader from '../components/search-store/SearchStoreHeader';
import StoreListItem from '../components/store/StoreListItem';
import StoreProducts from '../components/store/StoreProducts';
import { useStoreProductsQuery } from '../types/api';
import { AppStackParamList, ExploreStackParamList } from '../types/navigation';

const SearchStore = () => {
	const [searchTerm, setSearchTerm] = React.useState('');
	const { params } =
		useRoute<RouteProp<ExploreStackParamList, 'SearchStore'>>();
	const { navigate, setOptions } =
		useNavigation<NavigationProp<AppStackParamList>>();
	// Add "filter" parameter to this query
	const [{ data, fetching }, refetchProducts] = useStoreProductsQuery({
		variables: {
			storeId: params.storeId,
			filter: { name: { startsWith: searchTerm } }
		}
	});

	React.useEffect(() => {
		console.log('length', data?.store.products.length);
	}, [data?.store]);

	// const debounceRefetchProducts = React.useCallback(() => {}, []);

	const handleRefetch = () => {
		refetchProducts();
	};

	const handleProductPress = React.useCallback(
		(productId: string) => () => {
			navigate('Product', { productId });
		},
		[]
	);

	return (
		<Screen>
			<SearchStoreHeader
				searchTerm={searchTerm}
				setSearchTerm={setSearchTerm}
			/>
			{fetching || !data?.store ? (
				<ActivityIndicator />
			) : (
				<FlashList
					data={data.store.products}
					keyExtractor={({ id }) => id}
					showsVerticalScrollIndicator={false}
					estimatedItemSize={240}
					renderItem={({ item, index }) => (
						<StoreListItem
							item={item}
							onPress={handleProductPress(item.id)}
							side={index % 2 === 0 ? 'left' : 'right'}
						/>
					)}
					numColumns={2}
				/>
			)}
		</Screen>
	);
};

export default SearchStore;
