import { CustomImage, Typography, useTheme } from '@market/components';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, View } from 'react-native';

import { OrderQuery } from '../../types/api';
import { HomeStackParamList } from '../../types/navigation';

interface StoreMetaProps {
	store: OrderQuery['order']['store'];
}

const StoreMeta: React.FC<StoreMetaProps> = ({ store }) => {
	const { navigate } = useNavigation<NavigationProp<HomeStackParamList>>();
	const { theme } = useTheme();

	return (
		<Pressable
			style={{
				// padding: 16,
				marginHorizontal: 16,
				// backgroundColor: theme.input.background,
				borderRadius: 6
			}}
			onPress={() =>
				navigate('Store', {
					screen: 'Store.Main',
					params: { storeId: store.id }
				})
			}
		>
			<View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
				<CustomImage
					height={40}
					width={40}
					style={{
						borderRadius: 40,
						backgroundColor: theme.border.color
					}}
					uri={store.image?.path}
				/>
				<Typography weight='medium' size='large'>
					{store.name}
				</Typography>
			</View>
		</Pressable>
	);
};

export default StoreMeta;
