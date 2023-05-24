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