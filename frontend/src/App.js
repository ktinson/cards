import React, { Component } from "react";
import Modal from "./components/Modal.js";
import Carousel from "react-material-ui-carousel";
import {Button, CardActions, Typography, CardContent, CardMedia, Card, Grid, Paper, ImageList, ImageListItem, ImageListItemBar} from '@mui/material/';
import apiURL from "./api.js";
import axios from "axios";
import ImageModal from "./components/imageModal.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewLarge: true,
      cardList: [],
      modal: false,
      imageModalOpen: false,
      activeItem: {
        name: "",
        description: "",
        large: false,
      },
      selectedImage: "",
    };
  }
  
  
  componentDidMount() {
    this.refreshList();
  }
  
  refreshList = async () => {
   await axios
      .get(`${apiURL}/api/v1/cards`)
      .then((res) => this.setState({ cardList: res.data }))
      .catch((err) => console.log(err));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  toggleImageModal = () => {
    this.setState({ imageModalOpen: !this.state.imageModalOpen });
  };
  handleImageClick = (item) => {
      this.setState({selectedImage: item.image, imageModalOpen: true})
  }
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
          className={"nav-link"}
        >
          Small Cards
        </span>
        
      </div>
    );
  };
  renderImageList = () => {
    const newList = this.state.cardList
    return( <> 
        {<ImageList sx={{ width: 900, height: 155}} variant="masonry" cols={6} gap={8} >
  {newList.map((item) => (
    item.image ?
    <ImageListItem key={item.image} onClick={() => this.handleImageClick(item)}>
      <img className="imageListItemimg"
        srcSet={`${item.image}`}
        sx={{height: 10, width: 10}}
        src={`${item.image}`}
        alt={item.name}
        loading="lazy"
      />   
    </ImageListItem>
    : null
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
    (<ImageList variant="masonry" cols={3} gap={8} >
      {newItems.map((item) => (
        item.image ?(
        <ImageListItem key={item.image} className="imageListItem">
          <img onClick={() => this.handleImageClick(item)}
            srcSet={`${item.image}`}
            src={`${item.image}`}
            alt={item.name}
            loading="lazy"
          />
          <div><div class="text-white"><ImageListItemBar
                title={item.name}
                subtitle={<span style={{width: 75, textWrap: "wrap"}}>Description: {item.description}</span>}
                position="below"
                
              /></div>
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
              </Button></div>
           
        </ImageListItem>)
        :
        (<ImageListItem key={item.image} className="imageListItem">
          <div><div class="text-white"><ImageListItemBar
                title={item.name}
                subtitle={<span style={{width: 75, textWrap: "wrap"}}>Description: {item.description}</span>}
                position="below"
                
              /></div>
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
              </Button></div>
           
        </ImageListItem>)
      ))}
    </ImageList>)
      :
    (<>
    <Grid container spacing={3} style={{display: "flex", flexDirection: "column", justifyItems: "center", alignItems: "center", rowGap: "10px"}}>
      {
        newItems.map((item) => {
          return(item.image ?
            (<Card sx={{ width: 850 }} className="cardLarge" style={{backgroundColor: "black"}}>
      <CardMedia onClick={() => this.handleImageClick(item)}
        sx={{ height: 345 }}
        image={item.image}
        title="card image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          <h2>{item.name}</h2>
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          <p style={{width: 775, textWrap: "wrap"}}>{item.description}</p>
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
    </Card>)
    :
    (<Card sx={{ width: 850 }} className="cardLarge" style={{backgroundColor: "black"}}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          <h2>{item.name}</h2>
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          <p style={{width: 775, textWrap: "wrap"}}>{item.description}</p>
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
    </Card>)

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
        <header className="cardAppHeader">
        <div className="cardHeaderText">
        <h1 className="text-white text-uppercase text-center my-4">Entropy</h1>
        <h3 className="text-white text-uppercase text-center my-4">Java Springboot</h3>
        </div>
        </header>
        <div className="">
              <div className="mb-4">
                <Button className="btn btn-primary" onClick={this.createItem}>
                  Add Card
                </Button>
              </div>
              <div class="text-white"> {this.renderTabList()}</div>
             
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

         {this.state.imageModalOpen ? (
          <ImageModal
          open={this.state.imageModalOpen}
          onClose={this.toggleImageModal}
          image={this.state.selectedImage}

    />
        ) : null }
      </main>
    );
  }
  
}

export default App;