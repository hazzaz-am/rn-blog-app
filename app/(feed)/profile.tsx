import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Post {
	id: number;
	image?: string;
	caption?: string;
	likes: number;
	comments: number;
}

const userProfile = {
	name: "Alex Johnson",
	username: "@alexjohnson",
	email: "alex@example.com",
	about: "📸 Photography enthusiast | ✨ Dreamer | 🌍 Traveler\nLiving life one adventure at a time",
	profilePicture: "https://i.pravatar.cc/150?img=20",
	coverImage: "https://picsum.photos/800/300?random=100",
	posts: 156,
	followers: 2840,
	following: 892,
};

const userPosts: Post[] = [
	{
		id: 1,
		image: "https://picsum.photos/400/400?random=1",
		caption: "Morning vibes",
		likes: 234,
		comments: 18,
	},
	{
		id: 2,
		image: "https://picsum.photos/400/400?random=2",
		caption: "Sunset at the beach",
		likes: 456,
		comments: 32,
	},
	{
		id: 3,
		image: "https://picsum.photos/400/400?random=3",
		caption: "City lights",
		likes: 189,
		comments: 12,
	},
	{
		id: 4,
		image: "https://picsum.photos/400/400?random=4",
		caption: "Mountain hiking",
		likes: 567,
		comments: 45,
	},
	{
		id: 5,
		image: "https://picsum.photos/400/400?random=5",
		caption: "Coffee time",
		likes: 123,
		comments: 8,
	},
	{
		id: 6,
		image: "https://picsum.photos/400/400?random=6",
		caption: "Weekend getaway",
		likes: 345,
		comments: 21,
	},
	{
		id: 7,
		image: "https://picsum.photos/400/400?random=7",
		caption: "New discovery",
		likes: 278,
		comments: 15,
	},
	{
		id: 8,
		image: "https://picsum.photos/400/400?random=8",
		caption: "Nature walk",
		likes: 412,
		comments: 28,
	},
	{
		id: 9,
		image: "https://picsum.photos/400/400?random=9",
		caption: "Adventure time",
		likes: 156,
		comments: 9,
	},
];

function ProfileHeader() {
	return (
		<View style={styles.headerContainer}>
			<Image source={{ uri: userProfile.coverImage }} style={styles.coverImage} />
			<View style={styles.profileInfoContainer}>
				<View style={styles.avatarContainer}>
					<Image source={{ uri: userProfile.profilePicture }} style={styles.profilePicture} />
					<View style={styles.editAvatarButton}>
						<Ionicons name="camera" size={14} color="#FFFFFF" />
					</View>
				</View>

				<Text style={styles.name}>{userProfile.name}</Text>
				<Text style={styles.username}>{userProfile.username}</Text>
				<Text style={styles.email}>{userProfile.email}</Text>

				<View style={styles.aboutContainer}>
					<Text style={styles.about}>{userProfile.about}</Text>
				</View>

				<View style={styles.statsContainer}>
					<View style={styles.statItem}>
						<Text style={styles.statNumber}>{userProfile.posts}</Text>
						<Text style={styles.statLabel}>Posts</Text>
					</View>
					<View style={styles.statDivider} />
					<View style={styles.statItem}>
						<Text style={styles.statNumber}>{userProfile.followers.toLocaleString()}</Text>
						<Text style={styles.statLabel}>Followers</Text>
					</View>
					<View style={styles.statDivider} />
					<View style={styles.statItem}>
						<Text style={styles.statNumber}>{userProfile.following.toLocaleString()}</Text>
						<Text style={styles.statLabel}>Following</Text>
					</View>
				</View>

				<View style={styles.actionButtons}>
					<TouchableOpacity style={styles.editProfileButton}>
						<Ionicons name="create-outline" size={18} color="#111827" />
						<Text style={styles.editProfileText}>Edit Profile</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.shareButton}>
						<Ionicons name="share-social-outline" size={18} color="#111827" />
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}

function PostGridItem({ post, onPress }: { post: Post; onPress: () => void }) {
	const [isLiked, setIsLiked] = useState(false);

	return (
		<TouchableOpacity style={styles.gridItem} onPress={onPress}>
			<Image source={{ uri: post.image }} style={styles.gridImage} />
			<View style={styles.gridOverlay}>
				<View style={styles.gridStats}>
					<View style={styles.gridStatItem}>
						<Ionicons
							name={isLiked ? "heart" : "heart-outline"}
							size={14}
							color="#FFFFFF"
							onPress={() => setIsLiked(!isLiked)}
						/>
						<Text style={styles.gridStatText}>{post.likes}</Text>
					</View>
					<View style={styles.gridStatItem}>
						<Ionicons name="chatbubble-outline" size={14} color="#FFFFFF" />
						<Text style={styles.gridStatText}>{post.comments}</Text>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
}

export default function ProfileScreen() {
	const [selectedTab, setSelectedTab] = useState<"posts" | "media" | "likes">("posts");

	return (
		<View style={styles.container}>

			<ScrollView showsVerticalScrollIndicator={false}>
				<ProfileHeader />

				<View style={styles.tabsContainer}>
					<TouchableOpacity
						style={[styles.tab, selectedTab === "posts" && styles.activeTab]}
						onPress={() => setSelectedTab("posts")}
					>
						<Ionicons
							name="grid"
							size={22}
							color={selectedTab === "posts" ? "#111827" : "#9CA3AF"}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.tab, selectedTab === "media" && styles.activeTab]}
						onPress={() => setSelectedTab("media")}
					>
						<Ionicons
							name="images-outline"
							size={22}
							color={selectedTab === "media" ? "#111827" : "#9CA3AF"}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.tab, selectedTab === "likes" && styles.activeTab]}
						onPress={() => setSelectedTab("likes")}
					>
						<Ionicons
							name="heart-outline"
							size={22}
							color={selectedTab === "likes" ? "#111827" : "#9CA3AF"}
						/>
					</TouchableOpacity>
				</View>

				<View style={styles.postsGrid}>
					{userPosts.map((post) => (
						<PostGridItem
							key={post.id}
							post={post}
							onPress={() => console.log("Post pressed:", post.id)}
						/>
					))}
				</View>

				<View style={styles.bottomPadding} />
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	headerContainer: {
		backgroundColor: "#FFFFFF",
	},
	coverImage: {
		width: "100%",
		height: 180,
		backgroundColor: "#F3F4F6",
	},
	profileInfoContainer: {
		paddingHorizontal: 16,
		marginTop: -50,
	},
	avatarContainer: {
		alignSelf: "center",
		position: "relative",
	},
	profilePicture: {
		width: 100,
		height: 100,
		borderRadius: 50,
		borderWidth: 4,
		borderColor: "#FFFFFF",
		backgroundColor: "#F3F4F6",
	},
	editAvatarButton: {
		position: "absolute",
		bottom: 0,
		right: 0,
		width: 32,
		height: 32,
		borderRadius: 16,
		backgroundColor: "#3B82F6",
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 2,
		borderColor: "#FFFFFF",
	},
	name: {
		fontSize: 22,
		fontWeight: "700",
		color: "#111827",
		textAlign: "center",
		marginTop: 12,
	},
	username: {
		fontSize: 15,
		color: "#6B7280",
		textAlign: "center",
		marginTop: 2,
	},
	email: {
		fontSize: 14,
		color: "#9CA3AF",
		textAlign: "center",
		marginTop: 4,
	},
	aboutContainer: {
		marginTop: 16,
		paddingHorizontal: 8,
	},
	about: {
		fontSize: 14,
		color: "#4B5563",
		textAlign: "center",
		lineHeight: 20,
	},
	statsContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 20,
		paddingVertical: 16,
	},
	statItem: {
		alignItems: "center",
		paddingHorizontal: 24,
	},
	statNumber: {
		fontSize: 20,
		fontWeight: "700",
		color: "#111827",
	},
	statLabel: {
		fontSize: 13,
		color: "#6B7280",
		marginTop: 2,
	},
	statDivider: {
		width: 1,
		height: 30,
		backgroundColor: "#E5E7EB",
	},
	actionButtons: {
		flexDirection: "row",
		justifyContent: "center",
		paddingHorizontal: 16,
		paddingBottom: 20,
	},
	editProfileButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
		backgroundColor: "#F3F4F6",
		paddingVertical: 10,
		borderRadius: 8,
		marginRight: 8,
	},
	editProfileText: {
		fontSize: 15,
		fontWeight: "600",
		color: "#111827",
		marginLeft: 6,
	},
	shareButton: {
		width: 44,
		height: 44,
		backgroundColor: "#F3F4F6",
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
	},
	tabsContainer: {
		flexDirection: "row",
		borderBottomWidth: 1,
		borderBottomColor: "#E5E7EB",
	},
	tab: {
		flex: 1,
		alignItems: "center",
		paddingVertical: 14,
		borderBottomWidth: 2,
		borderBottomColor: "transparent",
	},
	activeTab: {
		borderBottomColor: "#111827",
	},
	postsGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		paddingHorizontal: 1,
		paddingTop: 2,
	},
	gridItem: {
		width: "33.33%",
		aspectRatio: 1,
		padding: 1,
	},
	gridImage: {
		width: "100%",
		height: "100%",
		backgroundColor: "#F3F4F6",
	},
	gridOverlay: {
		...StyleSheet.absoluteFillObject,
		justifyContent: "flex-end",
		padding: 6,
		opacity: 0,
		backgroundColor: "rgba(0,0,0,0.3)",
	},
	gridStats: {
		flexDirection: "row",
		justifyContent: "flex-start",
	},
	gridStatItem: {
		flexDirection: "row",
		alignItems: "center",
		marginRight: 12,
	},
	gridStatText: {
		color: "#FFFFFF",
		fontSize: 12,
		fontWeight: "600",
		marginLeft: 4,
	},
	bottomPadding: {
		height: 100,
	},
});
