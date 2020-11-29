import React from 'react';
import uuid from 'react-uuid';
import './AddNote.css';
import ValidationError from './ValidationError';
import NotesContext from '../NotesContext';
import config from '../config';


export default class AddNote extends React.Component {

    static contextType = NotesContext;

    constructor(props) {
        super(props)
        this.state = {
            id: '',
            name: '',
            modified: '',
            folderId: '',
            content: '',
            submit: false, // for validation inline conditionals
        }
    }

    updateInputs(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    updateSelect(value) {
        this.setState({
            folderId: value
        })
    }

    handleAddNoteSubmit = (event) => {

        const newNote = {
            name: this.state.name,
            folderId: this.state.folderId,
            content: this.state.content,
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
                this.props.history.push(`/folders/${this.state.folderId}`)
            )
            .catch(err => {
                console.log(err)
            });
    }
    // previously
    // handleSubmit = event => {
    //     event.preventDefault();

    //     // for this.state.modified
    //     let timestamp = new Date();
    //     let date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(timestamp);
    //     console.log(date)

    //     const callAsync = () => {
    //         // stop submission if any of the inputs are blank
    //         // which will also trigger validation (because submit property is now 'true', too)
    //         const obj = this.state;
    //         if (!Object.values(obj).includes('')) {
    //             this.props.handleNoteState(this.state);
    //             this.props.onClickCancel();
    //         }
    //     }

    //     this.setState({
    //         // generate unique id and timestamp 
    //         // before triggering callback props to setState of überstate.notes in App.js
    //         id: uuid(),
    //         modified: date,
    //         submit: true
    //     }, callAsync);
    // }

    validateFolder() {
        const folder = this.state.folderId;
        if (folder.length === 0) {
            return 'You must pick a folder associated with the note.';
        }
    }

    validateName() {
        const name = this.state.name;
        if (name.length === 0) {
            return 'Your note must have a name.';
        }
    }

    validateNote() {
        const content = this.state.content;
        if (content.length === 0) {
            return 'What\'s your note?';
        }
    }

    render() {
        console.log(this.state)
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
                        <select onChange={(event) => this.updateSelect(event.target.value)}>
                            <option value="">pick a folder</option>
                            {options}
                        </select>

                    </div>
                    <div>
                        <label htmlFor="name">
                            Name: {this.state.submit &&
                                <ValidationError message={this.validateName()} />}
                        </label>
                        <input type="text" name="name" id="name"
                            onChange={(event) => this.updateInputs(event)}
                        />
                    </div>
                    <div>
                        <label htmlFor="content">
                            Note: {this.state.submit &&
                                <ValidationError message={this.validateNote()} />}
                        </label>
                        <textarea name="content" id="content"
                            rows="5" cols="40"
                            className="add-note__content"
                            value={this.state.content}
                            onChange={(event) => this.updateInputs(event)}
                        />
                    </div>
                    <button type="submit">Save</button>
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
