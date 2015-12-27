/**
 * Created by Robert on 26.12.2015.
 */

    function Tactic() {

        this.map;
        this.strokestyle;


        this.setMap = function(Map)
        {
            this.map = Map;
        };

        this.getMap = function()
        {
            return this.map;
        };

       this.setStrokestyle = function(strokeStyle)
        {
            this.strokestyle = strokeStyle;
        };

        this.getStrokestyle = function()
        {
            return this.strokestyle;
        };



    }



