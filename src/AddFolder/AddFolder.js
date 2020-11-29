import React from 'react';
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

        const newFolder = {
            name: this.state.name.value
        };

        const url = `${config.API_ENDPOINT}/folders`;
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(newFolder),
        }

        fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Houston, we have a problem.')
                }
                return response.json()
            })
            .then(data => {
                this.context.addFolder(data)
                this.props.history.push('/')
            })
            // .then(
            //     this.props.history.push('/')
            // )
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
                        disabled={
                            this.validateName()
                        }
                    >
                        Save
                    </button>
                    <button
                        type="reset"
                        onClick={() => this.props.history.push('/')}
                    >
                        Cancel
                    </button>
                </form>
            </div>
        )
    }
}
