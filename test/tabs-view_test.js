var assert = require("assert"),
    expect = require("expect.js"),
    cheerio = require('cheerio'),
    TabsView = require("../lib/TabsView");


describe("tabs-view", function () {
    var $ = cheerio.load('<div id="content"></div>'),
        tabsView = new TabsView($),
        handlers = {},
        $a = $("a");

    $a.__proto__.click = function (handler) {
        var key = $(this).parent("li").attr("id");

        if (key in handler)
            throw new Error("handler already present for " + key);
        handlers[ key] = handler;
    };

    $a.__proto__.off = function (event) {
        var key = $(this).parent("li").attr("id");

        if (key in handlers && event == "click")
            delete handlers[ key];
    };

    it("is defined", function () {
        expect(TabsView).to.be.an('function');
    });

    it("is creatable", function () {
        expect(tabsView).to.be.an('object');
    });

    before(function () {
        var tabsPresenter = {
            tabs: [
                {
                    caption: "tab 1",
                    id: "tab1",
                    active: false,
                    activeClass: ''
                },
                {
                    caption: "tab 2",
                    id: "tab2",
                    active: true,
                    activeClass: 'class="active"'
                }
            ]
        };

        var value = tabsView.render(tabsPresenter);

        $("#content").html(value);
        tabsView.run();

    });


    describe("render", function () {
        it("is defined", function () {
            expect(tabsView.render).to.be.an('function');
        });

        it("add a tab for each item in presenter", function () {
            expect($("#tab1").is("li")).to.be.equal(true);
            expect($("#tab2").is("li")).to.be.equal(true);
        });

        it("render item caption", function () {
            expect($("#tab1").html()).to.be.equal("<a>tab 1</a>");
        });

        it("render active state", function () {
            expect($("#tab1").hasClass("active")).to.be.equal(false);
            expect($("#tab2").hasClass("active")).to.be.equal(true);
        });





    });
    describe("addTab", function () {
        before(function () {
            var tab = {
                        caption: "tab 3",
                        id: "tab3",
                        active: true,
                        activeClass: 'class="active"'
                    };

            tabsView.addTab(tab);

        });

        it("is defined", function () {
            expect(tabsView.addTab).to.be.an('function');
        });

        it("add a new tab", function () {
            expect($("#tab3").is("li")).to.be.equal(true);

        });

        it("render item caption", function () {
            expect($("#tab3").html()).to.be.equal("<a>tab 3</a>");
        });

        it("render active state", function () {
            expect($("#tab3").hasClass("active")).to.be.equal(true);
        });

        it("emit events on tab clicks", function (done) {
            tabsView.events.once("tabClicked",function(itemId){
                expect(itemId).to.be.equal("tab3");
                done();
            });

            handlers.tab3.call($("#tab3 a"));
        });



    });

    describe("removeTab", function () {
        before(function () {
            tabsView.removeTab("tab3");

        });

        it("is defined", function () {
            expect(tabsView.removeTab).to.be.an('function');
        });

        it("add a new tab", function () {
            expect($("#tab3").length).to.be.equal(0);

        });


        it("remove events listener", function () {
            expect("tab3" in handlers).to.be.equal(false);


        });



    });

    describe("setActive", function () {
        before(function () {
            tabsView.setActive("tab1");

        });

        it("is defined", function () {
            expect(tabsView.setActive).to.be.an('function');
        });

        it("change active items class", function () {
            expect($("#tab1").hasClass("active")).to.be.equal(true);
            expect($("#tab2").hasClass("active")).to.be.equal(false);

        });





    });
    it("emit events on tab clicks", function (done) {
        tabsView.events.once("tabClicked",function(itemId){
            expect(itemId).to.be.equal("tab1");
            done();
        });

        handlers.tab1.call($("#tab1 a"));
    });
});
