// HDH Pharmacy Inventory Pro v1

let medicines = JSON.parse(localStorage.getItem("medicines")) || [];

const medicineName = document.getElementById("medicineName");
const companyName = document.getElementById("companyName");
const sellingPrice = document.getElementById("sellingPrice");
const boxStock = document.getElementById("boxStock");
const stripSize = document.getElementById("stripSize");
const customStrip = document.getElementById("customStrip");
const addMedicine = document.getElementById("addMedicine");
const medicineTable = document.getElementById("medicineTable");
const searchMedicine = document.getElementById("searchMedicine");

function saveData(){
    localStorage.setItem("medicines", JSON.stringify(medicines));
}

function getStripValue(){
    if(stripSize.value === "custom"){
        return customStrip.value || 0;
    }
    return stripSize.value;
}

function renderTable(list = medicines){

    medicineTable.innerHTML = "";

    list.forEach((item,index)=>{

        medicineTable.innerHTML += `
        <tr>
            <td>${item.name}</td>
            <td>${item.company}</td>
            <td>${item.price} ৳</td>
            <td>${item.stock} Box</td>
        </tr>
        `;

    });

}

addMedicine.onclick = ()=>{

    if(
        medicineName.value=="" ||
        companyName.value==""
    ){
        alert("Fill all required fields");
        return;
    }

    medicines.push({

        name:medicineName.value,
        company:companyName.value,
        price:Number(sellingPrice.value),
        stock:Number(boxStock.value),
        strip:getStripValue()

    });

    saveData();

    renderTable();

    medicineName.value="";
    companyName.value="";
    sellingPrice.value="";
    boxStock.value="";
    customStrip.value="";

};

searchMedicine.onkeyup = ()=>{

    let keyword = searchMedicine.value.toLowerCase();

    let result = medicines.filter(item=>

        item.name.toLowerCase().includes(keyword) ||

        item.company.toLowerCase().includes(keyword)

    );

    renderTable(result);

}

renderTable();
