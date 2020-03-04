import ms from 'ms';

interface Options {
  maxDepth?: number;
  wait?: string;
}

const wait = async (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const tta = async (
  condition: () => boolean | Promise<boolean>,
  options: Options = {},
  currentDepth: number,
): Promise<void> => {
  const waitTime = ms(options.wait || '200ms');
  const maxDepth = options.maxDepth || 25;

  const conditionResult = condition();
  const conditionReturnsPromise = conditionResult.toString().includes('Promise');
  const passed = conditionReturnsPromise ? await conditionResult : conditionResult;

  if (passed) {
    return Promise.resolve();
  }

  if (!passed && ++currentDepth >= maxDepth) {
    return Promise.reject(`TTA reached recursion max-depth of ${maxDepth}`);
  }

  await wait(waitTime);
  return tta(condition, options, currentDepth);
};

export default (
  condition: () => boolean | Promise<boolean>,
  options: Options = {},
): Promise<void> => tta(condition, options, 0);
