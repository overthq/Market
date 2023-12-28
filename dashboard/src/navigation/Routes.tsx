import React from 'react';
import {
	DarkTheme,
	DefaultTheme,
	NavigationContainer
} from '@react-navigation/native';
import { Provider } from 'urql';
import { StatusBar } from 'expo-status-bar';

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
import { getStatusBarStyle } from '../utils/theme';
import useTheme from '../hooks/useTheme';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

const Routes: React.FC = () => {
	const client = useClient();
	const { accessToken, activeStore } = useStore(state => ({
		accessToken: state.accessToken,
		activeStore: state.activeStore
	}));

	const { name } = useTheme();

	return (
		<Provider value={client}>
			<StatusBar style={getStatusBarStyle(name)} />
			<NavigationContainer theme={name === 'dark' ? DarkTheme : DefaultTheme}>
				<BottomSheetModalProvider>
					<AppStack.Navigator>
						{accessToken ? (
							!activeStore ? (
								<AppStack.Group screenOptions={{ headerShown: false }}>
									<AppStack.Screen name='StoreSelect' component={StoreSelect} />
									<AppStack.Screen name='CreateStore' component={CreateStore} />
								</AppStack.Group>
							) : (
								<>
									<AppStack.Screen
										name='Main'
										component={MainTabNavigator}
										options={{ headerShown: false }}
									/>
									{ModalGroup}
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
				</BottomSheetModalProvider>
			</NavigationContainer>
		</Provider>
	);
};

export default Routes;
