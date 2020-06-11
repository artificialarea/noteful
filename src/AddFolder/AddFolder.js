import React from 'react';
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
    // this.setState({
    //   id: uuid()
    // });
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // classic asynchronous problem:
    // can't rely on setState generating an uuid for id in time 
    // for me to access this.state.id elsewhere,
    // so need to consider asynchronous methods.
    //
    // Disregarded creating a Promise/.then, 
    // in favour of the setState's callback function...

    // assoc. with asnyc solution(s)
    const callAsync = () => {
      // console.log(this.state);
      this.props.handleFolderState(this.state);

      // possible thx to 'withRouter' package import
      // although I could have just done it via 
      // this.props.onClickCancel() without withRouter
      // this.props.history.goBack(); 
      this.props.history.push('/');
    }

    // async solution, v2
    this.setState({
      id: uuid()
    }, callAsync);

    // async solution, v1
    // https://stackoverflow.com/questions/48044601/react-setstate-with-promise-as-a-callback?rq=1
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

export default withRouter(AddFolder)