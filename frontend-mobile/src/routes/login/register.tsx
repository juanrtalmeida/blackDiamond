import { FontAwesome } from '@expo/vector-icons'
import { ImageBackground, StyleSheet, TextInput, SafeAreaView, View, Dimensions, Text, Pressable } from 'react-native'
import { colors } from '../../assets/styles/colors'
import { text as TextConst } from '../../assets/styles/text'
import background from '../../assets/images/register.jpg'
import { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { useState } from 'react'
import { NativeSyntheticEvent } from 'react-native/Libraries/Types/CoreEventTypes'
import { TextInputChangeEventData } from 'react-native/Libraries/Components/TextInput/TextInput'

export function Register() {
	const { height, width } = Dimensions.get('screen')
	const [form, setForm] = useState({
		name: '',
		email: '',
		password: '',
		birthDate: new Date(),
		cep: '',
		cpf: '',
		rg: '',
		phone: '',
		address: '',
		number: '',
		complement: '',
		neighborhood: '',
		city: '',
		birthDateString: ''
	})

	function handleChange(e: NativeSyntheticEvent<TextInputChangeEventData>, field: string) {
		setForm({ ...form, [field]: e.nativeEvent.text })
	}

	function handledateChange(e: DateTimePickerEvent) {
		const date = new Date(e.nativeEvent.timestamp!)
		setForm({
			...form,
			birthDate: date,
			birthDateString: date.getFullYear() + '/' + date.getDate() + '/' + date.getMonth()
		})
	}
	return (
		<SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<ImageBackground
				source={background}
				resizeMode="cover"
				style={{
					flex: 1,
					position: 'absolute',
					width: width,
					height: height
				}}
			>
				<View style={{ flex: 1, backgroundColor: '#000000', opacity: 0.8 }}></View>
			</ImageBackground>
			<View style={{ width: '80%' }}>
				<Text style={styles.welcomeText}>
					Prazer em conhece-lo, se <Text style={{ color: colors.secondary }}>registre</Text> conosco!
				</Text>
				<View style={styles.inputView}>
					<FontAwesome name="lock" size={24} color={colors.quaternary} style={{ paddingLeft: 10 }} />
					<TextInput
						onChange={(e) => handleChange(e, 'email')}
						cursorColor={colors.secondary}
						style={{ width: '90%', paddingVertical: 10, paddingLeft: 10, fontFamily: TextConst.montserratMedium }}
						autoComplete="email"
						placeholder="Seu melhor Email"
					/>
				</View>
				<View style={styles.inputView}>
					<FontAwesome name="lock" size={24} color={colors.quaternary} style={{ paddingLeft: 10 }} />
					<TextInput
						onChange={(e) => handleChange(e, 'name')}
						cursorColor={colors.secondary}
						style={{ width: '90%', paddingVertical: 10, paddingLeft: 10, fontFamily: TextConst.montserratMedium }}
						autoComplete="name"
						placeholder="Seu nome"
					/>
				</View>
				<View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
					<View style={styles.inputViewHalf}>
						<FontAwesome name="lock" size={24} color={colors.quaternary} style={{ paddingLeft: 10 }} />
						<TextInput
							onChange={(e) => handleChange(e, 'cep')}
							cursorColor={colors.secondary}
							style={{ width: '90%', paddingVertical: 10, paddingLeft: 10, fontFamily: TextConst.montserratMedium }}
							placeholder="CEP"
							keyboardType="numeric"
						/>
					</View>
					<View style={styles.inputViewHalf}>
						<FontAwesome name="lock" size={24} color={colors.quaternary} style={{ paddingLeft: 10 }} />
						<TextInput
							onChange={(e) => handleChange(e, 'cpf')}
							cursorColor={colors.secondary}
							style={{ width: '90%', paddingVertical: 10, paddingLeft: 10, fontFamily: TextConst.montserratMedium }}
							placeholder="CPF"
							keyboardType="numeric"
						/>
					</View>
				</View>
				<View style={styles.inputView}>
					<FontAwesome name="lock" size={24} color={colors.quaternary} style={{ paddingLeft: 10 }} />
					<Pressable
						style={{ width: '90%', paddingVertical: 15, paddingLeft: 10 }}
						onPress={() =>
							DateTimePickerAndroid.open({
								value: form.birthDate,
								mode: 'date',
								onChange: handledateChange
							})
						}
					>
						<Text
							style={{
								fontFamily: TextConst.montserratMedium,
								color: form.birthDateString !== '' ? colors.primary : colors.quaternary
							}}
						>
							{form.birthDateString.split('').reverse().join('') || 'Data de nascimento'}
						</Text>
					</Pressable>
				</View>
				<View style={styles.inputView}>
					<FontAwesome name="lock" size={24} color={colors.quaternary} style={{ paddingLeft: 10 }} />
					<TextInput
						cursorColor={colors.secondary}
						style={{ width: '90%', paddingVertical: 10, paddingLeft: 10, fontFamily: TextConst.montserratMedium }}
						autoComplete="password"
						placeholder="Senha"
						secureTextEntry
					/>
				</View>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	welcomeText: {
		fontFamily: TextConst.montserratBold,
		fontSize: 30,
		color: colors.quinary,
		paddingVertical: 30
	},
	inputViewHalf: {
		width: '48%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		marginTop: 10,
		minWidth: 100,
		borderRadius: 10,
		backgroundColor: colors.quinary
	},
	inputView: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		marginTop: 10,
		minWidth: 100,
		borderRadius: 10,
		backgroundColor: colors.quinary
	}
})
