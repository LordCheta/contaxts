//Project: Address Book App
//Author: Maduabuchi Chinaechetam
//Twitter: @LordCheta
//Last Modified: 4/3/2018

$(function(){
    //------------------------------------- methods --------------------------------
    // array of contacts as objects
    let myContacts = [];

    // object constructor for contacts
        function Contacts(name, number, email, birthday, address) {
            // this.imgName = img;
            this.fullname = name;
            this.phone = number;
            this.email = email;
            this.birthday = birthday;
            this.addres = address;
        }

        // adds a new contact to the list
        function addNewContact() {
            // let imgName = $('#profile-img').val().split('\\').pop();
            let fullname = $('#name').val();
            let phone = $('#phone').val();
            let email = $('#email').val();
            let birthday = $('#birthday').val();
            let address = $('#address').val();
           // console.log(imgName);
                
            // Creates a new instance of the Contacts object
            newcontact = new Contacts(fullname, phone, email, birthday, address);

            // pushes the newly created contact to the myContacts array
            myContacts.push(newcontact);
            //console.log(myContacts);

            // deletes current contacts so the list can be re-updated
            $('#displayContacts').empty();
            //displays the updated list of contacts
            displayCurrentContacts();
        }

        // method that sorts contact list alphabetically
        function arrangeInOrder(){
            let arrangedContacts = [];
            $('.currentContacts').each(function (){
                let human = $(this).text();
                arrangedContacts.push(human); //adds contact names to arraty
                arrangedContacts.sort(); //sort contact names alphabetically
            });
            $('#displayContacts').empty(); //removes the unsorted contact names from the dom
            for (const order of arrangedContacts) {
                $('#displayContacts').append('<p class="currentContacts" id="currentContact">' + order + '</p>'); //adds sorted contact names to the dom
            }
            //console.log(arrangedContacts);
        }

        // displays the contacts
        function displayCurrentContacts() {
            for (let contact of myContacts) {
                $('#displayContacts').append('<p class="currentContacts" id="currentContact">' + contact.fullname + '</p>');
            } 
            arrangeInOrder();
        }

        // closes the create new contact form
        function closeContactForm() {
            $('.customInput').val(null);
            // $('#profile-img-tag').attr('src', './img/icon.jpg');
            $('#createContact').fadeOut();
        }

        // opens the create new contact form
        function openContactForm() { 
            $('#createContact').fadeIn();
         }
         
        //closes the app credits section
        function closeCredit() {
            $('#credits').fadeOut();
        }

        //opens the app credits section
        function openCredit() {
            $('#credits').fadeIn();
        }
        
        // displays details of selected contact
        function showSelectedContact(frnd) {
            $('.customInput').val(null);
            //Sets the text fielfs empty so new data can be put in
            $('#showFullname').text(null);
            $('#showEmail').text(null);
            $('#showPhone').text(null);
            $('#showBday').text(null);
            $('#showAddress').text(null);
            $('#nameExists').text(null);

            for (let kontat of myContacts) {

            // loops through the properties of each contact
            for (let key in kontat) {

                // finds the contact whose fullname is the one that was clicked
                if (kontat.fullname == frnd) {
                    //console.log(kontat.addres);
                    show_name = kontat.fullname;
                    show_email = kontat.email;
                    show_phone = kontat.phone;
                    show_birthday = kontat.birthday;
                    show_addres = kontat.addres;
                    break;
                }
            }
        }

        $('#showFullname').append(show_name);
        $('#showEmail').append(show_email);
        $('#showPhone').append(show_phone);
        $('#showBday').append(show_birthday);
        $('#showAddress').append(show_addres);
        } 

        //checks if contact with the current input name already exists
        function doesNameExist(name) {
            for (let newname of myContacts) {

                // loops through the properties of each contact
                for (let check in newname) {

                    // finds the contact whose fullname is the one that was clicked
                    if (newname.fullname == name) {
                        //console.log("name exists");
                        $('#nameExists').append('&#9940; A Contact With This Name Exists');
                        break;
                    } else{
                        $('#nameExists').text(null);
                        break;
                    }
                }
            }
        }

        // displays the contact details template
        function showDetailTemplate(){
            $('#showDetails').fadeIn();
        }

        // hides the contact details template
        function hideDetailTemplate() {
            $('#showDetails').hide();
        }

        //delets selected user
        function deleteContact(tbd){
            for (let toBeDeleted of myContacts) {
                for (let del in toBeDeleted) {
                    if (toBeDeleted.fullname == tbd) {
                        let pos = myContacts.indexOf(toBeDeleted);
                        myContacts.splice(pos, 1);
                        //console.log(pos);
                        break;
                    }
                }
            }
        }

        //edits info of selected contact
        function editContactInfo(){
            let currentName = $('#showFullname').text();
            let currentEmail = $('#showEmail').text();
            let currentPhone = $('#showPhone').text();
            let currentBday = $('#showBday').text();
            let currentAddress = $('#showAddress').text();
            deleteContact(currentName);
            openContactForm();
            $('#name').val(currentName);
            $('#email').val(currentEmail);
            $('#phone').val(currentPhone);
            $('#birthday').val(currentBday);
            $('#address').val(currentAddress);
        }

        // displays a thumbnail of the user selected photo
        /* function readURL(input) {
            if(input.files && input.files[0]) {
                let reader = new FileReader();

                reader.onload = function(e) {
                    $('#profile-img-tag').attr('src', e.target.result);
                }
                reader.readAsDataURL(input.files[0]);
            }
        } */

        // uploads the selected contact photo
        /* function uploadFile() {
            let fileData = $('#profile-img').prop('files')[0];
            let formData = new FormData();
            formData.append('file', fileData);
            formData.append('user_id', 123);
            $.ajax({
                url: "./img",
                dataType: 'image',
                cache: false,
                contentType: false,
                processData: false,
                data: formData,
                type: 'post',
                success: () => {
                    console.log('yippee');
                }
            });
        } */







    //------------------------------------- DOM Events ------------------------------  
    //hides parts of app on page load
    $('#createContact').hide(); // hides the create new contact form
    $('#showDetails').hide();

    //opens app credit
    $('#headingA').click(() => {
        hideDetailTemplate();
        closeContactForm();
        openCredit();
    });

    // opens the create new contact form
    $('#addnew').click(() => {
        closeCredit();
        openContactForm();
        hideDetailTemplate();
    });

    // close the create new contact form
    $('#createCancel').click(() => {
        closeContactForm();
        openCredit();
    });

    // checks if a contact with similar name exists
    $('#name').blur(() => {
       let checkName = $('#name').val();
       doesNameExist(checkName);
    });


    // saves newly created contact
    $('#createSave').click(() => {
        let nEx = $('#nameExists').text();
        let nname = $('#name').val();

        if (nEx) {
            //Do Nothing
        }
        else if(!nname){
            //better still do nothing
           // $('#nameExists').append('&#9940; New Contact Must Have A Name');
        } else {
        addNewContact();
        closeContactForm();
        openCredit();
        }
    });

    $("#displayContacts").on("click", ".currentContacts", function () {
        let frnd = $(this).text();
        showDetailTemplate();
        showSelectedContact(frnd);
        closeCredit();
        closeContactForm(); 
    });

    $('#deleteContact').click(() => {
        let tbd = $('#showFullname').text();
        deleteContact(tbd);
        hideDetailTemplate();
        openCredit();
        $('#displayContacts').empty();
        displayCurrentContacts();
    });

    $('#editContact').click(() => {
        hideDetailTemplate();
        editContactInfo();
    });

    $('#profile-img').change(function(){
        readURL(this);
      //let file = this.files[0];
       // console.log($('#profile-img').val());
       uploadFile();
        
    });

});