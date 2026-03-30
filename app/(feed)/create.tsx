import { X, Camera, Image as ImageIcon, MapPin, AtSign } from "lucide-react-native";
import React from "react";
import { Image, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

const TEXT_SECONDARY = "#666666";

export default function CreatePostScreen() {
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

			<ScrollView className="flex-1 px-4 pt-4">
				<View className="flex-row gap-4">
					<Image
						source={{ uri: "https://i.pravatar.cc/150?img=20" }}
						className="w-10 h-10 rounded-full shrink-0"
					/>
					<View className="flex-1">
						<TextInput
							className="text-lg border-none focus:ring-0 placeholder-gray-300 min-h-[150px] text-[#1A1A1A]"
							placeholder="What's on your mind?"
							placeholderTextColor="#D1D5DB"
							multiline
							textAlignVertical="top"
						/>
					</View>
				</View>

				<View className="mt-4 flex-row gap-2">
					<View className="w-24 h-24 rounded-xl overflow-hidden relative">
						<Image
							source={{ uri: "https://picsum.photos/200/200?random=10" }}
							className="w-full h-full"
						/>
						<Pressable className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/50 items-center justify-center">
							<X size={12} color="white" />
						</Pressable>
					</View>
					<TouchableOpacity className="w-24 h-24 rounded-xl bg-gray-50 border-2 border-dashed border-gray-200 flex-col items-center justify-center gap-1 active:bg-gray-100">
						<View className="w-8 h-8 rounded-lg bg-gray-100 items-center justify-center">
							<ImageIcon size={18} color="#9CA3AF" />
						</View>
						<Text className="text-[10px] text-gray-400 font-medium">Add Media</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>

			<View className="border-t border-[#F2F2F2]">
				<View className="flex-row items-center gap-6 px-4 py-4">
					<TouchableOpacity className="flex-row items-center gap-2 active:text-[#007AFF]">
						<Camera size={24} color={TEXT_SECONDARY} />
					</TouchableOpacity>
					<TouchableOpacity className="flex-row items-center gap-2 active:text-[#007AFF]">
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
	);
}
