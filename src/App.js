import React from 'react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

class App extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          playerlist: [],
          search:'' 
        }
    }
  
    componentDidMount() {
      const apiUrl = 'https://api.npoint.io/d6bd0efc05639084eb17/';
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
        this.setState({ playerlist: data.playerList});
      })
    }
    updateSearch(event){
      this.setState({search: event.target.value.substr(0,20)});
    }

    render() {
      let imgurl='../player-images/';
     console.log(this.state.search);
  return (
      <div className="container my-4">
      <input className="w-100" placeholder ="Search Player or Team name" type="text" value={this.state.search} 
      onChange={this.updateSearch.bind(this)}/>
      <div className="row">
      {this.state.playerlist.filter((playerdet)=>{
        if (this.state.search ==""){
          return playerdet
          
        } else if (playerdet.PFName.toLowerCase().includes(this.state.search.toLowerCase()) || playerdet.TName.toLowerCase().includes(this.state.search.toLowerCase())){
          return playerdet
        }
      }).slice(0).reverse().map(function(playerdet, i){
  return  <div className="col-3 py-3" key={i}>
      <Card>
    <Card.Img variant="top" src={imgurl+playerdet.Id+'.jpg'}/>
    <Card.Body>
      <Card.Title>{playerdet.PFName}</Card.Title>
      <Card.Text>Skill Level:
        {playerdet.Skill}
      </Card.Text>
      <Card.Text>Players value : ${playerdet.Value}</Card.Text>
      {playerdet.UpComingMatchesList.map((k, w) => (
        <div>
         <Card.Text key={w}>Upcoming matches : {k.TSCode} vs {k.VsTSCode}</Card.Text>
         <Card.Text>Match Time : {k.MDate}</Card.Text>
         </div>
        ))}
    </Card.Body>
  </Card>
      </div>
})}
     
  </div>
  </div>
  );
  }
}

export default App;
