var EventEmitter = require("events").EventEmitter;
function Tabs() {
    var _this = this;
    _this.events = new EventEmitter();
}



module.exports = Tabs;
