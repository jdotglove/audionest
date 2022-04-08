import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { AudioNestRootState, AudioNestDispatch } from '.';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAudioNestDispatch = () => useDispatch<AudioNestDispatch>();
export const useAudioNestSelector: TypedUseSelectorHook<AudioNestRootState> = useSelector;