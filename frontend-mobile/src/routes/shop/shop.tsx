import { Text, ScrollView, StyleSheet } from 'react-native'
import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { text } from '../../assets/styles/text'
import { useApi } from '../../hooks/useApi'
import { View, Image } from 'react-native'
import loader from '../../assets/animations/71490-rounding-lines-2-yellow.json'
import Lottie from 'lottie-react-native'
import { ShopItem } from '../../hooks/types/shop_infos'
import { colors } from '../../assets/styles/colors'
import { useAxios } from '../../hooks/useAxios'

export function Shop() {
	const [items, setItems] = useState<ShopItem[]>()
	const { getData } = useAxios('http://192.168.100.7:4000/api')
	async function getProducts() {
		try {
			const { items: shopItems } = await useApi().shop()
			setItems(
				shopItems.map((item) => ({
					...item,
					image:
						// eslint-disable-next-line max-len
						'https://images.tcdn.com.br/img/img_prod/859641/luva_de_nitrilo_nao_esteril_caixa_com_100_un_433_1_4ba91ba364f580170b63e91d91509c4b_20220120111601.png'
				}))
			)
		} catch (err) {
			console.log(err)
		}
	}
	useEffect(() => {
		getProducts()
	}, [])

	if (!items) {
		return (
			<View style={{ backgroundColor: colors.primary, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Lottie style={{ width: 60 }} source={loader} autoPlay loop />
			</View>
		)
	}

	return (
		<SafeAreaView>
			<ScrollView>
				<Text style={styles.header}>Loja </Text>
				{items?.map((item) => (
					<>
						<Text key={item.id}>{item.name}</Text>
						<Image resizeMode="contain" style={{ width: 100, height: 100 }} source={{ uri: item.image }} />
					</>
				))}
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	header: {
		color: '#fff',
		fontSize: 36,
		fontFamily: text.montserratBold,
		padding: 20
	}
})
