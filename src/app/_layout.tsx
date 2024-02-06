import { SafeAreaView } from "react-native"
import { Slot } from "expo-router";
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from "@expo-google-fonts/inter"
import { Loading } from "@/components/loading"

export default function Layout() {
    const [fonstLoaded] = useFonts({
        Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold
    })
    if (!fonstLoaded) {
        return <Loading />
    }
    return (
        <SafeAreaView className="flex-1 bg-slate-900">
            <Slot />
        </SafeAreaView>
    )
}