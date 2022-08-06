import { css } from '@emotion/react'
import { generateID, useLocalStorage } from '../util/functions'
import { theme } from '../util/theme'
import { useState } from 'react'
/** @jsxImportSource @emotion/react */

type Tasks = {
  id: number
  name: string
  complete: boolean
}
type TaskProps = {
  id: number
  name: string
  complete: boolean
  completeTask: (id: number) => void
  removeTask: (id: number) => void
}

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
    border: '1px solid',
    borderColor: theme.colors.white,
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
    width: '30%',
    border: '1px solid',
    borderColor: theme.colors.white,
    padding: '0 1rem',
    borderTopLeftRadius: '15px',
    borderTopRightRadius: '15px',
    backgroundColor: theme.colors.white,
  }),
  filterButtonsContainer: css({
    width: '60%',
    display: 'flex',
    justifyContent: 'space-evenly',
  }),
  disabled: css({
    opacity: '0',
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

const TaskComponent = (props: TaskProps) => {
  return (
    <div
      css={
        props.complete === true ? [style.taskContainer, style.taskComplete] : style.taskContainer
      }
    >
      <button
        css={[style.taskButton, style.complete]}
        onClick={() => {
          props.completeTask(props.id)
        }}
      >
        O
      </button>
      <div css={style.taskTextContainer}>
        <p>{props.name}</p>
      </div>
      <button
        css={[style.taskButton, style.remove]}
        onClick={() => {
          props.removeTask(props.id)
        }}
      >
        X
      </button>
    </div>
  )
}

export const TodoApp = () => {
  const [tasks, _setTasks] = useLocalStorage<Tasks[]>('tasks', [])
  const [filteredTasks, _setfilteredTasks] = useLocalStorage('filterdTasks', [])
  const [taskName, setTaskName] = useState('')

  const completeTask = (id: number) => {
    const newTasks = [...tasks]
    const taskToChange = newTasks.filter((task: Tasks) => task.id === id)
    taskToChange[0].complete = !taskToChange[0].complete
    _setTasks(newTasks)
  }

  const removeTask = (id: number) => {
    const newTasks = [...tasks].filter(task => task.id !== id)
    _setTasks(newTasks)
  }

  const getFilterStatus = tasks.map((task: Tasks) => (task.complete ? true : false))

  return (
    <div css={style.todoPage}>
      <div css={style.todoContainer}>
        <form
          onSubmit={e => {
            e.preventDefault()
            _setTasks([
              {
                id: generateID(),
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
          {filteredTasks.length > 0
            ? filteredTasks.map((task: Tasks) => (
                <TaskComponent
                  key={task.id}
                  id={task.id}
                  complete={task.complete}
                  name={task.name}
                  completeTask={completeTask}
                  removeTask={removeTask}
                />
              ))
            : tasks.map((task: Tasks) => (
                <TaskComponent
                  key={task.id}
                  id={task.id}
                  complete={task.complete}
                  name={task.name}
                  completeTask={completeTask}
                  removeTask={removeTask}
                />
              ))}
        </div>
        <nav css={style.taskFilterNav}>
          <p>{`${tasks.filter((task: Tasks) => !task.complete).length} items left`}</p>
          <div
            css={
              getFilterStatus && tasks.length > 1
                ? style.filterButtonsContainer
                : [style.filterButtonsContainer, style.disabled]
            }
          >
            <button css={style.taskFilterButton} onClick={() => _setfilteredTasks(tasks)}>
              All
            </button>
            <button
              css={style.taskFilterButton}
              onClick={() => _setfilteredTasks(tasks.filter((task: Tasks) => !task.complete))}
            >
              Active
            </button>
            <button
              css={style.taskFilterButton}
              onClick={() => _setfilteredTasks(tasks.filter((task: Tasks) => task.complete))}
            >
              Complete
            </button>
          </div>
          <button
            css={style.taskRemoveButton}
            onClick={() => [
              _setTasks(tasks.filter((task: Tasks) => !task.complete)),
              _setfilteredTasks([]),
            ]}
          >
            Remove completed
          </button>
        </nav>
      </div>
    </div>
  )
}
