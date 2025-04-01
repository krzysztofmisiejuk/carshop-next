export type User = {
	id: string
	username: string
	password: string
	role: 'admin' | 'user'
	balance: number
}

export type NewUser = {
	username: string
	password: string
}

export type EditedCurrentUser = {
	username: string
	password: string
	role: 'user' | 'admin'
}

export type EditedUser = {
	username: string
	password: string
	balance: number
	role: 'user' | 'admin'
}

export type Car = {
	id: string
	model: string
	price: number
	ownerId: string
}

export type NewCar = {
	model: string
	price: string
}

export type BoughtCar = {
	username: string
	carId: string
}

export type SetIsLoggedInType = {
	setIsLoggedIn: (value: boolean) => void
}

export type ButtonProps = {
	type?: 'submit' | 'reset' | 'button' | undefined
	text: string
	onClickFn?: () => void | undefined
}

export type InputTypes = {
	id: string
	placeholder: string
	type?: 'text' | 'number' | 'password'
	onChange: (e: string) => void
}

export type FormTypes = {
	textButton: string
}

export type PropertyType = {
	property: string
	value: string | number
}

export type MessageObject = {
	text: string
	type: 'success' | 'error' | 'info'
}

export interface Profile {
	username: string
	role: 'admin' | 'user' | undefined
	balance: number | string
}
