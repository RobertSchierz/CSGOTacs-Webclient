/**
 * Created by Robert on 26.12.2015.
 */

function Tactic(){


    this.map;
    this.x;
    this.y;
    this.user;
    this.tacticname;
    this.id;
    this.drag;
    this.group ;
    this.tactic;



    this.setMap = function(map)
    {
        this.map = map;
    };

    this.getMap = function()
    {
        return this.map;
    };

    this.setX = function(x)
    {
         this.x = x;
    };

    this.getX = function()
    {
        return this.x;
    };

    this.setY = function(y)
    {
        this.y = y;
    };

    this.getY = function()
    {
        return this.y;
    };

    this.setUser = function(user)
    {
        this.user = user;
    };

    this.getUser = function()
    {
        return this.user;
    };

    this.setTacticname = function(tacticname)
    {
        this.tacticname = tacticname;
    };

    this.getTacticname = function()
    {
        return this.tacticname;
    };

    this.setId = function(id)
    {
        this.id = id;
    };

    this.getId = function()
    {
        return this.id;
    };

    this.setDrag = function(drag){
        this.drag = drag;
    };

    this.getDrag = function(){
        return this.drag;
    };

    this.setGroup = function(group){
        this.group = group;
    };

    this.getGroup = function(){
        return this.group;
    };


    this.normalizeKoordinates = function(array ,canvaswidth){
        var normalizedarray = new Array();
        for(var value in array){

            try {
                //noinspection JSUnfilteredForInLoop
                normalizedarray.push(array[value] / canvaswidth);
            } catch (e) {
                console.log(e.message);
            }
        }

        return normalizedarray;
    };

    this.unnormalizeKoordinates = function(array ,canvaswidth){
        var normalizedarray = new Array();
        for(var value in array){
            try {
                normalizedarray.push(array[value] * canvaswidth);
            } catch (e) {
                console.log(e.message)
            }
        }

        return normalizedarray;
    };
};

Tactic.createTactic = function(){
    var newtactic = new Tactic();
    return newtactic;
};

Tactic.getTactic = function(){
    if(!this.tactic){
        this.tactic = this.createTactic();
    }
    return this.tactic;
};



var tactic = Tactic.getTactic();


