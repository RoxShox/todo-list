import React, { FormEvent, useEffect, useState } from "react"
// @ts-ignore
import { v4 as uuid } from "uuid"
import { MdOutlineClose } from "react-icons/md"
import { useDispatch } from "react-redux"
import { AnimatePresence, motion } from "framer-motion"
import toast from "react-hot-toast"
import { addTodo, updateTodo } from "../store/slices/todoSlice"
import styles from "../styles/modules/modal.module.scss"
import Button from "./Button"
import { formatDateToInputDate } from "../utils/formatDate"
import { ButtonTypes, ITodo } from "../type"

const dropIn = {
	hidden: {
		opacity: 0,
		transform: "scale(0.9)",
	},
	visible: {
		transform: "scale(1)",
		opacity: 1,
		transition: {
			duration: 0.1,
			type: "spring",
			damping: 25,
			stiffness: 500,
		},
	},
	exit: {
		transform: "scale(0.9)",
		opacity: 0,
	},
}

type TodoModalProps = {
	type: string
	modalOpen: boolean
	setModalOpen: (active: boolean) => void
	todo?: ITodo
}

function TodoModal({ type, modalOpen, setModalOpen, todo }: TodoModalProps) {
	const dispatch = useDispatch()
	const [title, setTitle] = useState("")
	const [date, setDate] = useState("")

	useEffect(() => {
		if (type === "update" && todo) {
			setTitle(todo.title)
			setDate(formatDateToInputDate(todo.date))
		} else {
			setTitle("")
			setDate("")
		}
	}, [type, todo, modalOpen])

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (title === "") {
			toast.error("Please enter a title")
			return
		}
		if (title && date) {
			console.log(date)
			if (type === "add") {
				dispatch(
					addTodo({
						id: uuid(),
						title,
						date: formatDateToInputDate(date),
						time: new Date().toLocaleString(),
					})
				)
				toast.success("Task added successfully")
			}
			if (type === "update") {
				if (todo?.title !== title || todo?.date !== date) {
					dispatch(updateTodo({ ...todo, title, date }))
					toast.success("Task Updated successfully")
				} else {
					toast.error("No changes made")
					return
				}
			}
			setModalOpen(false)
		}
	}

	return (
		<AnimatePresence>
			{modalOpen && (
				<motion.div
					className={styles.wrapper}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					<motion.div
						className={styles.container}
						variants={dropIn}
						initial="hidden"
						animate="visible"
						exit="exit"
					>
						<motion.div
							className={styles.closeButton}
							onKeyDown={() => setModalOpen(false)}
							onClick={() => setModalOpen(false)}
							role="button"
							tabIndex={0}
							// animation
							initial={{ top: 40, opacity: 0 }}
							animate={{ top: -10, opacity: 1 }}
							exit={{ top: 40, opacity: 0 }}
						>
							<MdOutlineClose />
						</motion.div>

						<form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
							<h1 className={styles.formTitle}>
								{type === "add" ? "Add" : "Update"} TODO
							</h1>
							<label htmlFor="title">
								Title
								<input
									type="text"
									id="title"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									required
								/>
							</label>
							<label htmlFor="type">
								Срок выполнения
								<input
									type="datetime-local"
									value={date}
									onChange={(e) => setDate(e.target.value)}
									required
								/>
							</label>

							<div className={styles.buttonContainer}>
								<Button type="submit" variant={ButtonTypes.primary}>
									{type === "add" ? "Add Task" : "Update Task"}
								</Button>
								<Button
									variant={ButtonTypes.secondary}
									onClick={() => setModalOpen(false)}
								>
									Cancel
								</Button>
							</div>
						</form>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}

export default TodoModal
