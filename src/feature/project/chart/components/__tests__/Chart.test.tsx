import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProjectTasksChart } from '../Chart';
import { GlobalProvider } from '@/shared/context';
import type { Task } from '@/feature/project/tasks/model/task';

function renderWithProvider(tasks: Task[]) {
  return render(
    <GlobalProvider
      overrideValue={{
        tasks,
        projects: [],
        activeProject: null,
      }}
    >
      <ProjectTasksChart />
    </GlobalProvider>,
  );
}

describe('ProjectTaskChart', () => {
  it('shows empty message when no tasks', () => {
    renderWithProvider([]);

    expect(screen.getByText(/no tasks yet/i)).toBeInTheDocument();
  });

  it('shows correct task counts', () => {
    const tasks: Task[] = [
      {
        id: '1',
        title: 'Task 1',
        description: 'Test',
        completed: true,
        priority: 'low',
        projectId: 'p1',
      },
      {
        id: '2',
        title: 'Task 2',
        description: 'Test',
        completed: false,
        priority: 'high',
        projectId: 'p1',
      },
    ];

    renderWithProvider(tasks);

    expect(screen.getByText(/2 tasks total/i)).toBeInTheDocument();
    expect(screen.getByText(/1 complete · 1 incomplete/i)).toBeInTheDocument();
  });
});
