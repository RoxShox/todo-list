import { format } from "date-fns"
import { motion } from "framer-motion"
import toast from "react-hot-toast"
import React, { useEffect, useState } from "react"
import { MdDelete, MdEdit } from "react-icons/md"
import { useDispatch } from "react-redux"
import { deleteTodo, updateTodo } from "../store/slices/todoSlice"
import styles from "../styles/modules/todoItem.module.scss"
import { getClasses } from "../utils/getClasses"
import CheckButton from "./CheckButton"
import TodoModal from "./TodoModal"
import TodoItemTextValue from "./TodoItemTextValue"
import { ITodo } from "../type"

const child = {
	hidden: { y: 20, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
	},
}

type TodoItemProps = {
	todo: ITodo
}

function TodoItem({ todo }: TodoItemProps) {
	const dispatch = useDispatch()
	const [checked, setChecked] = useState(false)
	const [updateModalOpen, setUpdateModalOpen] = useState(false)

	useEffect(() => {
		if (todo.status === "complete") {
			setChecked(true)
		} else {
			setChecked(false)
		}
	}, [todo.status])

	const handleCheck = () => {
		setChecked(!checked)
		dispatch(
			updateTodo({ ...todo, status: checked ? "incomplete" : "complete" })
		)
	}

	const handleDelete = () => {
		dispatch(deleteTodo(todo.id))
		toast.success("Todo Deleted Successfully")
	}

	const handleUpdate = () => {
		setUpdateModalOpen(true)
	}

	return (
		<>
			<motion.div className={styles.item} variants={child}>
				<CheckButton checked={checked} handleCheck={handleCheck} />

				<TodoItemTextValue textValue={todo.title} todo={todo} />
				<TodoItemTextValue textValue={todo.date} todo={todo} />
				<TodoItemTextValue textValue={todo.time} todo={todo} />
				<div className={styles.todoActions}>
					<div
						className={styles.icon}
						onClick={() => handleDelete()}
						onKeyDown={() => handleDelete()}
						tabIndex={0}
						role="button"
					>
						<MdDelete />
					</div>
					<div
						className={styles.icon}
						onClick={() => handleUpdate()}
						onKeyDown={() => handleUpdate()}
						tabIndex={0}
						role="button"
					>
						<MdEdit />
					</div>
				</div>
			</motion.div>
			<TodoModal
				type="update"
				modalOpen={updateModalOpen}
				setModalOpen={setUpdateModalOpen}
				todo={todo}
			/>
		</>
	)
}

export default TodoItem
