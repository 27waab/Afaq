let ageInput = document.getElementById("ageInput"),
    educationInput = document.getElementById("educationInput"),
    languageInput = document.getElementById("languageInput"),
    workExperienceInput = document.getElementById("workExperienceInput"),
    professionsInput = document.getElementById("professionsInput"),
    submitData = document.getElementById("submit");

fetch('../JSON/data.json')
    .then(response => response.json())
    .then(data => {
        let age = new Set(),
            education = new Set(),
            language = new Set(),
            workExperience = new Set(),
            professions = new Set();

        data.forEach(country => {
            Object.keys(country.factors.age).forEach(v => age.add(v));
            Object.keys(country.factors.education).forEach(v => education.add(v));
            Object.keys(country.factors.language).forEach(v => language.add(v));
            Object.keys(country.factors.work_experience).forEach(v => workExperience.add(v));
            Object.keys(country.factors.professions).forEach(p => professions.add(p));
        });
        
        submitData.addEventListener("click", () => {
            addtoResult(data);
        });
        
        createOptionInSelect(ageInput, [...age]);
        createOptionInSelect(educationInput, [...education]);
        createOptionInSelect(languageInput, [...language]);
        createOptionInSelect(workExperienceInput, [...workExperience]);
        createOptionInSelect(professionsInput, [...professions]);

    })
    .catch(error => console.error('Error loading JSON:', error));

function createOptionInSelect(selectElement, optionArray) {
    selectElement.innerHTML = '';
    optionArray.forEach(element => {
        let option = document.createElement("option");
        let optionTxt = document.createTextNode(element);
        option.value = element;
        option.appendChild(optionTxt);
        selectElement.appendChild(option);
    });
}

function addtoResult(arr) {
    let resultOfData = [];
    for (let i = 0; i < arr.length; i++) {
        let resultOfPoint = 0;
        let newObject = {};
        newObject.minimum_points = arr[i].minimum_points;
        newObject.country = arr[i].country;
        newObject.system = arr[i].system;
        newObject.flag = arr[i].flag;
        newObject.color = arr[i].color;
        resultOfPoint = countPoint(resultOfPoint, arr[i].factors.age, ageInput);
        resultOfPoint = countPoint(resultOfPoint, arr[i].factors.education, educationInput);
        resultOfPoint = countPoint(resultOfPoint, arr[i].factors.language, languageInput);
        resultOfPoint = countPoint(resultOfPoint, arr[i].factors.work_experience, workExperienceInput);
        resultOfPoint = countPoint(resultOfPoint, arr[i].factors.professions, professionsInput);
        newObject.points = resultOfPoint;
        resultOfData.push(newObject);
    }
    window.localStorage.setItem("resultOfPoint", JSON.stringify(resultOfData));
}

function countPoint(count, item, type) {
    for (var key in item) {
        if (item.hasOwnProperty(key)) {
            if (key == type.value) {
                count = count + item[key];
            }
        }
    }
    return count;
}