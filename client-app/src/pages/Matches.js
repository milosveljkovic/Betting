import React from 'react';
import {connect} from 'react-redux';
//import {AppState} from '../../store/reducers/rootReducer';
//import '../../design/myDesign.css';
//import {Football} from '../../models/Football';
//import {MySpinner} from '../Spinner/Spinner';
//import List from '../ListOfMatches/List'
import {thunk_action_getMatches} from '../store/actions/match.actions'
import {Redirect} from 'react-router-dom';
import {store} from '../App'
import List from '../components/match-list/MatchList'


class Matches extends React.Component{

    constructor(props){
        super(props);
        this.state={
            current_active_sport:''
        }
    }

    componentDidMount=()=>{
        const sport_type=this.props.match.params.id;
        if(this.props.football_matches.length===1){
        store.dispatch(thunk_action_getMatches('football'))
        this.setState({current_active_sport:sport_type})
        }
        if(this.props.basketball_matches.length===1){
            store.dispatch(thunk_action_getMatches('basketball'))
            this.setState({current_active_sport:sport_type})
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            const sport_type=this.props.match.params.id;
            if(this.props.football_matches.length===1){ //1 jer postoji kao element tj initialState
            store.dispatch(thunk_action_getMatches(sport_type))
            }
            else if(this.props.basketball_matches.length===1){ //1 jer postoji kao element tj initialState
            store.dispatch(thunk_action_getMatches(sport_type))
            }
            this.setState({current_active_sport:sport_type})
        }
      }

    render(){

        const {football_matches,basketball_matches}=this.props;
        const {current_active_sport}=this.state;

        return(
            <div className="container listmatchContainer">
                <h1 className='title mt-4'>{(this.props.match.params.id).toUpperCase()}</h1>
                {
                    this.props.match.params.id==='football'?
                        football_matches.length>1?
                        <List match_list={football_matches}/>
                        :
                        null
                    :
                        null
                }
                {
                    this.props.match.params.id==='basketball'?
                        basketball_matches.length>1?
                        <List match_list={basketball_matches}/>
                        :
                        null
                    :
                        null
                }
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        football_matches: state.football_matches,
        basketball_matches: state.basketball_matches,
    }
}

export default connect(mapStateToProps,null)(Matches);