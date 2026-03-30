import { Bookmark, EyeOff, Flag, Heart, HeartOff, Link, Star, UserMinus } from "lucide-react-native";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import ActionSheet from "react-native-actions-sheet";

interface OptionItem {
	icon: React.ReactNode;
	label: string;
	color?: string;
	destructive?: boolean;
}

const options: OptionItem[] = [
	{
		icon: <Heart size={22} color="#1A1A1A" />,
		label: "Interested",
	},
	{
		icon: <HeartOff size={22} color="#1A1A1A" />,
		label: "Not Interested",
	},
	{
		icon: <Bookmark size={22} color="#1A1A1A" />,
		label: "Save Post",
	},
	{
		icon: <EyeOff size={22} color="#1A1A1A" />,
		label: "Hide Post",
	},
	{
		icon: <Flag size={22} color="#1A1A1A" />,
		label: "Report Post",
		destructive: true,
	},
	{
		icon: <Link size={22} color="#1A1A1A" />,
		label: "Copy Link",
	},
	{
		icon: <Star size={22} color="#1A1A1A" />,
		label: "Add to Favorites",
	},
	{
		icon: <UserMinus size={22} color="#1A1A1A" />,
		label: "Unfollow User",
	},
];

interface PostOptionsProps {
	sheetRef: React.RefObject<any>;
	onSelect?: (option: string) => void;
}

export default function PostOptions({ sheetRef, onSelect }: PostOptionsProps) {
	return (
		<ActionSheet
			ref={sheetRef}
			gestureEnabled={true}
			indicatorStyle={{
				width: 100,
				backgroundColor: "#E5E7EB",
				marginTop: 8,
			}}
			containerStyle={{
				backgroundColor: "white",
				borderTopLeftRadius: 20,
				borderTopRightRadius: 20,
			}}
		>
			<View className="px-4 pt-2">
				<View className="h-1 w-10 bg-gray-300 rounded-full mx-auto mb-4" />

				<ScrollView showsVerticalScrollIndicator={false}>
					{options.map((option, index) => (
						<Pressable
							key={option.label}
							className="flex-row items-center py-4 px-2 active:bg-gray-50"
							onPress={() => onSelect?.(option.label)}
						>
							{option.icon}
							<Text className={`ml-4 text-[16px] ${option.destructive ? "text-red-500" : "text-[#1A1A1A]"}`}>
								{option.label}
							</Text>
						</Pressable>
					))}
				</ScrollView>
			</View>
		</ActionSheet>
	);
}
