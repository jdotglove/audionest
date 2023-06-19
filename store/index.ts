import { configureStore } from '@reduxjs/toolkit';

import tokenReducer from './reducers/tokenReducer';

// Automatically adds the thunk middleware and the Redux DevTools extension
export default configureStore({
  // Automatically calls `combineReducers`
  reducer: {
    token: tokenReducer,
  },
});

// export type AudioNestRootState = {
//   token: string,
// };

// let store: Store<AudioNestRootState, AnyAction> & {
//   dispatch: unknown
// };

// function initStore(initialState: { token?: any }) {
//   return createStore(
//     reducers,
//     initialState,
//     composeWithDevTools(applyMiddleware(thunkMiddleware)),
//   );
// }

// export const initialState = {
//   token: '',
// };

// export type AudioNestDispatch = typeof store.dispatch;

// export const initializeStore = (preloadedState: any) => {
//   let _store = store ?? initStore(preloadedState);

//   // After navigating to a page with an initial Redux state, merge that state
//   // with the current state in the store, and create a new store
//   if (preloadedState && store) {
//     _store = initStore({
//       ...store.getState(),
//       ...preloadedState,
//     });
//     // Reset the current store
//     store = undefined;
//   }

//   // For SSG and SSR always create a new store
//   if (typeof window === 'undefined') return _store;
//   // Create the store once in the client
//   if (!store) store = _store as typeof store;

//   return _store;
// };

// export function useStore(initialState) {
//   const store = useMemo(() => initializeStore(initialState), [initialState]);
//   return store;
// }