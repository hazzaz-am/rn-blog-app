import * as ImagePicker from "expo-image-picker";
import { AtSign, Camera, Image as ImageIcon, MapPin, X } from "lucide-react-native";
import React, { useState } from "react";
import { Alert, Image, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

const TEXT_SECONDARY = "#666666";

export default function CreatePostScreen() {
	const [images, setImages] = useState<string[] | null>(null);

	const pickImage = async () => {
		const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

		if (!permissionResult.granted) {
			Alert.alert("Permission required", "Permission to access the media library is required.");
			return;
		}

		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ["images", "videos"],
			aspect: [4, 3],
			quality: 1,
			allowsMultipleSelection: true,
		});
		console.log(result);

		if (!result.canceled) {
			setImages((prevImages) => [...(prevImages || []), result.assets[0].uri]);
		}
	};

	const takePhoto = async () => {
		const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

		if (!permissionResult.granted) {
			Alert.alert("Permission required", "Permission to access the camera is required.");
			return;
		}

		let result = await ImagePicker.launchCameraAsync({
			mediaTypes: ["images", "videos"],
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.canceled) {
			setImages((prevImages) => [...(prevImages || []), result.assets[0].uri]);
		}
	};

	return (
		<View className="flex-1 bg-white">
			<View className="flex-row items-center justify-between px-4 pt-10 pb-4 bg-white">
				<Pressable className="active:opacity-60">
					<Text className="text-[17px] text-[#1A1A1A] font-medium">Cancel</Text>
				</Pressable>
				<Text className="text-[17px] font-bold tracking-tight">New Post</Text>
				<Pressable className="bg-[#007AFF] px-5 py-1.5 rounded-full active:opacity-80">
					<Text className="text-white text-sm font-semibold">Post</Text>
				</Pressable>
			</View>

			<View className="flex-row gap-4 items-center px-4 py-4 border-b border-[#F2F2F2]">
				<Image source={{ uri: "https://i.pravatar.cc/150?img=20" }} className="w-10 h-10 rounded-full shrink-0" />
				<Text className="text-lg font-medium text-[#1A1A1A]">Hazzaz Abdul Mannan</Text>
			</View>
			<ScrollView className="flex-1 px-2">
				<TextInput
					className="text-lg border-none focus:ring-0 placeholder-gray-300 text-[#1A1A1A]"
					placeholder="What's on your mind?"
					multiline
					textAlignVertical="top"
				/>
			</ScrollView>
			<View className="px-4 pt-4">
				{images?.length && (
					<View className="grid grid-cols-4 gap-1 h-96">
						{images.map((image, idx) => (
							<View key={`${image}-${idx}`} className="rounded-xl overflow-hidden relative">
								<Image source={{ uri: image }} className="w-full h-full" />
								<Pressable className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/50 items-center justify-center">
									<X size={12} color="white" />
								</Pressable>
							</View>
						))}
					</View>
				)}
				<View className="border-t mt-4 border-[#F2F2F2]">
					<View className="flex-row items-center gap-6 px-4 py-4">
						<TouchableOpacity onPress={takePhoto} className="flex-row items-center gap-2 active:text-[#007AFF]">
							<Camera size={24} color={TEXT_SECONDARY} />
						</TouchableOpacity>
						<TouchableOpacity onPress={pickImage} className="flex-row items-center gap-2 active:text-[#007AFF]">
							<ImageIcon size={24} color={TEXT_SECONDARY} />
						</TouchableOpacity>
						<TouchableOpacity className="flex-row items-center gap-2 active:text-[#007AFF]">
							<MapPin size={24} color={TEXT_SECONDARY} />
						</TouchableOpacity>
						<TouchableOpacity className="flex-row items-center gap-2 active:text-[#007AFF]">
							<AtSign size={24} color={TEXT_SECONDARY} />
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</View>
	);
}
