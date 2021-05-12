let url = "https://api.nasa.gov/EPIC/api/natural/images?api_key=BeO4hV6zUslD93eC5bWyUYcGvLG0QaFGGoido9UC";

var fotos = [];

fetch(url)
    .then(response => response.json())
    .then(data => {
        let fecha2 = data[0].date;
        fecha2 = fecha2.substring(0, 10);
        fecha2 = fecha2.replace("-", "/");
        fecha2 = fecha2.replace("-", "/");

        document.querySelector(".titulo").innerText = `Imagenes del día ${fecha2}`;

        var listo = false;
        for (var i in data) {
            document.querySelector(".contenedorImg").innerHTML +=
                `<img class="img${i}" style="display:none" src="https://epic.gsfc.nasa.gov/archive/natural/${fecha2}/jpg/${data[i].image}.jpg">`;
            if(i == data.length - 1){
                listo = true;
            }
        }

        const spinner = document.querySelector(".spinner");

        if(listo){
            spinner.style.display = "none";
            spinner.style.animation = "none";
        }

        let n = 0;
        setInterval(() => {
            if (n === 0) {
                document.querySelector(`.img${data.length - 2}`).style.display = "none";
            } else {
                document.querySelector(`.img${n - 1}`).style.display = "none";
            }
            document.querySelector(`.img${n}`).style.display = "block";
            n++;
            if (n == data.length - 1) {
                n = 0;
            }
        }, 1000);

        document.querySelector(".parrafo").innerText = `${data[0].caption}`;

    }).catch(err => {
        console.log(err)
    })
