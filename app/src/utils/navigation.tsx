import { RouteProp } from '@react-navigation/native';
import React from 'react';
import { Icon, IconType } from '../components/icons';
import { HomeTabParamList } from '../types/navigation';

export const getIcon = (routeName: string): IconType => {
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

export const tabBarOptions = {
	activeTintColor: 'black',
	inactiveTintColor: 'gray',
	showLabel: false
};

export const tabScreenOptions = ({
	route
}: {
	route: RouteProp<HomeTabParamList>;
}) => ({
	tabBarIcon: ({ color }: { color: string }) => (
		<Icon name={getIcon(route.name)} color={color} size={28} />
	)
});
