import React, { Component } from "react";
import Modal from "./components/Modal.js";
import {Button, CardActions, Typography, CardContent, CardMedia, Card, Grid} from '@mui/material/';
import apiURL from "./api.js";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewLarge: true,
      cardList: [],
      modal: false,
      activeItem: {
        name: "",
        description: "",
        large: false,
      },
    };
  }
  
  
  componentDidMount() {
    this.refreshList();
  }
  
  refreshList = () => {
    
    axios
      // .get(`${apiURL}/api/v1/cards`)
      .get(`${apiURL}/api/v1/cards`,{ crossdomain: true },  {headers: {'content-type': 'application/x-www-form-urlencoded'}})
      // .get(`http://localhost:8080/api/v1/cards`)
      .then((res) => this.setState({ cardList: res.data }))
      .catch((err) => console.log(err));
    console.log(`${apiURL}/api/v1/cards`, `api url`)
    console.log(process.env.REACT_APP_API_URL, "REACT_APP_API_URL")
    console.log(process.env.PORT, `process env PORT`)
    console.log(process.env.NODE_ENV, "NODE_ENV")
   
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = (item) => {
    this.toggle();

    if (item.id) {
      axios
        .put(`${apiURL}/api/v1/cards/id/${item.id}`, item)
        .then((res) => this.refreshList());
        console.log(`${apiURL}/api/v1/cards/id/${item.id}`, item)

      return;
    }
    axios
      .post(`${apiURL}/api/v1/cards`, item)
      .then((res) => this.refreshList());
      console.log(`${apiURL}/api/v1/cards/id/${item.id}`, item)

  };

  handleDelete = (item) => {
    axios
      .delete(`${apiURL}/api/v1/cards/${item.id}`)
      .then((res) => this.refreshList());
        console.log(`${apiURL}/api/v1/cards/id/${item.id}`, item)
  };

  createItem = () => {
    const item = { name: "", description: "", large: false };

    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  displayLarge = (status) => {
    if (status) {
      return this.setState({ viewLarge: true });
    }

    return this.setState({ viewLarge: false });
  };

  renderTabList = () => {
    return (
      <div className="nav nav-tabs">
        <span
          onClick={() => this.displayLarge(true)}
          className={this.state.viewLarge ? "nav-link active" : "nav-link"}
        >
          Large Cards
        </span>
        <span
          onClick={() => this.displayLarge(false)}
          className={this.state.viewLarge ? "nav-link" : "nav-link active"}
        >
          Small Cards
        </span>
      </div>
    );
  };

  renderItems = () => {
    const { viewLarge } = this.state;
    const newItems = this.state.cardList.filter(
      (item) => item.large === viewLarge
    );

    return( <Grid container spacing={3}> {newItems.map((item) => {
      return(
        <>{!viewLarge ?
          <Grid size={8} style={{padding: "25px"}}>
          <Card sx={{ width: 200 }}>
        <CardMedia
          image={item.image}
          style={{width: 200, height: 200}}
          title="card image"
        />
        <CardContent>
          <Typography gutterBottom variant="body" component="div">
            <p><b>{item.name}</b></p>
          </Typography>
        </CardContent>
        <CardActions>
        <Button
              className="btn btn-secondary mr-2" size="small"
              onClick={() => this.editItem(item)}
            >
              Edit
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.handleDelete(item)}
            >
              Delete
            </Button>
        </CardActions>
      </Card>
      </Grid>
    :
    <Grid size={8} style={{padding: "25px"}}>
        <Card sx={{ width: 290 }}>
      <CardMedia
        sx={{ height: 345 }}
        image={item.image}
        title="card image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          <h2>{item.name}</h2>
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          <p>{item.description}</p>
        </Typography>
      </CardContent>
      <CardActions>
      <Button
            className="btn btn-secondary mr-2"
            onClick={() => this.editItem(item)}
          >
            Edit
          </Button>
          <Button
            className="btn btn-danger"
            onClick={() => this.handleDelete(item)}
          >
            Delete
          </Button>
      </CardActions>
    </Card>
    </Grid>
    
    }
      </>)
  })}</Grid>);
  };

  render() {
    return (
      <main className="container">
        <h1 className="text-Black text-uppercase text-center my-4">Card app</h1>
        <div className="">
              <div className="mb-4">
                <Button className="btn btn-primary" onClick={this.createItem}>
                  Add Card
                </Button>
              </div>
              {this.renderTabList()}
              <div style={{padding: "50px"}}>
                <p>{ `${apiURL}`}</p>
                {this.renderItems()}
                </div>
            
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
  
}

export default App;