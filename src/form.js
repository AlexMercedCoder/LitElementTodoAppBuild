import { LitElement, html, css } from 'lit-element'

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class Form extends LitElement {
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
      reminder: {type: String},
      _id: {type: String},
      action: {type: String},
      completed: {type: Boolean},
      handleCreate: {type: Function},
      handleUpdate: {type: Function}

    }
  }

  constructor() {
    super()
    this.reminder = ""
    this._id = ""
    this.action = "create"
    this.completed = false
    this.handleCreate = () => {}
    this.handleUpdate = () => {}
  }

  render() {
    return html`
      <form @submit=${(e) => this.handleSubmit(e)}>
      <input type=text value=${this.reminder}>
      <input type=checkbox ?checked=${this.completed}>
      <input type="submit" value="submit">
      </form>
    `
  }

  handleSubmit(event){
      event.preventDefault()
      const text = this.shadowRoot.querySelector("[type=text]")
      const checkbox = this.shadowRoot.querySelector("[type=checkbox]")
      const todo = {reminder: text.value, completed: checkbox.checked}
      if(this.action === "create"){
        this.handleCreate(todo)
      }

      if (this.action === "update"){
        todo._id = this._id
        this.handleUpdate(todo)
      }
      

  }

}

window.customElements.define('form-form', Form)