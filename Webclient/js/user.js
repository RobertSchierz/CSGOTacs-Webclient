/**
 * Created by Robert on 24.01.2016.
 */
/**
 * Created by Robert on 26.12.2015.
 */

function User() {

    this.groups = new Array();
    this.tactics = new Array();
    this.grouptactics = new Array();

    this.setGroups = function(groups)
    {
        this.groups = groups;
    };

    this.getGroups = function()
    {
        return this.groups;
    };

    this.deleteGroup = function(group, groupname){
        for(var z = 0; z < group.length; z++){
            if(group[z].name == groupname){
                group.splice(z,1);
            }
        }
        user.setGroups(group);
    };

    this.addGroup = function(addedgroup){
        this.groups.push(addedgroup);
    };

    this.groupNamesArray = function(){
        var namesarray = new Array();
        for(var name = 0; name < this.groups.length; name++){

            namesarray.push(this.groups[name].name);
        }
        return namesarray;

    };

    this.getIndexofGroupByName = function(groupname){
        for(var group in this.groups){
            //noinspection JSUnfilteredForInLoop
            if(this.groups[group].name == groupname){
                return group;
            }
        }
    };

    this.setModToGroup = function(group, mod){
        this.groups[this.getIndexofGroupByName(group)].mods.push(mod);
    };

    this.deleteModofGroup = function(group, mod){
          this.groups[this.getIndexofGroupByName(group)].mods.splice(isInArray(this.groups[this.getIndexofGroupByName(group)].mods, mod),1);
    };



   /* this.getUserByName = function(name, groupname){
        for(var group in this.groups){
            if(this.groups[group].name == groupname){
                for(var member in this.groups[group].member){
                    if(this.groups[group].member[member] == name){
                        return this.groups[group].member[member];
                    }
                }
            }
        }
    };*/


    this.setTactics = function(tactics)
    {
        this.tactics = tactics;
    };

    this.getTactics = function()
    {
        return this.tactics;
    };

    this.addTactic = function(addedtactic){
        this.tactics.push(addedtactic);
    };

    this.changeTacticName = function(id, newname, option){
        if(option == "group"){
            for(var tactic = 0; tactic < this.grouptactics.length; tactic++){
                if(this.grouptactics[tactic].id == id){
                    this.grouptactics[tactic].name = newname;
                }
            }
        }else{
            for(var tactic = 0; tactic < this.tactics.length; tactic++){
                if(this.tactics[tactic].id == id){
                    this.tactics[tactic].name = newname;
                }
            }
        }

    };

    this.deleteTacticName = function(id){
        for(var tactic = 0; tactic < this.tactics.length; tactic++){
            if(this.tactics[tactic].id == id){
                this.tactics.splice(tactic,1);
            }
        }
    };


    this.setGrouptactics = function(grouptactics)
    {
        this.grouptactics = grouptactics;
    };

    this.getGrouptactics = function()
    {
        return this.grouptactics;
    };

    this.addGrouptactic = function(addedgrouptactic){
        this.grouptactics.push(addedgrouptactic);
    };

    this.setLocalToGroupTactic = function(id){
        /*
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
*/
        this.deleteTacticName(id);
    };

    this.getGroupByName = function(groupname){

        for(var group = 0; group < this.groups.length; group++){

        if(this.groups[group].name == groupname){
            return this.groups[group];
        }
        }
    };

    this.getGrouptacticsByName = function(groupname){
        var grouptacticsarray = new Array();
        for(var tactic = 0; tactic < this.grouptactics.length; tactic++){
            if(this.grouptactics[tactic].group == groupname){
                grouptacticsarray.push(this.grouptactics[tactic]);
            }
        }

        return grouptacticsarray;
    };

    this.getGrouptacticByID = function(id){
        for(var tactic = 0; tactic < this.grouptactics.length; tactic++){
            if(this.grouptactics[tactic].id == id){
                return this.grouptactics[tactic];
            }
        }

        return false;
    };

    this.changeTacticData = function(tactic){

        if(this.getGrouptacticsByName(tactic.name).length == 0){
            for(var tactics in this.tactics){
                if(this.tactics[tactics].name == tactic.getTacticname()){
                    this.tactics[tactics].drag = tactic.getDrag();
                    this.tactics[tactics].x = tactic.getX();
                    this.tactics[tactics].y = tactic.getY();
                }
            }
        }else{
            for(var grouptactic in this.grouptactics){
                if(this.grouptactics[grouptactic].name == tactic.getTacticname()){
                    this.grouptactics[grouptactic].drag = tactic.getDrag();
                    this.grouptactics[grouptactic].x = tactic.getX();
                    this.grouptactics[grouptactic].y = tactic.getY();
                }
            }
        }
    }



}



var user = new User();
