import React from 'react';
// [PS1] //
import config from '../config'
import './AddFolder.css';
import NotesContext from '../NotesContext';


export default class AddFolder extends React.Component {

  static contextType = NotesContext;


  constructor(props) {
    super(props)
    // for controlled component/form
    this.state = {
      name: {
        value: '',
        touched: false
      }
    }
  }

  updateFolderName(name) {
    this.setState({
      name: {
        value: name,
        touched: true
      }
    })
  }

  handleAddFolderSubmit = (event) => {
    event.preventDefault();

    const newFolder = JSON.stringify({
			name: this.state.name.value
		});

    const url = `${config.API_ENDPOINT}/folders`;
    const options = {
      method: 'POST',
      body: newFolder,
      headers: { 'content-type': 'application/json' },
    }
  
    fetch(url, options)
      .then(response => {
        if(!response.ok) {
          throw new Error('Houston, we have a problem.')
        }
        return response.json()
      })
      .then(data => {
        console.log("fetch().then(response).then(data): ", data)
        this.context.addFolder(data)
      })
      .then(
        this.props.history.push('/')
      )
      .catch(err => {
        console.log(err)
      });
  }

  validateName() {
    const name = this.state.name.value.trim();
    if (name.length === 0) {
      return "No string";
    }
    // else 'undefined'
    // so submit <button disabled='undefined'> 
  }


  render() {
    console.log(this.state.name)
    return (
      <div>
        <form className="add-folder" 
          onSubmit={this.handleAddFolderSubmit}
        >
          <h2>Add Folder</h2>
          <label htmlFor="name">Folder name:</label>
          <input
            type="text"
            className="add-folder__name"
            name="name"
            id="name"
            onChange={event => this.updateFolderName(event.target.value)}
          />
          <button 
            type="submit"
            disabled = {
              this.validateName()
            }
          >
            Save
          </button>
          <button 
            type="reset"
            onClick={this.props.onClickCancel}
          >
            Cancel
          </button>
        </form>
      </div>
    )
  }
}
