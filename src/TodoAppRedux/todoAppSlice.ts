import { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { createSlice } from '@reduxjs/toolkit'

type TodoAppState = {
  tasks: Task[]
  filter: string
  taskName: string
}
type TaskFilter = 'All' | 'Active' | 'Complete'

type Task = {
  id: number
  name: string
  complete: boolean
}

const getTasksFromLS = (key: string): Task[] | [] => {
  try {
    const item = window.localStorage.getItem(key)
    return item ? JSON.parse(item) : []
  } catch {
    console.error
    return []
  }
}

const setTaskToLS = (key: string, valueToStore: Task[]) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(valueToStore))
  } catch {
    console.error
  }
}

const keyToLS = 'tasks'

const initialState: TodoAppState = {
  tasks: getTasksFromLS(keyToLS),
  filter: 'All',
  taskName: '',
}

export const todoAppSlice = createSlice({
  name: 'todoApp',
  initialState,
  reducers: {
    setTaskName: (state, action: PayloadAction<Task['name']>) => {
      state.taskName = action.payload
    },
    setNewTask: (state, action: PayloadAction<Task>) => {
      state.tasks.unshift(action.payload)
      setTaskToLS(keyToLS, state.tasks)
      state.taskName = ''
    },
    setFilter: (state, action: PayloadAction<TaskFilter>) => {
      state.filter = action.payload
    },
    completeTask: (state, action: PayloadAction<Task['id']>) => {
      state.tasks = state.tasks.map(task => {
        return task.id === action.payload ? { ...task, complete: !task.complete } : task
      })
      setTaskToLS(keyToLS, state.tasks)
    },
    removeTask: (state, action: PayloadAction<Task['id']>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload)
      setTaskToLS(keyToLS, state.tasks)
    },
    removeCompleteTask: state => {
      state.tasks = state.tasks.filter(task => !task.complete)
      setTaskToLS(keyToLS, state.tasks)
    },
  },
})

export const { setTaskName, setNewTask, setFilter, removeTask, completeTask, removeCompleteTask } =
  todoAppSlice.actions

export const selecTodos = (state: RootState) => state.todoApp

export default todoAppSlice.reducer
