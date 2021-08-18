import { LitElement, html, css } from "lit-element";
import "./display";
import "./form";

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class App extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        border: solid 1px gray;
        padding: 16px;
        max-width: 800px;
      }
    `;
  }

  static get properties() {
    return {
      todos: { type: Array },
      showForm: { type: Boolean },
      reminder: { type: String },
      _id: { type: String },
      action: { type: String },
      completed: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.todos = [];
    this.showForm = false;
    this.url = "http://localhost:10000/todos";
    this.reminder = "";
    this._id = "";
    this.action = "create";
    this.completed = false;
  }

  render() {
    return html`
      <div>
        <h1>Alex's Todo App</h1>
        <button @click=${this.toggleForm}>Create</button>
        <display-display 
        .todos="${this.todos}"
        .select="${(t) => this.select(t)}"
        .delete="${(t)=> this.handleDelete(t)}"
        ></display-display>
        ${this.showForm
          ? html`<form-form
              .reminder=${this.reminder}
              ._id=${this._id}
              .action=${this.action}
              .completed=${this.completed}
              .handleCreate=${(t) => this.handleCreate(t)}
              .handleUpdate=${(t) => this.handleUpdate(t)}
            ></form-form>`
          : null}
      </div>
    `;
  }

  async connectedCallback() {
    super.connectedCallback();
    this.getTodos();
  }

  async getTodos() {
    const response = await fetch(this.url);
    const data = await response.json();
    this.todos = data;
    this.resetState();
  }

  resetState() {
    this.showForm = false;
    this.reminder = "";
    this._id = "";
    this.action = "create";
    this.completed = false;
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  async handleCreate(todo) {
    await fetch(this.url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });

    this.getTodos();
  }

  async handleUpdate(todo) {
      console.log(todo)
    await fetch(this.url + `/${todo._id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });

    this.getTodos();
  }

  async handleDelete(todo) {
    await fetch(this.url + `/${todo._id}`, {
      method: "delete",
    });

    this.getTodos();
  }

  select(todo){
      this._id = todo._id
      this.reminder = todo.reminder
      this.completed = todo.completed
      this.action = "update"
      this.showForm = true
  }
}

window.customElements.define("app-app", App);
