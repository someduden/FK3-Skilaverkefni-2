import type { Meta, StoryObj } from '@storybook/react-vite';

import { ProjectTasksChart } from '../Chart';
import { GlobalProvider } from '@/shared/context';
import type { Task } from '../../../tasks/model/task';

const meta = {
  title: 'Features/Project/Chart/Chart',
  component: ProjectTasksChart,
} satisfies Meta<typeof ProjectTasksChart>;

export default meta;

type Story = StoryObj<typeof meta>;

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Task 1',
    description: 'Do something',
    completed: true,
    priority: 'low',
    projectId: '1',
  },
  {
    id: '2',
    title: 'Task 2',
    description: 'Do something else',
    completed: false,
    priority: 'medium',
    projectId: '2',
  },
];

export const Empty: Story = {
  decorators: [
    (Story) => (
      <GlobalProvider overrideValue={{ tasks: [] }}>
        <Story />
      </GlobalProvider>
    ),
  ],
};

export const MixedTasks: Story = {
  decorators: [
    (Story) => (
      <GlobalProvider
        overrideValue={{
          tasks: mockTasks,
          projects: [],
          activeProject: null,
        }}
      >
        <Story />
      </GlobalProvider>
    ),
  ],
};

export const AllComplete: Story = {
  decorators: [
    (Story) => (
      <GlobalProvider
        overrideValue={{
          tasks: [
            {
              id: '1',
              title: 'Task 1',
              description: 'Do something',
              completed: true,
              priority: 'low',
              projectId: '1',
            },
            {
              id: '2',
              title: 'Task 2',
              description: 'Do something else',
              completed: true,
              priority: 'medium',
              projectId: '2',
            },
          ],
        }}
      >
        <Story />
      </GlobalProvider>
    ),
  ],
};
