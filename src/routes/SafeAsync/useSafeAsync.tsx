import {
  useReducer,
  useRef,
  useLayoutEffect,
  useCallback,
} from 'react';

type ApiResponse<T> = {
  status: 'idle' | 'pending' | 'resolved' | 'rejected';
  data: T | null;
  error: string | null;
};

const useSafeDispatch = (
  unsafeDispatchFunction: (...args: any[]) => void,
) => {
  const isMountedRef = useRef(false);

  // why use layout effect ?
  // this effect is called before the component is
  // shown on the screen, while use effect is called after
  // in our case:
  // we would want to switch (or ignore updates) as quickly as possible
  useLayoutEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  });

  const safeDispatchFunction = useCallback(
    (...args: any[]) => {
      isMountedRef.current
        ? unsafeDispatchFunction(...args)
        : undefined;
    },
    [unsafeDispatchFunction],
  );

  return safeDispatchFunction;
};

const asyncReducer = <T,>(_, nextState: ApiResponse<T>) => nextState;

const useSafeAsync = <T,>() => {
  const [state, unsafeDispatch] = useReducer(asyncReducer, {
    status: 'idle',
    data: null,
    error: null,
  });

  const dispath = useSafeDispatch(unsafeDispatch);

  const { data, error, status } = state;

  const runFunction = useCallback(
    (promise: any) => {
      dispath({ status: 'pending' });
      promise.then(
        (data: any) => dispath({ data, status: 'resolved' }),
        (error: any) =>
          dispath({ error: error.toString(), status: 'rejected' }),
      );
    },
    [dispath],
  );

  const reset = useCallback(
    () => dispath({ status: 'idle' }),
    [dispath],
  );

  return {
    error,
    status,
    data: data as T | null,
    runFunction,
    reset,
  };
};

export default useSafeAsync;
