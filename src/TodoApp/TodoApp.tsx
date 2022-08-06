import { css } from '@emotion/react'
import { theme } from '../util/theme'
import { useState } from 'react'
/** @jsxImportSource @emotion/react */

// Types
type Tasks = {
  id: number
  name: string
  complete: boolean
}

// Styles
const style = {
  todoPage: css({
    background: theme.colors.reactBlue,
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  }),
  todoContainer: css({
    display: 'flex',
    minHeight: '20rem',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px solid white',
  }),
  todoInput: css({
    width: '40rem',
    height: '5rem',
    border: 'none',
    outline: 'none',
    padding: '0px 2rem',
    textAlign: 'center',
    fontSize: theme.fontSizes.midSize,
  }),
  taskContainer: css({
    padding: '20px 30px',
    margin: '20px 30px',
    width: '30rem',
    height: '3rem',
    display: 'flex',
    justifyContent: 'space-evenly',
    backgroundColor: theme.colors.white,
    color: theme.colors.black,
    borderRadius: '3rem',
  }),
  taskTextContainer: css({
    width: '70%',
    display: 'inline-block',
    textAlign: 'center',
  }),
  taskComplete: css({
    color: theme.colors.darkGrey,
    textDecoration: 'line-through',
  }),
  taskButton: css({
    borderRadius: '3rem',
    width: '3rem',
    height: '3rem',
    border: 'none',
    backgroundColor: theme.colors.reactBlue,
    color: theme.colors.white,
    cursor: 'pointer',
  }),
  complete: css({
    '&:hover': {
      backgroundColor: theme.colors.green,
    },
  }),
  remove: css({
    '&:hover': {
      backgroundColor: theme.colors.red,
    },
  }),
  taskFilterNav: css({
    width: '40rem',
    height: '3rem',
    display: 'flex',
    justifyContent: 'space-evenly',
    color: theme.colors.white,
  }),
  taskFilterButton: css({
    width: '20%',
    border: '1px solid white',
    padding: '0 1rem',
    borderTopLeftRadius: '15px',
    borderTopRightRadius: '15px',
    backgroundColor: theme.colors.white,
    cursor: 'pointer',
  }),
  taskRemoveButton: css({
    width: '20%',
    border: 'none',
    padding: '0 1rem',
    borderTopLeftRadius: '15px',
    borderTopRightRadius: '15px',
    backgroundColor: theme.colors.red,
    color: theme.colors.white,
    cursor: 'pointer',
  }),
}

// Local Storage handeling
const taskLSKey = 'tasks'
const getTasksFromLS = (): Tasks[] => {
  const lsTasks = localStorage.getItem(taskLSKey)
  if (lsTasks) {
    return JSON.parse(lsTasks)
  }
  return []
}

// Component
export const TodoApp = () => {
  const [tasks, _setTasks] = useState(getTasksFromLS())
  const [taskName, setTaskName] = useState('')

  const setTasks = (task: Tasks[]) => {
    localStorage.setItem(taskLSKey, JSON.stringify(task))
    _setTasks(task)
  }

  const completeTask = (id: number) => {
    const newTasks = [...tasks]
    const taskToChange = newTasks.filter((task: any) => task.id === id)
    taskToChange[0].complete = !taskToChange[0].complete
    setTasks(newTasks)
  }

  const removeTask = (id: number) => {
    const newTasks = [...tasks].filter(task => task.id !== id)
    setTasks(newTasks)
  }

  const lsTasks = JSON.parse(localStorage.getItem(taskLSKey)!)

  return (
    <div css={style.todoPage}>
      <div css={style.todoContainer}>
        <form
          onSubmit={e => {
            e.preventDefault()
            setTasks([
              {
                id: Math.random() * 5,
                name: taskName,
                complete: false,
              },
              ...tasks,
            ])
            setTaskName('')
          }}
        >
          <input
            css={style.todoInput}
            type='text'
            placeholder='Enter your task....'
            autoFocus={true}
            value={taskName}
            onChange={e => setTaskName(e.target.value)}
          />
        </form>
        <div>
          {tasks.map(task => (
            <div
              css={
                task.complete === true
                  ? [style.taskContainer, style.taskComplete]
                  : style.taskContainer
              }
              key={task.id}
            >
              <button
                css={[style.taskButton, style.complete]}
                onClick={() => {
                  completeTask(task.id)
                }}
              >
                O
              </button>
              <div css={style.taskTextContainer}>
                <p>{task.name}</p>
              </div>
              <button
                css={[style.taskButton, style.remove]}
                onClick={() => {
                  removeTask(task.id)
                }}
              >
                X
              </button>
            </div>
          ))}
        </div>
        <nav css={style.taskFilterNav}>
          <p>{`${tasks.filter(task => !task.complete).length} items left`}</p>
          <button css={style.taskFilterButton} onClick={() => _setTasks(lsTasks ?? [])}>
            All
          </button>
          <button
            css={style.taskFilterButton}
            onClick={() => _setTasks(lsTasks.filter((task: Tasks) => !task.complete))}
          >
            Active
          </button>
          <button
            css={style.taskFilterButton}
            onClick={() => _setTasks(lsTasks.filter((task: Tasks) => task.complete))}
          >
            Complete
          </button>
          <button
            css={style.taskRemoveButton}
            onClick={() => setTasks(tasks.filter(task => !task.complete))}
          >
            Remove completed
          </button>
        </nav>
      </div>
    </div>
  )
}
