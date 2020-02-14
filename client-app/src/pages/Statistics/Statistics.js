import React from 'react';
import { connect } from 'react-redux';
import {YAxis,Tooltip,CartesianGrid,LineChart,XAxis,Bar,Legend,Line,ResponsiveContainer,Scatter} from 'recharts'
import {store} from '../../App'
import {thunk_action_getDataForStatistics} from '../../store/actions/statistics.actions'
import './statistics.css'
import {Redirect} from 'react-router-dom'

var moment = require('moment');


class Statistics extends React.Component{

    constructor(props){
        super(props);
        this.state={
            biggest_profit:0
        }
    }

    componentDidMount=()=>{
        store.dispatch(thunk_action_getDataForStatistics())
    }

   
    getData=()=>{
        const {statistics} = this.props;
        var new_data =[];
        var i=0;
        for(i;i<statistics.win_tickets.length;i++){
            new_data.push({
                "name":statistics.win_tickets[i].date,
                "loss":statistics.win_tickets[i].possible_profit.$numberDecimal,
            })
        }

        return new_data;
    }

    getDataForOurProfit=()=>{
        const {statistics} = this.props;
        var new_data =[];
        var i=0;
        for(i;i<statistics.loss_ticket.length;i++){
            new_data.push({
                "name":statistics.loss_ticket[i].date,
                "profit":statistics.loss_ticket[i].payment.$numberDecimal,
            })
        }

        return new_data;
    }

    getTotatlProfit=()=>{
        const {statistics} = this.props;
        var totatl_profit=0;
        var i=0;
        for(i;i<statistics.win_tickets.length;i++){
            totatl_profit+=Number(statistics.win_tickets[i].possible_profit.$numberDecimal)
        }
        return totatl_profit;
    }

    getOutProfit=()=>{
        const {statistics} = this.props;
        var our_profit=0;
        var i=0;
        for(i;i<statistics.loss_ticket.length;i++){
            our_profit+=Number(statistics.loss_ticket[i].payment.$numberDecimal)
        }
        return our_profit;
    }

    getMax=()=>{
        const {statistics} = this.props;
        var i=0;
        var biggest_profit=0;
        for(i;i<statistics.win_tickets.length;i++){
            if(biggest_profit<Number(statistics.win_tickets[i].possible_profit.$numberDecimal)){
                biggest_profit=Number(statistics.win_tickets[i].possible_profit.$numberDecimal);
            }
        }
        return biggest_profit;
    }

    getMaxForProfit=()=>{
        const {statistics} = this.props;
        var i=0;
        var biggest_profit=0;
        for(i;i<statistics.loss_ticket.length;i++){
            if(biggest_profit<Number(statistics.loss_ticket[i].payment.$numberDecimal)){
                biggest_profit=Number(statistics.loss_ticket[i].payment.$numberDecimal);
            }
        }
        return biggest_profit;
    }

    render(){ 

        if(!localStorage.getItem("user_id")){
            if(this.props.user!==undefined && 
                (this.props.user.is_admin===null || this.props.user.is_admin===false)
            ){
                return <Redirect to="/home" />
            }
            
        }

        return(
            <div className="container text-center topMarg">
                <h1 className='statisticsStyle'>Statistics</h1>
                <div style={{marginTop:'30px'}}>
                    <p className='descriptionStyle'>How much credit we loose</p>
                    <LineChart 
                    width={1000} 
                    height={300} 
                    data={this.getData()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis tick={false} 
                    dataKey="name" 
                    tickFormatter={timeStr => moment(timeStr).format('MMM Do YY')}
                    />
                    <YAxis type='number' domain={[0, this.getMax()]}/>
                    <Tooltip cursor={{ stroke: 'red', strokeWidth: 2 }} />
                    <Legend />
                    <Line type="linear" dataKey="loss" stroke="red" dot={{ stroke: 'black', strokeWidth: 5 }}/>
                    </LineChart>
                    <p className='paragPtofit' > loss - {this.getTotatlProfit()} rsd</p>
                </div>

                <div style={{marginTop:'30px'}}>
                    <p className='descriptionStyle'>How much credit we earn</p>
                    <LineChart 
                    width={1000} 
                    height={300} 
                    data={this.getDataForOurProfit()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis tick={false} 
                    dataKey="name" 
                    tickFormatter={timeStr => moment(timeStr).format('MMM Do YY')}
                    />
                    <YAxis type='number' domain={[0, this.getMaxForProfit()]}/>
                    <Tooltip cursor={{ stroke: 'green', strokeWidth: 2 }} />
                    <Legend />
                    <Line type="linear" dataKey="profit" stroke="green" dot={{ stroke: 'black', strokeWidth: 5 }}/>
                    </LineChart>
                    <p className='paragPtofit' >profit - {this.getOutProfit()} rsd</p>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state){
    return{
        statistics : state.statistics,
        user:state.current_user
    }
}

export default connect(mapStateToProps,null)(Statistics);