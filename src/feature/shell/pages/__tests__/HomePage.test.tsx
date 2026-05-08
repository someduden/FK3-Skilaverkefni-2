import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { HomePage } from '../HomePage';
import { GlobalProvider } from '@/shared/context';
import { DataPersist } from '@/shared/components/DataPersist';

describe('HomePage', () => {
  it('shows a header', () => {
    render(
      <GlobalProvider>
        <DataPersist>
          <HomePage />
        </DataPersist>
      </GlobalProvider>,
    );
    expect(
      screen.getByRole('heading', { name: 'Team Task Hub' }),
    ).toBeInTheDocument();
  });
});
