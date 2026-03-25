import Ionicons from "@expo/vector-icons/Ionicons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HomeScreen from ".";
import NotificationsScreen from "./notifications";
import ProfileScreen from "./profile";

const Tab = createMaterialTopTabNavigator();

export default function FeedLayout() {
	return (
		<Tab.Navigator
			screenOptions={{
				tabBarShowLabel: false,
			}}
		>
			<Tab.Screen
				name="Home"
				component={HomeScreen}
				options={{
					tabBarIcon: ({ color }) => <Ionicons name="home" size={28} color={color} />,
				}}
			/>
			<Tab.Screen
				name="Notifications"
				component={NotificationsScreen}
				options={{
					tabBarIcon: ({ color }) => <Ionicons name="notifications" size={28} color={color} />,
				}}
			/>
			<Tab.Screen
				name="Profile"
				component={ProfileScreen}
				options={{
					tabBarIcon: ({ color }) => <Ionicons name="person" size={28} color={color} />,
				}}
			/>
		</Tab.Navigator>
	);
}
