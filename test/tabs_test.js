var assert = require("assert"),
    expect = require("expect.js"),
    _ = require("lodash"),
    Tabs = require("../lib/tabs"),

    tabs = new Tabs();


describe("Tabs", function () {
    it("is defined", function () {
        expect(Tabs).to.be.an('function');
    });

    it("is is instantiable", function () {
        expect(tabs).to.be.an('object');
    });

    it("is emits events", function () {
        expect(tabs.events).to.be.an('object');
    });



});
