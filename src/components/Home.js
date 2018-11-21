import React from 'react';
import * as exRateActions from '../actions/ExchangeRatesAction';
import _ from 'lodash';
import { AgGridReact } from 'ag-grid-react';
const cellStyle = {'border-style': 'ridge', ' border-color': '#CCCCCC','border-width' :'0.5px'};
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            isLoading: false,
            responseTime: null,
            rates: []
        };
        this.currenyList = ['GBP', 'EUR', 'USD', 'JPY', 'CHF', 'CAD', 'AUD', 'NZD', 'RUB', 'ZAR', 'MXN', 'INR'];
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        let rateColumns=[];
        exRateActions.getExchangeRates(this.currenyList, (data) => {
            if (data != null) { 
                if(data.length >0)
                {  
                    let finalsource=data.map((rate) => {                      
                      return  Object.assign({'CUR':`1 ${rate.base} =`},rate.rates); 
                    });                    
                    let fields= Object.getOwnPropertyNames(finalsource[0]);  
                    fields.forEach((field) =>{
                        rateColumns.push({
                            field: field,
                            headerName: field,
                            width: 100,
                            cellStyle: cellStyle,                            
                            type: "numericColumn"                            
                      });
                    });  
                    if (this.gridApi != null) {
                        this.gridApi.setColumnDefs(rateColumns);
                        this.gridApi.refreshCells();
                      }
                    
                    this.setState({ rates: finalsource, isLoading: false });          
                }              
                
            }
        });    
       
    }

    handleGridReady(params) {
        this.gridApi = params.api;
        this.gridLColumnApi = params.columnApi;
      }

    render() {
        let { rates } = this.state;        
        return (<React.Fragment>
            <div className="wrapper">
                <div className="homeContainer">
                    <div className="loader" style={{ display: this.state.isLoading == true ? 'block' : 'none' }}>
                    </div>
                    <div className="ag-theme-balham"  style={{height: '500px'}}>
                    <AgGridReact enableSorting enableFilter enableColResize suppressMenuHide
                        onGridReady={this.handleGridReady.bind(this)}
                        rowData={rates}>
                    </AgGridReact>
                </div>
                </div>
            </div>
        </React.Fragment>);
    }

}
export default Home;