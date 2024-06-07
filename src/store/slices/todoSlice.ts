import { createSlice } from "@reduxjs/toolkit"
import { ITodo } from "../../type"

const getInitialTodo = () => {
	// getting todo list
	const localTodoList = window.localStorage.getItem("todoList")
	// if todo list is not empty
	if (localTodoList) {
		return JSON.parse(localTodoList)
	}
	window.localStorage.setItem("todoList", [] as any)
	return []
}

interface ISortStates {
	sortId: string
	sortState: string
}

interface IInitialState {
	filterStatus: string
	todoList: ITodo[]
	sortId: string
	sortStates: ISortStates
}

const initialValue: IInitialState = {
	filterStatus: "all",
	todoList: getInitialTodo(),
	sortId: "",
	sortStates: {
		sortId: "",
		sortState: "",
	},
}

export const todoSlice = createSlice({
	name: "todo",
	initialState: initialValue,
	reducers: {
		addTodo: (state, action) => {
			state.todoList.push(action.payload)
			const todoList = window.localStorage.getItem("todoList")
			if (todoList) {
				const todoListArr = JSON.parse(todoList)
				todoListArr.push({
					...action.payload,
				})
				window.localStorage.setItem("todoList", JSON.stringify(todoListArr))
			} else {
				window.localStorage.setItem(
					"todoList",
					JSON.stringify([
						{
							...action.payload,
						},
					])
				)
			}
			console.log(state.todoList)
		},
		updateTodo: (state, action) => {
			const todoList = window.localStorage.getItem("todoList")
			if (todoList) {
				const todoListArr = JSON.parse(todoList)
				todoListArr.forEach((todo: ITodo) => {
					if (todo.id === action.payload.id) {
						todo.status = action.payload.status
						todo.title = action.payload.title
					}
				})
				window.localStorage.setItem("todoList", JSON.stringify(todoListArr))
				state.todoList = [...todoListArr]
			}
		},
		deleteTodo: (state, action) => {
			const todoList = window.localStorage.getItem("todoList")
			if (todoList) {
				const todoListArr = JSON.parse(todoList)
				todoListArr.forEach((todo: ITodo, index: number) => {
					if (todo.id === action.payload) {
						todoListArr.splice(index, 1)
					}
				})
				window.localStorage.setItem("todoList", JSON.stringify(todoListArr))
				state.todoList = todoListArr
			}
		},
		updateFilterStatus: (state, action) => {
			state.filterStatus = action.payload
		},
		setSortId: (state, action) => {
			state.sortStates = { ...action.payload }
		},
	},
})

export const {
	addTodo,
	updateTodo,
	deleteTodo,
	updateFilterStatus,
	setSortId,
} = todoSlice.actions
export default todoSlice.reducer
