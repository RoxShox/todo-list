import React, { ButtonHTMLAttributes } from "react"
import styles from "../styles/modules/button.module.scss"
import { getClasses } from "../utils/getClasses"
import { ButtonTypes } from "../type"

const buttonTypes = {
	primary: ButtonTypes.primary,
	secondary: ButtonTypes.secondary,
}

interface ButtonProps {
	type?: string
	variant: ButtonTypes
	children: React.ReactNode
	onClick?: () => void
}

function Button({
	type,
	variant = ButtonTypes.primary,
	children,
	...rest
}: ButtonProps) {
	return (
		<button
			type={type === "submit" ? "submit" : "button"}
			className={getClasses([
				styles.button,
				styles[`button--${buttonTypes[variant]}`],
			])}
			{...rest}
		>
			{children}
		</button>
	)
}

type SelectButtonProps = {
	children: React.ReactNode
	id: string
}

function SelectButton({ children, id, ...rest }: SelectButtonProps) {
	return (
		<select
			id={id}
			className={getClasses([styles.button, styles.button__select])}
			{...rest}
		>
			{children}
		</select>
	)
}

export { SelectButton }
export default Button
