var EventEmitter = require("events").EventEmitter,
    makeArrayObservable = require("telescope").array;


function makeTabs() {
    var tabs = [];
    var observable = makeArrayObservable();
    observable.activeItem = null;

    function setActive(item){
        observable.activeItem = item;
        observable.events.emit("activeChanged",item);
    }

    observable.init(tabs);
    observable.events.on("changed",function(){
        if (tabs.length == 1) {
            setActive(observable[0].observed);
            observable[0].active = true;
        } else if(tabs.length == 0){
            setActive(null);

        }
    });


    function propertyChanged(propertyName,value){
        if (propertyName == "active" && value)
            return setActive(this.observed);

        if (propertyName == "caption")
            return observable.events.emit("captionChanged",this.id,value);
    }

    observable.events.on("pushed",function(item){
        item.events.on("changed",propertyChanged.bind(item));
    });

    observable.events.on("removed",function(item){
        item.active = false;
        item.events.removeListener("changed",propertyChanged);
    });

    observable.activate = function(item){
        var idx = this.observed.indexOf(item);


        if (idx > -1){
            observable.forEach(function(it){
                it.active = false;
            });

            var obsItem = observable[idx];
            obsItem.active = true;
        }
    };

    return  observable;
}



module.exports = makeTabs;
