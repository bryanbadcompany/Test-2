function SectionSelect()
{
    if (document.getElementById("dropMenu").value == "Display Category List")
    {
        document.getElementById("section1").style.visibility = "visible";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
        document.getElementById("section4").style.visibility = "hidden";
    }
    if (document.getElementById("dropMenu").value == "Change Category Description")
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "visible";
        document.getElementById("section3").style.visibility = "hidden";
        document.getElementById("section4").style.visibility = "hidden";
    }
    if (document.getElementById("dropMenu").value == "Add New Category")
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "visible";
        document.getElementById("section4").style.visibility = "hidden";
    }
    if (document.getElementById("dropMenu").value == "Delete Category")
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
        document.getElementById("section4").style.visibility = "visible";
    }
}





function GetCategories()
{
    
    document.getElementById("catResult").innerHTML = "";
    
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getAllCategories";
    
    table = document.getElementById("catResult")
    
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var output = JSON.parse(objRequest.responseText);
            GenerateCategoriesList(output);
        }
    }
    objRequest.open("GET", url, true);
    objRequest.send();
}
function GenerateCategoriesList(result)
{
     var count = 0;
    
     
    for(count = 0; count < result.GetAllCategoriesResult.length; count++)
    {
        
        var row = table.insertRow(count);
        
        var cell_id = row.insertCell(0);
        var cell_name = row.insertCell(1);
        var cell_description = row.insertCell(2);
        
        cell_id.innerHTML =  result.GetAllCategoriesResult[count].CID
        cell_name.innerHTML = result.GetAllCategoriesResult[count].CName;
        cell_description.innerHTML = result.GetAllCategoriesResult[count].CDescription;
        
    }
    
    var header = table.createTHead();
     var header_row = header.insertRow(0);
     var header_cell_name = header_row.insertCell(0);
     var header_cell_id = header_row.insertCell(1);
     var header_cell_Description = header_row.insertCell(2);
     
     
     header_cell_name.innerHTML = "Category ID";
     header_cell_id.innerHTML = "Category Name";
     header_cell_city.innerHTML = "Category Description";
     
}



function DescriptionUpdate()
{
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/updateCatDescription"
    
    var cat_ID = document.getElementById("catIDInput").value;
    var cat_desc = document.getElementById("catDescInput").value;
    
    var description_update = '{"CID": "'+cat_ID+'", "CDescription": "'+cat_desc+'"}';
    
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var result = JSON.parse(objRequest.responseText);
            CategoryCheck(result);
        }
    }
    
    //AJAX request
    
    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(description_update);
}

function CategoryCheck(output)
{
    if (output.WasSuccessful == 1)
    {
        document.getElementById("addSuccess").innerHTML = "successful input";
    }
    
    if (output.WasSuccessful == 0)
    {
        document.getElementById("addSuccess").innerHTML = "Operation failed with an unspecified error";
    }
    if (output.WasSuccessful == -2)
    {
        document.getElementById("addSuccess").innerHTML = "Operation failed because the data string supplied could not be deserializedinto the service object";
    }
    if (output.WasSuccessful == -3)
    {
        document.getElementById("addSuccess").innerHTML = "Operation failed because a record with the supplied Order ID could not be found";
    }
}







function AddCategory()
{
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/CreateCategory"
    
    var cat_name = document.getElementById("newCatNameInput").value;
    var cat_description = document.getElementById("newCatDescInput").value;
    
    var new_category = '{"CName": "'+cat_name+'", "CDescription": "'+cat_description+'"}';
    
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var result = JSON.parse(objRequest.responseText);
            CategoryAddCheck(result);
        }
    }
    
    //AJAX request
    
    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(new_category);
}

function CategoryAddCheck(output)
{
    if (output.WasSuccessful == 1)
    {
        document.getElementById("newCatSuccess").innerHTML = "successful input";
    }
    
    if (output.WasSuccessful == 0)
    {
        document.getElementById("newCatSuccess").innerHTML = "Operation failed" + "<br>" + output.Exception;
    }
    
}



function ConfirmInput()
{
    window.confirm("Are you sure you would like to delete this category?");
    
    if (confirm("Are you sure you would like to delete this category?"))
    {
        DeleteCategory();
    }
    
}


function DeleteCategory()
{
       
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/deleteCategory/";
    
    deleteCategoryID = document.getElementById("deleteCategoryID").value;
    
    url+= deleteCategoryID;
    
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var output = JSON.parse(objRequest.responseText);
            CheckDeletion(output);
        }
    }
    objRequest.open("GET", url, true);
    objRequest.send();
    
}

function CheckDeletion(output)
{
    output = output.DeleteCategoryResult.WasSuccessful;
    
    if (output == 1)
    {
        document.getElementById("deletionResult").innerHTML = "Category Deleted";
    }
    else
    {
        document.getElementById("deletionResult").innerHTML = "output unsuccessful" + "<br>" + output.Exception;
    }
}









