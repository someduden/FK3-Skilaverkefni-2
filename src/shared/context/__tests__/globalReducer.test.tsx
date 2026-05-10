import { describe, it, expect } from 'vitest';
import { globalReducer, initialState } from '../globalReducer';

describe('globalReducer', () => {
  it('should add a task', () => {
    const newTask = {
      id: '1',
      title: 'Test task',
      description: 'Testing',
      completed: false,
      priority: 'low' as const,
      projectId: 'p1',
    };

    const action = {
      type: 'ADD_TASK' as const,
      payload: {
        task: newTask,
        projectId: 'p1',
      },
    };

    const newState = globalReducer(initialState, action);

    expect(newState.tasks).toHaveLength(1);
    expect(newState.tasks[0]).toEqual(newTask);
  });

  it('should remove a task', () => {
    const existingTask = {
      id: '1',
      title: 'Test task',
      description: 'Testing',
      completed: false,
      priority: 'low' as const,
      projectId: 'p1',
    };

    const stateWithTask = {
      ...initialState,
      tasks: [existingTask],
    };

    const action = {
      type: 'REMOVE_TASK' as const,
      payload: { taskId: '1' },
    };

    const newState = globalReducer(stateWithTask, action);
    console.log(newState.tasks);
    expect(newState.tasks).toHaveLength(0);
  });

  it('should not remove task if id does not match exactly', () => {
    const existingTask = {
      id: '1',
      title: 'Test task',
      description: 'Testing',
      completed: false,
      priority: 'low' as const,
      projectId: 'p1',
    };

    const stateWithTask = {
      ...initialState,
      tasks: [existingTask],
    };

    const action = {
      type: 'REMOVE_TASK' as const,
      payload: { taskId: '1 ' }, //Extra space after the '1'
    };

    const newState = globalReducer(stateWithTask, action);

    expect(newState.tasks).toHaveLength(1);
  });

  it('should update a task', () => {
    const existingTask = {
      id: '1',
      title: 'Test task',
      description: 'Testing',
      completed: false,
      priority: 'low' as const,
      projectId: 'p1',
    };

    const stateWithTask = {
      ...initialState,
      tasks: [existingTask],
    };

    const updatedTask = {
      ...existingTask,
      completed: true,
    };

    const action = {
      type: 'UPDATE_TASK' as const,
      payload: {
        taskId: '1',
        task: updatedTask,
      },
    };

    const newState = globalReducer(stateWithTask, action);

    expect(newState.tasks[0].completed).toBe(true);
  });
});
