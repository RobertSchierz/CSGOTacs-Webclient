QUnit.config.reorder = false;
authentification("robdebang", "123");


QUnit.module("Test Classfunctions");

QUnit.test("Test Funktion normalizeKoordinates and unnormalizeKoordinates ", function (assert) {
    expect(4);
    var callbackarray = tactic.normalizeKoordinates(new Array(1, 2), 100);
    assert.ok(callbackarray[0] == 0.01 && callbackarray[1] == 0.02, "Function normalizeKoordinates gives the expected Result back");

    var callbackarray = tactic.unnormalizeKoordinates(new Array(0.01, 0.02), 100);
    assert.ok(callbackarray[0] == 1 && callbackarray[1] == 2, "Function unnormalizeKoordinates gives the expected Result back");


    assert.ok(tactic != undefined, "Object tactic exists!");
    assert.ok(user != undefined, "Object user exists!");

});


QUnit.module("Test Overlaypanels");
QUnit.test('Open Overlaypanels', function (assert) {


    assert.expect(7);
    var done = assert.async(7);

    setTimeout(function () {
        openOverlaypanel("loadtactics");
        assert.ok($('.overlaypanel').css('display') == 'block' && $("#overlaypanel_insidebox").children.length != 0, "Loadpanel does fadeIn when opened");
        closeOverlaypanel();
        done();
    }, 2000);

    setTimeout(function () {
        openOverlaypanel("register");
        assert.ok($('.overlaypanel').css('display') == 'block' && $("#overlaypanel_insidebox").children.length != 0, "registerpanel does fadeIn when opened");
        closeOverlaypanel();
        done();
    }, 4000);

    setTimeout(function () {
        openOverlaypanel("tacticname");
        assert.ok($('.overlaypanel').css('display') == 'block' && $("#overlaypanel_insidebox").children.length != 0, "tacticnamepanel does fadeIn when opened");
        closeOverlaypanel();
        done();
    }, 6000);

    setTimeout(function () {
        openOverlaypanel("groupcreate");
        assert.ok($('.overlaypanel').css('display') == 'block' && $("#overlaypanel_insidebox").children.length != 0, "groupcreatepanel does fadeIn when opened");
        closeOverlaypanel();
        done();
    }, 8000);

    setTimeout(function () {
        openOverlaypanel("grouplogin");
        assert.ok($('.overlaypanel').css('display') == 'block' && $("#overlaypanel_insidebox").children.length != 0, "grouploginpanel does fadeIn when opened");
        closeOverlaypanel();
        done();
    }, 10000);

    setTimeout(function () {

        openOverlaypanel("grouptactic", "Splasher");
        setTimeout(function () {
            assert.ok($('.overlaypanel').css('display') == 'block' && $("#overlaypanel_insidebox").children.length != 0, "grouppanel does fadeIn when opened");
            closeOverlaypanel();
            done();
        }, 3000);
    }, 12000);

    setTimeout(function () {

        alertMessage("Testalert", "green");
        setTimeout(function () {
            assert.ok($('.alertmessage'), "alertpanel fadeIn when opened");
            done();
        }, 2000);
    }, 16000);


});


QUnit.module("Test Canvas");
QUnit.test("Canvas Tests", function (assert) {
    expect(5);

    assert.ok($("#imgpanel") != undefined, "Canvas exists!");


    handleMapselectorStates("#Cobblestone", false);
    assert.ok($("#map").attr("src") == "images/map_cobblestone.jpg", "Changed Map with handleMapselectorStates Function to Cobblestone");


    var context = document.getElementById('imgpanel').getContext("2d");
    for (var i = 0; i < 100; i++) {
        addClick(i, i, true, context);
    }

    var blank = document.createElement('canvas');
    blank.width = $("#imgpanel").width();
    blank.height = $("#imgpanel").height();

    calloutVisibility();
    assert.ok($("[data-option = off]"), "Callouts hided");

    deleteCanvas();
    assert.ok(document.getElementById('imgpanel').toDataURL() == blank.toDataURL(), "Delete Drawing of Canvas");

    for (var i = 0; i < 100; i++) {
        addClick(i, i, true, context);
    }

    assert.ok(document.getElementById('imgpanel').toDataURL() != blank.toDataURL(), "Automatic Drawing on the Canvas is happened");


});

/*QUnit.done(function( details ) {
 closeOverlaypanel();
 });

 */