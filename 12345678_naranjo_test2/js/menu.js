/*
Name
Student ID
Date
File name: menu/js
*/

var menu = [
    { title: "Main Page", url: "index.html" },
    { title: "Courses", url: "bmcc_courses.html" },
    { title: "Faculty 1", url: "faculty_table.html" },
    { title: "Faculty 2", url: "faculty_list.html" },
    { title: "Products", url: "supermarket.html" }
];

var menu_options = "";

for(var i = 0; i < menu.length; i++){
    menu_options += `
        <li><a href="${menu[i].url}">${menu[i].title}</a></li>
    `;
    console.log("Title: " + menu[i].title);
}

document.getElementById("nav").innerHTML = menu_options;