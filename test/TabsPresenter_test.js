var assert = require("assert"),
    expect = require("expect.js"),
    EventEmitter = require('events').EventEmitter,
    makeTabs = require("../lib/tabs"),
    TabsView = require("../lib/TabsView"),
    cheerio = require('cheerio'),
    TabsPresenter = require("../lib/TabsPresenter");


describe("tabs-presenter", function () {
    var tabs = makeTabs(),
        $ = cheerio.load('<div id="content"></div>'),
        view = new TabsView($),
        tabsPresenter = new TabsPresenter(tabs,view);
    tabsPresenter.start();


    it("is defined", function () {
        expect(TabsPresenter).to.be.an('function');
    });

    it("is creatable", function () {
        expect(tabsPresenter).to.be.an('object');
    });

    it("emit events", function () {
        expect(tabsPresenter.events).to.be.an('object');
    });

    describe("start", function () {
        it("is defined", function () {
            expect(tabsPresenter.start).to.be.an('function');
        });
    });


});
