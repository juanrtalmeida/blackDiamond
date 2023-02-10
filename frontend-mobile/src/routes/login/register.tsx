import { AntDesign, Entypo, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons'
import {
	ImageBackground,
	StyleSheet,
	TextInput,
	SafeAreaView,
	View,
	Dimensions,
	Text,
	Pressable,
	Platform
} from 'react-native'
import DropdownPricker, { ItemType } from 'react-native-dropdown-picker'
import { colors } from '../../assets/styles/colors'
import { text as TextConst } from '../../assets/styles/text'
import background from '../../assets/images/register.jpg'
import DatePicker, { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { useState } from 'react'
import { NativeSyntheticEvent } from 'react-native/Libraries/Types/CoreEventTypes'
import { TextInputChangeEventData } from 'react-native/Libraries/Components/TextInput/TextInput'
import { formatWithMask } from 'react-native-mask-input'
import { Button } from '../../components/Button/button'
import { useApi } from '../../hooks/useApi'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from './login_or_register'

export function Register() {
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
	const { height, width } = Dimensions.get('screen')
	const [show, setShow] = useState(false)
	const [open, setOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [value, setValue] = useState(null)
	const [items, setItems] = useState<ItemType<string>[]>([
		{ label: 'Homem', value: 'homem' },
		{ label: 'Mulher', value: 'mulher' }
	])
	const [form, setForm] = useState({
		name: '',
		email: '',
		password: '',
		birth_date: new Date(),
		zip_code: '',
		cpf: '',
		complement: '',
		birthDateString: '',
		maskedCpf: '',
		maskedCep: '',
		contact: '',
		maskedContact: '',
		sex_orientation: ''
	})

	async function handleRegister() {
		setIsLoading(true)
		try {
			const fasdf = await useApi().register({
				birth_date: form.birthDateString,
				zip_code: form.zip_code,
				cpf: form.cpf,
				contact: form.contact,
				email: form.email,
				name: form.name,
				password: form.password,
				sex_orientation: form.sex_orientation
			})
			setIsLoading(false)
			navigation.navigate('Choose')
		} catch (err) {
			setIsLoading(false)
			console.log(err)
		}
	}

	const isFormValid = () => {
		return (
			form.name.length > 3 &&
			/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email) &&
			form.password.length > 6 &&
			form.birth_date &&
			form.zip_code.length === 8 &&
			form.contact.length === 11 &&
			form.cpf.length === 11
		)
	}
	function handleChange(e: NativeSyntheticEvent<TextInputChangeEventData>, field: string) {
		setForm({ ...form, [field]: e.nativeEvent.text })
	}
	console.log(isFormValid())

	function handledateChange(e: DateTimePickerEvent) {
		const date = new Date(e.nativeEvent.timestamp!)
		setForm({
			...form,
			birth_date: date,
			birthDateString: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
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
					<MaterialIcons name="email" size={22} color={colors.quaternary} style={{ paddingLeft: 10 }} />
					<TextInput
						onChange={(e) => handleChange(e, 'email')}
						cursorColor={colors.secondary}
						style={{ width: '90%', paddingVertical: 10, paddingLeft: 7, fontFamily: TextConst.montserratMedium }}
						autoComplete="email"
						placeholder="Seu melhor Email"
					/>
				</View>
				<View style={styles.inputView}>
					<Ionicons name="person" size={20} color={colors.quaternary} style={{ paddingLeft: 10 }} />
					<TextInput
						onChange={(e) => handleChange(e, 'name')}
						cursorColor={colors.secondary}
						style={{ width: '90%', paddingVertical: 10, paddingLeft: 7, fontFamily: TextConst.montserratMedium }}
						autoComplete="name"
						placeholder="Seu nome"
					/>
				</View>
				<View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
					<View style={styles.inputViewHalf}>
						<Entypo name="location-pin" size={24} color={colors.quaternary} style={{ paddingLeft: 8 }} />
						<TextInput
							value={form.maskedCep}
							onChange={(e) => {
								const { unmasked, masked } = formatWithMask({
									text: e.nativeEvent.text,
									mask: [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]
								})
								setForm((prevForm) => ({ ...prevForm, zip_code: unmasked, maskedCep: masked }))
							}}
							cursorColor={colors.secondary}
							style={{ width: '78%', paddingVertical: 10, paddingLeft: 7, fontFamily: TextConst.montserratMedium }}
							placeholder="CEP"
							keyboardType="numeric"
							maxLength={9}
						/>
					</View>
					<View style={styles.inputViewHalf}>
						<AntDesign name="idcard" size={20} color={colors.quaternary} style={{ paddingLeft: 10 }} />
						<TextInput
							value={form.maskedCpf}
							onChange={(e) => {
								const { unmasked, masked } = formatWithMask({
									text: e.nativeEvent.text,
									mask: [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]
								})
								setForm((prevForm) => ({ ...prevForm, cpf: unmasked, maskedCpf: masked }))
							}}
							cursorColor={colors.secondary}
							style={{
								width: '78%',
								paddingVertical: 10,
								paddingLeft: 7,
								fontFamily: TextConst.montserratMedium
							}}
							maxLength={14}
							placeholder="CPF"
							keyboardType="numeric"
						/>
					</View>
				</View>
				<View
					style={{
						zIndex: 200,
						width: '100%',
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center'
					}}
				>
					<View style={styles.inputViewHalf}>
						<MaterialIcons name="date-range" size={24} color={colors.quaternary} style={{ paddingLeft: 10 }} />
						<Pressable
							style={{ width: '90%', paddingVertical: 15, paddingLeft: 7 }}
							onPress={() => {
								if (Platform.OS === 'ios') {
									setShow(true)
									return
								}
								DateTimePickerAndroid.open({
									value: form.birth_date,
									mode: 'date',
									onChange: handledateChange,
									maximumDate: new Date('01/01/2005'),
									minimumDate: new Date('01/01/1900')
								})
							}}
						>
							{show && Platform.OS === 'ios' ? (
								<DatePicker mode="date" value={form.birth_date} onChange={handledateChange} />
							) : null}
							<Text
								style={{
									maxWidth: '90%',
									fontFamily: TextConst.montserratMedium,
									color: form.birthDateString !== '' ? colors.primary : colors.quaternary,
									paddingVertical: 3,
									fontSize: 12
								}}
							>
								{form.birthDateString.split('').reverse().join('') || 'Data de nascimento'}
							</Text>
						</Pressable>
					</View>
					<View style={styles.inputViewHalf}>
						<MaterialIcons name="date-range" size={24} color={colors.quaternary} style={{ paddingLeft: 7 }} />
						<DropdownPricker
							onChangeValue={(item) => setForm((prev) => ({ ...prev, sex_orientation: item! }))}
							labelStyle={{ fontFamily: TextConst.montserratMedium, fontSize: 14, color: colors.quaternary }}
							style={{ backgroundColor: colors.quinary, borderWidth: 0 }}
							placeholderStyle={{
								fontFamily: TextConst.montserratMedium,
								fontSize: 16,
								color: colors.quaternary
							}}
							placeholder="Gênero"
							containerStyle={{ width: '78%' }}
							listItemContainerStyle={{ backgroundColor: colors.quinary }}
							listItemLabelStyle={{ fontFamily: TextConst.montserratMedium, fontSize: 14, color: colors.quaternary }}
							listMode="FLATLIST"
							open={open}
							value={value}
							items={items}
							customItemContainerStyle={{ borderWidth: 0 }}
							setOpen={setOpen}
							setValue={setValue}
							setItems={setItems}
							dropDownDirection="BOTTOM"
						/>
					</View>
				</View>
				<View style={styles.inputView}>
					<FontAwesome name="mobile-phone" size={20} color={colors.quaternary} style={{ paddingLeft: 10 }} />
					<TextInput
						value={form.maskedContact}
						onChange={(e) => {
							const { unmasked, masked } = formatWithMask({
								text: e.nativeEvent.text,
								mask: ['(', /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
							})
							setForm((prevForm) => ({ ...prevForm, contact: unmasked, maskedContact: masked }))
						}}
						cursorColor={colors.secondary}
						style={{
							width: '78%',
							paddingVertical: 10,
							paddingLeft: 7,
							fontFamily: TextConst.montserratMedium
						}}
						maxLength={13}
						placeholder="Telefone para contato"
						keyboardType="numeric"
					/>
				</View>
				<View style={styles.inputView}>
					<FontAwesome name="lock" size={24} color={colors.quaternary} style={{ paddingLeft: 10 }} />
					<TextInput
						onChange={(e) => handleChange(e, 'password')}
						cursorColor={colors.secondary}
						style={{ width: '90%', paddingVertical: 10, paddingLeft: 7, fontFamily: TextConst.montserratMedium }}
						autoComplete="password"
						placeholder="Senha"
						secureTextEntry
					/>
				</View>
				<Button
					onPress={() => handleRegister()}
					isLoading={isLoading}
					isDisabled={!isFormValid()}
					style={{ marginVertical: 15, paddingVertical: 15 }}
					title="Cadastrar"
				/>
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
	},
	pickerItem: {
		backgroundColor: colors.quinary
	}
})
