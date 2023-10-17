import React from "react"
import { getClasses } from "../utils/getClasses"
import styles from "../styles/modules/todoItem.module.scss"
const TodoItemTextValue = ({ textValue, todo }) => {
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
