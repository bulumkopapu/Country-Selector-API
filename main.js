// Please see this link for the API that was used for this script: https://www.universal-tutorial.com/rest-apis/free-rest-api-for-country-state-city

//Attaching select elements to variables
let countryDropdown = document.getElementById('country');
let provinceDropdown = document.getElementById('province');


let defaultOptionCountry = document.createElement('option');
defaultOptionCountry.text = 'Choose Country';
countryDropdown.add(defaultOptionCountry);

let defaultOptionProvince = document.createElement('option');
defaultOptionProvince.text = 'Choose Province';
provinceDropdown.add(defaultOptionProvince);

//This async function fetches the Authorization Token
async function fetchAuthToken(){
    const url = "https://www.universal-tutorial.com/api/getaccesstoken";
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            "api-token": "Zc827tqSBa-hOi8owTz79XopHE_7GccXFEhBmrlupNR3_BbsBEy0N5KzvKrM2-VcJpQ",
            "user-email": "bulumkopapu@gmail.com"
        }
      });
    const data = await response.json();
    return data.auth_token;
}

//This async function fetches the country data and needs an auth token. Also creates options based on the data recieved
async function fetchCountry(tokenItem){
    const token = "Bearer " + tokenItem;
    const tokenObject = {};
    tokenObject.Authorization = token;
    const url = "https://www.universal-tutorial.com/api/countries/";
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            ...tokenObject,
            "Accept": "application/json"
        }
    });
    const countryData = await response.json();
    for (let i = 0; i < countryData.length; i++) {
        option = document.createElement('option');
        option.text = countryData[i].country_name;
        option.value = countryData[i].country_short_name;
        countryDropdown.add(option);
    }
}

//This async function fetches the Province/State data and needs an auth token. Also creates options based on the data recieved
async function fetchProvince(tokenItem, country){
    const token = "Bearer " + tokenItem;
    const tokenObject = {};
    tokenObject.Authorization = token;
    const url = "https://www.universal-tutorial.com/api/states/"+ country;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            ...tokenObject,
            "Accept": "application/json"
        }
    });
    const provinceData = await response.json();
    console.log(provinceData);
    for (let i = 0; i < provinceData.length; i++) {
        option = document.createElement('option');
        option.text = provinceData[i].state_name;
        option.value = provinceData[i].state_name;
        provinceDropdown.add(option);
    }
}  

//This calls the fetch auth token async function then passes the auth token to the calling of fetch country
fetchAuthToken().then(token => {
    fetchCountry(token);
})


//This waits for the country select box to change then it fetches the auth token then fetches the appropriate provinces
countryDropdown.addEventListener('change', function(){
    fetchAuthToken().then(token => {
        const selectedCountry = countryDropdown[countryDropdown.selectedIndex].text;
        fetchProvince(token, selectedCountry);
        provinceDropdown.options.length = 0;
        provinceDropdown.add(defaultOptionProvince);
    })
});


