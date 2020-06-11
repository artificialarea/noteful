import React from 'react';
// [PS1] //
import { withRouter } from 'react-router-dom'; 
import uuid from 'react-uuid';
import './AddFolder.css';


class AddFolder extends React.Component {

  // temp storage 
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      name: '',
    }
  }

  updateFolderName(name) {
    this.setState({
      name
    })
  }

  handleSubmit = event => {
    event.preventDefault();

    const callAsync = () => {
      // console.log(this.state);
      this.props.handleFolderState(this.state);
      
      // [PS1] //
      this.props.history.push('/');
    }

    // [PS2] //
    this.setState({
      // generate unique id
      // before triggering callback props to setState of überstate.folders in App.js
      id: uuid()
    }, callAsync);
  }

  validateName() {
    const name = this.state.name.trim();
    if (name.length === 0) {
      return "a string, so function has a value and is not 'undefined'.";
    }
    // else 'undefined'
    // so submit <button disabled='undefined'> 
  }


  render() {
    return (
      <div>
        <form className="add-folder" onSubmit={this.handleSubmit}>
          <h2>Add Folder</h2>
          <label htmlFor="name">Name of Folder:</label>
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

// [PS1] //
export default withRouter(AddFolder)  


///////////////////////////////////////////////////////////////////
// POST-SCRIPT ////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

// [PS1] withRouter 
///////////////////////////////////////////////////////////////////
// https://reacttraining.com/react-router/core/api/withRouter
//
// this.props.history.push('/') at this level in tree structure
// only possible thx to (imported) 'withRouter' component.
// Although I could have done it without withRouter via
// this.props.onClickCancel() 


// [PS2] async + setState
///////////////////////////////////////////////////////////////////
// Classic asynchronous problem:
// couldn't rely on setState generating an uuid for id in time 
// for me to access this.state.id elsewhere,
// so needed to consider asynchronous methods.
//
// Disregarded creating a Promise/.then
// in favour of the setState's callback function...
// 
//// async solution, v2
// this.setState({
//   id: uuid()
// }, callAsync); 
//// callback function 'callAsync' triggered once setState completed task.
//
//// async solution, v1
//// https://stackoverflow.com/questions/48044601/react-setstate-with-promise-as-a-callback?rq=1
// this.setState({
//   id: uuid()
// }, async () => {
//   try {
//     console.log('waiting to complete Promise...')
//     callAsync();
//   } catch (err) {
//     console.log("Promise unfulfilled")
//   }
// })
