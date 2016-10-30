'use strict';
export default function demo (){
    if(true) {
        let bar = 'bar';
        if(true) {
            var foo = function () {
                return bar;
            };
            return foo();
        }
    }
};
