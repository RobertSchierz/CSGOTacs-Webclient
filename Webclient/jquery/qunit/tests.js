
    QUnit.module( "Test Elements and Variables" );


QUnit.test( "Object tactic exist", function( assert ) {
    assert.ok( tactic != undefined, "Object tactic exists!" );
});

    QUnit.module( "Test Classfunctions" );

QUnit.test( "Test Funktion normalizeKoordinates and unnormalizeKoordinates ", function( assert ) {
    expect(2);
    var callbackarray = tactic.normalizeKoordinates(new Array(1,2), 100);
    assert.ok( callbackarray[0] == 0.01 && callbackarray[1] == 0.02, "Function normalizeKoordinates gives the expected Result back");

    var callbackarray = tactic.unnormalizeKoordinates(new Array(0.01,0.02), 100);
    assert.ok( callbackarray[0] == 1 && callbackarray[1] == 2, "Function unnormalizeKoordinates gives the expected Result back");
});



    QUnit.module( "Test Canvas" );

QUnit.test( "Canvas exist", function( assert ) {
    assert.ok( $("#imgpanel") != undefined, "Canvas exists!" );
});

QUnit.test( "Test draw on map", function( assert ) {
    var context = document.getElementById('imgpanel').getContext("2d");
    for(var i = 0; i < 100; i++){
        addClick(i,i,true, context);
    }

    var blank = document.createElement('canvas');
    blank.width = $("#imgpanel").width();
    blank.height = $("#imgpanel").height();
    assert.ok( document.getElementById('imgpanel').toDataURL() != blank.toDataURL(), "Automatic Drawing on the Canvas is happened" );
});


    QUnit.module( "Test Overlaypanels" );

QUnit.test( "Open Loadpanel", function( assert ) {
    openOverlaypanel("loadtactics", user.tactics);
    assert.ok( $('.overlaypanel').css('display') == 'block', "Loadpanel does fadeIn when opened" );
});






QUnit.done(function( details ) {
    closeOverlaypanel();
});

