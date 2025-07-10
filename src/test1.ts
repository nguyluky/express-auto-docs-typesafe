import { ApiError } from "@utils/exception";

function a() {
    throw new Error('This is an error');
}

class Test {
    hello() {
        a();
        throw new ApiError('', 0);
        
    }
}


console.log(Reflect.getMetadata('exception', Test.prototype, 'hello'));
