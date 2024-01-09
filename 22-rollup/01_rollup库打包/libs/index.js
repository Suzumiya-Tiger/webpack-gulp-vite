import {sum,mul} from './utils/math'
import { formatPrice } from './utils/format'
import _ from 'lodash'

function foo(){
    console.log('foo exection~');
    console.log(_.join(['abc','cba']));
    console.log(formatPrice());
}
const message='hello world';
export {
    foo,sum,mul,message
}