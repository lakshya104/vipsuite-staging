import { useMemo } from 'react';
import { first, isArray } from 'lodash';
import { Section, Question, ProfileQuestionType } from '@/interfaces';

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
      const neededForRadio =
        first(q.custom_conditional_logic.question_values.split(',')) === '1' && parentVal === true ? true : false;
      const needed = q.custom_conditional_logic.question_values.split(',');
      const checkResult =
        parent && parent?.input_type === ProfileQuestionType.Radio
          ? neededForRadio
          : Array.isArray(parentVal)
            ? parentVal.some((v) => needed.includes(v))
            : needed.includes(parentVal);
      return checkResult;
    }
    if (isArray(section.questions)) {
      section.questions.forEach((q) => {
        vis[q.unique_id] = check(q);
      });
    }
    return vis;
  }, [section, values]);
}
