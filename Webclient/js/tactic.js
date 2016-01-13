/**
 * Created by Robert on 26.12.2015.
 */

function Tactic() {

    this.maps;
    this.strokestyle;
    this.X;
    this.Y;
    this.user;
    this.tacticname;
    this.id;


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



}

var tactic = new Tactic();



