import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import {
	Alert,
	Image,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

const MAX_IMAGES = 4;
const MAX_TEXT_LENGTH = 500;

interface SelectedImage {
	id: string;
	uri: string;
}

export default function CreatePostScreen() {
	const [text, setText] = useState("");
	const [images, setImages] = useState<SelectedImage[]>([]);
	const [isPosting, setIsPosting] = useState(false);

	const canPost = text.trim().length > 0 || images.length > 0;
	const remainingChars = MAX_TEXT_LENGTH - text.length;

	const handleAddImage = () => {
		Alert.alert(
			"Add Photo",
			"Choose an option",
			[
				{
					text: "Take Photo",
					onPress: () => {
						const newImage: SelectedImage = {
							id: Date.now().toString(),
							uri: `https://picsum.photos/400/400?random=${Date.now()}`,
						};
						if (images.length < MAX_IMAGES) {
							setImages([...images, newImage]);
						}
					},
				},
				{
					text: "Choose from Gallery",
					onPress: () => {
						const newImage: SelectedImage = {
							id: Date.now().toString(),
							uri: `https://picsum.photos/400/400?random=${Date.now()}`,
						};
						if (images.length < MAX_IMAGES) {
							setImages([...images, newImage]);
						}
					},
				},
				{ text: "Cancel", style: "cancel" },
			],
			{ cancelable: true },
		);
	};

	const handleRemoveImage = (id: string) => {
		setImages(images.filter((img) => img.id !== id));
	};

	const handlePost = () => {
		if (!canPost) {
			Alert.alert("Missing Content", "Please add some text or attach at least one image to your post.", [
				{ text: "OK" },
			]);
			return;
		}

		setIsPosting(true);

		setTimeout(() => {
			setIsPosting(false);
			setText("");
			setImages([]);
			Alert.alert("Success", "Your post has been published!", [{ text: "OK" }]);
		}, 1000);
	};

	return (
		<KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
			<View style={styles.header}>
				<TouchableOpacity style={styles.closeButton}>
					<Ionicons name="close" size={28} color="#111827" />
				</TouchableOpacity>
				<Text style={styles.headerTitle}>Create Post</Text>
				<TouchableOpacity
					style={[styles.postButton, canPost ? styles.postButtonActive : styles.postButtonInactive]}
					onPress={handlePost}
					disabled={!canPost || isPosting}
				>
					<Text style={[styles.postButtonText, canPost ? styles.postButtonTextActive : styles.postButtonTextInactive]}>
						{isPosting ? "Posting..." : "Post"}
					</Text>
				</TouchableOpacity>
			</View>

			<ScrollView
				style={styles.scrollView}
				contentContainerStyle={styles.scrollContent}
				keyboardShouldPersistTaps="handled"
			>
				<View style={styles.userRow}>
					<Image source={{ uri: "https://i.pravatar.cc/150?img=20" }} style={styles.userAvatar} />
					<View>
						<Text style={styles.userName}>Alex Johnson</Text>
						<View style={styles.privacyRow}>
							<Ionicons name="globe-outline" size={14} color="#6B7280" />
							<Text style={styles.privacyText}>Public</Text>
							<Ionicons name="chevron-down" size={12} color="#6B7280" />
						</View>
					</View>
				</View>

				<TextInput
					style={styles.textInput}
					placeholder="What's on your mind?"
					placeholderTextColor="#9CA3AF"
					multiline
					maxLength={MAX_TEXT_LENGTH}
					value={text}
					onChangeText={setText}
					textAlignVertical="top"
				/>

				{remainingChars <= 50 && remainingChars > 0 && (
					<Text style={styles.charCount}>{remainingChars} characters remaining</Text>
				)}

				{images.length > 0 && (
					<View style={styles.imagesContainer}>
						{images.map((image, index) => (
							<View key={image.id} style={[styles.imageWrapper, images.length === 1 && styles.singleImageWrapper]}>
								<Image source={{ uri: image.uri }} style={styles.selectedImage} />
								<TouchableOpacity style={styles.removeImageButton} onPress={() => handleRemoveImage(image.id)}>
									<Ionicons name="close-circle" size={24} color="#FFFFFF" />
								</TouchableOpacity>
								{index === 0 && images.length > 0 && (
									<View style={styles.coverLabel}>
										<Text style={styles.coverLabelText}>Cover</Text>
									</View>
								)}
							</View>
						))}
					</View>
				)}
			</ScrollView>
			<View style={styles.addToPostContainer}>
				<Text style={styles.addToPostText}>Add to your post</Text>
				<View style={styles.addOptions}>
					<TouchableOpacity
						style={[styles.addOptionButton, images.length >= MAX_IMAGES && styles.addOptionDisabled]}
						onPress={handleAddImage}
						disabled={images.length >= MAX_IMAGES}
					>
						<View style={styles.addOptionIcon}>
							<Ionicons name="images-outline" size={24} color="#3B82F6" />
						</View>
						<Text style={styles.addOptionLabel}>Photo</Text>
						<Text style={styles.imageCount}>
							{images.length}/{MAX_IMAGES}
						</Text>
					</TouchableOpacity>

					<TouchableOpacity style={styles.addOptionButton}>
						<View style={styles.addOptionIcon}>
							<Ionicons name="videocam-outline" size={24} color="#10B981" />
						</View>
						<Text style={styles.addOptionLabel}>Video</Text>
					</TouchableOpacity>

					<TouchableOpacity style={styles.addOptionButton}>
						<View style={styles.addOptionIcon}>
							<Ionicons name="location-outline" size={24} color="#EF4444" />
						</View>
						<Text style={styles.addOptionLabel}>Location</Text>
					</TouchableOpacity>

					<TouchableOpacity style={styles.addOptionButton}>
						<View style={styles.addOptionIcon}>
							<Ionicons name="happy-outline" size={24} color="#F59E0B" />
						</View>
						<Text style={styles.addOptionLabel}>Feeling</Text>
					</TouchableOpacity>
				</View>
			</View>
			{!canPost && (
				<View style={styles.warningBanner}>
					<Ionicons name="information-circle-outline" size={18} color="#6B7280" />
					<Text style={styles.warningText}>Add text or images to create a post</Text>
				</View>
			)}
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingTop: 16,
		paddingBottom: 12,
		borderBottomWidth: 1,
		borderBottomColor: "#E5E7EB",
	},
	closeButton: {
		padding: 4,
	},
	headerTitle: {
		fontSize: 18,
		fontWeight: "600",
		color: "#111827",
	},
	postButton: {
		paddingHorizontal: 20,
		paddingVertical: 8,
		borderRadius: 20,
	},
	postButtonActive: {
		backgroundColor: "#3B82F6",
	},
	postButtonInactive: {
		backgroundColor: "#E5E7EB",
	},
	postButtonText: {
		fontSize: 15,
		fontWeight: "600",
	},
	postButtonTextActive: {
		color: "#FFFFFF",
	},
	postButtonTextInactive: {
		color: "#9CA3AF",
	},
	scrollView: {
		flex: 1,
	},
	scrollContent: {
		paddingBottom: 100,
	},
	userRow: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingVertical: 12,
	},
	userAvatar: {
		width: 44,
		height: 44,
		borderRadius: 22,
		marginRight: 12,
	},
	userName: {
		fontSize: 16,
		fontWeight: "600",
		color: "#111827",
	},
	privacyRow: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 2,
	},
	privacyText: {
		fontSize: 13,
		color: "#6B7280",
		marginLeft: 4,
		marginRight: 4,
	},
	textInput: {
		fontSize: 17,
		color: "#111827",
		paddingHorizontal: 16,
		minHeight: 120,
		lineHeight: 24,
	},
	charCount: {
		fontSize: 12,
		color: "#9CA3AF",
		textAlign: "right",
		paddingRight: 16,
		marginTop: -8,
		marginBottom: 8,
	},
	imagesContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		paddingHorizontal: 16,
		paddingTop: 8,
	},
	imageWrapper: {
		width: "48%",
		aspectRatio: 1,
		marginRight: "2%",
		marginBottom: 8,
		borderRadius: 12,
		overflow: "hidden",
	},
	singleImageWrapper: {
		width: "100%",
		aspectRatio: 4 / 3,
		marginRight: 0,
	},
	selectedImage: {
		width: "100%",
		height: "100%",
	},
	removeImageButton: {
		position: "absolute",
		top: 8,
		right: 8,
		backgroundColor: "rgba(0,0,0,0.5)",
		borderRadius: 12,
	},
	coverLabel: {
		position: "absolute",
		bottom: 8,
		left: 8,
		backgroundColor: "rgba(0,0,0,0.6)",
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 4,
	},
	coverLabelText: {
		color: "#FFFFFF",
		fontSize: 11,
		fontWeight: "500",
	},
	addToPostContainer: {
		marginHorizontal: 14,
		marginVertical: 16,
		padding: 12,
		backgroundColor: "#F9FAFB",
		borderRadius: 12,
		borderWidth: 1,
		borderColor: "#E5E7EB",
	},
	addToPostText: {
		fontSize: 15,
		fontWeight: "600",
		color: "#111827",
		marginBottom: 12,
	},
	addOptions: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	addOptionButton: {
		alignItems: "center",
		padding: 8,
	},
	addOptionDisabled: {
		opacity: 0.5,
	},
	addOptionIcon: {
		width: 44,
		height: 44,
		borderRadius: 22,
		backgroundColor: "#EFF6FF",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 4,
	},
	addOptionLabel: {
		fontSize: 11,
		color: "#6B7280",
		fontWeight: "500",
	},
	imageCount: {
		fontSize: 10,
		color: "#9CA3AF",
		marginTop: 2,
	},
	warningBanner: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#F9FAFB",
		paddingVertical: 12,
		paddingHorizontal: 16,
		borderTopWidth: 1,
		borderTopColor: "#E5E7EB",
	},
	warningText: {
		fontSize: 13,
		color: "#6B7280",
		marginLeft: 6,
	},
});
