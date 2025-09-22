const inputs=Array.from(document.querySelectorAll(".form-control"));
const BookmarkForm= document.querySelector(".BookmarkForm"); 
let sites= JSON.parse(localStorage.getItem("sites"))|| [];
const removeAllBtn=document.querySelector(".removeAll");
const searchInput=document.querySelector(".search-input");
const textDanger=Array.from(document.querySelectorAll(".text-danger"));
const addBtn=document.querySelector(".add");
let action='add'; // mood for add or update 
let item; // variant for updated date index


/* validation */
const validateSiteName=()=>{
    const regex =/^[A-Z][a-zA-Z]{2,}$/;
    if(!regex.test(inputs[0].value)){
        inputs[0].classList.remove('is-valid');
        inputs[0].classList.add('is-invalid');
        textDanger[0].textContent="Invalid site name. Name must start with a capital letter.";
        return false;
    }else{
        inputs[0].classList.remove('is-invalid');
        inputs[0].classList.add('is-valid');
        textDanger[0].textContent="";
        return true;
    }
}
inputs[0].addEventListener("blur",validateSiteName);

const validatSiteURL=()=>{
    const regex= /^(https?|ftp):\/\/[^\s\/$.?#].[^\s]*$/;
    if(!regex.test(inputs[1].value)){
        inputs[1].classList.remove('is-valid');
        inputs[1].classList.add('is-invalid');
        textDanger[1].textContent="Invalid site url. eg. https://facebook.com";
        return false;
    }else{
        inputs[1].classList.remove('is-invalid');
        inputs[1].classList.add('is-valid');
        textDanger[1].textContent="";
        return true;
    }
}
inputs[1].addEventListener("blur",validatSiteURL);

const validatSiteEmail=()=>{
    const regex= /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!regex.test(inputs[2].value)){
        inputs[2].classList.remove('is-valid');
        inputs[2].classList.add('is-invalid');
        textDanger[2].textContent="Invalid Email. eg. admin@gmail.com";
        return false;
    }else{
        inputs[2].classList.remove('is-invalid');
        inputs[2].classList.add('is-valid');
        textDanger[2].textContent="";
        return true;
    }
}
inputs[2].addEventListener("blur",validatSiteEmail);

const validatSitePass=()=>{
    const regex= /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if(!regex.test(inputs[3].value)){
        inputs[3].classList.remove('is-valid');
        inputs[3].classList.add('is-invalid');
        textDanger[3].textContent="Invalid Password. password must have at least: 8 char, 1 number, one symbol";
        return false;
    }else{
        inputs[3].classList.remove('is-invalid');
        inputs[3].classList.add('is-valid');
        textDanger[3].textContent="";
        return true;
    }
}
inputs[3].addEventListener("blur",validatSitePass);

/* validation End */


BookmarkForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    let isValid=true;

    if(!validateSiteName() || !validatSiteURL() || !validatSiteEmail() || !validatSitePass()){
        isValid=false;
    }
    if(isValid==false) return;

    const site = {
        siteName:inputs[0].value,
        siteURL:inputs[1].value,
        userEmail:inputs[2].value,
        userPass:inputs[3].value,
    }

    if(action==='add'){
        sites.push(site);
    }else if(action==='update'){
        sites[item] = site; //  data update
        action = 'add'; // back to add mood  
        addBtn.innerHTML = 'Add';
    }
    localStorage.setItem("sites", JSON.stringify(sites));
    BookmarkForm.reset();
    displaySites();
} );

const displaySites =() =>{

    const result = sites.map ((site,index)=>{
        return `<tr>
        <td>${index}</td>
        <td>${site.siteName}</td>
        <td>${site.siteURL}</td>
        <td>${site.userEmail}</td>
        <td>${site.userPass}</td>
        <td><button class='btn btn-outline-danger' onclick='removeBookmark(${index})'>Remove</button></td>
        <td><button class='btn btn-outline-dark' onclick='updateBookmark(${index})'>Update</button></td>
        </tr>`

    }).join('');
    document.querySelector(".sites-data").innerHTML=result;
    
}
const removeBookmark=(index)=>{
    alert("Are you sure?");
    sites.splice(index,1);
    localStorage.setItem("sites", JSON.stringify(sites));
    displaySites();
}
displaySites();

removeAllBtn.addEventListener("click", ()=>{
    alert("Are you sure you want to remove all site?");
    localStorage.removeItem("sites");
    sites=[];
    displaySites();
})

searchInput.addEventListener("input", ()=>{
    const filterText= searchInput.value.toLowerCase();
    const filteredSites= sites.filter((site)=>{
        return site.siteName.toLowerCase().includes(filterText);
    });

     const result = filteredSites.map ((site,index)=>{
        return `<tr>
        <td>${index}</td>
        <td>${site.siteName}</td>
        <td>${site.siteURL}</td>
        <td>${site.userEmail}</td>
        <td>${site.userPass}</td>
        <td><button class='btn btn-outline-danger' onclick='removeBookmark(${index})'>Remove</button></td>
        <td><button class='btn btn-outline-dark' onclick='updateBookmark(${index})'>Update</button></td>

        </tr>`

    }).join('');
    document.querySelector(".sites-data").innerHTML=result;
})


const updateBookmark=(index)=>{
    inputs[0].value= sites[index].siteName;
    inputs[1].value= sites[index].siteURL;
    inputs[2].value= sites[index].userEmail;
    inputs[3].value= sites[index].userPass;
    addBtn.innerHTML='Update';
    action='update';
    item=index;
}

