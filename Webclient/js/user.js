/**
 * Created by Robert Schierz on 24.01.2016.
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

    /**
     * Löscht eine Gruppe aus dem Objekt user
     *
     * @param group = Gruppenname aus der gelöscht werden soll, groupname = Gruppenname der gelöscht werden soll
     */
    this.deleteGroup = function(group, groupname){
        for(var z = 0; z < group.length; z++){
            if(group[z].name == groupname){
                group.splice(z,1);
            }
        }
        user.setGroups(group);
    };

    /**
     * Fügt dem Array groups ein Wert hinzu
     *
     * @param addedgroup = Gruppe die hinzugefügt werden soll
     */
    this.addGroup = function(addedgroup){
        this.groups.push(addedgroup);
    };

    /**
     * Gibt alle Gruppennamen im Array zurück
     *
     * @return namesarray = Rückgabearray
     */
    this.groupNamesArray = function(){
        var namesarray = new Array();
        for(var name = 0; name < this.groups.length; name++){

            namesarray.push(this.groups[name].name);
        }
        return namesarray;

    };

    /**
     * Gibt den Index einer Gruppe anhand des Namens zurück
     *
     * @param groupname = Gruppenname
     * @return group = Index an der dieser Gruppenname im Array groups gefunden wurde
     */
    this.getIndexofGroupByName = function(groupname){
        for(var group in this.groups){
            //noinspection JSUnfilteredForInLoop
            if(this.groups[group].name == groupname){
                return group;
            }
        }
    };

    /**
     * Füge der Gruppe einen Moderator hinzu
     *
     * @param group = Gruppenname, mod = Benutzername des Moderators
     */
    this.setModToGroup = function(group, mod){
        this.groups[this.getIndexofGroupByName(group)].mods.push(mod);
    };

    /**
     * Entfernt einen Moderator aus einer Gruppe
     *
     * @param group = Gruppenname, mod = Benutzername des Moderators
     */
    this.deleteModofGroup = function(group, mod){
          this.groups[this.getIndexofGroupByName(group)].mods.splice(isInArray(this.groups[this.getIndexofGroupByName(group)].mods, mod),1);
    };


    this.setTactics = function(tactics)
    {
        this.tactics = tactics;
    };

    this.getTactics = function()
    {
        return this.tactics;
    };

    /**
     * Fügt dem Array tactics ein Wert hinzu
     *
     * @param addedtactic = Taktik die hinzugefügt werden soll
     */
    this.addTactic = function(addedtactic){
        this.tactics.push(addedtactic);
    };

    /**
     * Ändert einen Taktikname in dem Objekt user
     *
     * @param id = id der Taktik, newname = Neue Taktikname, option = prüfwert für Gruppen
     */
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

    /**
     * Löscht einen Taktiknamen aus dem Objekt user
     *
     * @param id = Id der Taktik
     */
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

    /**
     * Fügt dem Array grouptactics einen Wert hinzu
     *
     * @param addedgrouptactic = Gruppentaktik die hinzugefügt werden soll
     */
    this.addGrouptactic = function(addedgrouptactic){
        this.grouptactics.push(addedgrouptactic);
    };

    /**
     * Setzt eine Lokale Taktik als Gruppentaktik
     *
     * @param id = Id der Taktik
     */
    this.setLocalToGroupTactic = function(id){
        this.deleteTacticName(id);
    };

    /**
     * Liefert eine Gruppe anhand des Namens zurück
     *
     * @param groupname = Gruppenname
     * @return this.groups[group] = Gruppenobjekt
     */
    this.getGroupByName = function(groupname){

        for(var group = 0; group < this.groups.length; group++){

        if(this.groups[group].name == groupname){
            return this.groups[group];
        }
        }
    };

    /**
     * Gibt alle Gruppentaktiken einer Gruppe zurück
     *
     * @param groupname = Gruppenname
     * @return grouptacticsarray = alle Gruppentaktiken der Gruppe
     */
    this.getGrouptacticsByName = function(groupname){
        var grouptacticsarray = new Array();
        for(var tactic = 0; tactic < this.grouptactics.length; tactic++){
            if(this.grouptactics[tactic].group == groupname){
                grouptacticsarray.push(this.grouptactics[tactic]);
            }
        }

        return grouptacticsarray;
    };

    /**
     * Gibt Gruppentaktik anhand der ID zurück
     *
     * @param id = Id der Gruppe
     * @return this.grouptactics[tactic] = angeforderte Taktik
     */
    this.getGrouptacticByID = function(id){
        for(var tactic = 0; tactic < this.grouptactics.length; tactic++){
            if(this.grouptactics[tactic].id == id){
                return this.grouptactics[tactic];
            }
        }

        return false;
    };

    /**
     * Verändert die Klassenattribute einer Taktik
     *
     * @param taktik = Die zu veränderne Taktik
     */
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
