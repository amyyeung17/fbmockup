'use strict';

module.exports = {
  "tags": {
    "allowUnknownTags": true
  },
  "plugins": [
    "node_modules/jsdoc-vuejs"
  ],
  "source": {
    "includePattern": "\\.(vue|js)$",
    "include": [
      'src/'
    ],
    "exclude": ["node_modules"]
  },
  "recurseDepth": 10,
  "opts": {
    "destination": './docs',
    "recurse": true  
  }
}