import image from '../../assets/images/register.jpg'

import { Text, View, FlatList, Image } from 'react-native'
import { colors } from '../../assets/styles/colors'
import { text } from '../../assets/styles/text'

const array = [
	{ name: 'teste', startingHour: 15, type: 'Kung Fu', professor: 'Juan Almeida', image },
	{ name: 'teste', startingHour: 15, type: 'Kung Fu', professor: 'Juan Almeida', image },
	{ name: 'teste', startingHour: 15, type: 'Kung Fu', professor: 'Juan Almeida', image }
]

export function ClassesSlider() {
	return (
		<FlatList
			overScrollMode="never"
			decelerationRate="normal"
			style={{ margin: 0, paddingBottom: 0, flexGrow: 0 }}
			showsHorizontalScrollIndicator={false}
			data={array}
			horizontal
			renderItem={({ item, index }) => (
				<View
					style={{
						width: 200,
						marginRight: array.length === index + 1 ? 0 : 20,
						height: 80
					}}
				>
					<View
						style={{
							flex: 1,
							width: 200,
							borderRadius: 10,
							borderWidth: 3,
							backgroundColor: colors.quaternary,
							padding: 10,
							justifyContent: 'space-between'
						}}
					>
						<View>
							<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
								<Image resizeMode="center" source={item.image} style={{ width: 50, height: 50, borderRadius: 25 }} />
								<View style={{ paddingHorizontal: 10 }}>
									<Text style={{ fontFamily: text.montserratBold, color: 'white', fontSize: 20 }}>{item.type}</Text>
									<Text style={{ fontFamily: text.montserratBold, color: 'white', fontSize: 12 }}>
										{item.startingHour}h, {item.professor}
									</Text>
								</View>
							</View>
						</View>
					</View>
				</View>
			)}
		/>
	)
}
