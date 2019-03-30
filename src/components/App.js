import React, {Component} from 'react';
import {films, fetchData} from '../data';
import FilmList from './films';
import orderBy from "lodash/orderBy";
import Error from "./../components/masseges/Error";
import  './../css/style.css';
import {Context} from './../Context/';



class App extends Component {
    state ={
        films:[],
        sortByArray:["featured", "title"],
        orderByArray:["desc", "asc"],
        sort :false,
        loader: true
    };

    async componentDidMount(){

        let films = await fetchData();
        this.setState({films,loader:false});
    }

    /*
    shouldComponentUpdate(nextProps, nextState){
        return nextState.films!==this.state.films
    }*/

    sortFilms = ({films, sortByArray, orderByArray}) => orderBy(films, sortByArray, orderByArray);

    handelChange = ( id,trg="featured",sort=false) => {
        const { films } = this.state,
            trgIndex = films.indexOf(
                films.filter((el)=>el._id===id)[0]
            ),
            target = films[trgIndex];
        target[trg] = target[trg]!==undefined ? !target[trg]: false;
        this.setState({films:[...films], sort});
    };

    render() {
        const {
                films,
                sortByArray,
                orderByArray,
                loader
            } = this.state,
            sorted = this.sortFilms({films,sortByArray, orderByArray});
        return (
            <Context.Provider
                value={{
                    handelChange: this.handelChange,
                    films:sorted
                }}>
                {loader?<div className={"centered"} >
                    <Error animation={" flash animated infinite"} text={" data is  loading "} />
                </div>:<div className="ui container">
                    <FilmList  />
                </div>}

            </Context.Provider>
        )
    }
}

export default App;