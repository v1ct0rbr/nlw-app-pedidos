
import {useState} from "react"
import { Text, View, ScrollView, Alert, Linking } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import {useNavigation} from "expo-router"

import { ProductCartProps, useCartStore } from "@/stores/cart-store";

import { Product } from "@/components/product"
import { Header } from "@/components/header";
import { LinkButton } from "@/components/link-button";
import { formatCurrency } from "@/utils/functions/format-currency";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import {Feather} from "@expo/vector-icons"

export default function Cart() {

    const PHONE_NUMBER = "5583996707939"

    const [address, setAddress] = useState("");

    const cartStore = useCartStore();
    const navigation = useNavigation();
    const total = formatCurrency(cartStore.products.reduce((total, product) => total + product.price * product.quantity, 0));

    const cartQuantityItems = cartStore.products.reduce((total, product) => total + product.quantity, 0);
    
    function handleProductRemove(product: ProductCartProps){
        Alert.alert("Remover", `Deseja remover ${product.title} do carrinho`, [
            {
                text: "Cancelar"
            },
            {
                text: "Remover",
                onPress: () => cartStore.remove(product.id)
            }
        ]);
    }

    function handleOrder(){
        if(address.trim().length === 0){
            return Alert.alert("Pedido", "Informe os dados da entrega");
        }
        const products = cartStore.products.map((product) => `\n ${product.quantity} ${product.title}`).join("")

        const message = `🍕🍣 NOVO PEDIDO 🍕🍣
        \n Entregar em: ${address}

        ${products}

        Valor total: ${total}
        `

        Linking.openURL(`http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`)
        cartStore.clear()
        navigation.goBack();
    }

    return (
        <View className="flex-1 pt-8">
            <Header title="Seu carrinho" cartQuantityItems={cartQuantityItems} />
            <KeyboardAwareScrollView>
                <ScrollView>
                    <View className="p-5 flex-1">

                        {(cartStore.products.length > 0) ?
                            <View className="border-b border-slate-700">
                                {
                                    cartStore.products.map((product) => (
                                        <Product data={product} key={product.id} onPress={() => handleProductRemove(product)} />
                                    ))
                                }
                            </View>
                            :

                            <Text className="text-lime-400 mt-5 text-center 
                text-base font-subtitle">O carrinho está vazio
                            </Text>
                        }
                        <View className="flex-row gaw item-center mt-5 mb-4">
                            <Text className="text-white text-xl font-subtitle">Total: </Text>
                            <Text className="text-lime-400 text-2xl font-heading">{total} </Text>
                        </View>
                        <Input blurOnSubmit onSubmitEditing={handleOrder} onChangeText={setAddress} placeholder="Informe o endereço de entrega com rua, bairro, cep, número e complemento..." returnKeyType="next" />

                       
                    </View>
                </ScrollView>
            </KeyboardAwareScrollView>
            <View className="p-5 gap-5">
                <Button onPress={handleOrder}>
                    <Button.Text>Enviar pedido</Button.Text>
                    <Button.Icon> 
                        <Feather name="arrow-right-circle" size={20}></Feather> 
                    </Button.Icon> 
                </Button>
                <LinkButton title="Voltar ao cardápio" href="/" />
            </View>
        </View>

    )
}