var SiteNameInput=document.getElementById("SiteName");
var WebsiteUrlInput=document.getElementById("WebsiteUrl");
var SubmitBtn=document.getElementById("SubmitBtn");
var OneSite;
var Swal;


var VisitBtn=document.getElementById("VisitBtn");
var DeleteBtn=document.getElementById("DeleteBtn");

var URLS=[];

SubmitBtn.addEventListener("click" , function(){
  AddSite();
})

if(localStorage.getItem("sites")!=null)
{
  URLS=JSON.parse(localStorage.getItem("sites"));
  DisplayBookmarks();
}

function AddSite()
{
  if(ValidationSiteName()==true && ValidationUrl()==true)
  {
    OneSite=
    {
      SiteNameInput:document.getElementById("SiteName").value,
      WebsiteUrlInput:document.getElementById("WebsiteUrl").value
    }
    URLS.push(OneSite);
    localStorage.setItem("sites" , JSON.stringify(URLS))
    DisplayBookmarks();
    ClearInputs();
  }
 else
 {
  Swal.fire({
    title: `<div class=" d-flex container">
  <i class=" fs-4 me-2 fa-solid fa-circle text-danger"></i>
  <i class=" fs-4 fa-solid fa-circle text-warning"></i>
  <i class=" fs-4 ms-2 fa-solid fa-circle text-success"></i>
</div>`,
    text: "Site Name or Url is not valid, Please follow the rules below :",
    footer: `<div class="text-start">
      <p class="fs-5"><i class="fa-regular fa-circle-right text-danger me-1"></i> Site name must contain at least 3 characters</p>
      <p class="fs-5"><i class="fa-regular fa-circle-right text-danger me-1"></i> Site URL must be a valid one</p>
    </div>`
  });
 }
   
}

function DisplayBookmarks()
{
  var content="";
  for (var i =0;i<URLS.length;i++)
  {
    content+=
    `
     <tr>
        <th class="align-content-center justify-content-center"><div>${i+1}</div></th>
        <th class="align-content-center justify-content-center"><div>${URLS[i].SiteNameInput}</div></th>
        <th><a href="https://www.${URLS[i].WebsiteUrlInput}/" target="_blank"><button onclick="VisitWebsite(${i})" id="VisitBtn" class="btn btn-1 "><i class="fa-regular fa-eye text-white"></i>Visit</button></a></th>
        <th><button onclick="DeleteWebsite(${i})" id="DeleteBtn" class="btn btn-2 "><i class="fa-solid fa-trash-can text-white"></i>Delete</button></th>
      </tr>
    `
  }
document.getElementById("TableContent").innerHTML=content;
}

function ClearInputs()
{
  OneSite=
    {
      SiteNameInput:document.getElementById("SiteName").value=null,
      WebsiteUrlInput:document.getElementById("WebsiteUrl").value=null
    }
    document.getElementById("SiteName").classList.remove("is-valid")
    document.getElementById("WebsiteUrl").classList.remove("is-valid")

}

function DeleteWebsite(index)
{
  URLS.splice(index,1);
  localStorage.setItem("sites" , JSON.stringify(URLS));
  DisplayBookmarks();
}

function ValidationSiteName()
{
  var Nametext=document.getElementById("SiteName").value;

  var regex = /^[a-z0-9_-]{3,15}$/;
  if (    regex.test(Nametext.toLowerCase()) )
  {
    document.getElementById("SiteName").classList.add("is-valid")
    document.getElementById("SiteName").classList.remove("is-invalid")
    return true;
  }
  else
  {
    document.getElementById("SiteName").classList.remove("is-valid")
    document.getElementById("SiteName").classList.add("is-invalid")
    return false;
  }
}
function ValidationUrl()
{
  var Urltext=document.getElementById("WebsiteUrl").value;
  var regex = /^[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{2,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;

  if(regex.test(Urltext))
  {
    document.getElementById("WebsiteUrl").classList.add("is-valid")
    document.getElementById("WebsiteUrl").classList.remove("is-invalid")
    return true;
  }
  else
  {
    document.getElementById("WebsiteUrl").classList.remove("is-valid")
    document.getElementById("WebsiteUrl").classList.add("is-invalid")
    return false;
  }
}





