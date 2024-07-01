{
  "name": "node_js_basics",
  "version": "1.0.0",
  "description": "",
  "main": "stageOne-basicWebServer.js",
  "scripts": {
      "lint": "./node_modules/.bin/eslint",
      "check-lint": "lint [0-9]*.js",
      "test": "./node_modules/mocha/bin/mocha --require babel-register --exit",
      "dev": "nodemon --exec babel-node --presets babel-preset-env ./server.js ./database.csv",
      "start": "node stageOne-basicWebServer.js",
      "start-stageOne-basicWebServer": "node stageOne-basicWebServer.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
      "chai-http": "^4.3.0",
      "express": "^4.19.2"
  },
  "devDependencies": {
      "babel-cli": "^6.26.0",
      "babel-preset-env": "^0.0.0",
      "chai": "^4.2.0",
      "eslint": "^6.4.0",
      "eslint-config-airbnb-base": "^14.0.0",
      "eslint-plugin-import": "^2.18.2",
      "eslint-plugin-jest": "^28.6.0",
      "mocha": "^10.4.0",
      "nodemon": "^2.0.2",
      "request": "^2.88.0",
      "sinon": "^7.5.0"
  }
}
