import type { Meta, StoryObj } from '@storybook/react-vite';

import ProjectList from '../ProjectList';
import type { Project } from '../../model/project';
import { GlobalProvider } from '@/shared/context';

const meta = {
  title: 'Features/Projects/ProjectList',
  component: ProjectList,
} satisfies Meta<typeof ProjectList>;

export default meta;

type Story = StoryObj<typeof meta>;

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Project 1',
    description: 'First project',
    tasksCount: 3,
  },
  {
    id: '2',
    name: 'Project 2',
    description: 'Second project',
    tasksCount: 5,
  },
];

const withProvider = (overrideValue: any) => (Story: any) => (
  <GlobalProvider overrideValue={overrideValue}>
    <Story />
  </GlobalProvider>
);

export const NoProjects: Story = {
  decorators: [
    withProvider({
      projects: [],
      activeProject: null,
    }),
  ],
};

export const WithProjects: Story = {
  decorators: [
    withProvider({
      projects: mockProjects,
      activeProject: null,
    }),
  ],
};

export const ActiveProject: Story = {
  decorators: [
    withProvider({
      projects: mockProjects,
      activeProject: mockProjects[0],
    }),
  ],
};
