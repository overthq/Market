import { Typography, useTheme } from '@market/components';
import { ThemeObject } from '@market/components/src/styles/theme';
import React from 'react';
import { View, StyleSheet } from 'react-native';

import { OrderStatus } from '../../types/api';

interface OrderStatusPillProps {
	status: OrderStatus;
}

const statusToBadgeVariant: Record<OrderStatus, keyof ThemeObject['badge']> = {
	[OrderStatus.Cancelled]: 'danger',
	[OrderStatus.Pending]: 'warning',
	[OrderStatus.Processing]: 'warning',
	[OrderStatus.Completed]: 'success',
	[OrderStatus.Delivered]: 'success'
};

const OrderStatusPill: React.FC<OrderStatusPillProps> = ({ status }) => {
	const { theme } = useTheme();
	const { color, backgroundColor } = theme.badge[statusToBadgeVariant[status]];

	return (
		<View style={[styles.container, { backgroundColor }]}>
			<Typography
				size='xsmall'
				weight='medium'
				style={{ lineHeight: 16, color }}
			>
				{status}
			</Typography>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignSelf: 'flex-start',
		paddingVertical: 2,
		paddingHorizontal: 8,
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 16
	}
});

export default OrderStatusPill;
