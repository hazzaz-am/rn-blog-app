import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "./global.css";

export default function RootLayout() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<SafeAreaView style={{ flex: 1 }}>
				<Stack
					screenOptions={{
						headerShown: false,
					}}
				>
					<Stack.Screen
						name="(feed)/create"
						options={{
							presentation: "modal",
							animation: "slide_from_bottom",
						}}
					/>
				</Stack>
				<StatusBar style="dark" />
			</SafeAreaView>
		</GestureHandlerRootView>
	);
}
