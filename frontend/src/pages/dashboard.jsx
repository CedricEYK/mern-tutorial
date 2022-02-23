import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import GoalForm from '../components/goalForm'
import Spinner  from '../components/spinner'
import { readGoals, reset } from '../features/goals/goalsSlice'
function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const {goals, isLoading, isError, message} = useSelector((state) => state.goals)
  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(readGoals())

    return () => {
      dispatch(reset())
    }

  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
      <h1>Welcome {user && user.name}</h1>
      <p>Goals Dashboard</p>
      </section>
      <GoalForm />
    </>
  )
}

export default Dashboard