import React, {Component} from 'react';
import './App.css';
import DeviceList from './components/divice_list/device_list'; //DeviceList show the list of device in page
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; //fetch data from api

//Generate GraphQL connection 
const axiosGithubGraphQL = axios.create({
  baseURL:'https://api.github.com/graphql',
  headers: {
    Authorization: 'bearer 5ddb777b2f7aed1061ba6bf2e4213aaa1d3073e2'
  }
});
//Generate query schema to get data from github
const Query = `
  query {
    repository (owner:"MakerPlayground", name:"MakerPlayground_Library") {
      object(expression:"develop:devices") {
        ... on Tree {
          entries {
            name
            object {
              ... on Tree {
                entries {
                  name
                  object {
                    ... on Tree {
                      entries {
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        }
        
      }
    }
  }
`;
class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      device:[]
    }
  }
  // create getData function
  getData(){
    //fetch github api 
    axiosGithubGraphQL
    .post('https://api.github.com/graphql',{query:Query})
    .then(result => {
      //collect all device folders in data
       let data = result.data.data.repository.object.entries;  
        //push inside all folders entires to data2 list
        let data2 = []; 
        data.forEach(d => {
          data2.push(d.object.entries)            
        })
        //push data2 entries to data3 list and remove an undified object (file named refactor.py)
        //data3 list collected device folder 
        //each folder is d2
        let data3 = [];
        data2.forEach(d2 => {
          if(typeof d2 !== 'undefined'){
           data3.push(d2) 
          }
        })
        //collect device picture name
        let device_img = {
          index_folder:'',
          imgae_name:''
        }
        let device = [];
        //find asset folder to get picture name
        //loop in each folder and get index of asset folder
        //use flag to check that this device folder has asset folder
        let flag = 0
        data3.forEach((d3,index) => {
          d3.forEach((dd3) => {
            if(dd3.name === 'asset'){
              //flag that this folder has asset folder
              flag = flag + 1;
              //get picture that index equals to 0
              device_img = {
                index_folder:index,
                image_name:dd3.object.entries[0].name
              }
              device.push(device_img)
            }
          })
          if(flag === 0){ //do not have asset folder. mean that it dose not has device image
            device_img = {
              index_folder:index,
              image_name:'placeholder'
            }
            device.push(device_img)
          }
          flag = 0
        });
        console.log(device)
        //get data of device form data by using index of picture
        device.forEach(dp => {
          //get device name
          let dname = data[dp.index_folder].name
          //get device picture name
          let dpic = dp.image_name
          //generate picture url
          let url = '';
          if(dp.image_name === 'placeholder'){
            url = 'https://img.icons8.com/material/100/000000/image.png'
          }else{
            url = 'https://cdn.jsdelivr.net/gh/MakerPlayground/MakerPlayground_Library@develop/devices/'+dname+'/asset/'+dpic
          }
          
          //colect dname and url in device
          dp.device_name = dname;
          dp.image_url = url
        })

        //set device_pic to list state
        this.setState({device:device})
    })
  }

  componentDidMount(){
    this.getData();
  }

  render(){
    return (
      <div className="App">
        <DeviceList list={this.state.device}/>
      </div>
    );

  }  
}

export default App;
