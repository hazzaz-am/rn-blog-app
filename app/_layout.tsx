import { useAppState } from "@/hooks/useAppState";
import { useOnlineManager } from "@/hooks/useOnlineManager";
import { queryClient } from "@/lib/query-client";
import { onAppStateChange } from "@/utils/onAppStateChange";
import { useReactQueryDevTools } from "@dev-plugins/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { SheetProvider } from "react-native-actions-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import "./global.css";
import Sheets from "./sheets";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	useOnlineManager();
	useAppState(onAppStateChange);
	useReactQueryDevTools(queryClient);

	useEffect(() => {
		SplashScreen.hideAsync();
	}, []);

	return (
		<QueryClientProvider client={queryClient}>
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
		</QueryClientProvider>
	);
}
