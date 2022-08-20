import { Resolver } from '../../types/resolvers';

enum StatPeriod {
	Day = 'Day',
	Week = 'Week',
	Month = 'Month',
	Year = 'Year'
}

const dateMap: Record<StatPeriod, number> = {
	Day: 1,
	Week: 7,
	Month: 30,
	Year: 365
};

const getDateFromPeriod = (period: StatPeriod) => {
	return new Date(new Date().getTime() - dateMap[period] * 86400000);
};

interface StatsArgs {
	storeId: string;
	period: StatPeriod;
}

const stats: Resolver<StatsArgs> = async (_, { storeId, period }, ctx) => {
	const marker = getDateFromPeriod(period);

	const [products, orders, revenue] = await ctx.prisma.$transaction([
		ctx.prisma.product.findMany({
			where: { storeId, createdAt: { gte: marker } }
		}),
		ctx.prisma.order.findMany({
			where: { storeId, createdAt: { gte: marker } }
		}),
		ctx.prisma.orderProduct.aggregate({
			where: { order: { storeId, createdAt: { gte: marker } } },
			_count: { unitPrice: true }
		})
	]);

	return { storeId, products, orders, revenue: revenue._count.unitPrice };
};

const id: Resolver = parent => parent.storeId;

export default {
	Stats: { id },
	Query: { stats }
};
