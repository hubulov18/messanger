import { useCallback, useEffect, useMemo, useRef } from 'react';

export function useLatestRequestGuard() {
  const latestRequestIdRef = useRef(0);
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const beginRequest = useCallback(() => {
    latestRequestIdRef.current += 1;
    return latestRequestIdRef.current;
  }, []);

  const isLatestRequest = useCallback((requestId: number) => {
    return mountedRef.current && latestRequestIdRef.current === requestId;
  }, []);

  return useMemo(() => ({
    beginRequest,
    isLatestRequest,
  }), [beginRequest, isLatestRequest]);
}
