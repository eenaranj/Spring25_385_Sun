/* 
ID : 12345678
Name : John Smith 
File name : indexddb.js
Java Script for indexdb*/


var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;


var open = indexedDB.open("FriendsDatabase", 1);


open.onupgradeneeded = function () {
    var db = open.result;
    var store = db.createObjectStore("MyFriendsList", { keyPath: "id" });
};

open.onsuccess = function () {
    var db = open.result;

    document.getElementById("add-person-form").onsubmit = function (event) {
        event.preventDefault();

        var firstName = document.getElementById("first-name").value;
        var lastName = document.getElementById("last-name").value;
        var age = parseInt(document.getElementById("age").value, 10);
        var id = Date.now();


        var tx = db.transaction("MyFriendsList", "readwrite");
        var store = tx.objectStore("MyFriendsList");


        store.put({ id: id, name: { first: firstName, last: lastName }, age: age });

        document.getElementById("first-name").value = '';
        document.getElementById("last-name").value = '';
        document.getElementById("age").value = '';


        tx.oncomplete = function () {
            refreshPeopleList();
        };


        tx.onerror = function (event) {
            console.error("Error adding person:", event.target.error);
        };
    };


    document.getElementById("delete-person-form").onsubmit = function (event) {
        event.preventDefault();

        var idToDelete = parseInt(document.getElementById("delete-id").value, 10);

        if (isNaN(idToDelete)) {
            alert("Please enter a valid ID.");
            return;
        }


        var tx = db.transaction("MyFriendsList", "readwrite");
        var store = tx.objectStore("MyFriendsList");


        var request = store.delete(idToDelete);

        request.onsuccess = function () {
            console.log(`Successfully deleted person with ID: ${idToDelete}`);
            refreshPeopleList();
        };

        request.onerror = function (event) {
            console.error("Error deleting person:", event.target.error);
        };


        document.getElementById("delete-id").value = '';
    };


    function refreshPeopleList() {
        var tx = db.transaction("MyFriendsList", "readonly");
        var store = tx.objectStore("MyFriendsList");

        var getAll = store.getAll();

        getAll.onsuccess = function () {
            displayPeople(getAll.result);
        };

        tx.oncomplete = function () {

        };
    }


    function displayPeople(people) {
        var list = document.getElementById("people-list");
        list.innerHTML = "";

        people.forEach(function (person) {
            var listItem = document.createElement("li");
            listItem.textContent = `${person.name.first} ${person.name.last}, Age: ${person.age}, ID: ${person.id}`;
            list.appendChild(listItem);
        });
    }


    refreshPeopleList();
};
