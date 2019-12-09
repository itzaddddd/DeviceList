import React, {Component} from 'react';
import './device.css';
export default class Device extends Component{
    render(){
        let {name, img} = this.props;
        return(
            <div className="device">
                <img src={img} alt="" width="150px" height="150px" />
                <div className="name">{name}</div>
            </div>
        )
    } 
} 