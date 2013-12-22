var assert = require("assert"),
    expect = require("expect.js"),
    _ = require("lodash"),
    makeTabs = require("../lib/tabs"),

    tabs = makeTabs();

function makeTab(caption){
    return {
        active:false,
        caption: caption
    };
}

describe("Tabs", function () {
    var tab1 = makeTab("test1"),
        tab2 = makeTab("test2");

    it("is defined", function () {
        expect(makeTabs).to.be.an('function');
    });

    it("is instantiable", function () {
        expect(tabs).to.be.an('array');
    });

    it("emits events", function () {
        expect(tabs.events).to.be.an('object');
    });

    it("activate first added tab", function () {

        tabs.push(tab1);
        expect(tab1.active).to.be.equal(true);
    });

    it("doesn't activate second added tab", function () {

        tabs.push(tab2);
        expect(tab1.active).to.be.equal(true);
        expect(tab2.active).to.be.equal(false);
    });

    it("activate last tab remaining", function () {

        tabs.remove(0);
        expect(tab2.active).to.be.equal(true);
    });


});
