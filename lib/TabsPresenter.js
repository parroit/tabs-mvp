'use strict';

var _ = require("lodash"),
    EventEmitter = require("events").EventEmitter;



function PagerPresenter(tabs,view,$) {
    this.tabs= tabs;
    this.view = view;
    this.events = new EventEmitter();
    this.$ = $;


}

PagerPresenter.prototype.start = function(holder){
    var _this = this;

    var content = _this.view.render(this);
    _this.$(holder).html(content);
    _this.view.run();

    _this.tabs.events.on("pushed",function(item){
        _this.view.addTab(item);
    });

    _this.tabs.events.on("removed",function(item){
        _this.view.removeTab(item);
    });


    var changing=false;
    _this.tabs.events.on("activeChanged",function(item){
        if (!changing) {
            _this.view.setActive(item.id);
        }

    });

    _this.view.events.on("tabClicked",function(tabId){
        var tab = _.find(_this.tabs.observed, function (t) {
            return t.id == tabId;
        });
        
        changing = true;
        try {
            _this.tabs.setActive(tab);
        } finally {
            changing = false;
        }

    });




};

module.exports = PagerPresenter;
