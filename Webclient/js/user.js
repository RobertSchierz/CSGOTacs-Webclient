/**
 * Created by Robert on 24.01.2016.
 */
/**
 * Created by Robert on 26.12.2015.
 */

function User() {

    this.groups;
    this.tactics;
    this.grouptactics;

    this.setGroups = function(Groups)
    {
        this.groups = Groups;
    };

    this.getGroups = function()
    {
        return this.groups;
    };

    this.deleteGroup = function(Groups, groupname){
        for(var z = 0; z < Groups.length; z++){
            if(Groups[z].name == groupname){
                Groups.splice(z,1);
            }
        }
        user.setGroups(Groups);
    };

    this.addGroup = function(addedgroup){
        this.groups.push(addedgroup);
    }

    this.groupNamesArray = function(){
        var namesarray = new Array();
        for(var name = 0; name < this.groups.length; name++){

            namesarray.push(this.groups[name].name);
        }
        return namesarray;

    }

    this.setTactics = function(Tactics)
    {
        this.tactics = Tactics;
    };

    this.getTactics = function()
    {
        return this.tactics;
    };

    this.addTactic = function(addedtactic){
        this.tactics.push(addedtactic);
    }

    this.changeTacticName = function(id, newname){
        for(var tactic = 0; tactic < this.tactics.length; tactic++){
            if(this.tactics[tactic].id == id){
                this.tactics[tactic].name = newname;
            }
        }
    }

    this.deleteTacticName = function(id){
        for(var tactic = 0; tactic < this.tactics.length; tactic++){
            if(this.tactics[tactic].id == id){
                this.tactics.splice(tactic,1);
            }
        }
    }

    this.setGrouptactics = function(Grouptactics)
    {
        this.grouptactics = Grouptactics;
    };

    this.getGrouptactics = function()
    {
        return this.grouptactics;
    };

    this.addGrouptactic = function(addedgrouptactic){
        this.grouptactics.push(addedgrouptactic);
    }

    this.setLocalToGroupTactic = function(id, group){
        for(var tactic = 0; tactic < this.tactics.length; tactic++){
            if(this.tactics[tactic].id == id){
                this.addGrouptactic(this.tactics[tactic]);
            }
        }
        for(var tactic = 0; tactic < this.grouptactics.length; tactic++){
            if(this.grouptactics[tactic].id == id){
                this.grouptactics[tactic].group = group;
            }
        }

        this.deleteTacticName(id);
    }



}



var user = new User();