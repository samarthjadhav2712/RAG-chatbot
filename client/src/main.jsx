import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"

const rootElement = document.getElementById("root")

if (!rootElement) {
  document.body.innerHTML = "<h1>Error: Root element not found</h1>"
  throw new Error("Root element with id='root' not found in HTML")
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
