/**
 * Created by Robert on 24.01.2016.
 */
/**
 * Created by Robert on 26.12.2015.
 */

function User() {

    this.groups;



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


}

var user = new User();



