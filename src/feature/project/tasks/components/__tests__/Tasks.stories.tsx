import type { Meta, StoryObj } from '@storybook/react-vite';

import Tasks from '../Tasks';
import { GlobalProvider } from '@/shared/context';
import type { Task } from '../../model/task';
import type { Project } from '@/feature/project/list/model/project';

const meta = {
  component: Tasks,
} satisfies Meta<typeof Tasks>;

export default meta;

type Story = StoryObj<typeof meta>;

const mockProject: Project = {
  id: '1',
  name: 'Test Project',
  description: 'Storybook project',
  tasksCount: 1,
};

const baseTask: Task = {
  id: '1',
  title: 'Task 1',
  description: 'Test',
  completed: false,
  priority: 'medium',
  projectId: '1',
};

export const Default: Story = {
  decorators: [
    (Story) => (
      <GlobalProvider
        overrideValue={{
          tasks: [baseTask],
          projects: [mockProject],
          activeProject: mockProject,
        }}
      >
        <Story />
      </GlobalProvider>
    ),
  ],
};

export const Completed: Story = {
  decorators: [
    (Story) => (
      <GlobalProvider
        overrideValue={{
          tasks: [
            {
              ...baseTask,
              completed: true,
            },
          ],
          projects: [mockProject],
          activeProject: mockProject,
        }}
      >
        <Story />
      </GlobalProvider>
    ),
  ],
};

export const HighPriority: Story = {
  decorators: [
    (Story) => (
      <GlobalProvider
        overrideValue={{
          tasks: [
            {
              ...baseTask,
              priority: 'high',
              title: 'Urgent task',
            },
          ],
          projects: [mockProject],
          activeProject: mockProject,
        }}
      >
        <Story />
      </GlobalProvider>
    ),
  ],
};

export const EmptyState: Story = {
  decorators: [
    (Story) => (
      <GlobalProvider
        overrideValue={{
          tasks: [],
          projects: [mockProject],
          activeProject: mockProject,
        }}
      >
        <Story />
      </GlobalProvider>
    ),
  ],
};

export const NoProjectSelected: Story = {
  decorators: [
    (Story) => (
      <GlobalProvider
        overrideValue={{
          tasks: [],
          projects: [],
          activeProject: null,
        }}
      >
        <Story />
      </GlobalProvider>
    ),
  ],
};
