import { useState, useCallback } from 'react';

const isFunction = (functionToCheck: any) => {
  return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
 }

const useMergeState = (initialState) => {
  const [state, setState] = useState(initialState || {});

  const mergeState = useCallback(newState => {
    setState({
      ...state,
      ...newState,
    })
  }, [state]);

  return [state, mergeState];
};

export default useMergeState;