import { useMemo } from 'react';
import { Section, Question } from '@/interfaces';
import { isArray } from 'lodash';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useVisibility(section: Section, values: any) {
  return useMemo(() => {
    const vis: Record<string, boolean> = {};
    function check(q: Question): boolean {
      if (!q.apply_conditional_logic) return true;
      const parent =
        isArray(section.questions) &&
        section.questions.find((p) => p.unique_id === q.custom_conditional_logic.question_unique_id)!;
      if (parent && !check(parent)) return false;
      const parentVal = parent && values[parent.unique_id];
      const needed = q.custom_conditional_logic.question_values.split(',');
      return Array.isArray(parentVal) ? parentVal.some((v) => needed.includes(v)) : needed.includes(parentVal);
    }
    section.questions.forEach((q) => {
      vis[q.unique_id] = check(q);
    });
    return vis;
  }, [section, values]);
}
