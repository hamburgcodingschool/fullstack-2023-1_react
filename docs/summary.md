## Lesson 01 (15.5.2023):
- React is the most popular **frontend framework**
- React is maintained and funded by Facebook
- React itself is built in JavaScript
- React runs in the Browser (on the client)
- React only uses existing browser APIs -> Everything React does can also be done without React (it's just a lot harder to do so)
- The process of creating a new application with a default configuration and some sample files is called **scaffolding**
- `create-react-app` is the most popular scaffolding tool, but it's clunky and unmaintained
- `vite` is a bundler and also a very modern, fast and minimal scaffolding tool
- React comes together with **JSX** – which looks like its HTML being used inside of JavaScript (Notice that there are no quotation marks around JSX blocks – JSX is not a string!)
```jsx
const element = <h1>Hello, world!</h1>;
```
- React helps us to better structure and reuse our code by using **Components**
- A component is just a function that returns some JSX
```jsx
function MyComponent() {
  return (
    <>
      <h1>Hello this is JSX</h1>
      <AnotherComponent />
    </>
  );
}
```
- Conventionally we always begin our component names with an *uppercase letter* (`MyComponent`). We create one component per file, and we name our files just like the component (`MyComponent.jsx`)
- A component must always have a **single top-level element**
```jsx
// THIS WILL NOT WORK - NO SINGLE TOP-LEVEL ELEMENT
function MyComponent() {
  return (
    <h1>Hello this is JSX</h1>
    <AnotherComponent />
  );
}
```
- If you want to have a single top-level element without any semantic meaning, you can use a **Fragment**: `<>` and `</>`

## Lesson 02 (17.5.2023):
- Inside of JSX, we can use any JavaScript expression (like variables, function calls, string concatenation or mathematical operations)
```jsx
const name = 'Michaela Musterfrau';
const element = <h1>Hello, {name}</h1>;
```
- React components can define properties (**Props**)
- Props can be accessed/read through the `props` object, which React will always pass to our components.
```jsx
function Greeter(props) {
  return (
    <h1>Hello, {props.name} from {props.location}!</h1>
  );
}
```
- Passing values to these properties looks like using regular pre-existing HTML attributes (like `src`, `href`, etc.)
```jsx
// Normal HTML attributes
<div class="my-class" id="some-id" />
// React component with props
<Greeter name="Maria" location="Berlin" />
```
- When using a default HTML tag inside of React/JSX its attributes might have a different name (e.g. the `class="my-class"` attribute becomes `className="my-class"`)
- There is a special prop called `children`, which automatically contains everything that's between the opening and closing tag of a React component.
```jsx
function Greeter(props) {
  return (
    <div>
      <h1>Hello, {props.name} from {props.location}!</h1>
      <div>{props.children}</div>
    </div>
  );
}
```
- Using/passing children to a component looks like this:
```jsx
<Greeter name="Maria" location="Berlin">
  <h2>More content goes here</h2>
  <p>All this content will be passed to the component.</p>
</Greeter>
```
- Instead of always repeating the `props` object, we can also use **Object destructuring** right where we define the parameters of our function:
```jsx
function Greeter({name, location, children}) {
  return (
    <div>
      <h1>Hello, {name} from {location}!</h1>
      <div>{children}</div>
    </div>
  );
}
```

## Lesson 03 (22.05.2023):
- Using the object destructuring syntax also allows to set **default values** for each prop individually, when they are not passed in:
```jsx
function Greeter({name, location = "Hamburg"}) {
  return (
    <h1>Hello, {name} from {location}!</h1>
  );
}
```
- You can conditionally render some parts of your components by using the **logical OR**, **logical AND** and **ternary operator**:
```jsx
function Greeter({myBooleanCondition, myProperty}) {
  return (
    <>
      {/* Logical AND: Render something ONLY when another variable is truthy */}
      {myBooleanCondition && <h1>Hello</h1>}
      {/* Logical OR: Render something ONLY when it is truthy OTHERWISE use a fallback value */}
      {myProperty || "Fallback value"}
      {/* Ternary Operator: Render A or B, depending on a condition (like if/else) */}
      {myBooleanCondition ? <h2>If true, this headline will appear</h2>:<p>If false, this paragraph will render</p>}
    </>
  );
}
```

## Lesson 04 (24.05.2023):
- In React components we use the `map()` function to iterate over arrays (typically to create some HTML/JSX for every array item). Just like the other array functions `filter()`, `reduce()` and `forEach()`, the `map()` function takes another function as its parameter. `map()` will call this parameter function for every item in the array and pass each array item as a parameter into this function.
```jsx
function FriendList() {
  const myFriends = ["Max", "Sara", "Lars", "Sabine"];

  return (
    <ul>
      {myFriends.map((friend) => <li>{friend}</li>)}
    </ul>
  );
}

``` 
- When you want to keep a value inside of a variable and the DOM should automatically be updated when this value changes, we need to use a **state variable** (this principle is called **Reactivity** – which is where React gets its name from)
- In React, we can access and modify the **state** of a component with the `useState()` **hook function**. `useState()` takes a single parameter, which is the default/starting value of your state variable. It returns two things: the actual state variable (which we can use to access/read the state) and a function to change the state variable (to modify the value).
```jsx
const [counterValue, setCounterValue] = useState(123);
```
- "Where" you put your state in your React application is very important (and can be tricky): It should be as "low" as possible and as "high" as necessary (in your component tree).
- If we want to show or edit a state variable in a component that's "below" (in the component tree) the component where the state is kept, then we need to pass it down through props.

```jsx
import { useState } from "react";

function TopLevelComponent() {
  const [myCounterValue, setMyCounterValue] = useState(0);

  const resetCounter = () => {
    setMyCounterValue(0);
  };

  return (
    <>
      <SomeChildComponent counter={myCounterValue} />
      <AnotherChildComponent
        messageCounter={myCounterValue}
        onClickReset={resetCounter}
      />
    </>
  );
}

function SomeChildComponent({ counter }) {
  return <div>{counter}</div>;
}

function AnotherChildComponent({ messageCounter, onClickReset }) {
  return (
    <ul>
      <li>Inbox - {messageCounter}</li>
      <li>
        <button onClick={onClickReset}>Reset Counter</button>
      </li>
    </ul>
  );
}
```

## Lesson 05 (26.05.2023):
- Typically, when we use forms or individual inputs, we want to keep their value inside of a state variable. To do this, we need to create **controlled inputs/forms** (meaning that their values are controlled by React). To do this, we need to do **two things**:
  - Pass our state variable as a `value` to the input
  - Pass an update function to the `onChange` attribute of our input

```jsx
import React, { useState } from 'react';

export default function App() {
  const [username, setUsername] = useState('');

  return (
    <>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>

      {username && <h1>Hello, {username}</h1>}
    </>
  );
}
```
- We should treat React state variables as **immutable**. So if we use arrays or objects inside of state variables, we can't just update(mutate) them, but instead we need to create new objects. This can easily be done with the Spread syntax:
```js
const someArray = ["Peter", "Marie", "Inga"];

// Now if we want to push a new element to the end of the array, we can't use .push()
// Instead we use the spread syntax and add another element at the end/start of the array
const extendedArray = [...someArray, "Jonas"];
```

## Lesson 06 (30.05.2023)
- To interact with "stuff that doesn't live in React" (we call all of this stuff **Side Effects** like APIs, non-React JS libraries and frameworks, the global `document` or `window` object, timers, etc.), we can use the [`useEffect()` hook](https://reactjs.org/docs/hooks-effect.html).
- `useEffect()` takes a function (which contains side effects) as its first parameter. The second parameter is an array called `dependencies`, it contains an array of values. Whenever one of these changes, the function in the first parameter will run again.
```jsx
function MyComponent() {
  const [fetchedData, setFetchedData] = useState("");

  useEffect(() => {
    fetch("https://myApi.com/myEndpoint/234")
      .then((result) => result.json())
      .then((data) => {
        setFetchedData(data);
      });
  });

  return <div>{fetchedData}</div>;
}

```
- If we pass an empty array to the dependency array of `useEffect(someFunction, [])`, this means that the effect will only run when the component is rendered for the first time – not when the state inside of this component changes.

## Lesson 07 (01.06.2023)
- React apps are **SPA (Single Page Applications)** – this refers to the **single request** they make, to fetch the JS source code from a server. This single code bundle will contain everything they need (including React) to function (obviously there will still be requests to other APIs, your backend, images, fonts, etc. – but the App logic itself is contained within one single bundle of code).
- Inside of **SPA** we don't want to use regular HTML links (`<a href="xyz"/>`) for navigation – because clicking on this link will always trigger a new request to the server (which is unnecessary, because our App has already been loaded). Using default links will also reset our state, so it will probably break app behavior.
- Instead of using regular links, we use **client-side navigation** – which means, we will just use browser APIs like the [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API) that our browser offers, to modify the Location bar and make it "look like we are clicking on links" – even though we're actually just updating the Location bar and conditionally render/hide specific components.
- To make this easy for us, we can use a **Router**. This is a library that gives us at least two things to implement client-side navigation: A `<Link>` component and a `<Route>` component. The most popular router is [react-router](https://reactrouter.com/en/main) but since version 5 it has become a lot weirder to use. Its old version 4 is sill widely used and it has a very nice API. There is also [wouter](https://github.com/molefrog/wouter), which is very similar to v4 of react-router.
- A Link component behaves mostly like the `<a>` HTML tag, but clicking on it, will not trigger a new request from the browser.
- A Route component is basically a big `if ()` condition, that is true, when the current URL in the browser matches a given `path`.
```jsx
import { Link, Route } from "wouter";

function App() {
  return (
    <div>
      <Link href="/users/1">Profile</Link>

      <Route path="/about">About Us</Route>
      <Route path="/users/:name">
        {(params) => <div>Hello, {params.name}!</div>}
      </Route>
      <Route path="/inbox" component={InboxPage} />
    </div>
  );
}

```
- Routers will always offer a way to define dynamic route parameters, which you can use to match a whole bunch paths – not just a single one.

```jsx
<Route path="/users/:name">
  {(params) => <div>Hello, {params.name}!</div>}
</Route>
```

## Lesson 08 (05.06.2023)
- When React applications grow bigger, the amount of prop drilling (passing props down through many levels of components) can become very annoying. Therefore we can use a **global state**, which can be accessed from any component (typically a global state container is called **store**). There are many solutions/frameworks for this.
- React offers an inbuilt solution for this purpose: the Context API (in the shape of the `useContext()` hook). With this we can set up global providers which can hold our state. However `useContext()` should not be used for big applications, as it has some performance problems.
- Probably the most popular solution for big applications is the (Redux framework)[https://redux.js.org/]. It is a very powerful global state management solution. It is an implementation of an abstract concept called the Flux pattern.
- For small to medium sized apps, there is a very minimal and yet effective global state management solution named (Zustand)[https://github.com/pmndrs/zustand]. It has a very minimal API and is therefore very beginner friendly (compared to Redux). A simple store can be created in a separate file like this:
```jsx
import { create } from 'zustand'

const useMyStore = create((set) => ({
  counter: 0,
  increaseCounter: () => set((state) => ({ counter: state.counter + 1 })),
  decreaseCounter: () => set((state) => ({ counter: state.counter - 1 })),
  resetCounter: () => set({ counter: 0 }),
}))
```
- Now inside of ANY component, you can use this store like this:
```jsx
function MyCounter() {
  const counter = useMyStore((state) => state.counter);
  const increaseCounter = useMyStore((state) => state.increaseCounter);
  const decreaseCounter = useMyStore((state) => state.decreaseCounter);

  return (
    <>
      <h1>{counter}</h1>
      <button onClick={increaseCounter}>Increase</button>
      <button onClick={decreaseCounter}>Decrease</button>
    </>
  )
}
```