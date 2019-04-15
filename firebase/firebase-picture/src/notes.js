import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import * as firebase from "firebase";
import { db_config } from "./config";

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: ""
    };
  }

  eventHandler = e => {
    this.setState({ file: e.target.files[0] });
  };
  submitFile = () => {
    const fireStore = firebase.firestore();
    fireStore.settings({ timestampsInSnapshots: true });
    /////////////////////////////////////////////saving data
    const obj = {
      // file: this.state.File
      file: "aissani"
    };

    fireStore
      .doc("project/notes")
      .set(obj)
      .then(res => {
        console.log("res1===>", res);
      })
      .catch(err => {
        console.log(err);
      });
    /////////////////////////////////////////// saving data
    const obj2 = {
      user: "hilal"
    };
    fireStore
      .doc("project/users")
      .set(obj2)
      .then(res => {
        console.log("res2===>", res);
      })
      .catch(err => {
        console.log(err);
      });
    ////////////////////////////////////////////////   adding new collection
    fireStore.collection("schools").add({ name: "lambda", city: "california" });
    //////////////////////////////////////////////////////////////  adding new  projects collection
    fireStore
      .collection("projects")
      .doc("users")
      .set({ name: "billlalla ", city: "babababba" });
    ////////////////////////////////////////////////////////// adding to users doc in project
    fireStore
      .collection("project")
      .doc("users")
      .set({ name: "billlalla ", city: "babababba" });
    /////////////////////////

    fireStore
      .collection("project")
      .doc("fill")
      .set({ name: "billlalla ", city: "babababba" });

    ///////////////////////////////////////////// getting data
    fireStore
      .collection("project")
      .get()
      .then(res => {
        console.log("res.docs ====>", res.docs);
        res.docs.forEach(doc => {
          console.log("doc.data===>", doc.data());
        });
      });

    ////////////////////////////////////////
    fireStore
      .collection("project")
      .doc("users")
      .delete();
    //////////////////////////////////////////

    fireStore
      .collection("projects")
      .where("city", "==", "babababba")
      .get()
      .then(res => {
        console.log("where ====>", res.docs);
        res.docs.forEach(doc => {
          console.log("where===>", doc.data());
        });
      });
  };

  render() {
    console.log("state===>", this.state.file);
    return (
      <div className="App">
        <h1>{this.props.note} </h1>
        <button
          onClick={() => {
            this.props.removeNote(this.props.id);
          }}
        >
          delete
        </button>
        <input type="file" name="file" onChange={this.eventHandler} />
        <button onClick={this.submitFile}>sendFile</button>
      </div>
    );
  }
}

export default Note;
