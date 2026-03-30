import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SheetProvider } from "react-native-actions-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import "./global.css";
import { Sheets } from "./sheets";

export default function RootLayout() {
	return (
		<SheetProvider>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<SafeAreaView style={{ flex: 1 }}>
					<Sheets />
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
		</SheetProvider>
	);
}
