import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Button, { SelectButton } from "./Button"
import styles from "../styles/modules/app.module.scss"
import TodoModal from "./TodoModal"
import { updateFilterStatus } from "../slices/todoSlice"

function AppHeader() {
	const [modalOpen, setModalOpen] = useState(false)

	const dispatch = useDispatch()

	return (
		<div className={styles.appHeader}>
			<Button variant="primary" onClick={() => setModalOpen(true)}>
				Add Task
			</Button>
			<TodoModal type="add" modalOpen={modalOpen} setModalOpen={setModalOpen} />
		</div>
	)
}

export default AppHeader
