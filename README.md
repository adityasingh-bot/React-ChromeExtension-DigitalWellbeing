<div align='center'>
    <img width="128" src="./public/logo128.png"/>
    <h1>Time Keeper</h1>
</div>

[![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0.en.html)

Browser Time Keeper is an extension which helps you track of the amount of time you spend online


## Building the extension
Run ```npm install``` to install dependencies, then ```npm run build``` to build, or ```npm run watch``` to build and then watch for changes.

### Building for chrome
Chrome manifest v3 supports background scripts - service_workers. use the line `"service_worker": "background.js"` and the extension should work with chrome.
