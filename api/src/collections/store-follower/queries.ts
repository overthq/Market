import { Resolver } from '../../types/resolvers';

const store: Resolver = async (parent, _, ctx) => {
	const fetchedStore = await ctx.prisma.storeFollower
		.findUnique({
			where: {
				storeId_followerId: {
					storeId: parent.storeId,
					followerId: parent.followerId
				}
			}
		})
		.store();

	return fetchedStore;
};

const follower: Resolver = async (parent, _, ctx) => {
	const fetchedFollower = await ctx.prisma.storeFollower
		.findUnique({
			where: {
				storeId_followerId: {
					storeId: parent.storeId,
					followerId: parent.followerId
				}
			}
		})
		.follower();

	return fetchedFollower;
};

export default {
	StoreFollower: {
		store,
		follower
	}
};