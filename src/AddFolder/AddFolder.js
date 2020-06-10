import React from 'react';
import uuid from 'react-uuid';
import './AddFolder.css';


export default class AddFolder extends React.Component {

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
    // Disregarded creating a Promise/.then for now, 
    // in favour of the setState's callback function...

    // asynch solution, v2
    this.setState({
      id: uuid()
    }, this.callAsync2);

    // asynch solution, v1
    // https://stackoverflow.com/questions/48044601/react-setstate-with-promise-as-a-callback?rq=1
    // this.setState({
    //   id: uuid()
    // }, async () => {
    //   try {
    //     console.log('waiting to complete Promise...')
    //     this.callAsync();
    //   } catch (err) {
    //     console.log("Promise unfulfilled")
    //   }
    // })

  }

  // assoc. with asych solution, v2
  callAsync2 = () => {
    const { id, name } = this.state
    console.log('id: ', id); // uuid isn't generated in time
    console.log('name: ', name);
  }
  // assoc. with asych solution, v1
  // callAsync() {
  //   const { id, name } = this.state
  //   console.log('id: ', id); 
  //   console.log('name: ', name);
  // }


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
          <button>Save</button>
          <button>Cancel</button>
        </form>
      </div>
    )
  }
}
