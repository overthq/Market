import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Store from '../screens/Store';
import EditStore from '../screens/EditStore';
import Managers from '../screens/Managers';
import StorePayouts from '../screens/StorePayouts';
import Categories from '../screens/Categories';
import { StoreStackParamList } from '../types/navigation';

const StoreStack = createStackNavigator<StoreStackParamList>();

const StoreStackNavigator = () => {
	return (
		<StoreStack.Navigator initialRouteName='StoreHome'>
			<StoreStack.Screen
				name='StoreHome'
				component={Store}
				options={{ headerTitle: 'Store' }}
			/>
			<StoreStack.Screen name='Edit Store' component={EditStore} />
			<StoreStack.Screen name='Managers' component={Managers} />
			<StoreStack.Screen name='Payouts' component={StorePayouts} />
			<StoreStack.Screen name='Categories' component={Categories} />
		</StoreStack.Navigator>
	);
};

export default StoreStackNavigator;
