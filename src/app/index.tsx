import {useState} from "react"
import { CategoryButton } from "@/components/category-button"
import { Header } from "@/components/header"
import { View, FlatList } from "react-native"
import { CATEGORIES } from "@/utils/data/products"


export default function Home() {

const [category, setCategory] = useState(CATEGORIES[0]);
    

function hangleCategorySelect(selectedCategory: string) {
    setCategory(selectedCategory)
}

    return (
        <View className="flex-1 pt-8" >
            <Header title="Faça seu pedido" cartQuantityItems={3} />


            {/*
            <View className="flex-row gap-4">
                <CategoryButton title="Lanche do dia" />
            </View>
    */}


            <FlatList data={CATEGORIES} keyExtractor={(item) => item} renderItem={({ item }) => (
                <CategoryButton title={item} isSelected={item === category} onPress={() => hangleCategorySelect(item)}/>
            )} horizontal className="max-w-10 mt-5" contentContainerStyle={{gap: 12, paddingHorizontal: 20}} showsHorizontalScrollIndicator={false}/>

        </View>
    )
}

