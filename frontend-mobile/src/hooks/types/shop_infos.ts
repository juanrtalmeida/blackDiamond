export type ShopInfosApiReturn = {
	items: ShopItem[]
}

export type ShopItem = {
	id: string
	name: string
	price: number
	description: string
	image: string
	stock: number
}
