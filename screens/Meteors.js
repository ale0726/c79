import React, {Component} from 'react';
import {Text, View} from 'react-native';
import axios from "axios";

export default class Meteors extends Component{

    constructor(){
        super();

        this.state = {
            meteors: {},
        }
    }

    getMeteors = () => {
        axios
        .get('https://api.nasa.gov/neo/rest/v1/feed?api_key=lzLtMMaOf584epHSia7iII4To1peF8tv5IBDu0bT')
        .then(response => {
            this.setState({
                meteors: response.data.near_earth_objects
            })
        })
        .catch(error => {
            alert(error.message)
        })
    }

    componentDidMount(){
        this.getMeteors()
    }

    render(){
        if(Object.keys(this.state.meteors).length === 0){
            return(
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Text>Loading...</Text>
                </View>
            )
        } else{
            let meteor_array = Object.keys(this.state.meteors).map(meteor_date => {
                return this.state.meteors[meteor_date]
            })
            let meteors = [].concat.apply([], meteor_array)
            meteors.array.forEach(function(element){
                let diameter = (element.estimated_diameter.kilometers.estimated_diameter.min  + element.estimated_diameter.kilometers.estimated_diameter.max) / 2
                let threatScore = (diameter/element.close_approach_data[0].miss_distance.kilometers) * 1000000000
            });
            return(
                <View style={{flex:1, backgroundColor: 'green'}}>
                    <Text>Meteor Screen</Text>
                </View>
            )
        }
    }
}
