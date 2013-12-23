var assert = require("assert"),
    expect = require("expect.js"),
    _ = require("lodash"),

    makeTabs = require("../lib/tabs"),

    tabs = makeTabs();

function makeTab(caption){
    return {
        active:false,
        caption: caption,
        id:caption
    };
}

describe("Tabs", function () {
    var tab1 = makeTab("test1"),
        obsTab1,
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

        obsTab1=tabs.push(tab1);
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

    it("emit captionChanged", function () {
        var changedId,changedCaption;
        tabs.events.on("captionChanged",function(id,caption){
            changedId=id;
            changedCaption=caption;
        });
        obsTab1.caption="changed1";
        expect(tab1.caption).to.be.equal("changed1");
        expect(changedId).to.be.equal("test1");
        expect(changedCaption).to.be.equal("changed1");
    });

    describe("activeChanged event",function(){

        it("is emitted when active go to null", function (done) {
            tabs.events.once("activeChanged",function(item){
                expect(item).to.be.equal(null);
                expect(tabs.activeItem).to.be.equal(null);
                done();
            });
            tabs.remove(0);

        });

        it("is emitted when active go to first item", function (done) {
            tabs.events.once("activeChanged",function(item){
                expect(item).to.be.equal(tab1);
                expect(tabs.activeItem).to.be.equal(tab1);
                done();
            });
            tabs.push(tab1);

        });

        it("is emitted when active go to last item", function (done) {
            tabs.events.once("activeChanged",function(item){
                expect(item).to.be.equal(tab2);
                expect(tabs.activeItem).to.be.equal(tab2);

                done();
            });
            tabs.push(tab2);
            tabs.remove(0);

        });

        it("is emitted when active property is changed on item", function (done) {
            var obsTab = tabs.push(tab1);

            tabs.events.once("activeChanged",function(item){
                expect(item).to.be.equal(tab1);
                expect(tabs.activeItem).to.be.equal(tab1);
                done();
            });

            obsTab.active = true;

        });
    });

    describe("activate",function(){
        var activated;
        before(function(done){
            tabs.events.once("activeChanged",function(item){
                activated = item;
                done();
            });

            tabs.activate(tab2);
        });

        it("set active property on active item to true", function () {
            expect(tab2.active).to.be.equal(true);
        });

        it("set active property on other items to false", function () {
            expect(tab1.active).to.be.equal(false);
        });

        it("emit activeChanged event", function () {
            expect(activated).to.be.equal(tab2);
        });

        it("set activeItemProperty", function () {
            expect(tabs.activeItem).to.be.equal(tab2);
        });
    });

});
