import { useEffect, useRef, DependencyList } from 'react';

type EffectCallback = () => void | (() => void | undefined);

const useUpdateEffect = (effect: EffectCallback, dependencies: DependencyList) => {
  const isFirstRender = useRef<boolean>(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    return effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
};

export default useUpdateEffect;
