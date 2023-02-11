import { View, Text, TouchableOpacity } from 'react-native'
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { colors } from '../assets/styles/colors'
import { Feather, Entypo, AntDesign } from '@expo/vector-icons'
import { Home } from './home/home'
import { Shop } from './shop/shop'

export type RootStackParamList = {
	HomeOne: undefined
	HomeTwo: undefined
}

function HomeScreenTwo() {
	return (
		<View
			style={{
				alignItems: 'center',
				backgroundColor: colors.quaternary,
				flex: 1,
				justifyContent: 'center'
			}}
		>
			<Text>another Home!</Text>
		</View>
	)
}

function HomeScreen() {
	const stack = createStackNavigator<RootStackParamList>()
	return (
		<stack.Navigator>
			<stack.Screen options={{ headerShown: false }} name="HomeOne" component={Home} />
			<stack.Screen options={{ headerShown: false }} name="HomeTwo" component={HomeScreenTwo} />
		</stack.Navigator>
	)
}

function ShopScreen() {
	const stack = createStackNavigator<RootStackParamList>()
	return (
		<stack.Navigator>
			<stack.Screen options={{ headerShown: false }} name="HomeOne" component={Shop} />
			<stack.Screen options={{ headerShown: false }} name="HomeTwo" component={HomeScreenTwo} />
		</stack.Navigator>
	)
}

function MyTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
	return (
		<View style={{ flexDirection: 'row' }}>
			{state.routes.map((route, index) => {
				const { options } = descriptors[route.key]

				const isFocused = state.index === index

				const onPress = () => {
					const event = navigation.emit({
						canPreventDefault: true,
						target: route.key,
						type: 'tabPress'
					})

					if (!isFocused && !event.defaultPrevented) {
						navigation.navigate(route.name)
					}
				}

				const onLongPress = () => {
					navigation.emit({
						target: route.key,
						type: 'tabLongPress'
					})
				}

				return (
					<TouchableOpacity
						activeOpacity={0.8}
						key={index}
						accessibilityRole="button"
						onPress={onPress}
						onLongPress={onLongPress}
						style={{
							alignItems: 'center',
							backgroundColor: '#000000',
							flex: 1,
							flexDirection: 'column',
							justifyContent: 'center',
							padding: 10,
							borderTopWidth: 2,
							borderTopColor: isFocused ? colors.secondary : 'transparent'
						}}
					>
						{options.tabBarIcon ? options.tabBarIcon({ color: '', focused: isFocused, size: 0 }) : null}
						<Text
							style={{
								color: isFocused ? colors.secondary : colors.quinary,
								fontFamily: 'Montserrat-Medium'
							}}
						>
							{route.name}
						</Text>
					</TouchableOpacity>
				)
			})}
		</View>
	)
}

const Tab = createBottomTabNavigator()

export function TabRouter() {
	return (
		<Tab.Navigator screenOptions={{ unmountOnBlur: true }} tabBar={(opts) => <MyTabBar {...opts} />}>
			<Tab.Screen
				options={{
					headerShown: false,
					tabBarIcon: ({ focused }) => {
						return (
							<View style={{ height: 15, width: 15 }}>
								<Entypo name="home" size={15} color={focused ? colors.secondary : colors.quinary} />
							</View>
						)
					}
				}}
				name="Home"
				component={HomeScreen}
			/>
			<Tab.Screen
				options={{
					headerShown: false,
					tabBarIcon: ({ focused }) => {
						return (
							<View style={{ height: 15, width: 15 }}>
								<Feather name="settings" size={15} color={focused ? colors.secondary : colors.quinary} />
							</View>
						)
					}
				}}
				name="Settings"
				component={ShopScreen}
			/>
			<Tab.Screen
				options={{
					headerShown: false,
					tabBarIcon: ({ focused }) => {
						return (
							<View style={{ height: 15, width: 15 }}>
								<AntDesign name="shoppingcart" size={15} color={focused ? colors.secondary : colors.quinary} />
							</View>
						)
					}
				}}
				name="Loja"
				component={ShopScreen}
			/>
			<Tab.Screen
				options={{
					headerShown: false,
					tabBarIcon: ({ focused }) => {
						return (
							<View style={{ height: 15, width: 15 }}>
								<Feather name="settings" size={15} color={focused ? colors.secondary : colors.quinary} />
							</View>
						)
					}
				}}
				name="Checkin"
				component={ShopScreen}
			/>
		</Tab.Navigator>
	)
}
