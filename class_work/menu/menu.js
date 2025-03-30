function init(){
    console.log("Page started and inside function init()");
    // create an array of objects
    var name_of_array = [
        {title: "Home", link: "index.html"},
        {title: "Page 1", link: "page1.html"},
        {title: "Page 2", link: "page2.html"}
    ];

    // create an empty string variable
    var li_list = "";

    // use a for loop to dynamically create the nav bar
    for(var i = 0; i < name_of_array.length; i++){
        // <li><a href="page1.html">Page 1</a></li>
        li_list += `
            <li><a href="${name_of_array[i].link}">${name_of_array[i].title}</a></li>
        `;
    }

    // load list to ul menu
    document.getElementById("my_menu").innerHTML = li_list;


}

window.onload = init;