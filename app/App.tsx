import React from 'react';
import { View, ActivityIndicator, Platform } from 'react-native';
import { Provider, createClient } from 'urql';
import { NavigationContainer } from '@react-navigation/native';
import {
	createStackNavigator,
	TransitionPresets
} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Authenticate from './src/screens/Authenticate';
import Register from './src/screens/Register';
import VerifyAuthentication from './src/screens/VerifyAuthentication';
import Home from './src/screens/Home';
import Profile from './src/screens/Profile';
import Carts from './src/screens/Carts';
import useAccessToken from './src/hooks/useAccessToken';
import Explore from './src/screens/Explore';
import Search from './src/screens/Search';
import Store from './src/screens/Store';
import Item from './src/screens/Item';
import Cart from './src/screens/Cart';
import { Icon, IconType } from './src/components/icons';
import { useCurrentUserQuery } from './src/types';
import {
	AppStackParamList,
	AuthStackParamList,
	MainStackParamList
} from './src/types/navigation';
import { useAppSelector } from './src/redux/store';
import env from './env';

const RootStack = createStackNavigator();
const AppStack = createStackNavigator<AppStackParamList>();
const AuthStack = createStackNavigator<AuthStackParamList>();
const MainStack = createStackNavigator<MainStackParamList>();
const HomeTab = createBottomTabNavigator();

const AuthNavigator = () => (
	<AuthStack.Navigator headerMode='none'>
		<AuthStack.Screen name='Register' component={Register} />
		<AuthStack.Screen name='Authenticate' component={Authenticate} />
		<AuthStack.Screen
			name='VerifyAuthentication'
			component={VerifyAuthentication}
		/>
	</AuthStack.Navigator>
);

const HomeNavigator = () => (
	<HomeTab.Navigator
		screenOptions={({ route }) => ({
			// eslint-disable-next-line
			tabBarIcon: ({ color }) => {
				const getIcon = (routeName: string): IconType => {
					switch (routeName) {
						case 'For You':
							return 'home';
						case 'Explore':
							return 'search';
						case 'Carts':
							return 'shoppingBag';
						case 'Profile':
							return 'user';
					}
					throw new Error('Specified route does not exist.');
				};

				return <Icon name={getIcon(route.name)} color={color} size={28} />;
			}
		})}
		tabBarOptions={{
			activeTintColor: 'black',
			inactiveTintColor: 'gray',
			showLabel: false
		}}
	>
		<HomeTab.Screen name='For You' component={Home} />
		<HomeTab.Screen name='Explore' component={Explore} />
		<HomeTab.Screen name='Carts' component={Carts} />
		<HomeTab.Screen name='Profile' component={Profile} />
	</HomeTab.Navigator>
);

const MainNavigator = () => (
	<MainStack.Navigator>
		<MainStack.Screen
			name='Home'
			component={HomeNavigator}
			options={{ headerShown: false }}
		/>
		<MainStack.Screen
			name='Store'
			component={Store}
			options={{
				headerBackTitleVisible: false,
				// eslint-disable-next-line
				headerBackImage: () => {
					return <Icon name='chevronLeft' size={30} />;
				},
				headerLeftContainerStyle: { paddingLeft: 8 }
			}}
		/>
	</MainStack.Navigator>
);

const RootNavigator = () => {
	const [{ data, fetching, error }] = useCurrentUserQuery();
	const { logOut } = useAccessToken();

	React.useEffect(() => {
		if (!fetching && !data?.currentUser) logOut();
	}, [fetching, data, error]);

	return fetching ? (
		<View>
			<ActivityIndicator />
		</View>
	) : (
		<RootStack.Navigator
			initialRouteName={!!data?.currentUser ? 'Main' : 'Auth'}
		>
			<RootStack.Screen
				name='Auth'
				component={AuthNavigator}
				options={{ headerShown: false }}
			/>
			<RootStack.Screen
				name='Main'
				component={MainNavigator}
				options={{ headerShown: false }}
			/>
		</RootStack.Navigator>
	);
};

const Routes = () => (
	<NavigationContainer>
		<AppStack.Navigator
			mode='modal'
			screenOptions={{
				headerShown: false,
				gestureEnabled: true,
				cardOverlayEnabled: true,
				...(Platform.OS === 'ios'
					? TransitionPresets.ModalPresentationIOS
					: TransitionPresets.RevealFromBottomAndroid)
			}}
		>
			<AppStack.Screen name='Root' component={RootNavigator} />
			<AppStack.Screen name='Search' component={Search} />
			<AppStack.Screen name='Item' component={Item} />
			<AppStack.Screen name='Cart' component={Cart} />
		</AppStack.Navigator>
	</NavigationContainer>
);

const App = () => {
	const accessToken = useAppSelector(({ auth }) => auth.accessToken);

	const client = createClient({
		url: env.hasuraUrl,
		fetchOptions: () => ({
			headers: {
				authorization: accessToken ? `Bearer ${accessToken}` : ''
			}
		})
	});

	return (
		<Provider value={client}>
			<SafeAreaProvider>
				<Routes />
			</SafeAreaProvider>
		</Provider>
	);
};

export default App;
