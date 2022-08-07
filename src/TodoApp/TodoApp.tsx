import { css } from '@emotion/react'
import { generateID, useLocalStorage } from '../util/helperFunctions'
import { theme } from '../util/theme'
import { useState } from 'react'
/** @jsxImportSource @emotion/react */

type Task = {
  id: number
  name: string
  complete: boolean
}
type TaskProps = {
  task: Task
  completeTask: (id: number) => void
  removeTask: (id: number) => void
}

const style = {
  todoPage: css({
    background: theme.colors.lightReactBlue,
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
    opacity: '70%',
  }),
  taskTextCompleted: css({
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
    transition: theme.transitions.basicEaseIn,
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
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    backgroundColor: theme.colors.white,
    cursor: 'pointer',
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
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    backgroundColor: theme.colors.red,
    color: theme.colors.white,
    cursor: 'pointer',
  }),
}

const TaskComponent = (props: TaskProps) => {
  return (
    <div css={[style.taskContainer, props.task.complete === true ? style.taskComplete : undefined]}>
      <button
        css={[style.taskButton, style.complete]}
        onClick={() => props.completeTask(props.task.id)}
      >
        O
      </button>
      <div
        css={[
          style.taskTextContainer,
          props.task.complete === true ? style.taskTextCompleted : undefined,
        ]}
      >
        <p>{props.task.name}</p>
      </div>
      <button
        css={[style.taskButton, style.remove]}
        onClick={() => props.removeTask(props.task.id)}
      >
        X
      </button>
    </div>
  )
}

export const TodoApp = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', [] as Task[])
  const [filter, setFilter] = useLocalStorage<'All' | 'Complete' | 'Active'>('filterdTasks', 'All')
  const [taskName, setTaskName] = useState('')

  const completeTask = (id: number) => {
    setTasks(tasks => {
      return tasks.map(task => {
        return task.id === id ? { ...task, complete: !task.complete } : task
      })
    })
  }

  const removeTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const getFilteredTasks = () => {
    if (filter === 'Active') {
      return tasks.filter(task => !task.complete)
    } else if (filter === 'Complete') {
      return tasks.filter(task => task.complete)
    } else {
      return tasks
    }
  }

  return (
    <div css={style.todoPage}>
      <div css={style.todoContainer}>
        <form
          onSubmit={e => {
            e.preventDefault()
            setTasks([
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
          {getFilteredTasks().map(task => (
            <TaskComponent
              key={task.id}
              task={task}
              completeTask={completeTask}
              removeTask={removeTask}
            />
          ))}
        </div>
        <nav css={style.taskFilterNav}>
          <p>{tasks.filter(task => !task.complete).length} items left</p>
          <div css={[style.filterButtonsContainer]}>
            <button css={style.taskFilterButton} onClick={() => setFilter('All')}>
              All
            </button>
            <button css={style.taskFilterButton} onClick={() => setFilter('Active')}>
              Active
            </button>
            <button css={style.taskFilterButton} onClick={() => setFilter('Complete')}>
              Complete
            </button>
          </div>
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
