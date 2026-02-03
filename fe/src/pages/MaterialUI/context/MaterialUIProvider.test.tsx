import { useContext } from 'react';

import * as apiMaterialUI from 'src/api/apiMaterialUI';
import {
  describe, expect, it, vi 
} from 'vitest';
import {
  fireEvent, render, screen, waitFor 
} from '@testing-library/react';

import {
  IMarvelHeroesData, IMarvelHeroesDataTable 
} from '../interfaces';

import { MaterialUIContext } from './MaterialUIContext';
import { MaterialUIProvider } from './MaterialUIProvider';

// Mock DeleteHeroButton to avoid rendering heavy UI inside provider
vi.mock('src/pages/MaterialUI/components', () => ({
  DeleteHeroButton: (props: IMarvelHeroesDataTable) => (
    <button data-testid={`delete-${props?.id ?? 'btn'}`}>Delete</button>
  ),
}));


describe('MaterialUIProvider dataUsage switching', () => {
  it('updates data when switching between local and remote', async () => {
    // Mock remote fetch
    // `apiMaterialUI` is exported as default object, so target `default.getAllHeroes` on the imported module namespace
    vi.spyOn((apiMaterialUI).default, 'getAllHeroes').mockResolvedValue([
      {
        id: 'remote-1',
        name: 'Remote Hero 1',
        gender: 'male' 
      },
      {
        id: 'remote-2',
        name: 'Remote Hero 2',
        gender: 'female' 
      },
      {
        id: 'remote-3',
        name: 'Remote Hero 3',
        gender: 'male' 
      },
    ] as IMarvelHeroesDataTable[]);

    const initData = [ {
      name: 'Local Hero',
      gender: 'female' 
    } ] as IMarvelHeroesData[];

    const Consumer = () => {
      const ctx = useContext(MaterialUIContext);
      return (
        <div>
          <div data-testid="data-names">{(ctx.data || []).map((d: IMarvelHeroesDataTable) => d.name).join(',')}</div>
          <button onClick={() => ctx.setDataUsage('remote')}>remote</button>
          <button onClick={() => ctx.setDataUsage('local')}>local</button>
        </div>
      );
    };

    render(
      <MaterialUIProvider initData={initData}>
        <Consumer />
      </MaterialUIProvider>,
    );

    // Initially should show local data
    await waitFor(() => expect(screen.getByTestId('data-names').textContent).toContain('Local Hero'));

    // Switch to remote
    fireEvent.click(screen.getByText('remote'));
    await waitFor(() => expect(screen.getByTestId('data-names').textContent).toContain('Remote Hero'));

    // Switch back to local
    fireEvent.click(screen.getByText('local'));
    await waitFor(() => expect(screen.getByTestId('data-names').textContent).toContain('Local Hero'));
  });
});
