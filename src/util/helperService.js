
import axios from 'axios';
class HelperService {
    static get(url) {        
       return axios.get(url).then((response) =>{ return response.data}).catch((err) => {return err});;
    }   
}

export default HelperService;