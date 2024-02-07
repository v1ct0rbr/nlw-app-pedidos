import {useState} from "react"
import { CategoryButton } from "@/components/category-button"

import { Header } from "@/components/header"
import { View, FlatList, SectionList, Text } from "react-native"
import { CATEGORIES, MENU } from "@/utils/data/products"
import { Product } from "@/components/product"


export default function Home() {

const [category, setCategory] = useState(CATEGORIES[0]);
    

function hangleCategorySelect(selectedCategory: string) {
    setCategory(selectedCategory)
}

    return (
        <View className="pt-8" >
            <Header title="Faça seu pedido" cartQuantityItems={3} />
            <FlatList data={CATEGORIES} keyExtractor={(item) => item} renderItem={({ item }) => (
                <CategoryButton title={item} isSelected={item === category} onPress={() => hangleCategorySelect(item)}/>
            )} horizontal className="max-w-10 mt-5 h-10"  contentContainerStyle={{gap: 12, paddingHorizontal: 20}} showsHorizontalScrollIndicator={false}/>

            <SectionList sections={MENU} 
                keyExtractor={(item) => item.id} 
                stickySectionHeadersEnabled={false} 
                renderItem={({item}) => (
                  <Product data={item} ></Product>
                )}
                renderSectionHeader={({section : {title}}) => <Text className="text-xl text-white font-heading mt-8 mb-3">{title}</Text>} 
                className="p-5" showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 200}}>
                    
            </SectionList>

        </View>
    )
}

