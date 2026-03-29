import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type NotificationType = "like" | "comment" | "follow" | "mention" | "share";

interface Notification {
	id: number;
	type: NotificationType;
	username: string;
	avatar: string;
	message: string;
	timestamp: Date;
	isRead: boolean;
}

const notifications: Notification[] = [
	{
		id: 1,
		type: "like",
		username: "Sarah Johnson",
		avatar: "https://i.pravatar.cc/150?img=1",
		message: "liked your post",
		timestamp: new Date(Date.now() - 1000 * 60 * 5),
		isRead: false,
	},
	{
		id: 2,
		type: "comment",
		username: "Mike Chen",
		avatar: "https://i.pravatar.cc/150?img=3",
		message: "commented: 'Amazing shot! Where was this taken?'",
		timestamp: new Date(Date.now() - 1000 * 60 * 30),
		isRead: false,
	},
	{
		id: 3,
		type: "follow",
		username: "Emma Wilson",
		avatar: "https://i.pravatar.cc/150?img=5",
		message: "started following you",
		timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
		isRead: true,
	},
	{
		id: 4,
		type: "like",
		username: "Alex Rivera",
		avatar: "https://i.pravatar.cc/150?img=8",
		message: "and 15 others liked your photo",
		timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
		isRead: true,
	},
	{
		id: 5,
		type: "mention",
		username: "Jessica Lee",
		avatar: "https://i.pravatar.cc/150?img=9",
		message: "mentioned you in a comment",
		timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8),
		isRead: false,
	},
	{
		id: 6,
		type: "comment",
		username: "David Kim",
		avatar: "https://i.pravatar.cc/150?img=12",
		message: "replied to your comment",
		timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
		isRead: true,
	},
	{
		id: 7,
		type: "share",
		username: "Anna Smith",
		avatar: "https://i.pravatar.cc/150?img=16",
		message: "shared your post to their story",
		timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
		isRead: true,
	},
	{
		id: 8,
		type: "follow",
		username: "John Doe",
		avatar: "https://i.pravatar.cc/150?img=11",
		message: "started following you",
		timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
		isRead: true,
	},
	{
		id: 9,
		type: "like",
		username: "Lisa Wang",
		avatar: "https://i.pravatar.cc/150?img=23",
		message: "liked your comment",
		timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
		isRead: true,
	},
	{
		id: 10,
		type: "mention",
		username: "Tom Brown",
		avatar: "https://i.pravatar.cc/150?img=33",
		message: "tagged you in a post",
		timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
		isRead: true,
	},
	{
		id: 11,
		type: "comment",
		username: "Emily Davis",
		avatar: "https://i.pravatar.cc/150?img=44",
		message: "commented on your photo",
		timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
		isRead: true,
	},
];

function formatDate(timestamp: Date): string {
	const now = new Date();
	const diffMs = now.getTime() - timestamp.getTime();
	const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
	const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
	const diffMinutes = Math.floor(diffMs / (1000 * 60));

	if (diffMinutes < 60) {
		return diffMinutes <= 1 ? "Just now" : `${diffMinutes}m`;
	}

	if (diffHours < 24) {
		const hours = diffHours === 1 ? "1" : `${diffHours}`;
		return `${hours}h`;
	}

	if (diffDays === 0) {
		return "Today";
	}

	if (diffDays === 1) {
		return "Yesterday";
	}

	if (diffDays <= 7) {
		return `${diffDays} days ago`;
	}

	return timestamp.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: timestamp.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
	});
}

function getGroupedNotifications(notifs: Notification[]): { title: string; data: Notification[] }[] {
	const groups: { [key: string]: Notification[] } = {};

	notifs.forEach((notif) => {
		const dateLabel = formatDate(notif.timestamp);
		if (!groups[dateLabel]) {
			groups[dateLabel] = [];
		}
		groups[dateLabel].push(notif);
	});

	const order = ["Just now", "1m", "5m", "30m", "1h", "2h", "5h", "8h", "12h", "Today", "Yesterday"];
	const result: { title: string; data: Notification[] }[] = [];

	const orderedKeys = Object.keys(groups).sort((a, b) => {
		const aIndex = order.indexOf(a);
		const bIndex = order.indexOf(b);
		if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
		if (aIndex !== -1) return -1;
		if (bIndex !== -1) return 1;
		const aDays = parseInt(a) || 999;
		const bDays = parseInt(b) || 999;
		return aDays - bDays;
	});

	orderedKeys.forEach((key) => {
		result.push({ title: key, data: groups[key] });
	});

	return result;
}

function getNotificationIcon(type: NotificationType): { icon: string; color: string; bgColor: string } {
	switch (type) {
		case "like":
			return { icon: "heart", color: "#EF4444", bgColor: "#FEE2E2" };
		case "comment":
			return { icon: "chatbubble", color: "#3B82F6", bgColor: "#DBEAFE" };
		case "follow":
			return { icon: "person-add", color: "#8B5CF6", bgColor: "#EDE9FE" };
		case "mention":
			return { icon: "at", color: "#10B981", bgColor: "#D1FAE5" };
		case "share":
			return { icon: "arrow-redo", color: "#F59E0B", bgColor: "#FEF3C7" };
		default:
			return { icon: "bell", color: "#6B7280", bgColor: "#F3F4F6" };
	}
}

function NotificationItem({ notification }: { notification: Notification }) {
	const { icon, color, bgColor } = getNotificationIcon(notification.type);

	return (
		<View style={[styles.notificationItem, !notification.isRead && styles.unreadItem]}>
			<View style={styles.avatarContainer}>
				<Image source={{ uri: notification.avatar }} style={styles.avatar} />
				<View style={[styles.iconBadge, { backgroundColor: bgColor }]}>
					<Ionicons name={icon as any} size={12} color={color} />
				</View>
			</View>

			<View style={styles.notificationContent}>
				<View style={styles.textRow}>
					<Text style={styles.username}>{notification.username}</Text>
					<Text style={styles.message}> {notification.message}</Text>
				</View>
				<Text style={styles.timestamp}>{formatDate(notification.timestamp)}</Text>
			</View>

			{!notification.isRead && <View style={styles.unreadDot} />}

			{notification.type === "follow" && (
				<TouchableOpacity style={styles.followButton}>
					<Text style={styles.followButtonText}>Follow</Text>
				</TouchableOpacity>
			)}

			{(notification.type === "like" || notification.type === "comment" || notification.type === "mention") && (
				<Image
					source={{ uri: `https://picsum.photos/100/100?random=${notification.id}` }}
					style={styles.thumbnail}
				/>
			)}
		</View>
	);
}

export default function NotificationsScreen() {
	const groupedNotifications = getGroupedNotifications(notifications);
	const unreadCount = notifications.filter((n) => !n.isRead).length;

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Notifications</Text>
				<View style={styles.headerIcons}>
					<TouchableOpacity style={styles.headerIconButton}>
						<Ionicons name="settings-outline" size={24} color="#111827" />
					</TouchableOpacity>
				</View>
			</View>

			<View style={styles.tabs}>
				<TouchableOpacity style={[styles.tab, styles.activeTab]}>
					<Text style={[styles.tabText, styles.activeTabText]}>All</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.tab}>
					<Text style={styles.tabText}>Unread</Text>
					{unreadCount > 0 && <View style={styles.badge}><Text style={styles.badgeText}>{unreadCount}</Text></View>}
				</TouchableOpacity>
			</View>

			<ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
				{groupedNotifications.map((group, groupIndex) => (
					<View key={groupIndex}>
						<View style={styles.dateHeader}>
							<Text style={styles.dateHeaderText}>{group.title}</Text>
						</View>
						{group.data.map((notification) => (
							<NotificationItem key={notification.id} notification={notification} />
						))}
					</View>
				))}
				<View style={styles.bottomPadding} />
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F9FAFB",
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingTop: 16,
		paddingBottom: 12,
		backgroundColor: "#FFFFFF",
		borderBottomWidth: 1,
		borderBottomColor: "#E5E7EB",
	},
	headerTitle: {
		fontSize: 28,
		fontWeight: "700",
		color: "#111827",
	},
	headerIcons: {
		flexDirection: "row",
	},
	headerIconButton: {
		padding: 4,
	},
	tabs: {
		flexDirection: "row",
		backgroundColor: "#FFFFFF",
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: "#E5E7EB",
	},
	tab: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 8,
		paddingHorizontal: 16,
		marginRight: 8,
		borderRadius: 20,
		backgroundColor: "#F3F4F6",
	},
	activeTab: {
		backgroundColor: "#111827",
	},
	tabText: {
		fontSize: 14,
		fontWeight: "600",
		color: "#6B7280",
	},
	activeTabText: {
		color: "#FFFFFF",
	},
	badge: {
		backgroundColor: "#EF4444",
		borderRadius: 10,
		minWidth: 20,
		height: 20,
		justifyContent: "center",
		alignItems: "center",
		marginLeft: 6,
		paddingHorizontal: 6,
	},
	badgeText: {
		color: "#FFFFFF",
		fontSize: 11,
		fontWeight: "700",
	},
	scrollView: {
		flex: 1,
	},
	dateHeader: {
		paddingHorizontal: 16,
		paddingTop: 20,
		paddingBottom: 8,
	},
	dateHeaderText: {
		fontSize: 14,
		fontWeight: "600",
		color: "#6B7280",
		textTransform: "uppercase",
		letterSpacing: 0.5,
	},
	notificationItem: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#FFFFFF",
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: "#F3F4F6",
	},
	unreadItem: {
		backgroundColor: "#FEFEFE",
	},
	avatarContainer: {
		position: "relative",
	},
	avatar: {
		width: 52,
		height: 52,
		borderRadius: 26,
	},
	iconBadge: {
		position: "absolute",
		bottom: 0,
		right: 0,
		width: 24,
		height: 24,
		borderRadius: 12,
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 2,
		borderColor: "#FFFFFF",
	},
	notificationContent: {
		flex: 1,
		marginLeft: 12,
		marginRight: 8,
	},
	textRow: {
		flexDirection: "row",
		flexWrap: "wrap",
		alignItems: "baseline",
	},
	username: {
		fontSize: 15,
		fontWeight: "600",
		color: "#111827",
	},
	message: {
		fontSize: 14,
		color: "#6B7280",
		flex: 1,
	},
	timestamp: {
		fontSize: 12,
		color: "#9CA3AF",
		marginTop: 2,
	},
	unreadDot: {
		width: 10,
		height: 10,
		borderRadius: 5,
		backgroundColor: "#3B82F6",
		marginRight: 8,
	},
	followButton: {
		backgroundColor: "#3B82F6",
		paddingHorizontal: 16,
		paddingVertical: 6,
		borderRadius: 16,
	},
	followButtonText: {
		color: "#FFFFFF",
		fontSize: 13,
		fontWeight: "600",
	},
	thumbnail: {
		width: 50,
		height: 50,
		borderRadius: 8,
		marginLeft: 8,
	},
	bottomPadding: {
		height: 100,
	},
});
