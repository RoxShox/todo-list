import React, { useState } from "react"
import { useDispatch } from "react-redux"
import Button from "./Button"
import styles from "../styles/modules/app.module.scss"
import TodoModal from "./TodoModal"
import { ButtonTypes } from "../type"

function AppHeader() {
	const [modalOpen, setModalOpen] = useState(false)

	const dispatch = useDispatch()

	return (
		<div className={styles.appHeader}>
			<Button variant={ButtonTypes.primary} onClick={() => setModalOpen(true)}>
				Add Task
			</Button>
			<TodoModal type="add" modalOpen={modalOpen} setModalOpen={setModalOpen} />
		</div>
	)
}

export default AppHeader
