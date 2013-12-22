var EventEmitter = require("events").EventEmitter,
    makeArrayObservable = require("telescope").array;


function makeTabs() {
    var tabs = [];
    var observable = makeArrayObservable();
    observable.init(tabs);
    observable.events.on("changed",function(){
        if (tabs.length == 1) {
            observable[0].active = true;
        }
    });
    return  observable;
}



module.exports = makeTabs;
