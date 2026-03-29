import Ionicons from "@expo/vector-icons/Ionicons";
import { createMaterialTopTabNavigator, MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import { useNavigation } from "@react-navigation/native";
import HomeScreen from ".";
import CreatePostScreen from "./create-post";
import NotificationsScreen from "./notifications";
import ProfileScreen from "./profile";

const Tab = createMaterialTopTabNavigator();

type TabName = "Home" | "Notifications" | "Profile" | "Create Post";
type TabParamList = { [K in TabName]: undefined };

export function useTabNavigation() {
	const navigation = useNavigation<MaterialTopTabNavigationProp<TabParamList>>();

	return (tabName: TabName) => {
		navigation.jumpTo(tabName);
	};
}

export default function FeedLayout() {
	return (
		<Tab.Navigator
			screenOptions={{
				tabBarShowLabel: false,
				swipeEnabled: false,
				animationEnabled: false,
			}}
		>
			<Tab.Screen
				name="Home"
				component={HomeScreen}
				options={{
					tabBarIcon: ({ color, focused }) => <Ionicons name="home" size={28} color={focused ? "#3B82F6" : color} />,
				}}
			/>
			<Tab.Screen
				name="Notifications"
				component={NotificationsScreen}
				options={{
					tabBarIcon: ({ color, focused }) => (
						<Ionicons name="notifications" size={28} color={focused ? "#3B82F6" : color} />
					),
				}}
			/>
			<Tab.Screen
				name="Profile"
				component={ProfileScreen}
				options={{
					tabBarIcon: ({ color, focused }) => <Ionicons name="person" size={28} color={focused ? "#3B82F6" : color} />,
				}}
			/>
			<Tab.Screen
				name="Create Post"
				component={CreatePostScreen}
				options={{
					tabBarIcon: ({ color, focused }) => (
						<Ionicons name="add-circle-outline" size={28} color={focused ? "#3B82F6" : color} />
					),
				}}
			/>
		</Tab.Navigator>
	);
}
