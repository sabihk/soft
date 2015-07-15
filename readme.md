Project Setup
-------------
1) Run "composer install" from command line to get vendor folder.

2) Run "php artisan key:generate" to set application key.

3) Provide write mode for "storage" folder.

4) Create a database & provide credentials in ".env" file. (Change .env.example to .env)

5) Run "php artisan migrate" from command line.
    This will create items table with all the fields needed for this application.

Application Architecture
------------------------
1) Items List   -> The dafault page will display item list in Ajaxified DataTable.

2) Add Item     -> New items can be added via modal which will be displayed when user clicks on "New Item" button.

3) Edit Item    -> Click on the row to edit data, a modal with the item details will be displayed to edit and save.

4) Delete Item  -> Not implemented.

Code Architecture/Design
---------------------------
1) database/migrations/2015_07_14_183929_create_items_table.php -> This file is having "items" table schema to create in database.

2) Following are the files added for this application:

    i)  resources/views/app.blade.php                -> Header and and all the css & js files are included here.
    ii) resources/views/items.blade.php             -> Default page which display items details.
    iii) resources/views/itemDetails.blade.php      -> Add / Edit view file. (This file is used as content in modal)
    iv) app/Http/Controllers/ItemController.php     -> All the logics of this applicaiton are written in this controller.
    v)  app/Models/Item.php                          -> All the business logic of this application are written in this model.
    vi) public/scripts/items.js                     -> All the jQuery codes for this application are added in this file.
    vii) public/css/items.css                       -> All the stylings for this application are added in this file.
    
3) Plugins used:
    
    i)  public/plugins/datatables    -> Datatables plugin is used to display items list.
    ii) public/plugins/select2      -> Select2 plugin is used to display items in tax dropdown.