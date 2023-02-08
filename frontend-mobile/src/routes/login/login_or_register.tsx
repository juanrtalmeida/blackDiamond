import { createStackNavigator } from '@react-navigation/stack'
import { Choose } from './choose'
import { Register } from './register'

export type RootStackParamList = {
	Choose: undefined
	Login: undefined
	Register: undefined
}

export function LoginOrRegisterRoute() {
	const Stack = createStackNavigator<RootStackParamList>()

	return (
		<Stack.Navigator
			screenOptions={{
				cardStyleInterpolator: ({ current, layouts }) => {
					return {
						cardStyle: {
							transform: [
								{
									translateX: current.progress.interpolate({
										inputRange: [0, 1],
										outputRange: [layouts.screen.width, 0]
									})
								}
							]
						}
					}
				}
			}}
		>
			<Stack.Screen options={{ headerShown: false }} name="Choose" component={Choose} />
			<Stack.Screen
				options={{
					headerShown: false,
					gestureDirection: 'horizontal-inverted'
				}}
				name="Register"
				component={Register}
			/>
		</Stack.Navigator>
	)
}
