import { Helmet } from 'react-helmet'
import {
  completeTask,
  removeCompleteTask,
  removeTask,
  setFilter,
  setNewTask,
  setSortTasks,
  setTaskName,
} from './todoAppSlice'
import { css } from '@emotion/react'
import { generateID } from '../util/helperFunctions'
import { theme } from '../util/theme'
import { useAppDispatch, useAppSelector } from '../util/reduxTypedHooks'
import { useRef } from 'react'

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
    cursor: 'move',
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      width: '90%',
      textAlign: 'center',
    },
  }),
  taskRow: css({
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
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
  index: number
}

type TodoAppState = {
  tasks: Task[]
  filter: string
  taskName: string
}

const TaskComponent = (props: TaskProps) => {
  const todoAppState = useAppSelector(state => state.todoApp)
  const dispatch = useAppDispatch()

  return (
    <div css={[style.taskRow, props.task.complete === true ? style.taskComplete : undefined]}>
      <button
        css={[style.taskButton, style.complete]}
        onClick={() => dispatch(completeTask(props.task.id))}
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
        onClick={() => dispatch(removeTask(props.task.id))}
      >
        X
      </button>
    </div>
  )
}

export const TodoAppRedux = () => {
  const todoAppState = useAppSelector(state => state.todoApp)
  const dispatch = useAppDispatch()

  const dragItem = useRef(0)
  const dragOverItem = useRef(0)

  const getFilteredTasks = (state: TodoAppState) => {
    if (state.filter === 'Active') {
      return state.tasks.filter(task => !task.complete)
    } else if (state.filter === 'Complete') {
      return state.tasks.filter(task => task.complete)
    } else {
      return state.tasks
    }
  }

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
            dispatch(
              setNewTask({
                id: generateID(),
                name: todoAppState.taskName,
                complete: false,
              } as Task)
            )
          }}
        >
          <input
            css={style.todoInput}
            type='text'
            placeholder='Enter your task....'
            autoFocus={true}
            value={todoAppState.taskName}
            onChange={e => dispatch(setTaskName(e.target.value))}
          />
        </form>
        <div css={style.taskList}>
          {getFilteredTasks(todoAppState).map((task, index) => (
            <div
              css={style.taskContainer}
              key={task.id}
              draggable
              onDragStart={e => (dragItem.current = index)}
              onDragEnter={e => (dragOverItem.current = index)}
              onDragEnd={() =>
                dispatch(
                  setSortTasks({ dragItem: dragItem.current!, dragOverItem: dragOverItem.current! })
                )
              }
              onDragOver={e => e.preventDefault()}
            >
              <TaskComponent task={task} index={index} />
            </div>
          ))}
        </div>
        <nav css={style.taskFilterNav}>
          <p>{todoAppState.tasks.filter(task => !task.complete).length} items left</p>
          <div css={style.filterButtonsContainer}>
            <button css={style.taskFilterButton} onClick={() => dispatch(setFilter('All'))}>
              All
            </button>
            <button css={style.taskFilterButton} onClick={() => dispatch(setFilter('Active'))}>
              Active
            </button>
            <button css={style.taskFilterButton} onClick={() => dispatch(setFilter('Complete'))}>
              Complete
            </button>
          </div>
          <button css={style.taskRemoveButton} onClick={() => dispatch(removeCompleteTask())}>
            Remove completed
          </button>
        </nav>
      </div>
    </div>
  )
}