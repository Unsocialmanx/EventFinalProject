//1. - home, lists all your Notes
//2. - add, lets you add a Note
// 3. - lets you delete a note.

// define an array to hold our data.  Later this should be stored on the sever
Notes = [];
// save typing time, make up 3 for testing
Notes.push(new Note("Destiny Raid 5/20/2020 8:00PM", 1));
Notes.push(new Note("CSGO 5/11/2020 7:00PM", 2));
Notes.push(new Note("7 Days To Die Horde Night 5/11/2020 6:00PM", 3));

// Now comes the code that must wait to run until the document is fully loaded
document.addEventListener("DOMContentLoaded", function (event) {

    // update the li's on our homepage
    let listUl = document.getElementById("listUl");
    UpdateDisplay(listUl);  // call shared code with delete and home

    // sometimes you want data to be current as you switch from one page to another
    // to do that we get a DOM event  "pagebeforeshow"

    // this will refresh the data each time you navigate back to the Home page
    $(document).on('pagebeforeshow', '#Home');

    // Takes you to current events page
    $(document).on('pagebeforeshow', '#Events', function () {
        let listUl = document.getElementById("listUl");
        UpdateDisplay(listUl);
    }
    );
    

    // Use this for creating delete button
    //$(document).on('pagebeforeshow', '#Events', function () {
     //   let deleteListUl = document.getElementById("deleteListUl");
      //  UpdateDisplay(deleteListUl);   // call shared code with delete and home
       // document.getElementById("deleteItem").value = "";  // clear this text box
    }
    );


     // this will clear the text boxes  each time you navigate back to the Add page
     $(document).on('pagebeforeshow', '#Add', function () {
        document.getElementById("title").value = ""; 
        document.getElementById("detail").value = ""; 
        document.getElementById("priority").value  = ""; 
    }
    );

    // add a button event for adding new notes on Add page
    document.getElementById("newNote").addEventListener("click", function () {
        // use constructor, build new object and put it in array
        Notes.push( new Note( document.getElementById("title").value, 
        document.getElementById("detail").value,
        document.getElementById("priority").value ) );
     

     // add a button even for deleting a note on Delete page
     document.getElementById("delete").addEventListener("click", function () {
        let which = document.getElementById("deleteItem").value;
        let found = false;
        for(var i = 0; i < Notes.length; i++) // find the match
        {
            if(Notes[i].title === which){
                Notes.splice(i,1);  // remove object from array
                found = true;
            }
        }
        if(!found){
            document.getElementById("deleteItem").value = "Sorry, could not find";
        }

     });
 

});  // end of code that must wait for document to load before running

// our constructor
function Note(ptitle, pDetail, pPriority) {
    this.title= ptitle;
    this.detail = pDetail;
    this.priority = pPriority;
  }

// this function is shared by Home and Delete page to add li's to which ever ul is passed in
 function UpdateDisplay(whichElement) {
    whichElement.innerHTML = "";
    // sort by priority
    Notes.sort(function(a, b) {
        return (a.priority) - (b.priority);
    });
    Notes.forEach(function(item, index) {
        var li = document.createElement('li');
        whichElement.appendChild(li);
        li.innerHTML=li.innerHTML + ": " + " Priority: " + item.priority + "  " + item.title + ":  " + item.detail;
    }); // build one li for each item in array
 }
