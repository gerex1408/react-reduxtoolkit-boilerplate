import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fetchTasks } from '../store/tasks';

const stateSelector = createStructuredSelector({
  tasks: (state) => state.tasks,
});

export function Task() {
  const dispatch = useDispatch();
  const { tasks } = useSelector(stateSelector);

  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  if (tasks.isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      {tasks.data.map((task) => (
        <div key={task.id}>{task.title}</div>
      ))}
    </div>
  );
}
