import { Helmet } from 'react-helmet'
import { css } from '@emotion/react'
import { generateID, useLocalStorage } from '../util/helperFunctions'
import { genericHookContextBuilder } from '../util/genericHookContextBuilder'
import { theme } from '../util/theme'
import { useContext, useState } from 'react'
/** @jsxImportSource @emotion/react */

const style = {
  todoPage: css({
    background: theme.colors.lightReactBlue,
    minHeight: '100vh',
    minWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  }),
  todoContainer: css({
    display: 'flex',
    margin: '2% 0',
    minHeight: '20rem',
    width: '50rem',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    border: '1px solid',
    borderColor: theme.colors.white,
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      width: '90%',
      textAlign: 'center',
    },
  }),
  todoForm: css({
    width: '100%',
  }),
  todoInput: css({
    height: '5rem',
    width: '100%',
    border: 'none',
    outline: 'none',
    padding: '0',
    textAlign: 'center',
    fontSize: theme.fontSizes.midSize,
  }),
  taskList: css({
    width: '100%',
    margin: '5%',
    minHeight: '10rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  }),
  taskContainer: css({
    padding: '3%',
    width: '70%',
    marginTop: '2%',
    height: '3rem',
    display: 'flex',
    justifyContent: 'space-evenly',
    backgroundColor: theme.colors.white,
    color: theme.colors.black,
    borderRadius: '3rem',
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      width: '90%',
      textAlign: 'center',
    },
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
    width: '100%',
    height: '3rem',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    color: theme.colors.white,
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      height: '20%',
      flexDirection: 'column',
      textAlign: 'center',
    },
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
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      borderRadius: '10px',
      height: '3rem',
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  }),
  filterButtonsContainer: css({
    width: '60%',
    display: 'flex',
    justifyContent: 'space-evenly',
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      width: '100%',
    },
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
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      width: '100%',
      height: '4rem',
      marginTop: '1rem',
    },
  }),
}

type Task = {
  id: number
  name: string
  complete: boolean
}
type TaskProps = {
  task: Task
}

const useLogicState = () => {
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

  return {
    tasks,
    setTasks,
    filter,
    setFilter,
    taskName,
    setTaskName,
    completeTask,
    removeTask,
    getFilteredTasks,
  }
}

export const { ContextProvider: TodoContextProvider, Context: TodoContext } =
  genericHookContextBuilder(useLogicState)

export const TodoApp = () => {
  return (
    <TodoContextProvider>
      <TodosBoard />
    </TodoContextProvider>
  )
}

const TaskComponent = (props: TaskProps) => {
  const logic = useContext(TodoContext)
  return (
    <div css={[style.taskContainer, props.task.complete === true ? style.taskComplete : undefined]}>
      <button
        css={[style.taskButton, style.complete]}
        onClick={() => logic.completeTask(props.task.id)}
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
        onClick={() => logic.removeTask(props.task.id)}
      >
        X
      </button>
    </div>
  )
}

export const TodosBoard = () => {
  const logic = useContext(TodoContext)

  return (
    <div css={style.todoPage}>
      <Helmet>
        <title>Tomáš Pektor - Todo App</title>
        <meta name='description' content='Todo aplikace vytvořená ve frameworku React' />
        <link rel='canonical' href='http://tomaspektor.cz/todo-app' />
      </Helmet>
      <div css={style.todoContainer}>
        <form
          css={style.todoForm}
          onSubmit={e => {
            e.preventDefault()
            logic.setTasks([
              {
                id: generateID(),
                name: logic.taskName,
                complete: false,
              },
              ...logic.tasks,
            ])
            logic.setTaskName('')
          }}
        >
          <input
            css={style.todoInput}
            type='text'
            placeholder='Enter your task....'
            autoFocus={true}
            value={logic.taskName}
            onChange={e => logic.setTaskName(e.target.value)}
          />
        </form>
        <div css={style.taskList}>
          {logic.getFilteredTasks().map(task => (
            <TaskComponent key={task.id} task={task} />
          ))}
        </div>
        <nav css={style.taskFilterNav}>
          <p>{logic.tasks.filter(task => !task.complete).length} items left</p>
          <div css={style.filterButtonsContainer}>
            <button css={style.taskFilterButton} onClick={() => logic.setFilter('All')}>
              All
            </button>
            <button css={style.taskFilterButton} onClick={() => logic.setFilter('Active')}>
              Active
            </button>
            <button css={style.taskFilterButton} onClick={() => logic.setFilter('Complete')}>
              Complete
            </button>
          </div>
          <button
            css={style.taskRemoveButton}
            onClick={() => logic.setTasks(logic.tasks.filter(task => !task.complete))}
          >
            Remove completed
          </button>
        </nav>
      </div>
    </div>
  )
}
