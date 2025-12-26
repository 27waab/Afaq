let content = document.querySelector(".container");

let data = JSON.parse(window.localStorage.getItem("resultOfPoint"));

function fallDataInHTML(array) {
    array.forEach(item => {
        let box = document.createElement("div");
        box.className = "box";
        box.innerHTML = `
            <div class="country">
                <p><span class="${item.flag}"></span> ${item.country}</p>
            </div>
            <div class="pointInfo">
                <p>نقاطك:</p>
                <p>${item.minimum_points}</p>
                <p>/</p>
                <p class="yourPoint">${item.points}</p>
            </div>
            <div class="info">
                <p>نوع النظام: ${item.system}</p>
            </div>
        `;
        let pointEl = box.querySelector(".yourPoint");
        if (item.points < item.minimum_points) {
            pointEl.style.backgroundColor = "#ffaaaa";
            pointEl.style.color = "#ff2525";
        } else {
            pointEl.style.backgroundColor = "#b1efb4";
            pointEl.style.color = "#4caf50";
        }
        content.appendChild(box);
    });
}

fallDataInHTML(data);
