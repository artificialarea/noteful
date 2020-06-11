import React from 'react';
import uuid from 'react-uuid';
import './AddNote.css';


export default class AddNote extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      id: '',
      name: '',
      modified: '', 
      // this.setState({modified: new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestamp)});
      folderId: '',
      content: 'type smthin here',
    }
    // will need to dynamically generate id (uuid) and modified timestamp upon Saving
  }

  updateInputs(event) {
    this.setState({
      [event.target.name] : event.target.value 
    })
  }

  updateSelect(value) {
    this.setState({
      folderId : value 
    })
  }

  handleSubmit = event => {
    event.preventDefault();

    // for this.state.modified
    let timestamp = new Date();
    let date = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestamp);
    console.log(date)
    const callAsync = () => {
      // console.log(this.state);
      this.props.handleNoteState(this.state);
      this.props.onClickCancel(); // instead of using withRouter package
      // this.props.history.goBack(); 
      // this.props.history.push('/');
    }

    this.setState({
      id: uuid(),
      modified: date
    }, callAsync);

  }


  render() {
    console.log(this.state)
    // pre-populate folder dropdown with, well, folders.
    const { folders } = this.props;
    const options = folders.map(folder => 
      <option key={folder.id} value={folder.id}>{folder.name}</option>
    )

    return (
      <div className="add-note">
        <form onSubmit={this.handleSubmit}>
          <h2>Add a note...</h2>
          <div>
            <label htmlFor="folder">To Folder:</label>
            <select onChange={(event) => this.updateSelect(event.target.value)}>
              <option value="">pick a folder</option>
              {options}
            </select>
          </div>
          <div>
            <label htmlFor="name">Note Name:</label>
            <input type="text" name="name" id="name" 
              onChange={(event) => this.updateInputs(event)}
            />
          </div>
          <div>
            <label htmlFor="content">Note Text:</label>
            <textarea name="content" id="content" 
              rows="5" cols="30"
              className="add-note__content"
              value={this.state.content}
              onChange={(event) => this.updateInputs(event)}
            />
          </div>
          <button type="submit">Save</button>
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

AddNote.defaultProps = {
  folders: []
}

/*
"id": "cbc787a0-ffaf-11e8-8eb2-f2801f1b9fd1",
"name": "Dogs",
"modified": "2019-01-03T00:00:00.000Z",
"folderId": "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1",
"content": "Corporis accusamus placeat quas non voluptas. Harum fugit molestias qui. Velit ex animi reiciendis quasi.
*/