import { Heart, MessageCircle, UserPlus, AtSign, Share2 } from "lucide-react-native";
import React, { useState } from "react";
import { Image, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";


type NotificationType = "like" | "comment" | "follow" | "mention" | "share";

interface Notification {
	id: number;
	type: NotificationType;
	username: string;
	avatar: string;
	message: string;
	timestamp: string;
	isRead: boolean;
	thumbnail?: string;
}

const notifications: Notification[] = [
	{
		id: 1,
		type: "like",
		username: "Sarah Johnson",
		avatar: "https://i.pravatar.cc/150?img=1",
		message: "liked your post",
		timestamp: "5m",
		isRead: false,
		thumbnail: "https://picsum.photos/100/100?random=1",
	},
	{
		id: 2,
		type: "comment",
		username: "Mike Chen",
		avatar: "https://i.pravatar.cc/150?img=3",
		message: "commented: 'Amazing shot! Where was this taken?'",
		timestamp: "30m",
		isRead: false,
		thumbnail: "https://picsum.photos/100/100?random=2",
	},
	{
		id: 3,
		type: "follow",
		username: "Emma Wilson",
		avatar: "https://i.pravatar.cc/150?img=5",
		message: "started following you",
		timestamp: "2h",
		isRead: true,
	},
	{
		id: 4,
		type: "like",
		username: "Alex Rivera",
		avatar: "https://i.pravatar.cc/150?img=8",
		message: "and 15 others liked your photo",
		timestamp: "5h",
		isRead: true,
		thumbnail: "https://picsum.photos/100/100?random=4",
	},
	{
		id: 5,
		type: "mention",
		username: "Jessica Lee",
		avatar: "https://i.pravatar.cc/150?img=9",
		message: "mentioned you in a comment",
		timestamp: "8h",
		isRead: false,
		thumbnail: "https://picsum.photos/100/100?random=5",
	},
	{
		id: 6,
		type: "comment",
		username: "David Kim",
		avatar: "https://i.pravatar.cc/150?img=12",
		message: "replied to your comment",
		timestamp: "12h",
		isRead: true,
		thumbnail: "https://picsum.photos/100/100?random=6",
	},
	{
		id: 7,
		type: "share",
		username: "Anna Smith",
		avatar: "https://i.pravatar.cc/150?img=16",
		message: "shared your post to their story",
		timestamp: "1d",
		isRead: true,
	},
	{
		id: 8,
		type: "follow",
		username: "John Doe",
		avatar: "https://i.pravatar.cc/150?img=11",
		message: "started following you",
		timestamp: "2d",
		isRead: true,
	},
	{
		id: 9,
		type: "like",
		username: "Lisa Wang",
		avatar: "https://i.pravatar.cc/150?img=23",
		message: "liked your comment",
		timestamp: "3d",
		isRead: true,
	},
	{
		id: 10,
		type: "mention",
		username: "Tom Brown",
		avatar: "https://i.pravatar.cc/150?img=33",
		message: "tagged you in a post",
		timestamp: "5d",
		isRead: true,
	},
];

function getNotificationIcon(type: NotificationType) {
	switch (type) {
		case "like":
			return { icon: Heart, color: "#EF4444", bgColor: "#FEE2E2" };
		case "comment":
			return { icon: MessageCircle, color: "#3B82F6", bgColor: "#DBEAFE" };
		case "follow":
			return { icon: UserPlus, color: "#8B5CF6", bgColor: "#EDE9FE" };
		case "mention":
			return { icon: AtSign, color: "#10B981", bgColor: "#D1FAE5" };
		case "share":
			return { icon: Share2, color: "#F59E0B", bgColor: "#FEF3C7" };
		default:
			return { icon: Heart, color: "#6B7280", bgColor: "#F3F4F6" };
	}
}

function NotificationItem({ notification }: { notification: Notification }) {
	const { icon: Icon, color, bgColor } = getNotificationIcon(notification.type);

	return (
		<View
			className={`flex-row items-center px-4 py-3 border-b border-[#F2F2F2] ${
				!notification.isRead ? "bg-white" : "bg-white"
			}`}
		>
			<View className="relative">
				<Image source={{ uri: notification.avatar }} className="w-12 h-12 rounded-full" />
				<View
					className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full items-center justify-center border-2 border-white"
					style={{ backgroundColor: bgColor }}
				>
					<Icon size={10} color={color} />
				</View>
			</View>

			<View className="flex-1 ml-3 mr-2">
				<View className="flex-row flex-wrap">
					<Text className="text-[15px] font-semibold text-[#1A1A1A]">{notification.username}</Text>
					<Text className="text-[14px] text-[#666666] flex-1"> {notification.message}</Text>
				</View>
				<Text className="text-xs text-[#9CA3AF] mt-0.5">{notification.timestamp}</Text>
			</View>

			{!notification.isRead && <View className="w-2.5 h-2.5 rounded-full bg-[#007AFF] mr-2" />}

			{notification.type === "follow" ? (
				<TouchableOpacity className="bg-[#007AFF] px-4 py-1.5 rounded-full">
					<Text className="text-white text-[13px] font-semibold">Follow</Text>
				</TouchableOpacity>
			) : notification.thumbnail ? (
				<Image
					source={{ uri: notification.thumbnail }}
					className="w-12 h-12 rounded-lg ml-2"
				/>
			) : null}
		</View>
	);
}

export default function NotificationsScreen() {
	const [activeTab, setActiveTab] = useState<"all" | "unread">("all");

	const filteredNotifications =
		activeTab === "unread" ? notifications.filter((n) => !n.isRead) : notifications;

	return (
		<View className="flex-1 bg-white">
			<View className="pt-10 px-6 pb-4 flex-row items-center justify-between border-b border-[#F2F2F2]">
				<Text className="text-2xl font-bold text-[#1A1A1A]">Notifications</Text>
				<Pressable className="active:opacity-60">
					<Text className="text-[#007AFF] text-sm font-semibold">Read All</Text>
				</Pressable>
			</View>

			<View className="px-6 py-4 flex-row gap-3 border-b border-[#F2F2F2]">
				<Pressable
					onPress={() => setActiveTab("all")}
					className={`px-4 py-2 rounded-full active:scale-95 transition-transform ${
						activeTab === "all" ? "bg-[#1A1A1A]" : "bg-gray-100"
					}`}
				>
					<Text
						className={`text-sm font-medium ${
							activeTab === "all" ? "text-white" : "text-[#666666]"
						}`}
					>
						All
					</Text>
				</Pressable>
				<Pressable
					onPress={() => setActiveTab("unread")}
					className={`px-4 py-2 rounded-full active:scale-95 transition-transform ${
						activeTab === "unread" ? "bg-[#1A1A1A]" : "bg-gray-100"
					}`}
				>
					<Text
						className={`text-sm font-medium ${
							activeTab === "unread" ? "text-white" : "text-[#666666]"
						}`}
					>
						Unread
					</Text>
				</Pressable>
			</View>

			<ScrollView showsVerticalScrollIndicator={false}>
				{filteredNotifications.map((notification) => (
					<NotificationItem key={notification.id} notification={notification} />
				))}
				<View className="h-24" />
			</ScrollView>
		</View>
	);
}
