import React from 'react';

import { AppStack } from './AppStack';
import SettingsStackNavigator from './SettingsStack';
import AddCategory from '../screens/AddCategory';
import AddManager from '../screens/AddManager';
import AddPayout from '../screens/AddPayout';
import AddProduct from '../screens/AddProduct';
import CustomerInfo from '../screens/CustomerInfo';
import FilterOrders from '../screens/FilterOrders';
import FilterProducts from '../screens/FilterProducts';

const ModalGroup = (
	<AppStack.Group screenOptions={{ presentation: 'modal', headerShown: true }}>
		<AppStack.Screen name='Add Product' component={AddProduct} />
		<AppStack.Screen
			name='Settings'
			component={SettingsStackNavigator}
			options={{ headerShown: false }}
		/>
		<AppStack.Screen
			name='CustomerInfo'
			component={CustomerInfo}
			options={{ headerTitle: 'Customer Information' }}
		/>
		<AppStack.Screen
			name='AddPayout'
			component={AddPayout}
			options={{ headerTitle: 'Add Payout' }}
		/>
		<AppStack.Screen
			name='AddCategory'
			component={AddCategory}
			options={{ headerTitle: 'Add Category' }}
		/>
		<AppStack.Screen
			name='AddManager'
			component={AddManager}
			options={{ headerTitle: 'Add Manager' }}
		/>
		<AppStack.Screen
			name='FilterProducts'
			component={FilterProducts}
			options={{ headerTitle: 'Filter Products' }}
		/>
		<AppStack.Screen
			name='FilterOrders'
			component={FilterOrders}
			options={{ headerTitle: 'Filter Orders' }}
		/>
	</AppStack.Group>
);

export default ModalGroup;
