import { Settings, Share2, Camera, Mail, Edit3, Play, Image as ImageIconLucide } from "lucide-react-native";
import React from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

const TEXT_PRIMARY = "#1A1A1A";
const TEXT_SECONDARY = "#666666";
const DIVIDER = "#F2F2F2";

interface GridItem {
	id: number;
	image: string;
	type: "image" | "video";
}

const userProfile = {
	name: "Mia Henderson",
	username: "@mia.henderson",
	email: "mia.henderson@agency.co",
	bio: "Editorial photographer based in NYC. Capturing the interplay of light and brutalist architecture.",
	profilePicture: "https://i.pravatar.cc/150?img=20",
	posts: 124,
	followers: "8.4k",
	following: 450,
};

const gridItems: GridItem[] = [
	{ id: 1, image: "https://picsum.photos/400/400?random=1", type: "image" },
	{ id: 2, image: "https://picsum.photos/400/400?random=2", type: "image" },
	{ id: 3, image: "https://picsum.photos/400/400?random=3", type: "image" },
	{ id: 4, image: "https://picsum.photos/400/400?random=4", type: "image" },
	{ id: 5, image: "", type: "video" },
	{ id: 6, image: "", type: "video" },
];

export default function ProfileScreen() {
	return (
		<View className="flex-1 bg-white">
			<View className="pt-10 px-6 flex-row justify-between items-center">
				<Settings size={24} color={TEXT_PRIMARY} />
				<Text className="text-[17px] font-bold tracking-tight">Profile</Text>
				<Share2 size={24} color={TEXT_PRIMARY} />
			</View>

			<ScrollView showsVerticalScrollIndicator={false} className="flex-1">
				<View className="px-6 pt-8 pb-6 flex-col items-center">
					<View className="relative">
						<View className="w-24 h-24 rounded-full border-2 border-gray-100 overflow-hidden mb-4">
							<Image source={{ uri: userProfile.profilePicture }} className="w-full h-full" />
						</View>
						<Pressable className="absolute bottom-4 -right-1 w-8 h-8 bg-[#007AFF] rounded-full border-4 border-white items-center justify-center active:scale-90">
							<Camera size={12} color="white" />
						</Pressable>
					</View>

					<Text className="text-2xl font-bold text-[#1A1A1A]">{userProfile.name}</Text>
					<Text className="text-[#666666] font-medium mb-3">{userProfile.username}</Text>

					<View className="w-full mt-4">
						<View className="bg-gray-50 p-3 rounded-xl">
							<Text className="text-[14px] text-[#666666] text-center">{userProfile.bio}</Text>
						</View>
						<View className="flex-row items-center justify-center gap-2 mt-2">
							<Mail size={14} color={TEXT_SECONDARY} />
							<Text className="text-sm text-[#666666]">{userProfile.email}</Text>
						</View>
					</View>

					<Pressable className="mt-6 w-full h-12 border border-gray-200 rounded-2xl flex-row items-center justify-center gap-2 active:bg-gray-50">
						<Edit3 size={18} color={TEXT_PRIMARY} />
						<Text className="text-sm font-semibold text-[#1A1A1A]">Edit Profile</Text>
					</Pressable>
				</View>

				<View className="px-6 flex-row justify-between border-y border-[#F2F2F2] py-4 mb-2">
					<View className="flex-1 items-center">
						<Text className="font-bold text-[#1A1A1A]">{userProfile.posts}</Text>
						<Text className="text-[12px] text-[#666666] uppercase tracking-wider">Posts</Text>
					</View>
					<View className="flex-1 items-center border-x border-[#F2F2F2]">
						<Text className="font-bold text-[#1A1A1A]">{userProfile.followers}</Text>
						<Text className="text-[12px] text-[#666666] uppercase tracking-wider">Followers</Text>
					</View>
					<View className="flex-1 items-center">
						<Text className="font-bold text-[#1A1A1A]">{userProfile.following}</Text>
						<Text className="text-[12px] text-[#666666] uppercase tracking-wider">Following</Text>
					</View>
				</View>

				<View className="flex-row flex-wrap" style={{ gap: 1, backgroundColor: DIVIDER }}>
					{gridItems.map((item) => (
						<View key={item.id} className="w-1/3 aspect-square">
							{item.type === "image" && item.image ? (
								<Image source={{ uri: item.image }} className="w-full h-full" />
							) : (
								<View className="w-full h-full bg-gray-100 items-center justify-center">
									{item.type === "video" ? (
										<Play size={30} color="#D1D5DB" />
									) : (
										<ImageIconLucide size={30} color="#D1D5DB" />
									)}
								</View>
							)}
						</View>
					))}
				</View>

				<View className="h-24" />
			</ScrollView>
		</View>
	);
}
