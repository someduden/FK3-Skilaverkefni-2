import { beforeEach, describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import ProjectList from '../ProjectList';
import { GlobalProvider } from '@/shared/context';

describe('AddProject', () => {
  const user = userEvent.setup();
  beforeEach(() => {
    render(
      <GlobalProvider>
        <ProjectList />
      </GlobalProvider>,
    );
  });

  it('opens add project dialog', async () => {
    await user.click(screen.getByRole('button', { name: 'Add project' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
