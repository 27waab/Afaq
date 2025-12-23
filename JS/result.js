let content = document.querySelector(".container");

let data = JSON.parse(window.localStorage.getItem("resultOfPoint"));

function fallDataInHTML(array) {
    array.forEach(item => {
        let box = document.createElement("div");
        box.className = "box";
        box.innerHTML = `
            <div class="header">
                <span>${item.country}</span>
                <span class="${item.flag}"></span>
            </div>
            <div class="point">
                <h3>${item.points}</h3>
            </div>
            <div class="info">
                <p>نظام الهجرة: ${item.system}</p>
                <p>الحد الأدنى للنقاط: ${item.minimum_points}</p>
            </div>
            `;
        
        let pointEl = box.querySelector("h3");

        if (item.points < item.minimum_points) {
            pointEl.style.color = "#ff2525";
        } else {
            pointEl.style.color = "#4caf50";
        }

        
        content.appendChild(box);
    });
}

fallDataInHTML(data);