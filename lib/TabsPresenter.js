'use strict';

var _ = require("lodash"),
    EventEmitter = require("events").EventEmitter;



function TabsPresenter(tabs,view,$) {
    this.tabs= tabs;
    this.view = view;
    this.events = new EventEmitter();
    this.$ = $;


}

TabsPresenter.prototype.start = function(holder){
    var _this = this;

    var content = _this.view.render(this);
    _this.$(holder).html(content);
    _this.view.run();

    _this.tabs.events.on("pushed",function(item){

        _this.view.addTab(item);
    });

    _this.tabs.events.on("captionChanged",function(id,caption){

        _this.view.setCaption(id,caption);
    });

    _this.tabs.events.on("removed",function(item){
        _this.view.removeTab(item);
    });


    var changing=false;
    _this.tabs.events.on("activeChanged",function(item){
       _this.view.setActive(item.id);


    });

    _this.view.events.on("tabClicked",function(tabId){
        var tab = _.find(_this.tabs.observed, function (t) {
            return t.id == tabId;
        });

        changing = true;
        try {
            _this.tabs.activate(tab);
        } finally {
            changing = false;
        }

    });




};

module.exports = TabsPresenter;
