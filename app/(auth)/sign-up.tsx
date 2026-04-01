import { authClient } from "@/lib/auth-client";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Button from "../components/Button";
import Input from "../components/Input";

export default function SignUp() {
	const router = useRouter();
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSignUp = async () => {
		if (password !== confirmPassword) {
			alert("Passwords do not match");
			return;
		}
		setLoading(true);

		try {
			await authClient.signUp.email({ email, password, name: fullName });
			alert("Account created! Please check your email to verify your account.");
			router.push("/(auth)/sign-in");
		} catch (err: any) {
			console.error(err);
			alert(err?.message || "Failed to sign up. Try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<ScrollView style={styles.container} contentContainerStyle={styles.content}>
			<View style={styles.header}>
				<Text style={styles.title}>Create Account</Text>
				<Text style={styles.subtitle}>Sign up to get started</Text>
			</View>

			<View style={styles.form}>
				<Input label="Full Name" placeholder="Enter your full name" value={fullName} onChangeText={setFullName} />

				<Input
					label="Email"
					placeholder="Enter your email"
					value={email}
					onChangeText={setEmail}
					keyboardType="email-address"
          autoCapitalize="none"
				/>

				<Input
					label="Password"
					placeholder="Create a password"
					value={password}
					onChangeText={setPassword}
					secureTextEntry
				/>

				<Input
					label="Confirm Password"
					placeholder="Confirm your password"
					value={confirmPassword}
					onChangeText={setConfirmPassword}
					secureTextEntry
				/>

				<Button title={loading ? "Signing Up..." : "Sign Up"} disabled={loading} onPress={handleSignUp} />

				<View style={styles.divider}>
					<View style={styles.dividerLine} />
					<Text style={styles.dividerText}>or</Text>
					<View style={styles.dividerLine} />
				</View>

				<TouchableOpacity style={styles.googleButton}>
					<Image source={{ uri: "https://www.google.com/favicon.ico" }} style={styles.googleIcon} />
					<Text style={styles.googleButtonText}>Continue with Google</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.footer}>
				<Text style={styles.footerText}>Already have an account? </Text>
				<Text onPress={() => router.push("/(auth)/sign-in")} style={styles.signInLink}>
					Sign In
				</Text>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	content: {
		paddingHorizontal: 24,
		paddingTop: 60,
		paddingBottom: 40,
	},
	header: {
		marginBottom: 40,
	},
	title: {
		fontSize: 32,
		fontWeight: "700",
		color: "#111827",
		marginBottom: 8,
	},
	subtitle: {
		fontSize: 16,
		color: "#6B7280",
	},
	form: {
		flex: 1,
	},
	divider: {
		flexDirection: "row",
		alignItems: "center",
		marginVertical: 24,
	},
	dividerLine: {
		flex: 1,
		height: 1,
		backgroundColor: "#E5E7EB",
	},
	dividerText: {
		fontSize: 14,
		color: "#9CA3AF",
		marginHorizontal: 16,
	},
	googleButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#FFFFFF",
		borderWidth: 1,
		borderColor: "#D1D5DB",
		borderRadius: 12,
		paddingVertical: 14,
		paddingHorizontal: 24,
	},
	googleIcon: {
		width: 20,
		height: 20,
		marginRight: 10,
	},
	googleButtonText: {
		fontSize: 16,
		fontWeight: "500",
		color: "#374151",
	},
	footer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 24,
	},
	footerText: {
		fontSize: 14,
		color: "#6B7280",
	},
	signInLink: {
		fontSize: 14,
		color: "#4F46E5",
		fontWeight: "600",
	},
});
