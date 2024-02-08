import { Image, Text, View, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons"
import { Link } from "expo-router"
import colors from "tailwindcss/colors";


type HeaderProps = {
    title: string
    cartQuantityItems?: number
}

export function Header({ title, cartQuantityItems = 0 }: HeaderProps) {
    return (
        <View className="flex-col items-center border-b border-slate-700 pb-5 mx-5">
            <View className="w-full"><Image source={require("@/assets/logo.png")} className="h-6 w-32" /></View>
            <View className="flex-row items-center justify-between">
                <View className="flex-1 items-start pt-4">
                    <Text className="text-white text-xl font-heading pb-0">{title}</Text>
                </View>
                <View className="flex-row items-end gap-2">
                    <Link href={`/`} asChild>
                        <TouchableOpacity className="relative" activeOpacity={0.7}>

                            <Feather name="bookmark" color={colors.white} size={24} />
                        </TouchableOpacity>
                    </Link>
                    <Link href={`/cart`} asChild>
                        <TouchableOpacity className="relative" activeOpacity={0.7}>
                            <View className="bg-lime-300 w-4 h-4 rounded-full items-center justify-center top-2 z-10 -right-3.5">
                                <Text className="text-slate-900 font-bold text-[9px]">{cartQuantityItems > 0 ? cartQuantityItems : 0}</Text>
                            </View>
                            <Feather name="shopping-bag" color={colors.white} size={24} />
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>

        </View>
    )
}