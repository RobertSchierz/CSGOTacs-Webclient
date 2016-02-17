/**
 * Created by Robert on 26.12.2015.
 */

function Tactic(){


    this.maps;
    this.strokestyle;
    this.x;
    this.y;
    this.user;
    this.tacticname;
    this.id;
    this.drag;
    this.group;
    this.canvasmapwidth;
    this.tactic;



    this.setMaps = function(Maps)
    {
        this.maps = Maps;
    };

    this.getMap = function()
    {
        return this.maps;
    };

    this.setStrokestyle = function(strokeStyle)
    {
        this.strokestyle = strokeStyle;
    };

    this.getStrokestyle = function()
    {
        return this.strokestyle;
    };

    this.setX = function(X)
    {
         this.x = X;
    };

    this.getX = function()
    {
        return this.x;
    };

    this.setY = function(Y)
    {
        this.y = Y;
    };

    this.getY = function()
    {
        return this.y;
    };

    this.setUser = function(User)
    {
        this.user = User;
    };

    this.getUser = function()
    {
        return this.user;
    };

    this.setTacticname = function(Tacticname)
    {
        this.tacticname = Tacticname;
    };

    this.getTacticname = function()
    {
        return this.tacticname;
    };

    this.setId = function(Id)
    {
        this.id = Id;
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


    this.getCanvasmapwidth = function(){
        return this.canvasmapwidth;
    };

    this.setCanvasmapwidth = function(canvas){
        this.canvasmapwidth = canvas;
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


