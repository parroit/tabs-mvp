'use strict';

var _ = require("lodash"),
    EventEmitter = require("events").EventEmitter;



function PagerPresenter(tabs,view) {
    this.tabs= tabs;
    this.view = view;
    this.events = new EventEmitter();


}

PagerPresenter.prototype.start = function(){
    var _this = this;


};

module.exports = PagerPresenter;
