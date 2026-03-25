import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Button from "../components/Button";
import Input from "../components/Input";

export default function SignIn() {
	const router = useRouter();
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>Welcome Back</Text>
				<Text style={styles.subtitle}>Sign in to continue</Text>
			</View>

			<View style={styles.form}>
				<Input
					label="Email"
					placeholder="Enter your email"
					value=""
					onChangeText={() => {}}
					keyboardType="email-address"
				/>

				<Input label="Password" placeholder="Enter your password" value="" onChangeText={() => {}} secureTextEntry />

				<TouchableOpacity style={styles.forgotPassword}>
					<Text style={styles.forgotPasswordText}>Forgot Password?</Text>
				</TouchableOpacity>

				<Button title="Sign In" onPress={() => {}} />

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
				<Text style={styles.footerText}>Don&apos;t have an account? </Text>
				<Text style={styles.signUpLink} onPress={() => router.push("/(auth)/sign-up")}>
					Sign Up
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF",
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
	forgotPassword: {
		alignSelf: "flex-end",
		marginBottom: 24,
	},
	forgotPasswordText: {
		fontSize: 14,
		color: "#4F46E5",
		fontWeight: "500",
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
		marginTop: 20,
	},
	footerText: {
		fontSize: 14,
		color: "#6B7280",
	},
	signUpLink: {
		fontSize: 14,
		color: "#4F46E5",
		fontWeight: "600",
	},
});
