import { Resolver } from '../../types/resolvers';

const id: Resolver = parent => {
	return `${parent.categoryId}-${parent.productId}`;
};

const store: Resolver = async (_, { id }, ctx) => {
	return ctx.prisma.storeProductCategory.findUnique({ where: { id } }).store();
};

const products: Resolver = async (parent, _, ctx) => {
	return ctx.prisma.storeProductCategory
		.findUnique({ where: { id: parent.id } })
		.products();
};

const product: Resolver = async (parent, _, ctx) => {
	return ctx.prisma.productCategory
		.findUnique({
			where: {
				categoryId_productId: {
					categoryId: parent.categoryId,
					productId: parent.productId
				}
			}
		})
		.product();
};

const category: Resolver = async (parent, _, ctx) => {
	return ctx.prisma.productCategory
		.findUnique({
			where: {
				categoryId_productId: {
					categoryId: parent.categoryId,
					productId: parent.productId
				}
			}
		})
		.category();
};

export default {
	ProductCategory: { id, product, category },
	StoreProductCategory: { store, products }
};
