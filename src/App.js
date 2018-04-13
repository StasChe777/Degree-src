import React, { Component } from 'react';
import Vector_icon from './vector-icon.svg';
import './App.css';
import Request from 'superagent';
import _ from 'lodash';
import ReadmeSvg from './readme.svg';



  
class App extends Component {
  constructor(){
    super();
    this.state = {} ;
  }


 

  componentWillMount(){
this.search();
  }
  componentDidMount(){

  }

  componentWillReceiveProps(nextProps){

  }

  componentWillUpdate(nextProps, nextState){

  }
componentWillUnmount(){

}

updateSearch(){
  this.search(this.refs.query.value, this.refs.pageNumber.value);
  
}




  render() {
  var pageOption = _.map(maxp, (index)=> {return <div key={index}><option value={index} ref="pageNumber">{index}</option></div>});
  var htmlUrl = _.map(this.state.html_url, (htmlUrl, index) => {return <div className="RepositoryURL" key={index}><a href={htmlUrl} target="_blank">Link</a></div>})
  var repositories = _.map(this.state.repositories, (repositories, index) => {return <div className="RepositoryName" key={index}>{repositories}</div>})
  var forkNames = _.map(this.state.forks, (forks, index) => { return <div className="ForkName" key={index}>{forks}</div>});
  var openIssues=_.map(this.state.openIssue, (openIssue, index) => {return <div className="OpenIssues" key={index}>{openIssue}</div>})
  var totalNumber = this.state.total
  var readMeURL =  _.map(this.state.html_url, (htmlUrl,index) => {return <div key={index}><a href={`${htmlUrl}/blob/master/README.md`} target="_blank"><img className="readme_icon" src={ReadmeSvg} alt="ReadMe"></img></a></div>})
  var maxp=[],r,i

  if (totalNumber > 999){
   maxp.length=50
  for(var i,maxp=[i=0];i<50;maxp[i++]=i);
  console.log(maxp)
  }

  else if (isNaN(totalNumber)) {
    maxp=[1]
    console.log(maxp)
  }
  else {
     r = Math.floor(totalNumber/20)+1
     for(i,maxp=[i=0];i<r;maxp[i++]=i);
     console.log(maxp)
  }
    return (
      <div className="App">
 
        <header className="App-header">
          <h1 className="App-title">Search Repositories on GitHub <img className="search_icon" src={Vector_icon} alt="Search"></img></h1>
        
          Search for GitHub Repository:
          <form>
          <input ref="query" value={this.state.value}  type="text" />
          <button type="button" onClick={ (e) => this.updateSearch()}>Search</button> 
          <div className="PageSearch"><p>Select page: </p> 
<select ref="pageNumber" onChange={(e) => this.updateSearch()}>{maxp.map(function(object, i){
        return <option value={i+1} obj={object} key={i}>{i+1}</option>;
    })}
</select>
</div>
         
         </form>
          <div>The search has found: {totalNumber} repositories</div>
          {totalNumber > 999 &&
       <p>only 1000 results (50 pages) are available</p>
      }
        </header>
     

    <div className="Search-Results">
    <div className="Rep-Names RepositoryName"><div className="Top-Row">Repository Name:</div>{repositories}</div>
    <div className="Links"><div className="Top-Row"> Link:</div>{htmlUrl}</div>
    <div className="Fork-names"><div className="Top-Row">Forks:</div>{forkNames}</div>
    <div className="Open-Issues"><div className="Top-Row">Open Issues:</div>{openIssues}</div>
    <div className="Read-Me"><div className="Top-Row">ReadMe:</div>{readMeURL}</div>

    </div>


<div class="shape1"></div>
<div class="shape2"></div>
<div class="shape3"></div>
<div class="shape4"></div>
<div class="shape5"></div>
<div class="shape6"></div>
<div class="shape7"></div>

      </div> 
      
    );
    
  }
  search(query="CodeNation", pageNumber=1){
    var url =`https://api.github.com/search/repositories?q=${query}&page=${pageNumber}&per_page=20`
    console.log(url)
    Request.get(url).then((response) => {
    this.setState({
      repositories: response.body.items.map(a => a.name),
      forks: response.body.items.map(b=>b.forks),
      id: response.body.items.map(a => a.id),
      openIssue: response.body.items.map(c=>c.open_issues),
      watchers: response.body.items.map(e=>e.watchers),
      default_branch: response.body.items.map(f=>f.default_branch),
      score: response.body.items.map(g=>g.default_branch),
      html_url: response.body.items.map(h=>h.html_url),
      total: response.body.total_count
    });
  
    });
  }
}








export default App;
