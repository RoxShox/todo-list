import { AnimatePresence, motion } from "framer-motion"
import React, { useState } from "react"
import { useSelector } from "react-redux"
import styles from "../styles/modules/app.module.scss"
import TodoItem from "./TodoItem"

const container = {
	hidden: { opacity: 1 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			staggerChildren: 0.2,
		},
	},
}
const child = {
	hidden: { y: 20, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
	},
}
const sortModes = {
	none: "none",
	asc: "asc",
	desc: "desc",
}

const sortField = {
	title: "title",
	date: "date",
	time: "time",
}

function AppContent() {
	const [sorting, setSorting] = useState({
		field: sortField.title,
		mode: sortModes.none,
	})
	const { todoList, sortStates } = useSelector((state) => state.todo)
	const sortedTodoList = [...todoList]

	sortedTodoList.sort((a, b) => {
		// Если прихдит asc делаем сортировку по возрастанию

		if (sorting.mode === "asc") {
			// проверяем наше значение на тип, если number, тогда отнимаем a - b
			if (typeof a[sorting.field] === "number") {
				return a[sorting.field] - b[sorting.field]
			}
			//в остальных случаях сравниваем как строки по методу localeCompare
			else {
				return a[sorting.field].localeCompare(b[sorting.field])
			}
			// Такая же система, только уже по убыванию
		} else if (sorting.mode === "desc") {
			if (typeof a[sorting.field] === "number") {
				return b[sorting.field] - a[sorting.field]
			} else {
				return b[sorting.field].localeCompare(a[sorting.field])
			}
		}
	})
	const sortHandler = (title) => {
		if (sorting.field === title) {
			const currentMode = sorting.mode
			const modeValues = Object.values(sortModes)
			const currentModeIndex = modeValues.indexOf(currentMode)
			const nextModeIndex = (currentModeIndex + 1) % modeValues.length
			const nextMode = modeValues[nextModeIndex]

			setSorting({
				field: title,
				mode: nextMode,
			})
		} else {
			setSorting({
				field: title,
				mode: sortModes.asc,
			})
		}
	}
	const getSortButtonClassName = (field) => {
		if (sorting.field === field) {
			return `sort-${sorting.mode}`
		}
		return `sort-none`
	}

	return (
		<motion.div
			className={styles.content__wrapper}
			variants={container}
			initial="hidden"
			animate="visible"
		>
			<div className={styles.sortBtnsWrap}>
				<button
					onClick={() => sortHandler("title")}
					className={`${styles.sortBtn} ${getSortButtonClassName("title")}`}
				>
					<span> Заголовок</span>
				</button>
				<button
					onClick={() => sortHandler("date")}
					className={`${styles.sortBtn} ${getSortButtonClassName("date")}`}
				>
					<span> Дата окончания задачи</span>
				</button>
				<button
					onClick={() => sortHandler("time")}
					className={`${styles.sortBtn} ${getSortButtonClassName("time")}`}
				>
					<span>Создано</span>
				</button>
				{/* <SortButton title="Заголовок" sortId="title" />
				<SortButton title="Дата окончания задачи" sortId="date" />
				<SortButton title="Создано" sortId="time" /> */}
			</div>
			<AnimatePresence>
				{sortedTodoList.length !== 0 ? (
					sortedTodoList.map((todo) => <TodoItem key={todo.id} todo={todo} />)
				) : (
					<motion.p variants={child} className={styles.emptyText}>
						No Todos
					</motion.p>
				)}
			</AnimatePresence>
		</motion.div>
	)
}

export default AppContent
