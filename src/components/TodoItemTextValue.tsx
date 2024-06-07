import React from "react"
import { getClasses } from "../utils/getClasses"
import styles from "../styles/modules/todoItem.module.scss"
import { ITodo } from "../type"

type TodoItemTextValueProps = {
	textValue: string | number
	todo: ITodo
}

const TodoItemTextValue = ({ textValue, todo }: TodoItemTextValueProps) => {
	return (
		<div className={styles.texts}>
			<p
				className={getClasses([
					styles.todoText,
					todo.status === "complete" && styles["todoText--completed"],
				])}
			>
				{textValue}
			</p>
		</div>
	)
}

export default TodoItemTextValue
