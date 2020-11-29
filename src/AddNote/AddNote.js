import React from 'react';
import './AddNote.css';
import ValidationError from './ValidationError';
import NotesContext from '../NotesContext';
import config from '../config';
import PropTypes from 'prop-types';


export default class AddNote extends React.Component {

    static contextType = NotesContext;

    constructor(props) {
        super(props)
        this.state = {
            name: {
                value: '', 
                touched: false
            },
            folderId: {
                value: '', 
                touched: false
            },
            content: {
                value: '', 
                touched: false
            },
        }
    }

    // updateInputs(event) {
    //     this.setState({
    //         [event.target.name.value]: event.target.value
    //     })
    // }

    updateName(name) {
        this.setState({
            name: {
                value: name,
                touched: true,
            }
        })
    }

    updateContent(content) {
        this.setState({
            content: {
                value: content,
                touched: true,
            }
        })
    }

    updateFolder(folderId) {
        this.setState({
            folderId: {
                value: folderId,
                touched: true,
            }
        })
    }

    handleAddNoteSubmit = (event) => {
        event.preventDefault();

        const newNote = {
            name: this.state.name.value,
            folderId: this.state.folderId.value,
            content: this.state.content.value,
            modified: new Date(),
        };

        console.log(newNote)
        
        const url = `${config.API_ENDPOINT}/notes`;
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(newNote),
        }
        
        fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Houston, we have a problem.')
                }
                return response.json()
            })
            .then(data => {
                this.context.addNote(data)
            })
            .then(
                this.props.history.push(`/folders/${this.state.folderId.value}`)
            )
            .catch(err => {
                console.log(err)
            });
    }

    validateFolder() {
        const folder = this.state.folderId.value;
        if (folder.length === 0) {
            return 'You must pick a folder associated with the note.';
        }
    }

    validateName() {
        const name = this.state.name.value.trim();
        if (name.length === 0) {
            return 'Your note must have a name.';
        }
    }

    validateNote() {
        const content = this.state.content.value;
        if (content.length === 0) {
            return 'What\'s your note?';
        }
    }

    render() {
        // pre-populate folder dropdown with... well, folders
        const { folders } = this.context;
        const options = folders.map(folder =>
            <option key={folder.id} value={folder.id}>{folder.name}</option>
        )

        return (
            <div className="add-note">
                <form onSubmit={this.handleAddNoteSubmit}>
                    <h2>Add a note...</h2>
                    <div>
                        <label htmlFor="folder">
                            Folder: {this.state.submit &&
                                <ValidationError message={this.validateFolder()} />}
                        </label>
                        <select 
                            id="folder"
                            name="folder"
                            onChange={(event) => this.updateFolder(event.target.value)}>
                            <option value="">pick a folder</option>
                            {options}
                        </select>

                    </div>
                    <div>
                        <label htmlFor="name">
                            Name: {this.state.submit &&
                                <ValidationError message={this.validateName()} />}
                        </label>
                        <input 
                            type="text" 
                            name="name" 
                            id="name"
                            onChange={(event) => this.updateName(event.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="content">
                            Note: {this.state.submit &&
                                <ValidationError message={this.validateNote()} />}
                        </label>
                        <textarea 
                            name="content" 
                            id="content"
                            rows="5" cols="40"
                            className="add-note__content"
                            value={this.state.content.value}
                            onChange={(event) => this.updateContent(event.target.value)}
                        />
                    </div>
                    <button 
                        type="submit"
                        disabled = {this.validateName() || this.validateFolder()}
                    >
                        Save
                    </button>
                    <button
                        type="reset"
                        // onClick={this.props.onClickCancel}
                        onClick={() => this.props.history.push('/')}
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

AddNote.propTypes = {
	folders: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
	})),
	addNote: PropTypes.func
}
