import React from 'react';
import {
	FlatList,
	StyleSheet,
	Dimensions,
	ViewToken,
	FlatListProps
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
	useSharedValue,
	useAnimatedScrollHandler
} from 'react-native-reanimated';
import { useCreateStoreMutation } from '../types/api';
import Button from '../components/global/Button';
import Brand from '../components/create-store/Brand';
import Social from '../components/create-store/Social';
import StoreImage from '../components/create-store/StoreImage';
import useStore from '../state';
import { useForm, FormProvider } from 'react-hook-form';

const { width } = Dimensions.get('window');

const steps = [
	{ title: 'Brand', component: <Brand /> },
	{ title: 'Social', component: <Social /> },
	{ title: 'Store Image', component: <StoreImage /> }
];

const AnimatedFlatList =
	Animated.createAnimatedComponent<FlatListProps<typeof steps[number]>>(
		FlatList
	);

export interface CreateStoreFormValues {
	name: string;
	description: string;
	twitter: string;
	instagram: string;
	website: string;
	storeImage?: string;
}

const CreateStore: React.FC = () => {
	const [, createStore] = useCreateStoreMutation();
	const [activeStepIndex, setActiveStepIndex] = React.useState(0);
	const listRef = React.useRef<FlatList>(null);
	const scrollX = useSharedValue(0);
	const setPreference = useStore(state => state.setPreference);
	const formMethods = useForm<CreateStoreFormValues>();

	const toNext = React.useCallback(() => {
		listRef.current?.scrollToIndex({
			animated: true,
			index: activeStepIndex + 1
		});
	}, [listRef.current]);

	const handleViewableItemsChanged = React.useCallback(
		({ viewableItems }: { viewableItems: ViewToken[] }) => {
			if (viewableItems[0]?.index) {
				setActiveStepIndex(viewableItems[0].index);
			}
		},
		[]
	);

	const handleScroll = useAnimatedScrollHandler({
		onScroll: ({ contentOffset: { x } }) => {
			scrollX.value = x;
		}
	});

	const onSubmit = React.useCallback(
		async (values: CreateStoreFormValues) => {
			try {
				const { data } = await createStore({
					input: values
				});

				if (data?.createStore?.id) {
					setPreference({ activeStore: data.createStore.id });
				}
			} catch (error) {
				console.log(error);
			}
		},
		[setPreference]
	);

	const isLastStep = activeStepIndex === steps.length - 1;

	return (
		<SafeAreaView style={styles.container}>
			<FormProvider {...formMethods}>
				<AnimatedFlatList
					ref={listRef}
					horizontal
					decelerationRate='fast'
					snapToInterval={width}
					showsHorizontalScrollIndicator={false}
					data={steps}
					keyExtractor={s => s.title}
					renderItem={({ item }) => item.component}
					onViewableItemsChanged={handleViewableItemsChanged}
					onScroll={handleScroll}
				/>
			</FormProvider>
			<Button
				text={isLastStep ? 'Submit' : 'Next'}
				onPress={isLastStep ? formMethods.handleSubmit(onSubmit) : toNext}
				style={styles.button}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	title: {
		fontSize: 36,
		fontWeight: 'bold',
		marginBottom: 16
	},
	description: {
		fontSize: 16
	},
	input: {
		fontSize: 16,
		borderRadius: 4,
		borderWidth: 2,
		borderColor: '#D3D3D3',
		paddingLeft: 8,
		height: 40
	},
	formStep: {
		width,
		paddingHorizontal: 16
	},
	button: {
		alignSelf: 'center',
		width: width - 32
	}
});

export default CreateStore;
