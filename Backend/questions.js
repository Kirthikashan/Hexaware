// models/questionsModel.js

const questions = {
  JavaScript: {
    beginner: [
      {
        id: 1,
        question: "What is the syntax to create a function in JavaScript?",
        options: ["function myFunction()", "function:myFunction()", "create myFunction()"],
        answer: "function myFunction()",
      },
      {
        id: 2,
        question: "Which symbol is used for comments in JavaScript?",
        options: ["//", "#", "/*"],
        answer: "//",
      },
      {
        id: 3,
        question: "What will the following code output: console.log(typeof null)?",
        options: ["'object'", "'null'", "'undefined'"],
        answer: "'object'",
      },
      {
        id: 4,
        question: "How do you declare a variable in JavaScript?",
        options: ["var x;", "v x;", "declare x;"],
        answer: "var x;",
      },
      {
        id: 5,
        question: "What is the purpose of 'use strict'?",
        options: ["Enables strict mode", "Disables strict mode", "No purpose"],
        answer: "Enables strict mode",
      },
      {
        id: 6,
        question: "Which of the following is a primitive data type in JavaScript?",
        options: ["Object", "Array", "String"],
        answer: "String",
      },
      {
        id: 7,
        question: "How can you convert a string to an integer in JavaScript?",
        options: ["parseInt()", "Integer()", "Number()"],
        answer: "parseInt()",
      },
      {
        id: 8,
        question: "What does NaN stand for?",
        options: ["Not a Number", "Not a Null", "Not a Name"],
        answer: "Not a Number",
      },
      {
        id: 9,
        question: "Which of the following methods can be used to round a number?",
        options: ["Math.round()", "Math.floor()", "All of the above"],
        answer: "All of the above",
      },
      {
        id: 10,
        question: "Which company developed JavaScript?",
        options: ["Microsoft", "Netscape", "Google"],
        answer: "Netscape",
      },
    ],
    intermediate: [
      {
        id: 11,
        question: "What is a closure in JavaScript?",
        options: ["A way to maintain state", "A type of function", "An error handling mechanism"],
        answer: "A way to maintain state",
      },
      {
        id: 12,
        question: "What will the following code output: console.log(0 == false)?",
        options: ["true", "false", "error"],
        answer: "true",
      },
      {
        id: 13,
        question: "How can you check if a variable is an array in JavaScript?",
        options: ["typeof array", "Array.isArray()", "instanceof array"],
        answer: "Array.isArray()",
      },
      {
        id: 14,
        question: "What is the difference between '==' and '===' in JavaScript?",
        options: [
          "'==' compares only values, '===' compares both value and type",
          "'===' compares only values, '==' compares both value and type",
          "No difference",
        ],
        answer: "'==' compares only values, '===' compares both value and type",
      },
      {
        id: 15,
        question: "Which of the following are array methods in JavaScript?",
        options: ["push()", "pop()", "Both of the above"],
        answer: "Both of the above",
      },
      {
        id: 16,
        question: "What is the use of the 'this' keyword in JavaScript?",
        options: [
          "Refers to the current object",
          "Refers to the global object",
          "Refers to the parent object",
        ],
        answer: "Refers to the current object",
      },
      {
        id: 17,
        question: "How do you add a new element to the end of an array?",
        options: ["array.add()", "array.push()", "array.append()"],
        answer: "array.push()",
      },
      {
        id: 18,
        question: "Which of the following is a correct method to copy an array in JavaScript?",
        options: [
          "[...array]",
          "array.copy()",
          "Array.prototype.copy(array)",
        ],
        answer: "[...array]",
      },
      {
        id: 19,
        question: "What does 'typeof []' return?",
        options: ["'array'", "'object'", "'list'"],
        answer: "'object'",
      },
      {
        id: 20,
        question: "How can you remove the last element from an array?",
        options: ["array.pop()", "array.removeLast()", "array.deleteLast()"],
        answer: "array.pop()",
      },
    ],
    advanced: [
      {
        id: 21,
        question: "What is the output of the following code: console.log([] + [])?",
        options: ["''", "'[object Object]'", "'undefined'"],
        answer: "''",
      },
      {
        id: 22,
        question: "What is the output of the following code: console.log([] == [])?",
        options: ["true", "false", "undefined"],
        answer: "false",
      },
      {
        id: 23,
        question: "What is the output of the following code: console.log(typeof NaN)?",
        options: ["'number'", "'NaN'", "'undefined'"],
        answer: "'number'",
      },
      {
        id: 24,
        question: "What is the purpose of the 'bind' method in JavaScript?",
        options: [
          "Creates a new function that has 'this' keyword bound to the provided object",
          "Creates a copy of a function",
          "Creates an instance of an object",
        ],
        answer:
          "Creates a new function that has 'this' keyword bound to the provided object",
      },
      {
        id: 25,
        question: "What is the difference between 'call' and 'apply' methods?",
        options: [
          "'call' accepts an argument list, 'apply' accepts a single array of arguments",
          "'apply' accepts an argument list, 'call' accepts a single array of arguments",
          "There is no difference",
        ],
        answer:
          "'call' accepts an argument list, 'apply' accepts a single array of arguments",
      },
      {
        id: 26,
        question: "What is the result of 'null === undefined' in JavaScript?",
        options: ["true", "false", "undefined"],
        answer: "false",
      },
      {
        id: 27,
        question: "What is the output of the following code: console.log('5' + 5)?",
        options: ["10", "'55'", "'10'"],
        answer: "'55'",
      },
      {
        id: 28,
        question: "What is an Immediately Invoked Function Expression (IIFE)?",
        options: [
          "A function that is executed right after it's defined",
          "A function that is executed after an event",
          "A function that is defined but not executed",
        ],
        answer: "A function that is executed right after it's defined",
      },
      {
        id: 29,
        question: "What does 'debouncing' mean in JavaScript?",
        options: [
          "Limiting the number of times a function is called",
          "Repeating a function execution multiple times",
          "Executing a function after a fixed time",
        ],
        answer: "Limiting the number of times a function is called",
      },
      {
        id: 30,
        question: "What is event delegation in JavaScript?",
        options: [
          "A technique to handle events efficiently by using a single event listener for parent elements",
          "Assigning events to child elements",
          "Passing events from one element to another",
        ],
        answer:
          "A technique to handle events efficiently by using a single event listener for parent elements",
      },
    ],
  },

React: {
beginner: [
    {
      id: 1,
      question: "What is React?",
      options: ["A JavaScript library", "A CSS framework", "A backend framework"],
      answer: "A JavaScript library",
    },
    {
      id: 2,
      question: "What is the virtual DOM?",
      options: ["A representation of the real DOM", "A new type of database", "None of the above"],
      answer: "A representation of the real DOM",
    },
    {
      id: 3,
      question: "What does JSX stand for?",
      options: ["JavaScript XML", "Java Syntax Extension", "JavaScript Extension"],
      answer: "JavaScript XML",
    },
    {
      id: 4,
      question: "What is the use of props in React?",
      options: ["To manage state", "To pass data to components", "To handle events"],
      answer: "To pass data to components",
    },
    {
      id: 5,
      question: "What is the purpose of the useState hook?",
      options: ["To manage component lifecycle", "To manage state in functional components", "To handle side effects"],
      answer: "To manage state in functional components",
    },
    {
      id: 6,
      question: "What is a React component?",
      options: ["A function or class that optionally accepts inputs", "A part of the user interface", "Both of the above"],
      answer: "Both of the above",
    },
    {
      id: 7,
      question: "How do you create a class component in React?",
      options: ["class MyComponent extends React.Component", "function MyComponent()", "const MyComponent = () => {}"],
      answer: "class MyComponent extends React.Component",
    },
    {
      id: 8,
      question: "What are hooks in React?",
      options: ["Functions that let you use state and lifecycle features", "Methods to manipulate the DOM", "None of the above"],
      answer: "Functions that let you use state and lifecycle features",
    },
    {
      id: 9,
      question: "What is the purpose of useEffect?",
      options: ["To fetch data", "To perform side effects", "Both of the above"],
      answer: "Both of the above",
    },
    {
      id: 10,
      question: "What is a higher-order component?",
      options: ["A function that takes a component and returns a new component", "A regular component", "None of the above"],
      answer: "A function that takes a component and returns a new component",
    },
  ],

  intermediate: [
    {
      id: 1,
      question: "What is the purpose of context in React?",
      options: ["To pass data through the component tree", "To manage local state", "To optimize performance"],
      answer: "To pass data through the component tree",
    },
    {
      id: 2,
      question: "How do you handle events in React?",
      options: ["Using the onClick attribute", "Using event listeners directly", "Using setState"],
      answer: "Using the onClick attribute",
    },
    {
      id: 3,
      question: "What is a controlled component?",
      options: ["A component that does not maintain its own state", "A component that manages its own state", "Both of the above"],
      answer: "A component that does not maintain its own state",
    },
    {
      id: 4,
      question: "What is the significance of keys in React lists?",
      options: ["To uniquely identify elements", "To optimize rendering", "Both of the above"],
      answer: "Both of the above",
    },
    {
      id: 5,
      question: "What is the difference between functional and class components?",
      options: ["Functional components are stateless, class components can hold state", "Class components are faster", "Both are the same"],
      answer: "Functional components are stateless, class components can hold state",
    },
    {
      id: 6,
      question: "What are Pure Components?",
      options: ["Components that do not re-render when props are unchanged", "Components that only accept state", "Components that can hold state"],
      answer: "Components that do not re-render when props are unchanged",
    },
    {
      id: 7,
      question: "What is React Router used for?",
      options: ["To manage state", "To handle navigation between components", "To manipulate the DOM"],
      answer: "To handle navigation between components",
    },
    {
      id: 8,
      question: "What does useMemo do?",
      options: ["Memoizes the result of a calculation", "Tracks state changes", "Creates a new component"],
      answer: "Memoizes the result of a calculation",
    },
    {
      id: 9,
      question: "What is prop drilling?",
      options: ["Passing props through many layers of components", "A way to optimize performance", "None of the above"],
      answer: "Passing props through many layers of components",
    },
    {
      id: 10,
      question: "What is a render prop?",
      options: ["A technique for sharing code between React components", "A method to create a component", "None of the above"],
      answer: "A technique for sharing code between React components",
    },
  ],

  advanced: [
    {
      id: 1,
      question: "What is React's reconciliation process?",
      options: ["The process of updating the DOM", "The algorithm to minimize the number of updates", "Both of the above"],
      answer: "Both of the above",
    },
    {
      id: 2,
      question: "What is the purpose of the shouldComponentUpdate lifecycle method?",
      options: ["To determine if a component should re-render", "To fetch data", "To handle state updates"],
      answer: "To determine if a component should re-render",
    },
    {
      id: 3,
      question: "What is the purpose of error boundaries in React?",
      options: ["To catch JavaScript errors in child components", "To optimize performance", "To manage state"],
      answer: "To catch JavaScript errors in child components",
    },
    {
      id: 4,
      question: "How can you optimize performance in a React application?",
      options: ["Using memoization", "Using PureComponents", "Both of the above"],
      answer: "Both of the above",
    },
    {
      id: 5,
      question: "What is code splitting in React?",
      options: ["Loading parts of the application on demand", "Optimizing state management", "None of the above"],
      answer: "Loading parts of the application on demand",
    },
    {
      id: 6,
      question: "What are React Fragments used for?",
      options: ["Grouping multiple elements without adding extra nodes", "Managing state", "Handling events"],
      answer: "Grouping multiple elements without adding extra nodes",
    },
    {
      id: 7,
      question: "What is the purpose of the React Context API?",
      options: ["To manage global state", "To pass props down the tree", "Both of the above"],
      answer: "To manage global state",
    },
    {
      id: 8,
      question: "What is a custom hook in React?",
      options: ["A JavaScript function that starts with 'use'", "A way to create a reusable stateful logic", "Both of the above"],
      answer: "Both of the above",
    },
    {
      id: 9,
      question: "What is a higher-order component (HOC)?",
      options: ["A function that takes a component and returns a new component", "A method for optimizing performance", "Both of the above"],
      answer: "A function that takes a component and returns a new component",
    },
    {
      id: 10,
      question: "What is the use of the React Profiler?",
      options: ["To analyze performance", "To optimize state updates", "Both of the above"],
      answer: "To analyze performance",
    },
  ],
},
    Node: {
    beginner: [
      {
        id: 1,
        question: "What is Node.js?",
        options: ["A JavaScript runtime", "A front-end framework", "A database"],
        answer: "A JavaScript runtime",
      },
      {
        id: 2,
        question: "What is npm?",
        options: ["Node Package Manager", "Node Process Manager", "None of the above"],
        answer: "Node Package Manager",
      },
      {
        id: 3,
        question: "How do you create a server in Node.js?",
        options: ["http.createServer()", "server.create()", "new Server()"],
        answer: "http.createServer()",
      },
      {
        id: 4,
        question: "What is middleware in Express?",
        options: ["Functions that execute during the request-response cycle", "Functions that run at the end", "None of the above"],
        answer: "Functions that execute during the request-response cycle",
      },
      {
        id: 5,
        question: "What is the purpose of the package.json file?",
        options: ["To manage project dependencies", "To define project scripts", "Both of the above"],
        answer: "Both of the above",
      },
      {
        id: 6,
        question: "How can you read a file in Node.js?",
        options: ["fs.readFileSync()", "fs.read()", "readFile()"],
        answer: "fs.readFileSync()",
      },
      {
        id: 7,
        question: "What is an event loop?",
        options: ["A mechanism that handles asynchronous operations", "A type of loop", "None of the above"],
        answer: "A mechanism that handles asynchronous operations",
      },
      {
        id: 8,
        question: "What is the purpose of the require function?",
        options: ["To import modules", "To create a new module", "To delete a module"],
        answer: "To import modules",
      },
      {
        id: 9,
        question: "What does the .env file store?",
        options: ["Environment variables", "Data", "Scripts"],
        answer: "Environment variables",
      },
      {
        id: 10,
        question: "Which method is used to start a Node server?",
        options: ["server.listen()", "server.start()", "app.run()"],
        answer: "server.listen()",
      },
    ],
    intermediate: [
      {
        id: 1,
        question: "What is the difference between synchronous and asynchronous functions in Node.js?",
        options: ["Synchronous functions block execution, asynchronous do not", "They are the same", "None of the above"],
        answer: "Synchronous functions block execution, asynchronous do not",
      },
      {
        id: 2,
        question: "What is a promise in Node.js?",
        options: ["An object that represents the eventual completion of an asynchronous operation", "A function", "A type of error"],
        answer: "An object that represents the eventual completion of an asynchronous operation",
      },
      {
        id: 3,
        question: "How can you handle exceptions in asynchronous code?",
        options: ["Using try-catch", "Using the .catch() method", "Both of the above"],
        answer: "Both of the above",
      },
      {
        id: 4,
        question: "What is the purpose of the EventEmitter class?",
        options: ["To handle events in Node.js", "To create HTTP servers", "None of the above"],
        answer: "To handle events in Node.js",
      },
      {
        id: 5,
        question: "What is a callback function?",
        options: ["A function passed as an argument to another function", "A function that returns another function", "None of the above"],
        answer: "A function passed as an argument to another function",
      },
      {
        id: 6,
        question: "Which of the following is used to create a RESTful API in Node.js?",
        options: ["Express.js", "Angular.js", "React.js"],
        answer: "Express.js",
      },
      {
        id: 7,
        question: "What is the use of the next() function in Express?",
        options: ["To pass control to the next middleware function", "To terminate the request-response cycle", "None of the above"],
        answer: "To pass control to the next middleware function",
      },
      {
        id: 8,
        question: "What does the fs module in Node.js allow you to do?",
        options: ["Work with the file system", "Create web servers", "Handle HTTP requests"],
        answer: "Work with the file system",
      },
      {
        id: 9,
        question: "What is the purpose of the process.env object?",
        options: ["To access environment variables", "To handle errors", "None of the above"],
        answer: "To access environment variables",
      },
      {
        id: 10,
        question: "How do you set up a route in Express?",
        options: ["app.get()", "app.route()", "app.create()"],
        answer: "app.get()",
      },
    ],
    advanced: [
      {
        id: 1,
        question: "What is clustering in Node.js?",
        options: ["Using multiple processes to handle concurrent requests", "Creating threads", "None of the above"],
        answer: "Using multiple processes to handle concurrent requests",
      },
      {
        id: 2,
        question: "What are streams in Node.js?",
        options: ["Objects that allow reading and writing data in a continuous manner", "Types of databases", "None of the above"],
        answer: "Objects that allow reading and writing data in a continuous manner",
      },
      {
        id: 3,
        question: "What is the purpose of the 'this' keyword in Node.js?",
        options: ["It refers to the current context", "It has no purpose", "None of the above"],
        answer: "It refers to the current context",
      },
      {
        id: 4,
        question: "What is the role of the V8 engine in Node.js?",
        options: ["To execute JavaScript code", "To create server-side applications", "None of the above"],
        answer: "To execute JavaScript code",
      },
      {
        id: 5,
        question: "How can you optimize performance in a Node.js application?",
        options: ["Using caching", "Using clustering", "Both of the above"],
        answer: "Both of the above",
      },
      {
        id: 6,
        question: "What is the difference between process.nextTick() and setImmediate()?",
        options: ["process.nextTick() runs before the event loop, setImmediate() runs after", "They are the same", "None of the above"],
        answer: "process.nextTick() runs before the event loop, setImmediate() runs after",
      },
      {
        id: 7,
        question: "What is a Worker Thread in Node.js?",
        options: ["A thread used for performing heavy computation", "A type of database", "None of the above"],
        answer: "A thread used for performing heavy computation",
      },
      {
        id: 8,
        question: "What is the use of the 'Buffer' class in Node.js?",
        options: ["To handle binary data", "To store strings", "None of the above"],
        answer: "To handle binary data",
      },
      {
        id: 9,
        question: "How do you manage errors in Node.js?",
        options: ["Using try-catch", "Using a logging library", "Both of the above"],
        answer: "Both of the above",
      },
      {
        id: 10,
        question: "What are the benefits of using TypeScript with Node.js?",
        options: ["Static typing and better tooling support", "Faster execution", "None of the above"],
        answer: "Static typing and better tooling support",
      },
    ],
  },
  Express:{
  beginner: [
    {
      id: 1,
      question: "What is Express.js?",
      options: ["A web application framework for Node.js", "A front-end framework", "A database"],
      answer: "A web application framework for Node.js",
    },
    {
      id: 2,
      question: "How do you create a new Express application?",
      options: ["express()", "new Express()", "createExpress()"],
      answer: "express()",
    },
    {
      id: 3,
      question: "Which of the following is used to define routes in Express?",
      options: ["app.get()", "app.route()", "Both of the above"],
      answer: "Both of the above",
    },
    {
      id: 4,
      question: "What does app.use() do?",
      options: ["It mounts middleware", "It defines a route", "It starts the server"],
      answer: "It mounts middleware",
    },
    {
      id: 5,
      question: "How can you serve static files in Express?",
      options: ["express.static()", "app.static()", "serveStatic()"],
      answer: "express.static()",
    },
    {
      id: 6,
      question: "What is the purpose of a router in Express?",
      options: ["To handle routes", "To define middleware", "Both of the above"],
      answer: "Both of the above",
    },
    {
      id: 7,
      question: "How do you handle errors in Express?",
      options: ["Using middleware", "Using try-catch", "Both of the above"],
      answer: "Both of the above",
    },
    {
      id: 8,
      question: "What is the purpose of body-parser?",
      options: ["To parse incoming request bodies", "To create routes", "To handle errors"],
      answer: "To parse incoming request bodies",
    },
    {
      id: 9,
      question: "What is the difference between app.get() and app.post()?",
      options: ["GET is for retrieving data, POST is for sending data", "There is no difference", "Both are used for sending data"],
      answer: "GET is for retrieving data, POST is for sending data",
    },
    {
      id: 10,
      question: "How do you set view engine in Express?",
      options: ["app.set('view engine', 'ejs')", "app.viewEngine('ejs')", "app.engine('ejs')"],
      answer: "app.set('view engine', 'ejs')",
    },
  ],
  intermediate: [
    {
      id: 11,
      question: "How can you add middleware in Express?",
      options: ["app.use(middleware)", "app.add(middleware)", "app.middleware(middleware)"],
      answer: "app.use(middleware)",
    },
    {
      id: 12,
      question: "What does res.json() do?",
      options: ["Sends a JSON response", "Parses JSON data", "Sends HTML response"],
      answer: "Sends a JSON response",
    },
    {
      id: 13,
      question: "How do you handle query parameters in Express?",
      options: ["req.query", "req.params", "req.body"],
      answer: "req.query",
    },
    {
      id: 14,
      question: "What is the purpose of the next() function?",
      options: ["To pass control to the next middleware", "To send a response", "To stop the request"],
      answer: "To pass control to the next middleware",
    },
    {
      id: 15,
      question: "How do you handle file uploads in Express?",
      options: ["Using multer", "Using body-parser", "Using express-fileupload"],
      answer: "Using multer",
    },
    {
      id: 16,
      question: "What is the purpose of res.status()?",
      options: ["To set the HTTP response status", "To send a response", "To handle errors"],
      answer: "To set the HTTP response status",
    },
    {
      id: 17,
      question: "How do you serve HTML files in Express?",
      options: ["res.sendFile()", "app.send()", "res.render()"],
      answer: "res.sendFile()",
    },
    {
      id: 18,
      question: "What does app.listen() do?",
      options: ["Starts the server", "Defines routes", "Sets middleware"],
      answer: "Starts the server",
    },
    {
      id: 19,
      question: "How do you create a custom error handler in Express?",
      options: ["app.use((err, req, res, next) => {...})", "app.errorHandler((err) => {...})", "app.handleError((req, res) => {...})"],
      answer: "app.use((err, req, res, next) => {...})",
    },
    {
      id: 20,
      question: "What is a middleware chain in Express?",
      options: ["A sequence of middleware functions", "A way to define routes", "A method to send responses"],
      answer: "A sequence of middleware functions",
    },
  ],
  advanced: [
    {
      id: 21,
      question: "How do you implement CORS in Express?",
      options: ["Using the cors middleware", "Using app.use()", "Using express.static()"],
      answer: "Using the cors middleware",
    },
    {
      id: 22,
      question: "What is the purpose of clustering in Express?",
      options: ["To handle multiple requests simultaneously", "To serve static files", "To create custom middleware"],
      answer: "To handle multiple requests simultaneously",
    },
    {
      id: 23,
      question: "How can you implement authentication in Express?",
      options: ["Using passport", "Using jwt", "Both of the above"],
      answer: "Both of the above",
    },
    {
      id: 24,
      question: "What is the purpose of helmet in Express?",
      options: ["To secure HTTP headers", "To handle routes", "To parse request bodies"],
      answer: "To secure HTTP headers",
    },
    {
      id: 25,
      question: "How do you implement rate limiting in Express?",
      options: ["Using express-rate-limit", "Using app.use()", "Using middleware"],
      answer: "Using express-rate-limit",
    },
    {
      id: 26,
      question: "What is the purpose of session management in Express?",
      options: ["To track user sessions", "To define routes", "To handle static files"],
      answer: "To track user sessions",
    },
    {
      id: 27,
      question: "How can you handle uncaught exceptions in Express?",
      options: ["Using process.on('uncaughtException')", "Using middleware", "Both of the above"],
      answer: "Both of the above",
    },
    {
      id: 28,
      question: "What does app.param() do?",
      options: ["Define middleware for specific parameters", "Create routes", "Handle errors"],
      answer: "Define middleware for specific parameters",
    },
    {
      id: 29,
      question: "What is the purpose of the connect-mongo package?",
      options: ["To store sessions in MongoDB", "To connect to a MongoDB database", "To parse JSON"],
      answer: "To store sessions in MongoDB",
    },
    {
      id: 30,
      question: "How can you test an Express application?",
      options: ["Using supertest", "Using mocha", "Both of the above"],
      answer: "Both of the above",
    },
  ],
},
MongoDB:{
beginner: [
  {
    id: 1,
    question: "What is MongoDB?",
    options: ["A NoSQL database", "A SQL database", "A programming language"],
    answer: "A NoSQL database",
  },
  {
    id: 2,
    question: "What is a document in MongoDB?",
    options: ["A record in a collection", "A collection itself", "A database"],
    answer: "A record in a collection",
  },
  {
    id: 3,
    question: "Which method is used to insert a document into a collection?",
    options: ["insertOne()", "add()", "create()"],
    answer: "insertOne()",
  },
  {
    id: 4,
    question: "What does the find() method do?",
    options: ["Retrieves documents from a collection", "Updates documents", "Deletes documents"],
    answer: "Retrieves documents from a collection",
  },
  {
    id: 5,
    question: "What is a collection in MongoDB?",
    options: ["A group of documents", "A single document", "A database"],
    answer: "A group of documents",
  },
  {
    id: 6,
    question: "What is the purpose of the MongoDB Atlas?",
    options: ["A cloud database service", "A local database", "A programming language"],
    answer: "A cloud database service",
  },
  {
    id: 7,
    question: "Which command is used to create a new database in MongoDB?",
    options: ["use dbName", "create dbName", "new dbName"],
    answer: "use dbName",
  },
  {
    id: 8,
    question: "How do you update a document in MongoDB?",
    options: ["updateOne()", "modify()", "change()"],
    answer: "updateOne()",
  },
  {
    id: 9,
    question: "What is a schema in MongoDB?",
    options: ["The structure of a document", "A type of database", "None of the above"],
    answer: "The structure of a document",
  },
  {
    id: 10,
    question: "Which command is used to delete a document in MongoDB?",
    options: ["deleteOne()", "remove()", "drop()"],
    answer: "deleteOne()",
  },
],
intermediate: [
  {
    id: 1,
    question: "What is the purpose of indexes in MongoDB?",
    options: ["To speed up queries", "To store documents", "To enforce schema"],
    answer: "To speed up queries",
  },
  {
    id: 2,
    question: "How can you retrieve unique values from a field in MongoDB?",
    options: ["Using distinct()", "Using unique()", "Using find()"],
    answer: "Using distinct()",
  },
  {
    id: 3,
    question: "What does the aggregate() method do in MongoDB?",
    options: ["Performs aggregation operations", "Retrieves documents", "Deletes documents"],
    answer: "Performs aggregation operations",
  },
  {
    id: 4,
    question: "What is the purpose of the $match stage in an aggregation pipeline?",
    options: ["Filters documents", "Sorts documents", "Projects fields"],
    answer: "Filters documents",
  },
  {
    id: 5,
    question: "How can you perform a join-like operation in MongoDB?",
    options: ["Using $lookup", "Using $join", "Using $merge"],
    answer: "Using $lookup",
  },
  {
    id: 6,
    question: "Which of the following is a valid way to define a schema in MongoDB?",
    options: ["Using Mongoose", "Using MySQL", "Using JSON"],
    answer: "Using Mongoose",
  },
  {
    id: 7,
    question: "What is the purpose of the $group stage in an aggregation pipeline?",
    options: ["Groups documents by a specified identifier", "Filters documents", "Sorts documents"],
    answer: "Groups documents by a specified identifier",
  },
  {
    id: 8,
    question: "How can you update multiple documents in MongoDB?",
    options: ["updateMany()", "updateAll()", "updateMultiple()"],
    answer: "updateMany()",
  },
  {
    id: 9,
    question: "What does the $unset operator do in MongoDB?",
    options: ["Removes a field from a document", "Adds a new field", "Updates a field"],
    answer: "Removes a field from a document",
  },
  {
    id: 10,
    question: "What is the command to drop a collection in MongoDB?",
    options: ["db.collection.drop()", "db.collection.remove()", "db.collection.delete()"],
    answer: "db.collection.drop()",
  },
],
advanced: [
  {
    id: 1,
    question: "What are the benefits of using sharding in MongoDB?",
    options: ["Scalability and distribution of data", "Data redundancy", "Improved performance"],
    answer: "Scalability and distribution of data",
  },
  {
    id: 2,
    question: "What is a replica set in MongoDB?",
    options: ["A group of MongoDB servers that maintain the same data", "A single server", "A database"],
    answer: "A group of MongoDB servers that maintain the same data",
  },
  {
    id: 3,
    question: "What is the purpose of the write concern in MongoDB?",
    options: ["Defines the level of acknowledgment requested", "Controls data replication", "Increases query performance"],
    answer: "Defines the level of acknowledgment requested",
  },
  {
    id: 4,
    question: "How can you ensure data consistency in a distributed MongoDB setup?",
    options: ["Using majority write concern", "Using lower read preferences", "Using only local writes"],
    answer: "Using majority write concern",
  },
  {
    id: 5,
    question: "What does the $expr operator allow you to do in MongoDB?",
    options: ["Compare fields within documents", "Perform calculations", "Join collections"],
    answer: "Compare fields within documents",
  },
  {
    id: 6,
    question: "What is the purpose of the aggregation framework in MongoDB?",
    options: ["To process data records and return computed results", "To store documents", "To manage databases"],
    answer: "To process data records and return computed results",
  },
  {
    id: 7,
    question: "What is a capped collection in MongoDB?",
    options: ["A fixed-size collection that automatically removes old documents", "A collection that can grow indefinitely", "A collection that stores binary data"],
    answer: "A fixed-size collection that automatically removes old documents",
  },
  {
    id: 8,
    question: "How can you implement full-text search in MongoDB?",
    options: ["Using text indexes", "Using regular indexes", "Using aggregation framework"],
    answer: "Using text indexes",
  },
  {
    id: 9,
    question: "What is the difference between the $push and $addToSet operators?",
    options: ["$push allows duplicates, $addToSet does not", "$addToSet allows duplicates, $push does not", "Both are the same"],
    answer: "$push allows duplicates, $addToSet does not",
  },
  {
    id: 10,
    question: "What is MongoDB's data model based on?",
    options: ["Documents", "Rows and columns", "Graphs"],
    answer: "Documents",
  },
],
},
HTML_CSS:{
beginner: [
  {
    id: 1,
    question: "What does HTML stand for?",
    options: [
      "HyperText Markup Language",
      "HyperText Machine Language",
      "HighText Markup Language"
    ],
    answer: "HyperText Markup Language"
  },
  {
    id: 2,
    question: "Which tag is used to create a hyperlink?",
    options: ["<link>", "<a>", "<hyperlink>"],
    answer: "<a>"
  },
  {
    id: 3,
    question: "What does CSS stand for?",
    options: [
      "Cascading Style Sheets",
      "Colorful Style Sheets",
      "Computer Style Sheets"
    ],
    answer: "Cascading Style Sheets"
  },
  {
    id: 4,
    question: "Which property is used to change the background color in CSS?",
    options: ["background-color", "color", "bgcolor"],
    answer: "background-color"
  },
  {
    id: 5,
    question: "Which HTML element is used for the largest heading?",
    options: ["<h6>", "<h1>", "<heading>"],
    answer: "<h1>"
  },
  {
    id: 6,
    question: "What is the purpose of the <div> tag?",
    options: [
      "To create a division or section",
      "To create a link",
      "To create a heading"
    ],
    answer: "To create a division or section"
  },
  {
    id: 7,
    question: "Which CSS property is used to control the text size?",
    options: ["font-size", "text-size", "text-style"],
    answer: "font-size"
  },
  {
    id: 8,
    question: "What is the correct HTML element for inserting a line break?",
    options: ["<lb>", "<break>", "<br>"],
    answer: "<br>"
  },
  {
    id: 9,
    question: "Which attribute is used to specify an alternate text for an image in HTML?",
    options: ["alt", "src", "title"],
    answer: "alt"
  },
  {
    id: 10,
    question: "What does the CSS 'display' property do?",
    options: [
      "Specifies the display behavior of an element",
      "Specifies the font",
      "Specifies the color"
    ],
    answer: "Specifies the display behavior of an element"
  }
],
intermediate: [
  {
    id: 1,
    question: "What is the difference between block and inline elements?",
    options: [
      "Block elements take full width, inline elements take only necessary width",
      "Inline elements take full width, block elements take only necessary width",
      "There is no difference"
    ],
    answer: "Block elements take full width, inline elements take only necessary width"
  },
  {
    id: 2,
    question: "Which of the following is a CSS preprocessor?",
    options: ["Sass", "HTML", "JavaScript"],
    answer: "Sass"
  },
  {
    id: 3,
    question: "How can you apply a style to an HTML element using CSS?",
    options: [
      "By using the 'style' attribute",
      "By using the 'class' attribute",
      "Both of the above"
    ],
    answer: "Both of the above"
  },
  {
    id: 4,
    question: "What is the purpose of the z-index property?",
    options: [
      "To control the order of overlapping elements",
      "To set the visibility of an element",
      "To specify the size of an element"
    ],
    answer: "To control the order of overlapping elements"
  },
  {
    id: 5,
    question: "What does the CSS property 'float' do?",
    options: [
      "It moves an element to the left or right",
      "It centers an element",
      "It creates space between elements"
    ],
    answer: "It moves an element to the left or right"
  },
  {
    id: 6,
    question: "Which HTML attribute is used to specify inline styles?",
    options: ["style", "font", "class"],
    answer: "style"
  },
  {
    id: 7,
    question: "How do you include a JavaScript file in an HTML document?",
    options: [
      "<script src='file.js'></script>",
      "<js src='file.js'></js>",
      "<javascript src='file.js'></javascript>"
    ],
    answer: "<script src='file.js'></script>"
  },
  {
    id: 8,
    question: "What is the default value of the position property in CSS?",
    options: ["static", "relative", "absolute"],
    answer: "static"
  },
  {
    id: 9,
    question: "What is the purpose of the 'meta' tag in HTML?",
    options: [
      "To provide metadata about the HTML document",
      "To create a link",
      "To create a heading"
    ],
    answer: "To provide metadata about the HTML document"
  },
  {
    id: 10,
    question: "Which CSS selector selects elements with a specific class?",
    options: [".classname", "#classname", "classname"],
    answer: ".classname"
  }
],
advanced: [
  {
    id: 1,
    question: "What is the CSS Box Model?",
    options: [
      "A model for defining how elements are structured",
      "A model for defining how images are displayed",
      "A model for defining how text is formatted"
    ],
    answer: "A model for defining how elements are structured"
  },
  {
    id: 2,
    question: "What is the difference between 'rem' and 'em' units in CSS?",
    options: [
      "'rem' is relative to the root element, 'em' is relative to the parent element",
      "'em' is relative to the root element, 'rem' is relative to the parent element",
      "There is no difference"
    ],
    answer: "'rem' is relative to the root element, 'em' is relative to the parent element"
  },
  {
    id: 3,
    question: "How can you create a responsive design in CSS?",
    options: [
      "Using media queries",
      "Using flexbox and grid layout",
      "Both of the above"
    ],
    answer: "Both of the above"
  },
  {
    id: 4,
    question: "What are CSS transitions?",
    options: [
      "They allow for smooth changes in CSS properties over a specified duration",
      "They are used for animations only",
      "They are static styles"
    ],
    answer: "They allow for smooth changes in CSS properties over a specified duration"
  },
  {
    id: 5,
    question: "What is the purpose of the 'viewport' meta tag?",
    options: [
      "To control the layout on mobile browsers",
      "To set the default font size",
      "To create links"
    ],
    answer: "To control the layout on mobile browsers"
  },
  {
    id: 6,
    question: "What are pseudo-classes in CSS?",
    options: [
      "They define a special state of an element",
      "They are used for animations",
      "They are static styles"
    ],
    answer: "They define a special state of an element"
  },
  {
    id: 7,
    question: "How do you center a block element horizontally in CSS?",
    options: [
      "By using margin: auto;",
      "By using text-align: center;",
      "By using float: center;"
    ],
    answer: "By using margin: auto;"
  },
  {
    id: 8,
    question: "What is Flexbox in CSS?",
    options: [
      "A one-dimensional layout method for arranging elements",
      "A two-dimensional layout method for arranging elements",
      "A method for positioning elements absolutely"
    ],
    answer: "A one-dimensional layout method for arranging elements"
  },
  {
    id: 9,
    question: "What is the CSS Grid layout?",
    options: [
      "A two-dimensional layout system for web pages",
      "A method for positioning elements absolutely",
      "A way to create a flex container"
    ],
    answer: "A two-dimensional layout system for web pages"
  },
  {
    id: 10,
    question: "What is the purpose of the 'calc()' function in CSS?",
    options: [
      "To perform calculations to set CSS property values",
      "To set a variable value",
      "To create animations"
    ],
    answer: "To perform calculations to set CSS property values"
  }
]
},
DevOps:{
beginner: [
  {
      id: 1,
      question: "What does DevOps aim to improve?",
      options: [
          "Collaboration between development and operations",
          "Development speed only",
          "Customer satisfaction only"
      ],
      answer: "Collaboration between development and operations",
  },
  {
      id: 2,
      question: "Which tool is commonly used for continuous integration?",
      options: ["Jenkins", "Photoshop", "Microsoft Word"],
      answer: "Jenkins",
  },
  {
      id: 3,
      question: "What is Infrastructure as Code (IaC)?",
      options: [
          "Managing infrastructure using code",
          "Coding for the user interface",
          "Hardware management"
      ],
      answer: "Managing infrastructure using code",
  },
  {
      id: 4,
      question: "Which of the following is a DevOps principle?",
      options: ["Automated testing", "Manual deployments", "Waterfall development"],
      answer: "Automated testing",
  },
  {
      id: 5,
      question: "What is the primary goal of a CI/CD pipeline?",
      options: [
          "To deliver software more quickly and reliably",
          "To reduce costs",
          "To increase hardware requirements"
      ],
      answer: "To deliver software more quickly and reliably",
  },
  {
      id: 6,
      question: "Which methodology is closely associated with DevOps?",
      options: ["Agile", "Waterfall", "V-Model"],
      answer: "Agile",
  },
  {
      id: 7,
      question: "What is the purpose of version control systems like Git?",
      options: [
          "To manage changes to code",
          "To store database information",
          "To monitor server health"
      ],
      answer: "To manage changes to code",
  },
  {
      id: 8,
      question: "What does the term 'containerization' refer to in DevOps?",
      options: [
          "Packaging applications and dependencies together",
          "Building hardware containers",
          "Creating virtual machines"
      ],
      answer: "Packaging applications and dependencies together",
  },
  {
      id: 9,
      question: "Which cloud service model provides virtualized computing resources over the internet?",
      options: ["IaaS", "PaaS", "SaaS"],
      answer: "IaaS",
  },
  {
      id: 10,
      question: "What is a common practice for monitoring applications in DevOps?",
      options: [
          "Manual checks",
          "Using monitoring tools like Prometheus",
          "Ignoring logs"
      ],
      answer: "Using monitoring tools like Prometheus",
  },
],
intermediate: [
  {
      id: 1,
      question: "What is the primary purpose of Continuous Deployment?",
      options: [
          "To deploy software automatically after passing tests",
          "To run manual deployments",
          "To create backup versions of software"
      ],
      answer: "To deploy software automatically after passing tests",
  },
  {
      id: 2,
      question: "Which of the following is an advantage of using Docker?",
      options: [
          "Increased server load",
          "Consistency across development environments",
          "Requires more system resources"
      ],
      answer: "Consistency across development environments",
  },
  {
      id: 3,
      question: "What is a key benefit of using a microservices architecture?",
      options: [
          "Easier scaling and maintenance",
          "Reduced development time",
          "Simpler codebase"
      ],
      answer: "Easier scaling and maintenance",
  },
  {
      id: 4,
      question: "Which command is used to start a container in Docker?",
      options: [
          "docker create",
          "docker run",
          "docker launch"
      ],
      answer: "docker run",
  },
  {
      id: 5,
      question: "What is the purpose of a load balancer?",
      options: [
          "To distribute network or application traffic across multiple servers",
          "To back up data",
          "To monitor server performance"
      ],
      answer: "To distribute network or application traffic across multiple servers",
  },
  {
      id: 6,
      question: "Which of the following tools is used for configuration management?",
      options: ["Ansible", "Notepad", "Slack"],
      answer: "Ansible",
  },
  {
      id: 7,
      question: "What does CI stand for in CI/CD?",
      options: [
          "Continuous Integration",
          "Continuous Improvement",
          "Continuous Interaction"
      ],
      answer: "Continuous Integration",
  },
  {
      id: 8,
      question: "What type of testing is performed automatically during CI?",
      options: [
          "Regression testing",
          "User acceptance testing",
          "Exploratory testing"
      ],
      answer: "Regression testing",
  },
  {
      id: 9,
      question: "Which of the following tools is commonly used for container orchestration?",
      options: ["Kubernetes", "Photoshop", "PowerPoint"],
      answer: "Kubernetes",
  },
  {
      id: 10,
      question: "What is the role of a DevOps engineer?",
      options: [
          "To bridge the gap between development and operations",
          "To only develop software",
          "To focus solely on server maintenance"
      ],
      answer: "To bridge the gap between development and operations",
  },
],
advanced: [
  {
      id: 1,
      question: "What is a blue-green deployment strategy?",
      options: [
          "Two identical environments are maintained for deployment",
          "A single environment is used for deployment",
          "Deployment happens at night only"
      ],
      answer: "Two identical environments are maintained for deployment",
  },
  {
      id: 2,
      question: "What is the function of a service mesh?",
      options: [
          "To manage microservices communications",
          "To store data",
          "To create user interfaces"
      ],
      answer: "To manage microservices communications",
  },
  {
      id: 3,
      question: "What is chaos engineering?",
      options: [
          "A practice to ensure applications can withstand turbulent conditions",
          "Creating random bugs in the code",
          "Ignoring error logs"
      ],
      answer: "A practice to ensure applications can withstand turbulent conditions",
  },
  {
      id: 4,
      question: "What is the purpose of feature flags?",
      options: [
          "To enable or disable features without deploying new code",
          "To track bugs",
          "To manage user accounts"
      ],
      answer: "To enable or disable features without deploying new code",
  },
  {
      id: 5,
      question: "Which monitoring approach focuses on user experience?",
      options: [
          "Real User Monitoring (RUM)",
          "Server Monitoring",
          "Log Monitoring"
      ],
      answer: "Real User Monitoring (RUM)",
  },
  {
      id: 6,
      question: "What is the role of the Site Reliability Engineer (SRE)?",
      options: [
          "To ensure system reliability and uptime",
          "To only write code",
          "To manage user interfaces"
      ],
      answer: "To ensure system reliability and uptime",
  },
  {
      id: 7,
      question: "What is infrastructure as code (IaC)?",
      options: [
          "Managing infrastructure through machine-readable definition files",
          "Writing infrastructure in a programming language",
          "A method to visualize infrastructure"
      ],
      answer: "Managing infrastructure through machine-readable definition files",
  },
  {
      id: 8,
      question: "Which tool can be used for performance testing in a DevOps pipeline?",
      options: ["JMeter", "Microsoft Word", "Slack"],
      answer: "JMeter",
  },
  {
      id: 9,
      question: "What is the main purpose of using a reverse proxy?",
      options: [
          "To act as an intermediary for requests from clients seeking resources from servers",
          "To backup servers",
          "To monitor application performance"
      ],
      answer: "To act as an intermediary for requests from clients seeking resources from servers",
  },
  {
      id: 10,
      question: "Which DevOps practice focuses on preventing issues before they occur?",
      options: [
          "Shift-left testing",
          "Manual testing",
          "Post-deployment testing"
      ],
      answer: "Shift-left testing",
  },
]
},
Cloud_Computing: {
  beginner: [
    {
      id: 1,
      question: "What does SaaS stand for?",
      options: ["Software as a Service", "System as a Service", "Software and Applications Service"],
      answer: "Software as a Service",
    },
    {
      id: 2,
      question: "Which of the following is an example of PaaS?",
      options: ["Google App Engine", "Dropbox", "Amazon EC2"],
      answer: "Google App Engine",
    },
    {
      id: 3,
      question: "What is a benefit of cloud computing?",
      options: ["Increased security", "Unlimited resources", "Scalability"],
      answer: "Scalability",
    },
    {
      id: 4,
      question: "What is the primary function of a cloud service provider?",
      options: ["To host data and applications", "To provide user support", "To develop software"],
      answer: "To host data and applications",
    },
    {
      id: 5,
      question: "Which cloud model provides services over the internet?",
      options: ["Public Cloud", "Private Cloud", "Hybrid Cloud"],
      answer: "Public Cloud",
    },
    {
      id: 6,
      question: "What is the purpose of virtualization in cloud computing?",
      options: ["To increase physical server capacity", "To create multiple virtual machines on a single physical machine", "To reduce software costs"],
      answer: "To create multiple virtual machines on a single physical machine",
    },
    {
      id: 7,
      question: "What is the term for the practice of distributing workloads across multiple servers?",
      options: ["Load Balancing", "Data Redundancy", "Scaling"],
      answer: "Load Balancing",
    },
    {
      id: 8,
      question: "What does the term 'elasticity' refer to in cloud computing?",
      options: ["The ability to scale resources up or down as needed", "The strength of the physical server", "The flexibility of user contracts"],
      answer: "The ability to scale resources up or down as needed",
    },
    {
      id: 9,
      question: "What is a cloud-native application?",
      options: ["An application built specifically for cloud environments", "An application that runs only on-premises", "An application with no online functionality"],
      answer: "An application built specifically for cloud environments",
    },
    {
      id: 10,
      question: "What type of cloud service provides network infrastructure?",
      options: ["IaaS", "SaaS", "DaaS"],
      answer: "IaaS",
    },
  ],
  intermediate: [
    {
      id: 11,
      question: "What is the primary difference between public and private clouds?",
      options: ["Ownership", "Cost", "Availability"],
      answer: "Ownership",
    },
    {
      id: 12,
      question: "Which cloud deployment model combines both public and private clouds?",
      options: ["Hybrid Cloud", "Multicloud", "Community Cloud"],
      answer: "Hybrid Cloud",
    },
    {
      id: 13,
      question: "Which service model allows customers to use software via a web browser?",
      options: ["SaaS", "PaaS", "IaaS"],
      answer: "SaaS",
    },
    {
      id: 14,
      question: "What technology allows for cloud resource isolation for security?",
      options: ["Virtualization", "Containerization", "Encryption"],
      answer: "Containerization",
    },
    {
      id: 15,
      question: "Which cloud storage service is provided by Amazon?",
      options: ["S3", "Azure Blob Storage", "Google Cloud Storage"],
      answer: "S3",
    },
    {
      id: 16,
      question: "What does 'serverless' refer to in cloud computing?",
      options: ["The absence of physical servers", "The management of servers by a third-party", "Running code without managing servers"],
      answer: "Running code without managing servers",
    },
    {
      id: 17,
      question: "Which cloud provider offers the Compute Engine service?",
      options: ["Google Cloud", "Amazon Web Services", "Microsoft Azure"],
      answer: "Google Cloud",
    },
    {
      id: 18,
      question: "What does the term 'cloud bursting' mean?",
      options: ["A hybrid cloud scaling strategy", "Exceeding cloud storage limits", "A failure in cloud services"],
      answer: "A hybrid cloud scaling strategy",
    },
    {
      id: 19,
      question: "What role does an API gateway serve in cloud architecture?",
      options: ["Managing and routing API requests", "Creating databases", "Monitoring servers"],
      answer: "Managing and routing API requests",
    },
    {
      id: 20,
      question: "What is edge computing in relation to cloud computing?",
      options: ["Processing data closer to the source", "Processing data in the central cloud", "Storing data at physical data centers"],
      answer: "Processing data closer to the source",
    },
  ],
  advanced: [
    {
      id: 21,
      question: "What is the purpose of Infrastructure as Code (IaC) in cloud environments?",
      options: ["Automating infrastructure provisioning", "Securing data storage", "Managing physical servers"],
      answer: "Automating infrastructure provisioning",
    },
    {
      id: 22,
      question: "Which cloud provider offers the service 'Azure Kubernetes Service'?",
      options: ["Microsoft Azure", "Amazon Web Services", "Google Cloud"],
      answer: "Microsoft Azure",
    },
    {
      id: 23,
      question: "What is a key security concern for multi-cloud environments?",
      options: ["Data privacy", "Downtime", "Cost management"],
      answer: "Data privacy",
    },
    {
      id: 24,
      question: "What is the significance of containers in cloud development?",
      options: ["Efficient application isolation", "Reduced server costs", "Increased storage"],
      answer: "Efficient application isolation",
    },
    {
      id: 25,
      question: "Which technology is essential for managing microservices architectures?",
      options: ["Kubernetes", "Docker", "Terraform"],
      answer: "Kubernetes",
    },
    {
      id: 26,
      question: "What is the main advantage of cloud-based disaster recovery?",
      options: ["Fast recovery time", "Low bandwidth usage", "High storage capacity"],
      answer: "Fast recovery time",
    },
    {
      id: 27,
      question: "What does 'cloud orchestration' mean?",
      options: ["Managing cloud resources and services", "Encrypting cloud data", "Building cloud applications"],
      answer: "Managing cloud resources and services",
    },
    {
      id: 28,
      question: "What is a service mesh used for in cloud-native environments?",
      options: ["Controlling service-to-service communication", "Running multiple VMs", "Encrypting network traffic"],
      answer: "Controlling service-to-service communication",
    },
    {
      id: 29,
      question: "How does cloud computing contribute to sustainability efforts?",
      options: ["By optimizing resource use", "By increasing carbon emissions", "By reducing data privacy risks"],
      answer: "By optimizing resource use",
    },
    {
      id: 30,
      question: "What is the primary goal of the FinOps practice in cloud computing?",
      options: ["Optimizing cloud spending", "Securing cloud data", "Increasing cloud deployment speed"],
      answer: "Optimizing cloud spending",
    },
  ],
},

Python: {
  beginner: [
    {
      id: 1,
      question: "What is the correct file extension for Python files?",
      options: [".py", ".python", ".pyt"],
      answer: ".py",
    },
    {
      id: 2,
      question: "Which of the following is a Python web framework?",
      options: ["Django", "Laravel", "Ruby on Rails"],
      answer: "Django",
    },
    {
      id: 3,
      question: "What is the output of print(2 ** 3)?",
      options: ["6", "8", "9"],
      answer: "8",
    },
    {
      id: 4,
      question: "What data type is used to store multiple values in Python?",
      options: ["List", "String", "Integer"],
      answer: "List",
    },
    {
      id: 5,
      question: "Which function is used to read a file in Python?",
      options: ["open()", "read()", "get()"],
      answer: "open()",
    },
    {
      id: 6,
      question: "What is a lambda function in Python?",
      options: ["An anonymous function", "A regular function", "A built-in function"],
      answer: "An anonymous function",
    },
    {
      id: 7,
      question: "What keyword is used to define a function in Python?",
      options: ["def", "function", "define"],
      answer: "def",
    },
    {
      id: 8,
      question: "What is the purpose of the 'self' parameter in Python?",
      options: ["To refer to the instance of the class", "To define a function", "To create a global variable"],
      answer: "To refer to the instance of the class",
    },
    {
      id: 9,
      question: "Which data type is immutable in Python?",
      options: ["Tuple", "List", "Dictionary"],
      answer: "Tuple",
    },
    {
      id: 10,
      question: "What is the output of len([1, 2, 3, 4])?",
      options: ["3", "4", "5"],
      answer: "4",
    },
  ],
  intermediate: [
    {
      id: 11,
      question: "What is the primary use of decorators in Python?",
      options: ["To modify the behavior of a function", "To create a new variable", "To initialize a class"],
      answer: "To modify the behavior of a function",
    },
    {
      id: 12,
      question: "What is a generator in Python?",
      options: ["A function that yields values one at a time", "A function that returns multiple values", "A function that creates variables"],
      answer: "A function that yields values one at a time",
    },
    {
      id: 13,
      question: "What does 'PEP' stand for in Python?",
      options: ["Python Enhancement Proposal", "Python Environment Program", "Python Essential Package"],
      answer: "Python Enhancement Proposal",
    },
    {
      id: 14,
      question: "How do you create a virtual environment in Python?",
      options: ["python -m venv myenv", "python -env create myenv", "python -newenv myenv"],
      answer: "python -m venv myenv",
    },
    {
      id: 15,
      question: "What is the purpose of the 'with' statement in Python?",
      options: ["To simplify exception handling", "To create a loop", "To define a function"],
      answer: "To simplify exception handling",
    },
    {
      id: 16,
      question: "Which built-in function is used to iterate over sequences in Python?",
      options: ["enumerate()", "count()", "zip()"],
      answer: "enumerate()",
    },
    {
      id: 17,
      question: "How can you create a dictionary in Python?",
      options: ["Using curly braces", "Using square brackets", "Using parentheses"],
      answer: "Using curly braces",
    },
    {
      id: 18,
      question: "What is the difference between a shallow copy and a deep copy in Python?",
      options: ["Shallow copy copies the reference, deep copy copies the object", "Both copy the object", "Shallow copy copies the entire object, deep copy copies the reference"],
      answer: "Shallow copy copies the reference, deep copy copies the object",
    },
    {
      id: 19,
      question: "Which of the following is not a keyword in Python?",
      options: ["eval", "pass", "nonlocal"],
      answer: "eval",
    },
    {
      id: 20,
      question: "What is the purpose of the 'finally' clause in a try-except block?",
      options: ["To execute code regardless of whether an exception occurs", "To define an exception", "To raise an exception"],
      answer: "To execute code regardless of whether an exception occurs",
    },
  ],
  advanced: [
    {
      id: 21,
      question: "What is metaprogramming in Python?",
      options: ["A technique where programs have the ability to treat other programs as their data", "A form of Python's import system", "A technique used to optimize Python code"],
      answer: "A technique where programs have the ability to treat other programs as their data",
    },
    {
      id: 22,
      question: "How does Python's GIL (Global Interpreter Lock) affect multi-threading?",
      options: ["It prevents multiple native threads from executing Python bytecodes simultaneously", "It enhances the performance of multi-threaded applications", "It eliminates the need for multi-threading in Python"],
      answer: "It prevents multiple native threads from executing Python bytecodes simultaneously",
    },
    {
      id: 23,
      question: "What is the purpose of the 'sys' module in Python?",
      options: ["To interact with the Python runtime environment", "To manage files", "To handle mathematical functions"],
      answer: "To interact with the Python runtime environment",
    },
    {
      id: 24,
      question: "How can you optimize the performance of a Python program?",
      options: ["Using built-in functions and libraries, avoiding unnecessary computations, profiling the code", "Only by using multi-threading", "By compiling the code"],
      answer: "Using built-in functions and libraries, avoiding unnecessary computations, profiling the code",
    },
    {
      id: 25,
      question: "What is the primary difference between synchronous and asynchronous programming in Python?",
      options: ["Asynchronous programming allows the program to continue executing other tasks while waiting for operations to complete", "Synchronous programming uses the 'await' keyword", "There is no difference"],
      answer: "Asynchronous programming allows the program to continue executing other tasks while waiting for operations to complete",
    },
    {
      id: 26,
      question: "What is monkey patching in Python?",
      options: ["The ability to modify or extend the behavior of a module or class at runtime", "A form of metaprogramming", "A debugging technique"],
      answer: "The ability to modify or extend the behavior of a module or class at runtime",
    },
    {
      id: 27,
      question: "Which library is commonly used for creating web APIs in Python?",
      options: ["Flask", "Django", "Pandas"],
      answer: "Flask",
    },
    {
      id: 28,
      question: "What is the purpose of 'type hinting' in Python?",
      options: ["To provide hints about variable types to improve code readability", "To define functions", "To run faster programs"],
      answer: "To provide hints about variable types to improve code readability",
    },
    {
      id: 29,
      question: "What is the 'asyncio' module used for in Python?",
      options: ["Writing asynchronous programs", "Debugging Python code", "Managing input/output operations"],
      answer: "Writing asynchronous programs",
    },
    {
      id: 30,
      question: "How does Python's 'context manager' work?",
      options: ["It defines setup and teardown actions around a block of code using 'with'", "It is used for managing exceptions", "It is used for defining class methods"],
      answer: "It defines setup and teardown actions around a block of code using 'with'",
    },
  ],
},
SQL: {
  beginner: [
    {
      id: 1,
      question: "What does SQL stand for?",
      options: ["Structured Query Language", "Structured Question Language", "Simple Query Language"],
      answer: "Structured Query Language",
    },
    {
      id: 2,
      question: "Which SQL statement is used to retrieve data from a database?",
      options: ["SELECT", "GET", "RETRIEVE"],
      answer: "SELECT",
    },
    {
      id: 3,
      question: "Which clause is used to filter records in SQL?",
      options: ["WHERE", "FILTER", "HAVING"],
      answer: "WHERE",
    },
    {
      id: 4,
      question: "What is a primary key in a database?",
      options: ["A unique identifier for a record", "A key for sorting", "A secondary identifier"],
      answer: "A unique identifier for a record",
    },
    {
      id: 5,
      question: "Which SQL function is used to count the number of rows?",
      options: ["COUNT()", "SUM()", "TOTAL()"],
      answer: "COUNT()",
    },
    {
      id: 6,
      question: "What keyword is used to sort the result set in SQL?",
      options: ["ORDER BY", "SORT BY", "GROUP BY"],
      answer: "ORDER BY",
    },
    {
      id: 7,
      question: "Which statement is used to insert new data into a table?",
      options: ["INSERT INTO", "ADD", "PUT"],
      answer: "INSERT INTO",
    },
    {
      id: 8,
      question: "What does a JOIN clause do in SQL?",
      options: ["Combines rows from two or more tables", "Sorts the results", "Filters data"],
      answer: "Combines rows from two or more tables",
    },
    {
      id: 9,
      question: "What is a foreign key?",
      options: ["A field in one table that uniquely identifies a row in another table", "A key used to filter data", "A unique identifier for a table"],
      answer: "A field in one table that uniquely identifies a row in another table",
    },
    {
      id: 10,
      question: "Which SQL command is used to delete records from a table?",
      options: ["DELETE", "REMOVE", "DROP"],
      answer: "DELETE",
    },
  ],
  intermediate: [
    {
      id: 11,
      question: "What is the purpose of the GROUP BY clause in SQL?",
      options: ["To group rows that have the same values", "To filter results", "To join tables"],
      answer: "To group rows that have the same values",
    },
    {
      id: 12,
      question: "How do you retrieve unique values in SQL?",
      options: ["DISTINCT", "UNIQUE", "FILTER"],
      answer: "DISTINCT",
    },
    {
      id: 13,
      question: "Which SQL keyword is used to combine multiple conditions in a query?",
      options: ["AND", "OR", "WITH"],
      answer: "AND",
    },
    {
      id: 14,
      question: "Which function is used to calculate the average value in SQL?",
      options: ["AVG()", "MEAN()", "AVERAGE()"],
      answer: "AVG()",
    },
    {
      id: 15,
      question: "What does the HAVING clause do in SQL?",
      options: ["Filters results after grouping", "Sorts the result", "Limits the number of rows"],
      answer: "Filters results after grouping",
    },
    {
      id: 16,
      question: "Which SQL statement is used to update data in a database?",
      options: ["UPDATE", "MODIFY", "SET"],
      answer: "UPDATE",
    },
    {
      id: 17,
      question: "Which function is used to get the current date in SQL?",
      options: ["CURRENT_DATE()", "NOW()", "TODAY()"],
      answer: "CURRENT_DATE()",
    },
    {
      id: 18,
      question: "Which command is used to delete all data from a table without removing the table structure?",
      options: ["TRUNCATE", "DELETE", "DROP"],
      answer: "TRUNCATE",
    },
    {
      id: 19,
      question: "What is the difference between INNER JOIN and OUTER JOIN?",
      options: ["INNER JOIN returns only matching rows, OUTER JOIN includes unmatched rows", "No difference", "INNER JOIN is faster"],
      answer: "INNER JOIN returns only matching rows, OUTER JOIN includes unmatched rows",
    },
    {
      id: 20,
      question: "Which SQL function is used to concatenate strings?",
      options: ["CONCAT()", "MERGE()", "JOIN()"],
      answer: "CONCAT()",
    },
  ],
  advanced: [
    {
      id: 21,
      question: "What is a subquery in SQL?",
      options: ["A query inside another query", "A query used for sorting", "A query that filters data"],
      answer: "A query inside another query",
    },
    {
      id: 22,
      question: "What is a transaction in SQL?",
      options: ["A sequence of database operations treated as a single unit", "A query that retrieves data", "A backup of the database"],
      answer: "A sequence of database operations treated as a single unit",
    },
    {
      id: 23,
      question: "What does ACID stand for in SQL?",
      options: ["Atomicity, Consistency, Isolation, Durability", "Automatic, Consistent, Independent, Dependent", "Access, Control, Information, Data"],
      answer: "Atomicity, Consistency, Isolation, Durability",
    },
    {
      id: 24,
      question: "What is the difference between UNION and UNION ALL?",
      options: ["UNION removes duplicates, UNION ALL keeps all records", "UNION is faster", "No difference"],
      answer: "UNION removes duplicates, UNION ALL keeps all records",
    },
    {
      id: 25,
      question: "What is a CTE (Common Table Expression) in SQL?",
      options: ["A temporary result set", "A primary key", "A function for sorting"],
      answer: "A temporary result set",
    },
    {
      id: 26,
      question: "What is a stored procedure in SQL?",
      options: ["A set of SQL statements stored in the database", "A way to retrieve data", "A primary key for tables"],
      answer: "A set of SQL statements stored in the database",
    },
    {
      id: 27,
      question: "What does the RANK() function do in SQL?",
      options: ["Assigns a rank to each row in a result set", "Sorts the result", "Filters the data"],
      answer: "Assigns a rank to each row in a result set",
    },
    {
      id: 28,
      question: "What is a recursive query in SQL?",
      options: ["A query that refers to itself", "A query that repeats", "A query used for joining"],
      answer: "A query that refers to itself",
    },
    {
      id: 29,
      question: "What is the use of an index in SQL?",
      options: ["To improve the speed of data retrieval", "To sort the data", "To filter records"],
      answer: "To improve the speed of data retrieval",
    },
    {
      id: 30,
      question: "Which SQL function returns the highest value in a column?",
      options: ["MAX()", "HIGH()", "GREATEST()"],
      answer: "MAX()",
    },
  ],
},
};

  export default questions ;