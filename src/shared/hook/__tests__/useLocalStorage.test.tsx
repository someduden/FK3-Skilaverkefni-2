import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '../useLocalStorage';

describe('useLocalStorage hook', () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.clearAllMocks();
  });

  it('should initialize with value from localStorage', () => {
    window.localStorage.setItem('theme', JSON.stringify('dark'));

    const { result } = renderHook(() => useLocalStorage('theme', 'light'));

    expect(result.current[0]).toBe('dark');
  });

  it('should update localStorage when state changes', () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

    const { result } = renderHook(() => useLocalStorage('count', 0));

    act(() => {
      result.current[1](10);
    });

    expect(result.current[0]).toBe(10);
    expect(setItemSpy).toHaveBeenCalledWith('count', JSON.stringify(10));
  });
});
