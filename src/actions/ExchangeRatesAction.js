
import HelperService from '../util/helperService';

const baseUrl = 'https://api.exchangeratesapi.io/latest?base=';

export function getExchangeRates(curList,callback) {
    Promise.all(curList.map(cur =>{
       let url=`${baseUrl}${cur}`;
       return HelperService.get(url)
   })).then((results) => {    
    callback(results);
  });        
}