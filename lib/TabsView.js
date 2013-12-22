'use strict';

var _ = require("lodash"),
    EventEmitter = require("events").EventEmitter,
    fs = require("fs"),
    subTemplates = require('simplator-subtemplates'),
    simplator = require("simplator");


var tabs = fs.readFileSync(__dirname + "/../templates/tabs.html", "utf8"),
    tab = fs.readFileSync(__dirname + "/../templates/tab.html", "utf8"),
    templates = {
        tabs: simplator.compile(tabs),
        tab: simplator.compile(tab)
    };

subTemplates.use(templates);

function TabsView($) {
    this.$ = $;
    this.events = new EventEmitter();


}

module.exports = TabsView;

TabsView.prototype.onTabClick = function (tab) {

    var li = this.$(tab).parent("li");

    var attr = li.attr("id");
    this.events.emit('tabClicked', attr);
};


TabsView.prototype.run = function () {
    var _this = this;

    _this.$(".tabs a").click(function () {
        _this.onTabClick(this);
    });


};

TabsView.prototype.addTab = function (tab) {
    this.$(".tabs").append(templates.tab(tab));
    var _this = this;
    _this.$(".tabs #"+tab.id+ " a").click(function () {
        _this.onTabClick(this);
    });
};

TabsView.prototype.removeTab = function (tabId) {
    this.$(".tabs #"+tabId+ " a").off("click");
    this.$(".tabs #"+tabId).remove();
};

TabsView.prototype.render = function (tabsPresenter) {

    return templates.tabs(tabsPresenter);

};