
// const element = <h1 title="foo">Hello</h1>
// const container = document.getElementById("root")
// ReactDOM.render(element, container)

// const element = <div id="foo"><a>bar</><b /><div/>
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map(child => typeof child === "object" ? child : createTextElement(child))
    }
  }
}

function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: { nodeValue: text },
    children: [],
  }
}

const Didact = {
  createElement,
}

const element = Didact.createElement(
  Didact.createElement("a", null, "bar"),
  Didact.createElement("b")
)

// If we have a comment like this one, when babel transpiles the JSX it will use the function we define.
// /** @jsx Didact.createElement */
// const element = <div id="foo"><a>bar</><b /><div/>

// hmm, Babel...


const container = document.getElementById("root")
// that's fine how it is

// ReactDOM.render(element, container)
const node = document.createElement(element.type)
node["title"] = element.props.title

const text = document.createTextNode("")
text["nodeValue"] = element.props.children

node.appendChild(text)
container.appendChild(node)
