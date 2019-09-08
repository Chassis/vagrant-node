# Vagrant Node

Node helpers for interacting with Vagrant.

## Installation

Vagrant Node is available on npm, simply add it to your project to get started:
```
npm i @chassis-wp/vagrant-node
 
# Or, if you're using Yarn 
yarn add @chassis-wp/vagrant-node
```

## Usage

```
const vagrant = require('vagrant-node');

const allMachines = vagrant.getAllMachines();

const getMachineStatus = vagrant.getStatus( '~/Projects/chassis' );
```

## Installation For Development

1. `git clone https://github.com/Chassis/vagrant-node.git <your-project>`.
2. `cd <your-project>`.
3. `npm install` or `yarn install`.
4. `npm run watch` or `yarn watch`.

## Build

1. `npm run build` or `yarn build`.

## Licence
This code is licensed under the MIT license.

Copyright (c) 2019-present Ryan McCue, Bronson Quick

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
