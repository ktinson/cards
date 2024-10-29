import React, { Component } from "react";
import Modal from "./components/Modal.js";
import Carousel from "react-material-ui-carousel";
import {Button, CardActions, Typography, CardContent, CardMedia, Card, Grid, Paper, ImageList, ImageListItem, ImageListItemBar} from '@mui/material/';
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
  
  refreshList = async () => {
   await axios
      .get(`http://localhost:8080/api/v1/cards`)
      .then((res) => this.setState({ cardList: res.data }))
      .catch((err) => console.log(err));
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
      .delete(`${apiURL}/api/v1/cards/id/${item.id}`)
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
  renderImageList = () => {
    const newList = this.state.cardList
    return(<> 
        {<ImageList sx={{ width: 700, height: 250 }} variant="masonry" cols={3} gap={8}>
  {newList.map((item) => (
    <ImageListItem key={item.image} onClick={() => this.editItem(item)}>
      <img
        
        srcSet={`${item.image}`}
        src={`${item.image}`}
        alt={item.name}
        loading="lazy"
      />   
    </ImageListItem>
  ))}
</ImageList>}
    
    </>
    )
  }
  renderItems = () => {
    const { viewLarge } = this.state;
    const newItems = this.state.cardList.filter(
      (item) => item.large === viewLarge
    )
    const carItems = this.state.cardList
    console.log(newItems);
    return(<>
    {!viewLarge ?
    (<ImageList variant="masonry" cols={3} gap={8}>
      {newItems.map((item) => (
        <ImageListItem key={item.image}>
          <img
            srcSet={`${item.image}`}
            src={`${item.image}`}
            alt={item.name}
            loading="lazy"
          />
          <div><ImageListItemBar
                title={item.name}
                subtitle={<span>Description: {item.description}</span>}
                position="below"
              /> <Button
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
              </Button></div>
           
        </ImageListItem>
      ))}
    </ImageList>)
      :
    (<>
    <Grid container spacing={3} style={{display: "flex", flexDirection: "column", justifyItems: "center", alignItems: "center", rowGap: "10px"}}>
      {
        newItems.map((item) => {
          return(
            <Card sx={{ width: 850 }}>
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

          )
        })
      }
  </Grid>


    </>)
    }
    </>)
  }

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
              <div style={{padding: "50px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "50px"}}>
                <div>{this.renderItems()}</div>
                  <div>{this.renderImageList()}</div>
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