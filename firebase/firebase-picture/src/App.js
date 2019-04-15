import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as firebase from "firebase";

import "./App.css";
import Notes from "./notes";
import { db_config } from "./config";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note: "",
      notes: []
    };
    this.app = firebase.initializeApp(db_config);
    this.db = this.app
      .database()
      .ref()
      .child("notes");
  }

  componentWillMount() {
    let arr = [];
    this.db.on("child_added", snap => {
      console.log("snap====>", snap.key);
      arr.push({ n: snap.val().noteContent, id: snap.key });
      this.setState({
        notes: arr
      });
    });
    /////////////////////////////////

    this.db.on("child_removed", snap => {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === snap.key) {
          arr.splice(i, 1);
        }
      }
      this.setState({ notes: arr });
    });
  }

  eventHandler = event => {
    this.setState({ note: event.target.value });
  };
  submitNote = e => {
    e.target.style.color = "white";
    const input = ReactDOM.findDOMNode(this.refs.input1);
    input.style.background = "red";
    console.log(input.style);

    //////////////////////////

    this.db.push().set({ noteContent: this.state.note });
  };

  removeNote = id => {
    this.db.child(id).remove();
  };

  render() {
    console.log(this.state.notes);
    return (
      <div className="App">
        <h1>Fire base </h1>
        {this.state.notes.map((note, i) => {
          return (
            <Notes
              note={note.n}
              key={note.id}
              id={note.id}
              removeNote={this.removeNote}
            />
          );
        })}
        <div>
          <input
            type="text"
            name="note"
            value={this.state.note}
            onChange={this.eventHandler}
          />
          <button ref="input1" onClick={this.submitNote}>
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default App;
