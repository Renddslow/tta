import test from 'ava';
import catchify from 'catchify';

import tta from './index';

test('tta - a condition function is called until its condition is met', async (t) => {
  let count = 0;

  const condition = () => ++count === 12;

  await tta(condition);

  t.is(count, 12);
});

test('tta - a condition function is called until its condition is met when it returns a Promise', async (t) => {
  let count = 0;

  const condition = () => Promise.resolve(++count === 12);

  await tta(condition);

  t.is(count, 12);
});

test('tta - will reject when max depth has been reached', async (t) => {
  let count = 0;

  const condition = () => Promise.resolve(++count === 12);

  const [err] = await catchify(tta(condition, { maxDepth: 2 }));
  t.is(err, 'TTA reached recursion max-depth of 2');
});

test('tta - will wait between each check based on the option', async (t) => {
  let count = 0;
  const tick = new Date().getTime();

  const condition = () => Promise.resolve(++count === 3);

  await tta(condition, { wait: '5s' });
  const tock = new Date().getTime();

  const waitTime = (tock - tick) / 1000;

  t.is(count, 3);
  t.truthy(waitTime > 6);
});
