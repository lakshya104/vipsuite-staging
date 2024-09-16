/* eslint-disable react/prop-types */
'use client';

import { AnimatePresence, motion, MotionValue, useMotionTemplate, useSpring } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { createContext, startTransition, useContext, useEffect, useRef, useState } from 'react';

interface Progress {
  state: string;
  value: MotionValue<number>;
  start: () => void;
  done: () => void;
  reset: () => void;
}

const ProgressBarContext = createContext<Progress | null>(null);

export function useProgressBar() {
  const progress = useContext(ProgressBarContext);

  if (progress === null) {
    throw new Error('Need to be inside provider');
  }

  return progress;
}

export function ProgressBar({ children }: { children: React.ReactNode }) {
  const progress = useProgress();
  const width = useMotionTemplate`${progress.value}%`;

  const zIndex = 5000;

  return (
    <ProgressBarContext.Provider value={progress}>
      <AnimatePresence onExitComplete={progress.reset}>
        {progress.state !== 'complete' && (
          <motion.div
            style={{
              zIndex,
              width,
              color: 'black',
              top: 0,
              position: 'fixed',
              height: '5px',
              backgroundColor: 'black',
              opacity: 0.8,
            }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      {children}
    </ProgressBarContext.Provider>
  );
}

interface ProgressBarLinkProps {
  href: string;
  children?: React.ReactNode;
  className?: string;
  title?: string;
}
export function ProgressBarLink({ href, children, className, title, ...rest }: ProgressBarLinkProps) {
  const progress = useProgressBar();
  const router = useRouter();

  return (
    <Link
      title={title}
      href={href}
      prefetch={true}
      onClick={(e) => {
        e.preventDefault();
        progress.start();

        startTransition(() => {
          router.push(href.toString());
          progress.done();
        });
      }}
      {...rest}
      className={className}
    >
      {children}
    </Link>
  );
}

function useProgress() {
  const [state, setState] = useState('initial');

  const value = useSpring(0, {
    damping: 25,
    mass: 0.5,
    stiffness: 300,
    restDelta: 0.1,
  });

  useInterval(
    () => {
      // If we start progress but the bar is currently complete, reset it first.
      if (value.get() === 100) {
        value.jump(0);
      }

      const current = value.get();

      let diff;
      if (current === 0) {
        diff = 15;
      } else if (current < 50) {
        diff = rand(1, 10);
      } else {
        diff = rand(1, 5);
      }

      value.set(Math.min(current + diff, 99));
    },
    state === 'in-progress' ? 750 : null,
  );

  useEffect(() => {
    if (state === 'initial') {
      value.jump(0);
    } else if (state === 'completing') {
      value.set(100);
    }

    return value.on('change', (latest) => {
      if (latest === 100) {
        setState('complete');
      }
    });
  }, [value, state]);

  function reset() {
    setState('initial');
  }

  function start() {
    setState('in-progress');
  }

  function done() {
    setState((state) => (state === 'initial' || state === 'in-progress' ? 'completing' : state));
  }

  return { state, value, start, done, reset };
}

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (delay !== null) {
      tick();

      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
