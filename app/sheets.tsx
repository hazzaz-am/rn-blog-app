import PostOptions from "@/components/ui/post-options";
import { SheetDefinition, SheetRegister } from "react-native-actions-sheet";

// We extend some of the types here to give us great intellisense
// across the app for all registered sheets.
declare module "react-native-actions-sheet" {
	interface Sheets {
		"post-options": SheetDefinition;
	}
}

export const Sheets = () => {
	return <SheetRegister sheets={{ "post-options": PostOptions }} />;
};
