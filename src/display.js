import { LitElement, html, css } from 'lit-element'

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class Display extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        border: solid 1px gray;
        padding: 16px;
        max-width: 800px;
      }
    `
  }

  static get properties() {
    return {
      /**
       * The name to say "Hello" to.
       */
      todos: { type: String },
      select: {type: Function},
      delete: {type: Function}

    }
  }

  constructor() {
    super()
    this.todos = []
    this.select = () => {}
    this.delete = () => {}
  }

  render() {
    return html`
      ${this.todos.map(todo => {
          return html`<div>
          <h3 @click=${() => {this.select(todo)}}>${todo.reminder} -  ${todo.completed ? "O" : "X"}</h3>
          <button @click=${() => {this.delete(todo)}}>Delete</button>
          </div>`
      })}
    `
  }

}

window.customElements.define('display-display', Display)