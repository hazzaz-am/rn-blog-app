import { useRouter } from "expo-router";
import { Heart, MessageCircle, MoreHorizontal, Share2 } from "lucide-react-native";
import React from "react";
import { Image, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SheetManager } from "react-native-actions-sheet";

const TEXT_PRIMARY = "#1A1A1A";

type PostType = "image" | "carousel" | "text";

interface Post {
	id: number;
	username: string;
	avatar: string;
	location: string;
	timestamp: string;
	postType: PostType;
	image?: string;
	images?: string[];
	caption: string;
	likes: number;
	comments: number;
}

const posts: Post[] = [
	{
		id: 1,
		username: "Elena Rossi",
		avatar: "https://i.pravatar.cc/150?img=1",
		location: "Milan, Italy",
		timestamp: "2h ago",
		postType: "image",
		image: "https://picsum.photos/400/400?random=1",
		caption:
			"Capturing the quiet moments in the city. The light today was absolutely perfect for some architectural shots. 🏛️",
		likes: 1200,
		comments: 84,
	},
	{
		id: 2,
		username: "Julian Vane",
		avatar: "https://i.pravatar.cc/150?img=3",
		location: "Stockholm, Sweden",
		timestamp: "5h ago",
		postType: "carousel",
		images: [
			"https://picsum.photos/400/500?random=2",
			"https://picsum.photos/400/500?random=3",
			"https://picsum.photos/400/500?random=4",
		],
		caption: "The Nordic winter workspace setup is finally complete. Minimal, functional, and warm.",
		likes: 432,
		comments: 12,
	},
	{
		id: 3,
		username: "Sarah Jenkins",
		avatar: "https://i.pravatar.cc/150?img=5",
		location: "London, UK",
		timestamp: "8h ago",
		postType: "text",
		caption:
			'"Good design is as little design as possible." - Dieter Rams. Today I\'m reflecting on how this applies not just to objects, but to our digital interactions and lives. 🌿',
		likes: 2500,
		comments: 156,
	},
];

function PostActions({ likes, comments }: { likes: number; comments: number }) {
	return (
		<View className="flex-row items-center gap-6 px-4 pt-4">
			<TouchableOpacity className="flex-row items-center gap-1.5 active:scale-90">
				<Heart size={24} color={TEXT_PRIMARY} />
				<Text className="text-sm font-medium text-[#1A1A1A]">{likes}</Text>
			</TouchableOpacity>
			<TouchableOpacity className="flex-row items-center gap-1.5 active:scale-90">
				<MessageCircle size={24} color={TEXT_PRIMARY} />
				<Text className="text-sm font-medium text-[#1A1A1A]">{comments}</Text>
			</TouchableOpacity>
			<TouchableOpacity className="flex-row items-center gap-1.5 active:scale-90">
				<Share2 size={24} color={TEXT_PRIMARY} />
				<Text className="text-sm font-medium text-[#1A1A1A]">Share</Text>
			</TouchableOpacity>
		</View>
	);
}

function ImagePost({ post }: { post: Post }) {
	return (
		<View className="py-4 border-b border-[#F2F2F2]">
			<View className="flex-row items-center justify-between px-4 mb-3">
				<View className="flex-row items-center gap-3">
					<Image source={{ uri: post.avatar }} className="w-10 h-10 rounded-full border border-gray-100" />
					<View>
						<Text className="font-bold text-[15px] text-[#1A1A1A]">{post.username}</Text>
						<Text className="text-[12px] text-[#666666]">
							{post.location} • {post.timestamp}
						</Text>
					</View>
				</View>
				<Pressable onPress={() => SheetManager.show("post-options")}>
					<MoreHorizontal size={20} color="#9CA3AF" />
				</Pressable>
			</View>
			<View className="px-4 mb-3">
				<Text className="text-[15px] text-[#1A1A1A] leading-relaxed">{post.caption}</Text>
			</View>
			{post.image && (
				<View className="w-full aspect-square">
					<Image source={{ uri: post.image }} className="w-full h-full" />
				</View>
			)}
			<PostActions likes={post.likes} comments={post.comments} />
		</View>
	);
}

function CarouselPost({ post }: { post: Post }) {
	return (
		<View className="py-4 border-b border-[#F2F2F2]">
			<View className="flex-row items-center justify-between px-4 mb-3">
				<View className="flex-row items-center gap-3">
					<Image source={{ uri: post.avatar }} className="w-10 h-10 rounded-full border border-gray-100" />
					<View>
						<Text className="font-bold text-[15px] text-[#1A1A1A]">{post.username}</Text>
						<Text className="text-[12px] text-[#666666]">
							{post.location} • {post.timestamp}
						</Text>
					</View>
				</View>
				<MoreHorizontal size={20} color="#9CA3AF" />
			</View>
			<View className="relative w-full aspect-[4/5]">
				<Image source={{ uri: post.images?.[0] }} className="w-full h-full" />
				<View className="absolute top-3 right-3 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full">
					<Text className="text-[10px] text-white font-bold">1 / {post.images?.length}</Text>
				</View>
				<View className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
					<View className="w-1.5 h-1.5 rounded-full bg-white" />
					<View className="w-1.5 h-1.5 rounded-full bg-white/40" />
					<View className="w-1.5 h-1.5 rounded-full bg-white/40" />
				</View>
			</View>
			<View className="px-4 mt-3 mb-3">
				<Text className="text-[15px] text-[#1A1A1A] leading-relaxed">{post.caption}</Text>
			</View>
			<View className="flex-row items-center gap-6 px-4 pt-2">
				<TouchableOpacity className="flex-row items-center gap-1.5 active:scale-90">
					<Heart size={24} color={TEXT_PRIMARY} />
					<Text className="text-sm font-medium text-[#1A1A1A]">{post.likes}</Text>
				</TouchableOpacity>
				<TouchableOpacity className="flex-row items-center gap-1.5 active:scale-90">
					<MessageCircle size={24} color={TEXT_PRIMARY} />
					<Text className="text-sm font-medium text-[#1A1A1A]">{post.comments}</Text>
				</TouchableOpacity>
				<TouchableOpacity className="flex-row items-center gap-1.5 active:scale-90">
					<Share2 size={24} color={TEXT_PRIMARY} />
					<Text className="text-sm font-medium text-[#1A1A1A]">Share</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

function TextPost({ post }: { post: Post }) {
	return (
		<View className="py-6 px-4 border-b border-[#F2F2F2]">
			<View className="flex-row items-center justify-between mb-4">
				<View className="flex-row items-center gap-3">
					<Image source={{ uri: post.avatar }} className="w-10 h-10 rounded-full border border-gray-100" />
					<View>
						<Text className="font-bold text-[15px] text-[#1A1A1A]">{post.username}</Text>
						<Text className="text-[12px] text-[#666666]">
							{post.location} • {post.timestamp}
						</Text>
					</View>
				</View>
				<Pressable onPress={() => SheetManager.show("post-options")}>
					<MoreHorizontal size={20} color="#9CA3AF" />
				</Pressable>
			</View>
			<Text className="text-lg font-medium text-[#1A1A1A] leading-snug">{post.caption}</Text>
			<View className="flex-row items-center gap-6 mt-6">
				<TouchableOpacity className="flex-row items-center gap-1.5 active:scale-90">
					<Heart size={24} color={TEXT_PRIMARY} />
					<Text className="text-sm font-medium text-[#1A1A1A]">{post.likes}</Text>
				</TouchableOpacity>
				<TouchableOpacity className="flex-row items-center gap-1.5 active:scale-90">
					<MessageCircle size={24} color={TEXT_PRIMARY} />
					<Text className="text-sm font-medium text-[#1A1A1A]">{post.comments}</Text>
				</TouchableOpacity>
				<TouchableOpacity className="flex-row items-center gap-1.5 active:scale-90">
					<Share2 size={24} color={TEXT_PRIMARY} />
					<Text className="text-sm font-medium text-[#1A1A1A]">Share</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

export default function Feed() {
	const router = useRouter();

	return (
		<View className="flex-1 bg-white">
			<View className="flex-row items-center justify-between px-4 pt-10 pb-4 bg-white border-b border-[#F2F2F2]">
				<View className="flex-row items-center gap-2">
					<View className="w-8 h-8 bg-[#007AFF] rounded-lg items-center justify-center">
						<Text className="text-white font-bold text-xl">S</Text>
					</View>
					<Text className="font-bold text-lg tracking-tight">Feed</Text>
				</View>
				<Pressable
					className="bg-[#007AFF] px-4 py-1.5 rounded-full active:scale-95"
					onPress={() => router.push("/create")}
				>
					<Text className="text-white text-sm font-semibold">New Post</Text>
				</Pressable>
			</View>

			<ScrollView showsVerticalScrollIndicator={false} className="flex-1">
				{posts.map((post) => {
					if (post.postType === "carousel") {
						return <CarouselPost key={post.id} post={post} />;
					}
					if (post.postType === "text") {
						return <TextPost key={post.id} post={post} />;
					}
					return <ImagePost key={post.id} post={post} />;
				})}
			</ScrollView>
		</View>
	);
}
