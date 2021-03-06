import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ItemDetailsFragment } from '../../types/api';
import { Icon } from '../icons';
import { uploadImage } from '../../utils/images';

interface ImagesProps {
	itemId: string;
	images: ItemDetailsFragment['item_images'];
}

const Images: React.FC<ImagesProps> = ({ itemId, images }) => {
	const handlePickImage = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1
		});

		if (!result.cancelled) {
			const data = await uploadImage(result.uri);
			console.log({ data, itemId });
		}
	};

	return (
		<View>
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Images</Text>
				{images.map(({ image }) => (
					<Image key={image.id} source={{ uri: image.path_url }} />
				))}
				<TouchableOpacity onPress={handlePickImage} style={styles.add}>
					<Icon name='plus' size={24} />
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	section: {
		paddingVertical: 8,
		paddingHorizontal: 16,
		backgroundColor: '#FFFFFF'
	},
	sectionTitle: {
		marginBottom: 4,
		fontSize: 16,
		color: '#505050',
		fontWeight: '500'
	},
	add: {
		width: 60,
		height: 60,
		borderRadius: 4,
		borderColor: '#D3D3D3',
		borderWidth: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default Images;
