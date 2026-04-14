import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';

type Theme = 'light' | 'dark';

type State = {
  theme: Theme;
};

export const ThemeStore = signalStore(
  { providedIn: 'root' },

  withState<State>({
    theme: (localStorage.getItem('theme') as Theme) ?? 'light',
  }),

  withMethods((store) => ({
    toggleTheme() {
      const current = store.theme();
      const next = current === 'light' ? 'dark' : 'light';

      localStorage.setItem('theme', next);

      patchState(store, { theme: next });
    },

    setTheme(theme: Theme) {
      localStorage.setItem('theme', theme);
      patchState(store, { theme });
    },
  })),
);
