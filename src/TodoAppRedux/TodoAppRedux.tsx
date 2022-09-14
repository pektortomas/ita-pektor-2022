import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import {
  completeTask,
  removeCompleteTask,
  removeTask,
  setFilter,
  setNewTask,
  setSortTasks,
  setTaskName,
} from './todoAppSlice'
import { css, useTheme } from '@emotion/react'
import { generateID } from '../util/helperFunctions'
import { theme } from '../util/theme'
import { urls } from '../util/urls'
import { useAppDispatch, useAppSelector } from '../util/reduxTypedHooks'
import { useRef } from 'react'
import checkIcon from '../img/icons/check.svg'
import logo from '../img/logTP.svg'
import styled from '@emotion/styled'
import xmarkIcon from '../img/icons/xmark.svg'

/** @jsxImportSource @emotion/react */

type StyledRoundButtonProps = {
  buttonType?: string
}

const StyledBackButton = styled.button({
  background: theme.colors.react_blue_dark,
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
})

const StyledRoundButton = styled.button<StyledRoundButtonProps>(props => ({
  background: theme.colors.main_grey,
  border: '.5px solid',
  borderColor: theme.colors.white_transparent,
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
  boxShadow: theme.shadows.in_harder,
  transition: theme.transitions.allEaseOut,
  '&:hover': {
    borderColor:
      props.buttonType === 'complete'
        ? theme.colors.green
        : props.buttonType === 'remove'
        ? theme.colors.red
        : theme.colors.react_blue,
  },
}))

const StyledMainHeading = styled.h1({
  fontWeight: 'bolder',
  textTransform: 'uppercase',
  fontSize: '1.5rem',
  letterSpacing: '.3rem',
  margin: '0',
})

// const style = {
//   todoPage: css({
//     background: theme.colors.lightReactBlue,
//     minHeight: '100vh',
//     minWidth: '100%',
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//   }),
//   todoContainer: css({
//     display: 'flex',
//     margin: '2% 0',
//     minHeight: '20rem',
//     width: '50rem',
//     flexDirection: 'column',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     alignContent: 'center',
//     border: '1px solid',
//     borderColor: theme.colors.white,
//     [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
//       width: '90%',
//       textAlign: 'center',
//     },
//   }),
//   todoForm: css({
//     width: '100%',
//   }),
//   todoInput: css({
//     height: '5rem',
//     width: '100%',
//     border: 'none',
//     outline: 'none',
//     padding: '0',
//     textAlign: 'center',
//     fontSize: theme.fontSizes.midSize,
//   }),
//   taskList: css({
//     width: '100%',
//     margin: '5%',
//     minHeight: '10rem',
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'space-evenly',
//     alignItems: 'center',
//   }),
//   taskContainer: css({
//     padding: '3%',
//     width: '70%',
//     marginTop: '2%',
//     height: '3rem',
//     display: 'flex',
//     justifyContent: 'space-evenly',
//     backgroundColor: theme.colors.white,
//     color: theme.colors.black,
//     borderRadius: '3rem',
//     cursor: 'move',
//     [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
//       width: '90%',
//       textAlign: 'center',
//     },
//   }),
//   taskRow: css({
//     display: 'flex',
//     justifyContent: 'center',
//     width: '100%',
//   }),
//   taskTextContainer: css({
//     width: '70%',
//     display: 'inline-block',
//     textAlign: 'center',
//   }),
//   taskComplete: css({
//     opacity: '70%',
//   }),
//   taskTextCompleted: css({
//     textDecoration: 'line-through',
//   }),
//   taskButton: css({
//     borderRadius: '3rem',
//     width: '3rem',
//     height: '3rem',
//     border: 'none',
//     backgroundColor: theme.colors.reactBlue,
//     color: theme.colors.white,
//     cursor: 'pointer',
//     transition: theme.transitions.basicEaseIn,
//   }),
//   complete: css({
//     '&:hover': {
//       backgroundColor: theme.colors.green,
//     },
//   }),
//   remove: css({
//     '&:hover': {
//       backgroundColor: theme.colors.red,
//     },
//   }),
//   taskFilterNav: css({
//     width: '100%',
//     height: '3rem',
//     display: 'flex',
//     flexWrap: 'wrap',
//     justifyContent: 'space-evenly',
//     color: theme.colors.white,
//     [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
//       height: '20%',
//       flexDirection: 'column',
//       textAlign: 'center',
//     },
//   }),
//   taskFilterButton: css({
//     width: '30%',
//     border: '1px solid',
//     borderColor: theme.colors.white,
//     padding: '0 1rem',
//     borderTopLeftRadius: '10px',
//     borderTopRightRadius: '10px',
//     backgroundColor: theme.colors.white,
//     cursor: 'pointer',
//     [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
//       borderRadius: '10px',
//       height: '3rem',
//       textAlign: 'center',
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//   }),
//   filterButtonsContainer: css({
//     width: '60%',
//     display: 'flex',
//     justifyContent: 'space-evenly',
//     [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
//       width: '100%',
//     },
//   }),
//   disabled: css({
//     opacity: '0',
//   }),
//   taskRemoveButton: css({
//     width: '20%',
//     border: 'none',
//     padding: '0 1rem',
//     borderTopLeftRadius: '10px',
//     borderTopRightRadius: '10px',
//     backgroundColor: theme.colors.red,
//     color: theme.colors.white,
//     cursor: 'pointer',
//     [`@media (max-width: ${theme.mediaMaxSizes.tablet})`]: {
//       width: '100%',
//       height: '4rem',
//       marginTop: '1rem',
//     },
//   }),
// }

const style = {
  page: css({
    maxWidth: '100%',
    margin: '0',
    padding: '0 5rem',
    height: '100%',
    minHeight: '100vh',
    background: theme.colors.main_grey,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    color: theme.colors.white,
  }),
  logo: css({
    width: '4rem',
  }),
  content: css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    textAlign: 'center',
    width: '70%',
    margin: '0 auto',
  }),
  mainContent: css({
    margin: '3rem auto',
  }),
  topRow: css({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '5rem 0',
  }),
  reactText: css({
    fontWeight: 'light',
    textTransform: 'uppercase',
    fontSize: '0.8rem',
    letterSpacing: '.5rem',
    color: theme.colors.react_blue,
  }),
  heading: css({
    margin: '1rem 0',
  }),
  input: css({
    color: theme.colors.white,
    textTransform: 'uppercase',
    letterSpacing: '.2rem',
    boxShadow: theme.shadows.in_hard,
    background: theme.colors.dark_grey,
    height: '3rem',
    borderRadius: '5px',
    border: 'none',
    outline: 'none',
    width: '95%',
    textAlign: 'center',
    padding: '0 1rem',
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
    cursor: 'move',
  }),
  taskComplete: css({
    background: theme.colors.white_transparent,
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
      borderColor: theme.colors.react_blue,
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
    <div css={[style.task, props.task.complete === true ? style.taskComplete : undefined]}>
      <StyledRoundButton
        buttonType='complete'
        // css={[style.taskButton, style.complete]}
        onClick={() => dispatch(completeTask(props.task.id))}
      >
        <img css={style.iconC} src={checkIcon} />
      </StyledRoundButton>
      <div>
        <p>{props.task.name}</p>
      </div>
      <StyledRoundButton
        buttonType='remove'
        // css={[style.taskButton, style.remove]}
        onClick={() => dispatch(removeTask(props.task.id))}
      >
        <img css={style.iconX} src={xmarkIcon} />
      </StyledRoundButton>
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
    <div css={style.page}>
      <Helmet>
        <title>Tomáš Pektor - Todo App</title>
        <meta name='description' content='Todo aplikace vytvořená ve frameworku React' />
        <link rel='canonical' href='http://tomaspektor.cz/todo-app' />
      </Helmet>
      <div css={style.topRow}>
        <Link to={urls.home}>
          <StyledBackButton>Back to Home Page</StyledBackButton>
        </Link>
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
                  id: generateID(),
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
          <div css={style.taskContainer}>
            {getFilteredTasks(todoAppState).map((task, index) => (
              <div
                key={task.id}
                draggable
                onDragStart={e => (dragItem.current = index)}
                onDragEnter={e => (dragOverItem.current = index)}
                onDragEnd={() =>
                  dispatch(
                    setSortTasks({
                      dragItem: dragItem.current!,
                      dragOverItem: dragOverItem.current!,
                    })
                  )
                }
                onDragOver={e => e.preventDefault()}
              >
                <TaskComponent task={task} index={index} />
              </div>
            ))}
          </div>
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
        </div>
      </div>
    </div>
  )
}
