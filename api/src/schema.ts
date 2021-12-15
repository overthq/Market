import { makeExecutableSchema } from '@graphql-tools/schema';
import { GraphQLUpload } from 'graphql-upload';
import merge from 'lodash/merge';

import userQueries from './collections/user/queries';
import userMutations from './collections/user/mutations';
import UserTypes from './collections/user/types';

import storeQueries from './collections/store/queries';
import storeMutations from './collections/store/mutations';
import StoreTypes from './collections/store/types';

import productQueries from './collections/product/queries';
import productMutations from './collections/product/mutations';
import ProductTypes from './collections/product/types';

import orderQueries from './collections/order/queries';
import orderMutations from './collections/order/mutations';
import OrderTypes from './collections/order/types';

import cartQueries from './collections/cart/queries';
import cartMutations from './collections/cart/mutations';
import CartTypes from './collections/cart/types';

const Root = `
	scalar Upload

	type Query { _: Boolean }
	type Mutation { _: Boolean }
`;

const resolvers = merge(
	{
		Upload: GraphQLUpload
	},
	userQueries,
	userMutations,
	orderQueries,
	orderMutations,
	productQueries,
	productMutations,
	storeQueries,
	storeMutations,
	cartQueries,
	cartMutations
);

const schema = makeExecutableSchema({
	typeDefs: [Root, UserTypes, StoreTypes, ProductTypes, OrderTypes, CartTypes],
	resolvers
});

export default schema;
