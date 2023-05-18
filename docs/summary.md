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