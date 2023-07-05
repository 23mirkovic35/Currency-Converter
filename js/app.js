const apiKey = `5d7461fc361c77d98da74027`
const dropList = document.querySelectorAll(".drop-list select")
const from = document.querySelector(".from select")
const to = document.querySelector(".to select")
const btnConvert = document.querySelector("button")

for (let index = 0; index < dropList.length; index++) {
    for (country_code in country_list) {
        let selected
        if(index == 0){
            if(country_code == "RSD"){
                selected = "selected";
            }
            else selected = " ";
        }
        else {
            if(country_code == "USD"){
                selected = "selected";
            }
            else selected = " ";
        }
        let opt = `<option value="${country_code}" ${selected}>${country_code}</option>`;
        dropList[index].insertAdjacentHTML("beforeend", opt);
    }
    dropList[index].addEventListener("change", e=>{
        const resultParagraph = document.getElementById("result")
        resultParagraph.classList.remove("show");
        loadFlag(e.target);
    })
}

function loadFlag(element){
    for (code in country_list){
        if(code == element.value){
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src = `https://flagcdn.com/48x36/${country_list[code].toLowerCase()}.png`;
        }
    }
}

btnConvert.addEventListener("click", e=>{
    const amount = document.querySelector("input")
    const amountClass = document.querySelector(".amount")
    const icon = document.querySelector(".amount i")
    amountClass.classList.remove("error")
    icon.classList.remove("show")
    if(amount.value == 0 || amount.value==undefined){
        amountClass.classList.add("error")
        icon.classList.add("show")
    }
    else {
        const resultParagraph = document.getElementById("result")
        resultParagraph.innerHTML = `Getting exchange rate...`
        resultParagraph.classList.remove("show");
        resultParagraph.classList.add("show");
        calculate()
    }
})

function calculate(){
    const amount = document.querySelector("input")
    let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${from.value}`
    fetch(url).then(response=>response.json().then(result=>{
        let extRate = result.conversion_rates[to.value];
        let finalResult = (extRate * amount.value).toFixed(2)
        const resultDiv = document.getElementById("result")
        setTimeout(()=>{
            resultDiv.classList.add("remove");
        },2000)
        setTimeout(()=>{
            resultDiv.innerHTML = `${amount.value} ${from.value} = ${finalResult} ${to.value}`
            resultDiv.classList.remove("remove");
            resultDiv.classList.remove("show");
            resultDiv.classList.add("show");
            
        },2500)
    }))
}