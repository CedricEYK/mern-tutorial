import axios from 'axios';

const API_URL = '/api/goals/';

//* Create new goal
const createGoal = async (goalData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, goalData, config);

  return response.data;
};
//* Show goals
const readGoals = async (_, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};
//* Update goals

//* Delete goal

const goalService = {
  createGoal,
  readGoals,
};

export default goalService;
