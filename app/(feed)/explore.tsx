import { Search, Heart, MessageCircle } from "lucide-react-native";
import React from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";



interface Category {
	id: string;
	name: string;
	selected?: boolean;
}

const categories: Category[] = [
	{ id: "1", name: "Following", selected: true },
	{ id: "2", name: "For You", selected: false },
	{ id: "3", name: "Travel", selected: false },
	{ id: "4", name: "Food", selected: false },
	{ id: "5", name: "Fashion", selected: false },
	{ id: "6", name: "Tech", selected: false },
	{ id: "7", name: "Art", selected: false },
	{ id: "8", name: "Music", selected: false },
];

interface GridItem {
	id: number;
	image: string;
	likes: number;
	comments: number;
	height: number;
}

const gridItems: GridItem[] = [
	{ id: 1, image: "https://picsum.photos/400/500?random=1", likes: 234, comments: 18, height: 200 },
	{ id: 2, image: "https://picsum.photos/400/300?random=2", likes: 156, comments: 12, height: 180 },
	{ id: 3, image: "https://picsum.photos/400/400?random=3", likes: 89, comments: 5, height: 160 },
	{ id: 4, image: "https://picsum.photos/400/550?random=4", likes: 445, comments: 32, height: 220 },
	{ id: 5, image: "https://picsum.photos/400/350?random=5", likes: 178, comments: 14, height: 190 },
	{ id: 6, image: "https://picsum.photos/400/450?random=6", likes: 267, comments: 21, height: 210 },
	{ id: 7, image: "https://picsum.photos/400/380?random=7", likes: 312, comments: 28, height: 175 },
	{ id: 8, image: "https://picsum.photos/400/520?random=8", likes: 198, comments: 16, height: 205 },
	{ id: 9, image: "https://picsum.photos/400/420?random=9", likes: 134, comments: 9, height: 185 },
	{ id: 10, image: "https://picsum.photos/400/480?random=10", likes: 389, comments: 35, height: 195 },
	{ id: 11, image: "https://picsum.photos/400/360?random=11", likes: 223, comments: 17, height: 170 },
	{ id: 12, image: "https://picsum.photos/400/540?random=12", likes: 456, comments: 41, height: 215 },
];

export default function ExploreScreen() {
	return (
		<View className="flex-1 bg-white">
			<View className="pt-10 px-4 pb-2">
				<View className="h-[44px] bg-[#F5F5F7] rounded-2xl flex-row items-center px-4">
					<Search size={20} color="#9CA3AF" />
					<Text className="ml-3 text-[15px] text-[#9CA3AF]">Search inspiration...</Text>
				</View>
			</View>

			<View className="pb-2">
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{ paddingHorizontal: 16 }}
				>
					{categories.map((category) => (
						<Pressable
							key={category.id}
							className={`px-4 py-2 rounded-full mr-2 active:scale-95 transition-transform ${
								category.selected ? "bg-[#1A1A1A]" : "bg-gray-100"
							}`}
						>
							<Text
								className={`text-sm font-medium ${
									category.selected ? "text-white" : "text-[#666666]"
								}`}
							>
								{category.name}
							</Text>
						</Pressable>
					))}
				</ScrollView>
			</View>

			<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 1 }}>
				<View className="flex-row flex-wrap">
					{gridItems.map((item, index) => (
						<View
							key={item.id}
							className="w-1/2 p-0.5"
							style={{ height: item.height }}
						>
							<Pressable className="flex-1 relative">
								<Image
									source={{ uri: item.image }}
									className="w-full h-full rounded-lg bg-[#F3F4F6]"
								/>
								<View className="absolute bottom-0 left-0 right-0 p-2 flex-row items-center justify-between bg-gradient-to-t from-black/60 to-transparent rounded-b-lg">
									<View className="flex-row items-center">
										<Heart size={14} color="white" fill="white" />
										<Text className="text-white text-xs font-medium ml-1">{item.likes}</Text>
									</View>
									<View className="flex-row items-center">
										<MessageCircle size={14} color="white" />
										<Text className="text-white text-xs font-medium ml-1">{item.comments}</Text>
									</View>
								</View>
							</Pressable>
						</View>
					))}
				</View>
			</ScrollView>
		</View>
	);
}
