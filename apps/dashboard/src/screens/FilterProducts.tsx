import { Button, Checkbox, Screen, Typography } from '@market/components';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import Animated, { Layout } from 'react-native-reanimated';

import AccordionRow from '../components/filter-products/AccordionRow';
import SortProducts from '../components/filter-products/SortProducts';
import useGoBack from '../hooks/useGoBack';
import { FilterProductsFormValues } from '../types/forms';
import { ProductsStackParamList } from '../types/navigation';
import { buildProductsFilterQuery } from '../utils/filters';

type AccordionKey = 'sort-by' | 'price' | 'rating' | 'category' | 'in-stock';

const FilterProducts = () => {
	const [open, setOpen] = React.useState<AccordionKey>();
	const { navigate } = useNavigation<NavigationProp<ProductsStackParamList>>();
	useGoBack('x');

	const methods = useForm<FilterProductsFormValues>({
		defaultValues: {
			sortBy: undefined,
			minPrice: undefined,
			maxPrice: undefined,
			categories: [],
			inStock: undefined
		}
	});

	const handleExpandSection = React.useCallback(
		(key: AccordionKey) => () => {
			setOpen(o => (o === key ? undefined : key));
		},
		[]
	);

	const handleClearFilters = React.useCallback(() => {
		methods.reset();
	}, []);

	const onSubmit = React.useCallback((values: FilterProductsFormValues) => {
		navigate('ProductsList', buildProductsFilterQuery(values));
	}, []);

	return (
		<FormProvider {...methods}>
			<Screen style={styles.container}>
				<View>
					<AccordionRow
						title='Sort by'
						open={open === 'sort-by'}
						onPress={handleExpandSection('sort-by')}
					>
						<SortProducts />
					</AccordionRow>
					<AccordionRow
						title='Price'
						open={open === 'price'}
						onPress={handleExpandSection('price')}
					>
						<View />
					</AccordionRow>
					<AccordionRow
						title='Rating'
						open={open === 'rating'}
						onPress={handleExpandSection('rating')}
					>
						<View />
					</AccordionRow>
					<AccordionRow
						title='Category'
						open={open === 'category'}
						onPress={handleExpandSection('category')}
					>
						<View />
					</AccordionRow>
					<Animated.View layout={Layout} style={{ marginBottom: 8 }}>
						<View style={styles.row}>
							<Typography>In Stock</Typography>
							<Checkbox />
						</View>
					</Animated.View>
				</View>
				<View style={styles.footer}>
					<Button
						style={styles.button}
						text='Clear filters'
						onPress={handleClearFilters}
					/>
					<Button
						style={styles.button}
						text='Apply'
						onPress={methods.handleSubmit(onSubmit)}
					/>
				</View>
			</Screen>
		</FormProvider>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 16,
		justifyContent: 'space-between'
	},
	button: {
		marginTop: 8
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	footer: {
		flexGrow: 1,
		justifyContent: 'flex-end',
		paddingBottom: 16
	}
});

export default FilterProducts;
