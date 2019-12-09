import React, {Component} from 'react';
import Device from '../device/device';
import './device_list.css';

export default class Device_List extends Component{

    createDeviceList(){
        // get props
        let {list} = this.props;
        // define rows and cols to collect data
        let rows = [],
            cols = []

        list.forEach((item,i)=>{
            // create a column
            cols.push(
                <div className="col-sm-6 col-md-6 col-lg-3" key={item.device_name}>
                    <Device name={item.device_name} img={item.image_url} />
                </div>
            )
            // create a row every 4 item and if item is last
            if(((i+1)%4 === 0)||(i === list.length-1)){
                rows.push(
                    <div className="row" key={i}>
                        {cols}
                    </div>
                )
                cols = []
            }
        })
    
        return (
            <div className="container">
                {rows}
            </div>
        )
    }
    
    render(){
        return this.createDeviceList()
        }
    }  

