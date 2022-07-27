import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'urql';

import Register from '../screens/Register';
import Authenticate from '../screens/Authenticate';
import Verify from '../screens/Verify';
import StoreSelect from '../screens/StoreSelect';
import CreateStore from '../screens/CreateStore';

import useClient from '../hooks/useClient';
import MainTabNavigator from './MainTab';
import useStore from '../state';
import { AppStack } from './AppStack';
import ModalGroup from './ModalGroup';

const Routes: React.FC = () => {
	const client = useClient();
	const { accessToken, activeStore } = useStore(state => ({
		accessToken: state.accessToken,
		activeStore: state.activeStore
	}));

	return (
		<Provider value={client}>
			<NavigationContainer>
				<AppStack.Navigator screenOptions={{ headerShown: false }}>
					{accessToken ? (
						!activeStore ? (
							<AppStack.Group>
								<AppStack.Screen name='StoreSelect' component={StoreSelect} />
								<AppStack.Screen name='CreateStore' component={CreateStore} />
							</AppStack.Group>
						) : (
							<>
								<AppStack.Screen name='Main' component={MainTabNavigator} />
								<ModalGroup />
							</>
						)
					) : (
						<AppStack.Group>
							<AppStack.Screen name='Register' component={Register} />
							<AppStack.Screen name='Authenticate' component={Authenticate} />
							<AppStack.Screen name='Verify' component={Verify} />
						</AppStack.Group>
					)}
				</AppStack.Navigator>
			</NavigationContainer>
		</Provider>
	);
};

export default Routes;
