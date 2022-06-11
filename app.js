let schoolInput = document.getElementById('school-input'),
    countryInput = document.getElementById('country-input'),
    submitBtn = document.querySelector('button'),
    errorDiv = document.querySelector('#errorMsg')

const outputDiv = document.querySelector('#output')    


submitBtn.addEventListener('mouseup', myfunc)

function myfunc(){
    const school = schoolInput.value.toLowerCase(), country = countryInput.value.toLowerCase()

    if(!schoolInput.value || !countryInput.value){
    setErrorMsg(`Please enter both COUNTRY and COLLEGE/UNIVERSITY`)
    }else{
        fetch(`http://universities.hipolabs.com/search?country=${country}&name=${school}`)
    .then(res=> res.json()) 
    .then(data => {
        outputDiv.innerHTML = `<ul>
            <li style="text-decoration: underline;">Results:</li>
            <li>${data[0].country}</li>
            <li>${data[0].name}</li>
            <a target="_blank">Take me to the website!</a>
        </ul>`
        document.querySelector('a').setAttribute('href', `https://${checkWWW(data[0].domains[0])}`)
    })
    .catch(err=>{
        setErrorMsg(`No matches were found! Please check your information and try again.`)
    })
    }
}

function setErrorMsg(msg){
    errorDiv.innerHTML = `<h2>${msg}</h2>`
    schoolInput.disabled = true
    countryInput.disabled = true
    setTimeout(clear,3000)
}

function clear(){
    errorDiv.innerHTML = ''
    schoolInput.disabled = false
    countryInput.disabled = false
}

function checkWWW(websiteURL){
    return websiteURL.slice(0,4) === "www."? websiteURL : "www."+websiteURL
}