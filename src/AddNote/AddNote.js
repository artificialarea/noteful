import React from 'react';
import './AddNote.css';


export default class AddNote extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      id: '',
      name: '',
      modified: '', 
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

  render() {

    // need to pre-populate Folder dropdown with, well, folders
    const { folders } = this.props;
    const options = folders.map(folder => {
      return <option value={folder.id}>{folder.name}</option>
    })
    return (
      <div className="add-note">
        <form onSubmit={this.handleSubmit}>
          <h2>Add a note...</h2>
          <div>
            {/* need to pre-populate dropdown with folders */}
            <label htmlFor="folder">Within folder:</label>
            <select>
              <option value="">pick a folder</option>
              {options}
            </select>
          </div>
          <div>
            <label htmlFor="name">Name of Note:</label>
            <input type="text" name="name" id="name" 
              onChange={(event) => this.updateInputs(event)}
            />
          </div>
          <div>
            <label htmlFor="content">Contents of Note:</label>
            <textarea name="content" id="content" 
              className="add-note__content"
              value={this.state.content}
              onChange={(event) => this.updateInputs(event)}
            />
          </div>
          <button type="submit">Save</button>
          <button type="reset">Cancel</button>
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