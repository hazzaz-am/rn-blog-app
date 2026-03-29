import Ionicons from "@expo/vector-icons/Ionicons";
import { MessageCircle, Share2, ThumbsUp } from "lucide-react-native";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTabNavigation } from "./_layout";

type PostType = "text" | "image" | "video" | "video-only";

interface Post {
	id: number;
	username: string;
	avatar: string;
	location: string;
	timestamp: string;
	postType: PostType;
	image?: string;
	video?: string;
	caption?: string;
	likes: number;
	comments: number;
}

const posts: Post[] = [
	{
		id: 1,
		username: "Sarah Johnson",
		avatar: "https://i.pravatar.cc/150?img=1",
		location: "San Francisco, CA",
		timestamp: "4 hours ago",
		postType: "image",
		image: "https://picsum.photos/400/300?random=1",
		caption: "Beautiful sunset at the beach today! 🌅",
		likes: 124,
		comments: 18,
	},
	{
		id: 2,
		username: "Mike Chen",
		avatar: "https://i.pravatar.cc/150?img=3",
		location: "New York, NY",
		timestamp: "3 days ago",
		postType: "text",
		caption:
			"Just reflecting on life and trying to find my purpose. Sometimes you need to step back and appreciate how far you've come. 🚀",
		likes: 89,
		comments: 12,
	},
	{
		id: 3,
		username: "Emma Wilson",
		avatar: "https://i.pravatar.cc/150?img=5",
		location: "London, UK",
		timestamp: "26 March, 2026",
		postType: "video",
		video: "sample-video",
		caption: "Morning coffee at my favorite spot ☕",
		likes: 256,
		comments: 34,
	},
	{
		id: 4,
		username: "Alex Rivera",
		avatar: "https://i.pravatar.cc/150?img=8",
		location: "Tokyo, Japan",
		timestamp: "1 week ago",
		postType: "video-only",
		video: "sample-video",
		likes: 412,
		comments: 56,
	},
	{
		id: 5,
		username: "Jessica Lee",
		avatar: "https://i.pravatar.cc/150?img=9",
		location: "Sydney, Australia",
		timestamp: "2 weeks ago",
		postType: "image",
		image: "https://picsum.photos/400/300?random=5",
		caption: "Perfect day for surfing! 🏄‍♂️",
		likes: 178,
		comments: 22,
	},
	{
		id: 6,
		username: "David Kim",
		avatar: "https://i.pravatar.cc/150?img=12",
		location: "Seoul, South Korea",
		timestamp: "5 hours ago",
		postType: "text",
		caption: "Good Vibes Only ✨",
		likes: 67,
		comments: 8,
	},
];

function formatTimestamp(timestamp: string): string {
	return timestamp;
}

function renderPostContent(post: Post) {
	if (post.postType === "text") {
		return (
			<View style={styles.textContent}>
				<Text style={styles.textPost}>{post.caption}</Text>
			</View>
		);
	}

	if (post.postType === "video") {
		return (
			<View style={styles.mediaContainer}>
				<View style={styles.videoContainer}>
					<Text style={styles.videoIcon}>▶️</Text>
					<Text style={styles.videoLabel}>Video</Text>
				</View>
			</View>
		);
	}

	if (post.postType === "video-only") {
		return (
			<View style={styles.mediaContainer}>
				<View style={styles.videoContainer}>
					<Text style={styles.videoIcon}>▶️</Text>
					<Text style={styles.videoLabel}>Video</Text>
				</View>
			</View>
		);
	}

	return (
		<View style={styles.mediaContainer}>
			{post.image && <Image source={{ uri: post.image }} style={styles.postImage} />}
		</View>
	);
}

export default function Feed() {
	const navigateToTab = useTabNavigation();
	return (
		<View style={styles.container}>
			<ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
				<View style={styles.createPostContainer}>
					<View style={styles.createPostRow}>
						<Image source={{ uri: "https://i.pravatar.cc/150?img=20" }} style={styles.myAvatar} />
						<TouchableOpacity style={styles.createPostInput} onPress={() => navigateToTab("Create Post")}>
							<Text style={styles.createPostText}>What&apos;s on your mind?</Text>
						</TouchableOpacity>
					</View>
				</View>
				{posts.map((post) => (
					<View key={post.id} style={styles.postCard}>
						<View style={styles.postHeader}>
							<Image source={{ uri: post.avatar }} style={styles.avatar} />
							<View style={styles.postInfo}>
								<Text style={styles.username}>{post.username}</Text>
								<View style={styles.locationRow}>
									<Text style={styles.locationIcon}>
										<Ionicons name="location-outline" size={12} color={"#444"} />
									</Text>
									<Text style={styles.location}>{post.location}</Text>
								</View>
							</View>
							<Text style={styles.timestamp}>{formatTimestamp(post.timestamp)}</Text>
						</View>

						{renderPostContent(post)}

						<View style={styles.postFooter}>
							<View style={styles.actionsRow}>
								<TouchableOpacity style={styles.actionButton}>
									<Text style={styles.actionIcon}>
										<ThumbsUp color={"#444"} size={18} />
										{/* <Ionicons name="thumbs-up-sharp" size={28} color={"#444"} /> */}
									</Text>
									<Text style={styles.actionText}>{post.likes}</Text>
								</TouchableOpacity>
								<TouchableOpacity style={styles.actionButton}>
									<Text style={styles.actionIcon}>
										<MessageCircle color={"#444"} size={18} />
									</Text>
									<Text style={styles.actionText}>{post.comments}</Text>
								</TouchableOpacity>
								<TouchableOpacity style={styles.actionButton}>
									<Text style={styles.actionIcon}>
										<Share2 color={"#444"} size={18} />
									</Text>
									<Text style={styles.actionText}>2</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				))}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F3F4F6",
	},
	createPostContainer: {
		backgroundColor: "#FFFFFF",
		paddingHorizontal: 16,
		paddingTop: 16,
		paddingBottom: 12,
		borderBottomWidth: 1,
		borderBottomColor: "#E5E7EB",
	},
	createPostRow: {
		flexDirection: "row",
		alignItems: "center",
	},
	myAvatar: {
		width: 40,
		height: 40,
		borderRadius: 20,
		marginRight: 12,
	},
	createPostInput: {
		flex: 1,
		backgroundColor: "#F3F4F6",
		borderRadius: 20,
		paddingHorizontal: 16,
		paddingVertical: 10,
	},
	createPostText: {
		fontSize: 15,
		color: "#6B7280",
	},
	createPostActions: {
		flexDirection: "row",
		justifyContent: "space-around",
		borderTopColor: "#F3F4F6",
		paddingTop: 12,
	},
	createPostAction: {
		flexDirection: "row",
		alignItems: "center",
	},
	actionEmoji: {
		fontSize: 18,
		marginRight: 6,
	},
	actionLabel: {
		fontSize: 13,
		color: "#6B7280",
		fontWeight: "500",
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingTop: 60,
		paddingBottom: 16,
		borderBottomWidth: 1,
		borderBottomColor: "#E5E7EB",
		backgroundColor: "#FFFFFF",
	},
	headerTitle: {
		fontSize: 28,
		fontWeight: "700",
		color: "#111827",
	},
	headerIcon: {
		fontSize: 24,
	},
	scrollView: {
		flex: 1,
	},
	postCard: {
		marginBottom: 20,
		backgroundColor: "#FFFFFF",
	},
	postHeader: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingVertical: 12,
	},
	avatar: {
		width: 44,
		height: 44,
		borderRadius: 22,
		marginRight: 12,
	},
	postInfo: {
		flex: 1,
	},
	username: {
		fontSize: 15,
		fontWeight: "600",
		color: "#111827",
		marginBottom: 2,
	},
	locationRow: {
		flexDirection: "row",
		alignItems: "center",
	},
	locationIcon: {
		marginRight: 4,
		marginTop: 1.5,
	},
	location: {
		fontSize: 13,
		color: "#6B7280",
	},
	timestamp: {
		fontSize: 12,
		color: "#9CA3AF",
	},
	mediaContainer: {
		width: "100%",
	},
	postImage: {
		width: "100%",
		height: 350,
		backgroundColor: "#F3F4F6",
	},
	textContent: {
		paddingHorizontal: 16,
		paddingVertical: 12,
	},
	textPost: {
		fontSize: 16,
		color: "#111827",
		lineHeight: 24,
	},
	videoContainer: {
		width: "100%",
		height: 300,
		backgroundColor: "#1F2937",
		justifyContent: "center",
		alignItems: "center",
	},
	videoIcon: {
		fontSize: 48,
		marginBottom: 8,
	},
	videoLabel: {
		fontSize: 14,
		color: "#FFFFFF",
		fontWeight: "500",
	},
	postFooter: {
		paddingHorizontal: 16,
		paddingVertical: 12,
	},
	actionsRow: {
		flexDirection: "row",
		marginBottom: 10,
	},
	actionButton: {
		flexDirection: "row",
		alignItems: "center",
		marginRight: 20,
	},
	actionIcon: {
		fontSize: 20,
		marginRight: 6,
	},
	actionText: {
		fontSize: 14,
		color: "#374151",
		fontWeight: "500",
	},
	caption: {
		fontSize: 14,
		color: "#374151",
		lineHeight: 20,
	},
	captionUsername: {
		fontWeight: "600",
	},
});
