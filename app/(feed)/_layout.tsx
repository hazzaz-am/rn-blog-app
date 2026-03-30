import { Tabs } from "expo-router";
import { Bell, House, Search, User } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

const BRAND_ACCENT = "#007AFF";

function TabIcon({ icon, label, focused }: { icon: React.ReactNode; label: string; focused: boolean }) {
	return (
		<View style={styles.tabItem}>
			{icon}
			<Text style={[styles.tabLabel, focused && styles.tabLabelActive]}>{label}</Text>
		</View>
	);
}

export default function FeedLayout() {
	return (
		<Tabs
			screenOptions={{
				animation: "shift",
				headerShown: false,
				tabBarItemStyle: {
					paddingVertical: 20,
				},
				tabBarStyle: styles.tabBar,
				tabBarShowLabel: false,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					tabBarIcon: ({ focused }) => (
						<TabIcon
							icon={<House size={24} color={focused ? BRAND_ACCENT : "#9CA3AF"} />}
							label="Home"
							focused={focused}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="explore"
				options={{
					tabBarIcon: ({ focused }) => (
						<TabIcon
							icon={<Search size={24} color={focused ? BRAND_ACCENT : "#9CA3AF"} />}
							label="Explore"
							focused={focused}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="notifications"
				options={{
					tabBarIcon: ({ focused }) => (
						<TabIcon
							icon={<Bell size={24} color={focused ? BRAND_ACCENT : "#9CA3AF"} />}
							label="Alerts"
							focused={focused}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					tabBarIcon: ({ focused }) => (
						<TabIcon
							icon={<User size={24} color={focused ? BRAND_ACCENT : "#9CA3AF"} />}
							label="Profile"
							focused={focused}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="create"
				options={{
					href: null,
				}}
			/>
		</Tabs>
	);
}

const styles = StyleSheet.create({
	tabBar: {
		height: 84,
		backgroundColor: "#FFFFFF",
		borderTopWidth: 1,
		borderTopColor: "#F2F2F2",

		borderRadius: 50,
		overflow: "hidden",
		marginHorizontal: 20,
		marginBottom: 20,
		paddingBottom: 0,
		paddingTop: 0,
		position: "absolute",
	},
	tabItem: {
		alignItems: "center",
		justifyContent: "center",
	},
	tabLabel: {
		fontSize: 10,
		fontWeight: "700",
		color: "#9CA3AF",
		marginTop: 4,
	},
	tabLabelActive: {
		color: BRAND_ACCENT,
	},
});
