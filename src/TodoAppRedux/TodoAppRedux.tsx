import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd'
import { HashLink } from 'react-router-hash-link'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { ReactElement } from 'react-markdown/lib/react-markdown'
import {
  completeTask,
  removeCompleteTask,
  removeTask,
  setFilter,
  setNewTask,
  setNewTaskOrder,
  setSortTasks,
  setTaskName,
} from './todoAppSlice'
import { css, useTheme } from '@emotion/react'
import { customClasses, theme } from '../util/theme'
import { generateID } from '../util/helperFunctions'
import { stringify } from 'querystring'
import { urls } from '../util/urls'
import { useAppDispatch, useAppSelector } from '../util/reduxTypedHooks'
import { useRef, useState } from 'react'
import checkIcon from '../img/icons/check.svg'
import logo from '../img/logTP.svg'
import styled from '@emotion/styled'
import xmarkIcon from '../img/icons/xmark.svg'

/** @jsxImportSource @emotion/react */

type StyledRoundButtonProps = {
  buttonType?: string
}

const StyledBackButton = styled.button({
  background: theme.colors.reactBlueDark,
  border: 'none',
  width: '12rem',
  height: '3rem',
  fontSize: '0.6rem',
  textTransform: 'uppercase',
  borderRadius: '8px',
  color: theme.colors.white,
  fontWeight: 'bolder',
  letterSpacing: '.1rem',
  cursor: 'pointer',
  transition: theme.transitions.allEaseOut,
  '&:hover': {
    filter: theme.glows.reactGlowSVG,
  },
  [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
    margin: '2rem 0',
  },
})

const StyledRoundButton = styled.button<StyledRoundButtonProps>(props => ({
  background: theme.colors.main_grey,
  border: '.5px solid',
  borderColor: theme.colors.whiteTransparent,
  width: '2.5rem',
  height: '2.5rem',
  margin: '.5rem',
  fontSize: '0.6rem',
  textTransform: 'uppercase',
  borderRadius: '50%',
  color: theme.colors.white,
  fontWeight: 'bolder',
  letterSpacing: '.1rem',
  cursor: 'pointer',
  boxShadow: theme.shadows.inHarder,
  transition: theme.transitions.allEaseOut,
  '&:hover': {
    borderColor:
      props.buttonType === 'complete'
        ? theme.colors.green
        : props.buttonType === 'remove'
        ? theme.colors.red
        : theme.colors.reactBlue,
  },
  [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
    margin: '1rem 0',
  },
}))

const StyledMainHeading = styled.h1({
  fontWeight: 'bolder',
  textTransform: 'uppercase',
  fontSize: '1.5rem',
  letterSpacing: '.3rem',
  margin: '0',
})

const style = {
  page: css({
    maxWidth: '100vw',
    margin: '0',
    padding: '0 5rem',
    height: '100%',
    minHeight: '100vh',
    background: theme.colors.main_grey,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    color: theme.colors.white,
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      padding: '0',
      justifyContent: 'center',
    },
  }),
  logo: css({
    width: '4rem',
    [`@media (max-width: ${theme.mediaMaxSizes.mobile})`]: {
      width: '3rem',
      marginBottom: '1rem',
    },
  }),
  content: css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    textAlign: 'center',
    width: '70%',
    margin: '0 auto',
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      width: '100%',
    },
  }),
  mainContent: css({
    margin: '3rem auto',
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      width: '90%',
      justifyContent: 'center',
    },
  }),
  topRow: css({
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    padding: '3rem 0',
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      padding: '2rem 0 0 0 ',
      justifyContent: 'center',
    },
  }),
  reactText: css({
    fontWeight: 'light',
    textTransform: 'uppercase',
    fontSize: '0.8rem',
    letterSpacing: '.5rem',
    color: theme.colors.reactBlue,
  }),
  heading: css({
    margin: '1rem 0',
  }),
  input: css({
    color: theme.colors.white,
    textTransform: 'uppercase',
    letterSpacing: '.2rem',
    boxShadow: theme.shadows.inHard,
    background: theme.colors.dark_grey,
    height: '3rem',
    borderRadius: '5px',
    border: 'none',
    outline: 'none',
    width: '95%',
    textAlign: 'center',
    padding: '0 1rem',
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      width: '90%',
      fontSize: '.6rem',
    },
  }),
  taskContainer: css({
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    padding: '1rem 0',
  }),
  task: css({
    background: theme.colors.main_grey,
    boxShadow: theme.shadows.out,
    textTransform: 'uppercase',
    fontSize: '0.8rem',
    borderRadius: '5px',
    height: '3.5rem',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '1rem 0',
    cursor: 'grab',
  }),
  taskComplete: css({
    background: theme.colors.whiteTransparent,
    opacity: 0.5,
    textTransform: 'uppercase',
    textDecoration: 'line-through',
    fontSize: '0.8rem',
    borderRadius: '5px',
    height: '3.5rem',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '1rem 0',
  }),
  taskLeft: css({
    textTransform: 'uppercase',
    fontSize: '0.8rem',
    margin: '2rem 0',
  }),
  iconC: css({
    width: '1rem',
  }),
  iconX: css({
    width: '.7rem',
  }),
  filterRow: css({
    width: '100%',
    justifyContent: 'center',
    display: 'flex',
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-around',
      height: '20%',
    },
  }),
  clickButton: css({
    background: theme.colors.main_grey,
    border: 'none',
    width: '10rem',
    height: '2.5rem',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: theme.shadows.out,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '.3rem',
    margin: '0 1rem',
    [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
      margin: '.5rem 0',
    },
  }),
  innerButton: css({
    background: theme.colors.main_grey,
    border: '1px solid',
    color: theme.colors.white,
    borderColor: theme.colors.dark_grey,
    boxShadow: theme.shadows.inOut,
    width: '100%',
    height: '100%',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.6rem',
    textTransform: 'uppercase',
    letterSpacing: '.2rem',
    transition: theme.transitions.allEaseOut,
    '&:hover': {
      filter: theme.glows.reactGlowSVG_little,
      borderColor: theme.colors.reactBlue,
    },
  }),
}

type Task = {
  id: string
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

const reorder = (list: any, startIndex: any, endIndex: any) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const TaskComponent = (props: TaskProps) => {
  const dispatch = useAppDispatch()

  return (
    <div css={[style.task, props.task.complete === true ? style.taskComplete : undefined]}>
      <StyledRoundButton
        buttonType='complete'
        onClick={() => dispatch(completeTask(props.task.id))}
      >
        <img css={style.iconC} src={checkIcon} />
      </StyledRoundButton>
      <div>
        <p>{props.task.name}</p>
      </div>
      <StyledRoundButton buttonType='remove' onClick={() => dispatch(removeTask(props.task.id))}>
        <img css={style.iconX} src={xmarkIcon} />
      </StyledRoundButton>
    </div>
  )
}

export const TodoAppRedux = () => {
  const todoAppState = useAppSelector(state => state.todoApp)
  const dispatch = useAppDispatch()

  const getFilteredTasks = (state: TodoAppState) => {
    if (state.filter === 'Active') {
      return state.tasks.filter(task => !task.complete)
    } else if (state.filter === 'Complete') {
      return state.tasks.filter(task => task.complete)
    } else {
      return state.tasks
    }
  }

  const tasks = getFilteredTasks(todoAppState)

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }

    const reorderItems = reorder(
      tasks as Task[],
      result.source.index,
      result.destination.index
    ) as Task[]
    dispatch(setNewTaskOrder(reorderItems))
  }

  return (
    <div css={style.page}>
      <Helmet>
        <title>Tomáš Pektor - Todo App</title>
        <meta name='description' content='Todo aplikace vytvořená ve frameworku React' />
        <link rel='canonical' href='http://tomaspektor.cz/todo-app' />
      </Helmet>
      <div css={style.topRow}>
        <HashLink to={urls.portfolioHash} css={customClasses.tabletHidden}>
          <StyledBackButton>Back to Home Page</StyledBackButton>
        </HashLink>
        <img css={style.logo} src={logo} />
      </div>
      <div css={style.content}>
        <div css={style.heading}>
          <StyledMainHeading>Todo App</StyledMainHeading>
          <span css={style.reactText}>Any Tasks to Do?</span>
        </div>
        <div css={style.mainContent}>
          <form
            onSubmit={e => {
              e.preventDefault()
              dispatch(
                setNewTask({
                  id: `${generateID()}`,
                  name: todoAppState.taskName,
                  complete: false,
                } as Task)
              )
            }}
          >
            <input
              css={style.input}
              type='text'
              placeholder='Enter your task....'
              value={todoAppState.taskName}
              onChange={e => dispatch(setTaskName(e.target.value))}
            />
          </form>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='droppable'>
              {provided => (
                <div css={style.taskContainer} {...provided.droppableProps} ref={provided.innerRef}>
                  {tasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {provided => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TaskComponent task={task} index={index} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <p css={style.taskLeft}>
            {todoAppState.tasks.filter(task => !task.complete).length} items left
          </p>

          <div css={style.filterRow}>
            <div css={style.clickButton}>
              <button css={style.innerButton} onClick={() => dispatch(setFilter('All'))}>
                All
              </button>
            </div>
            <div css={style.clickButton}>
              <button css={style.innerButton} onClick={() => dispatch(setFilter('Active'))}>
                Active
              </button>
            </div>
            <div css={style.clickButton}>
              <button css={style.innerButton} onClick={() => dispatch(setFilter('Complete'))}>
                Complete
              </button>
            </div>
          </div>
          <HashLink to={urls.portfolioHash} css={customClasses.desktopHidden}>
            <StyledBackButton>Back to Home Page</StyledBackButton>
          </HashLink>
        </div>
      </div>
    </div>
  )
}
