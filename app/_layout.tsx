import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { SheetProvider } from "react-native-actions-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import "./global.css";
import Sheets from "./sheets";

// Set the animation options. This is optional.
SplashScreen.setOptions({
	duration: 1000,
	fade: true,
});

SplashScreen.preventAutoHideAsync();

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
						{/* <Stack.Screen
							name="(feed)"
							options={{
								headerShown: false,
							}}
						/> */}
						<Stack.Screen
							name="(auth)"
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen
							name="create"
							options={{
								presentation: "modal",
								animation: "slide_from_bottom",
							}}
						/>
					</Stack>
					<StatusBar style="light" />
				</SafeAreaView>
			</GestureHandlerRootView>
		</SheetProvider>
	);
}
