# logiq

> Awesome logical and bitwise operators with support for `BigInt` and `TypedArray`

## Install

```sh
npm install logiq
```

## Usage

```js
import {logical, bitwise, bigint, typedArray} from 'logiq';

logical.xor(true, false);
//=> true

bitwise.xor(0b1100, 0b1010);
//=> 6

bigint.xor(0b1100n, 0b1010n);
//=> 6n

typedArray.xor(Uint8Array.of(255, 127, 0), Uint8Array.of(255));
//=> Uint8Array(3) [ 0, 128, 255 ]
```

## Modules

### logical

```js
import {logical} from 'logiq';
```

Provides logical connectives that return `boolean` values.
Accepts arguments of type `any` and converts them to `boolean` values before processing.

### bitwise

```js
import {bitwise} from 'logiq';
```

Provides bitwise operators for the basic `number` type. All numbers in JavaScript are signed, so some functions may flip the sign bit and yield unexpected results.

### bigint

```js
import {bigint} from 'logiq';
```

Provides bitwise operators for the `bigint` type. Operands are automatically converted to `bigint` before processing. Remember that `bigint` is signed, so some functions may flip the sign bit and yield unexpected results.

### typedArray

```js
import {typedArray} from 'logiq';
```

Provides bitwise operators for all of the built-in `TypedArray` types. Under the hood, the module uses `Uint8Array` for compatibility between different `TypedArray` variants. The result is also returned as a `Uint8Array`.

If the operands differ in byte length, the shorter of the two will be repeated as many times as needed to match the other's length. This is useful in cases where a mask needs to be applied to every block of data in an array.

## API

Each `logiq` module exports the same set of functions. All binary operators are variadic and left-associative. For example, `and(a, b, c)` is equivalent to `(a AND b) AND c`.

### not(p)

Performs logical negation or bitwise NOT.

### and(p, q, ...args)

Performs logical conjunction or bitwise AND.

### or(p, q, ...args)

Performs logical disjunction or bitwise OR.

### imply(p, q, ...args)

Performs logical implication or bitwise IMPLY.

### xor(p, q, ...args)

Performs logical exclusive disjunction or bitwise XOR.

### nand(p, q, ...args)

Performs logical alternative denial or bitwise NAND.

### nor(p, q, ...args)

Performs logical joint denial or bitwise NOR.

### nimply(p, q, ...args)

Performs logical nonimplication or bitwise NIMPLY.

### xnor(p, q, ...args)

Performs logical biconditional or bitwise XNOR.
