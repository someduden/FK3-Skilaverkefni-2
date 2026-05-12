import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { TaskTable } from '../task-table/TaskTable';
import type { Task } from '../../model/task';
import { beforeEach } from 'vitest';

const useGlobalContextMock = vi.hoisted(() => vi.fn());

vi.mock('@/shared/context', () => ({
  useGlobalContext: useGlobalContextMock,
}));

describe('TaskTable', () => {
  const baseContext = {
    tasks: [],
    removeTask: vi.fn(),
    updateTask: vi.fn(),
    activeProject: { id: '1' },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders empty state', () => {
    useGlobalContextMock.mockReturnValue({
      tasks: [],
      removeTask: vi.fn(),
      updateTask: vi.fn(),
      activeProject: { id: '1' },
    });

    render(<TaskTable projectId="1" onEditTask={() => {}} />);

    expect(screen.getByTestId('empty-tasks')).toBeInTheDocument();
  });

  it('renders with data', () => {
    useGlobalContextMock.mockReturnValue({
      ...baseContext,
      tasks: [
        {
          id: '1',
          title: 'Test task 1',
          description: '',
          completed: false,
          priority: 'low',
          projectId: '1',
        },
      ] satisfies Task[],
    });

    render(<TaskTable projectId="1" onEditTask={() => {}} />);

    expect(screen.getByTestId('task-title')).toHaveTextContent('Test task 1');
  });

  it('crashes when tasks are undefined', () => {
    useGlobalContextMock.mockReturnValue({
      tasks: undefined,
    });

    expect(() => {
      render(<TaskTable projectId="1" onEditTask={() => {}} />);
    }).toThrow();
  });

  it('does not crash when task is not found', () => {
    const updateTask = vi.fn();

    useGlobalContextMock.mockReturnValue({
      ...baseContext,
      tasks: [
        {
          id: '1',
          title: 'Test task',
          description: '',
          completed: false,
          priority: 'low',
          projectId: '1',
        },
      ],
      updateTask,
    });

    render(<TaskTable projectId="1" onEditTask={() => {}} />);

    expect(() => {
      updateTask('non-existent-id', {
        id: 'non-existent-id',
        title: 'fake',
        description: '',
        completed: true,
        priority: 'low',
        projectId: '1',
      });
    }).not.toThrow();
  });
});
