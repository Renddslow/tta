# tta

> If at first you don&#39;t succeed, try try again.

Run a function continually until it returns `true`.

## Install

```
$ yarn add tta
```

## Usage

```js
import tta from 'tta';

import fileExists from './fileExists';
import writeFile from './writeFile';

tta(async () => !(await fileExists('.lock.json')), { wait: '3s' }).then(() => {
  writeFile('some-file.txt', '🦄');
});
```

## API

### tta(condition, options)

#### condition

Type: `object`

| Param    | Default | Description                                                                                                                                                                 |
| -------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| wait     | `500ms` | The amount of time to wait between each check on the condition.                                                                                                             |
| maxDepth | `25`    | By default tta will only repeat the conditional function call 25 times before bailing out and returning a rejected promise. You can increase this number if you're so bold. |
