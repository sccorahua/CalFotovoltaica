//modal
let btnAbrirModal = document.getElementById("btn-abrir-modal");
let btnCerrarModal = document.getElementById("btn-cerrar-modal");
let modal = document.getElementById("modal-ven-cal-sol");
let modalQuestion1 = document.getElementById("modal-ven-cal-sol-1")
let modalQuestion2 = document.getElementById("modal-ven-cal-sol-2");
let modalQuestion3 = document.getElementById("modal-ven-cal-sol-3");
let modalQuestion4Dom = document.getElementById("modal-ven-cal-sol-4-dom");
let modalQuestion4Ind = document.getElementById("modal-ven-cal-sol-4-ind")
let modalQuestion5Dom = document.getElementById("modal-ven-cal-sol-5-dom");

let modalQuestion3_opt1 = document.getElementById("btn-modal-ven-cal-sol-qtn-3-opt-1")
let modalQuestion3_opt2 = document.getElementById("btn-modal-ven-cal-sol-qtn-3-opt-2")

let inputDpt = document.getElementById("inputDpto");
let inputCiu = document.getElementById("inputCdad");

//inputs pretunta 4
	//tipo industria(clinica, supermercado,...)
let inputTipInd = 0;
	//energia activa
	//inputIndEnerUltRec,inputIndEnerPenUltRec
let inputEneAct1 = 0;
let inputEneAct2 = 0;
let promEneActMen = 0; //promedio mensual
let promEneActDia = 0; //promedio diario = mensual /30*1000
let promBaseInd = 0; // = promedio diario/13.5
let areaTotDisInd = 0; //area total disponible(inputAreaDisInd)

let potFinal = 0; //promedio potencia final industria
//arreglo para potencia por horas por dia de industrias
let potFinWeekTip1 = [];
let potFinSatuTip1 = [];
let potFinSundTip1 = [];
let potFinTip2 = [];


//inputs pregunta 4 domicilios
let switchQtn4_1 = document.getElementById("switchQtn4-1");
let switchQtn4_2 = document.getElementById("switchQtn4-2");
let switchQtn4_3 = document.getElementById("switchQtn4-3");
let switchQtn4_4 = document.getElementById("switchQtn4-4");

//variables pregunta 4 domicilios
let CiuHSP = 0;
let iniAreaViv = 90;
let iniAreaSig = 90;
let iniPotIns = 2500;
let iniPotSig = 1000;
let totPotIns = 0;

let totalCargaClf = 0; //carga calefaccion enviada a calcular
let cargaClf = 2500; //carga calefaccion
let FDcargaClf = 1; //factor demanda carga calefaccion

let totalCocinaEle = 0; //cocina electrica enviada a calcular
let cocinaEle = 6000; //cocina electrica
let FDcocinaEle = 1; //factor demanda cocina electrica

let totalCalentAgua = 0; //calentador de agua enviada a calcular
let calentAgua = 3000; //calentador de agua 
let FDcalentAgua = 0.25; // factor demanda calentador de agua

let totalCargaSup = 0; //carga superior a 1500 enviada a calcular
let cargaSup = 2000; //carga sueprior a 1500
let FDcargaSup = 1; // factor demanda carga superiorl

let potBase = 0; //potencia base
let facSim = 0.75; //factor de simultaneidad para potencia base

//variables generales
let arePanSolar = 2; //area panel solar
let potPanSolar = 470; //potencia de panel solar en watts
let powRatio = 0.79; //power ratio
let canPanSol = 0; //cantidad paneles solares 
let canPotSis = 0; //potencia de sistema final
let promConsumo = 0; //promedio consumo (industria,domicilio)
let canPotReaSis = 0; //potencia real de sistema
let genDiaSis = 0; //generacion diaria de sistema
let genAnuSis = 0; //generacion anual de sistema
let promPotAnu = 0; //promedio potencia anual industrias
let porAhorro = 0; //porcentaje ahorro indutrias
let rptaDom = document.getElementById("modal-ven-cal-sol-5-dom-rpta-1"); //almacena resultado calculadora
let graRptCal = document.getElementById("grafica-res-cal"); //contiene grafica chart.js


const listDpt = [{
	'id': 1,
	'departamento': 'LIMA'
},
{
	'id': 2,
	'departamento': 'CALLAO'
},
{
	'id': 3,
	'departamento': 'PIURA'
},
{
	'id': 4,
	'departamento': 'TUMBES'
},
{
	'id': 5,
	'departamento': 'LAMBAYEQUE'
},
{
	'id': 6,
	'departamento': 'LA LIBERTAD'
},
{
	'id': 7,
	'departamento': 'ANCASH'
},
{
	'id': 8,
	'departamento': 'ICA'
},
{
	'id': 9,
	'departamento': 'AREQUIPA'
},
{
	'id': 10,
	'departamento': 'MOQUEGUA'
},
{
	'id': 11,
	'departamento': 'TACNA'
},
{
	'id': 12,
	'departamento': 'PUNO'
},
{
	'id': 13,
	'departamento': 'CUZCO'
},
{
	'id': 14,
	'departamento': 'APURIMAC'
},
{
	'id': 15,
	'departamento': 'AYACUCHO'
},
{
	'id': 16,
	'departamento': 'HUANCAVELICA'
},
{
	'id': 17,
	'departamento': 'JUNIN'
},
{
	'id': 18,
	'departamento': 'PASCO'
},
{
	'id': 19,
	'departamento': 'HUANUCO'
},
{
	'id': 20,
	'departamento': 'SAN MARTIN'
},
{
	'id': 21,
	'departamento': 'CAJAMARCA'
},
{
	'id': 22,
	'departamento': 'AMAZONAS'
},
{
	'id': 23,
	'departamento': 'LORETO'
},
{
	'id': 24,
	'departamento': 'UCAYALI'
},
{
	'id': 25,
	'departamento': 'MADRE DE DIOS'
}]

const listCiu = [{
	'id': 1,
	'departamento': 'LIMA',
	'ciudad': 'LIMA ESTE',
	'HSP': 5.21
},
{
	'id': 2,
	'departamento': 'LIMA',
	'ciudad': 'LIMA SUR',
	'HSP': 4.70
},
{
	'id': 3,
	'departamento': 'LIMA',
	'ciudad': 'LIMA NORTE',
	'HSP': 3.96
},
{
	'id': 4,
	'departamento': 'CALLAO',
	'ciudad': 'CALLAO',
	'HSP': 4.31
},
{
	'id': 5,
	'departamento': 'PIURA',
	'ciudad': 'PIURA',
	'HSP': 5.09
},
{
	'id': 6,
	'departamento': 'PIURA',
	'ciudad': 'SULLANA',
	'HSP': 5.04
},
{
	'id': 7,
	'departamento': 'PIURA',
	'ciudad': 'PAITA',
	'HSP': 5.319
},
{
	'id': 8,
	'departamento': 'TUMBES',
	'ciudad': 'TUMBES',
	'HSP': 4.48
},
{
	'id': 9,
	'departamento': 'TUMBES',
	'ciudad': 'ZARUMILLA',
	'HSP': 4.38
},
{
	'id': 10,
	'departamento': 'LAMBAYEQUE',
	'ciudad': 'CHICLAYO',
	'HSP': 4.84
},
{
	'id': 11,
	'departamento': 'LAMBAYEQUE',
	'ciudad': 'OLMOS',
	'HSP': 4.49
},
{
	'id': 12,
	'departamento': 'LA LIBERTAD',
	'ciudad': 'TRUJILLO',
	'HSP': 4.88
},
{
	'id': 13,
	'departamento': 'LA LIBERTAD',
	'ciudad': 'PACASMAYO',
	'HSP': 4.88
},
{
	'id': 14,
	'departamento': 'ANCASH',
	'ciudad': 'CHIMBOTE',
	'HSP': 5.12
},
{
	'id': 15,
	'departamento': 'ANCASH',
	'ciudad': 'HUARAZ',
	'HSP': 5.27
},
{
	'id': 16,
	'departamento': 'ICA',
	'ciudad': 'PISCO',
	'HSP': 5.00
},
{
	'id': 17,
	'departamento': 'ICA',
	'ciudad': 'NAZCA',
	'HSP': 5.52
},
{
	'id': 18,
	'departamento': 'AREQUIPA',
	'ciudad': 'CARHUACHO',
	'HSP': 5.45
},
{
	'id': 19,
	'departamento': 'AREQUIPA',
	'ciudad': 'AREQUIPA',
	'HSP': 7.00
},
{
	'id': 20,
	'departamento': 'MOQUEGUA',
	'ciudad': 'MOQUEGUA',
	'HSP': 5.17
},
{
	'id': 21,
	'departamento': 'MOQUEGUA',
	'ciudad': 'ILO',
	'HSP': 8
},
{
	'id': 22,
	'departamento': 'TACNA',
	'ciudad': 'TACNA',
	'HSP': 4.68
},
{
	'id': 23,
	'departamento': 'TACNA',
	'ciudad': 'TARATA',
	'HSP': 5.17
},
{
	'id': 24,
	'departamento': 'PUNO',
	'ciudad': 'JULIACA',
	'HSP': 5.43
},
{
	'id': 25,
	'departamento': 'PUNO',
	'ciudad': 'CHUCUITO',
	'HSP': 5.48
},
{
	'id': 26,
	'departamento': 'CUZCO',
	'ciudad': 'CUZCO',
	'HSP': 4.81
},
{
	'id': 27,
	'departamento': 'CUZCO',
	'ciudad': 'EL DESCANSO',
	'HSP': 5.33
},
{
	'id': 28,
	'departamento': 'APURIMAC',
	'ciudad': 'ABANCAY',
	'HSP': 4.67
},
{
	'id': 29,
	'departamento': 'APURIMAC',
	'ciudad': 'ANDAHUAYLAS',
	'HSP': 5.09
},
{
	'id': 30,
	'departamento': 'AYACUCHO',
	'ciudad': 'MARCABAMBA',
	'HSP': 5.45
},
{
	'id': 31,
	'departamento': 'AYACUCHO',
	'ciudad': 'AYACUCHO',
	'HSP': 5.35
},
{
	'id': 32,
	'departamento': 'HUANCAVELICA',
	'ciudad': 'CASTROVIRREYNA',
	'HSP': 5.46
},
{
	'id': 33,
	'departamento': 'HUANCAVELICA',
	'ciudad': 'HUANCAVELICA',
	'HSP': 4.80
},
{
	'id': 34,
	'departamento': 'JUNIN',
	'ciudad': 'HUANCAYO',
	'HSP': 5.26
},
{
	'id': 35,
	'departamento': 'JUNIN',
	'ciudad': 'TARMA',
	'HSP': 4.73
},
{
	'id': 36,
	'departamento': 'PASCO',
	'ciudad': 'CERRO DE PASCO',
	'HSP': '4.92'
},
{
	'id': 37,
	'departamento': 'PASCO',
	'ciudad': 'OXAPAMPA',
	'HSP': 4.28
},
{
	'id': 38,
	'departamento': 'HUANUCO',
	'ciudad': 'HUANUCO',
	'HSP': 4.59
},
{
	'id': 39,
	'departamento': 'HUANUCO',
	'ciudad': 'TINGO MARIA',
	'HSP': 3.93
},
{
	'id': 40,
	'departamento': 'SAN MARTIN',
	'ciudad': 'TOCACHE',
	'HSP': 4.12
},
{
	'id': 41,
	'departamento': 'SAN MARTIN',
	'ciudad': 'MOYOBAMBA',
	'HSP': 4.09
},
{
	'id': 42,
	'departamento': 'CAJAMARCA',
	'ciudad': 'CAJAMARCA',
	'HSP': 4.74
},
{
	'id': 43,
	'departamento': 'CAJAMARCA',
	'ciudad': 'JAEN',
	'HSP': 4.03
},
{
	'id': 44,
	'departamento': 'AMAZONAS',
	'ciudad': 'CHACHAPOYAS',
	'HSP': 4.09
},
{
	'id': 45,
	'departamento': 'AMAZONAS',
	'ciudad': 'BAGUA',
	'HSP': 3.96
},
{
	'id': 46,
	'departamento': 'LORETO',
	'ciudad': 'IQUITOS',
	'HSP': 4.10
},
{
	'id': 47,
	'departamento': 'UCAYALI',
	'ciudad': 'PUCALLPA',
	'HSP': 4.17
},
{
	'id': 48,
	'departamento': 'MADRE DE DIOS',
	'ciudad': 'PUERTO MALDONADO',
	'HSP': 4.14
}
]

//options distritos
let inputCiuDef = document.getElementById("inputCiuDef");
let inputCiuLim = document.getElementById("inputCiuLim");
let inputCiuCal = document.getElementById("inputCiuCal");
let inputCiuPiu = document.getElementById("inputCiuPiu");
let inputCiuTum = document.getElementById("inputCiuTum");
let inputCiuLam = document.getElementById("inputCiuLam");
let inputCiuLaL = document.getElementById("inputCiuLaL");
let inputCiuAnc = document.getElementById("inputCiuAnc");
let inputCiuIca = document.getElementById("inputCiuIca");
let inputCiuAre = document.getElementById("inputCiuAre");
let inputCiuMoq = document.getElementById("inputCiuMoq");
let inputCiuTac = document.getElementById("inputCiuTac");
let inputCiuPun = document.getElementById("inputCiuPun");
let inputCiuCuz = document.getElementById("inputCiuCuz");
let inputCiuApu = document.getElementById("inputCiuApu");
let inputCiuAya = document.getElementById("inputCiuAya");
let inputCiuHyo = document.getElementById("inputCiuHyo");
let inputCiuJun = document.getElementById("inputCiuJun");
let inputCiuPas = document.getElementById("inputCiuPas");
let inputCiuHco = document.getElementById("inputCiuHco");
let inputCiuSan = document.getElementById("inputCiuSan");
let inputCiuCaj = document.getElementById("inputCiuCaj");
let inputCiuAma = document.getElementById("inputCiuAma");
let inputCiuMad = document.getElementById("inputCiuMad");
let inputCiuLor = document.getElementById("inputCiuLor");
let inputCiuUca = document.getElementById("inputCiuUca");

//abrir modal
btnAbrirModal.onclick = function () {
	modal.showModal();
}
/*
//cerrar modal. tambien escucha esc dialog
btnPaso1.onclick = function () {
	modal.close();	
	ModalQuestion2.showModal();

}
*/
//localidad pregunta2
//listCiu.map(item => `<option value="${item['id']}">${item['ciudad']}</option>`);

inputDpt.onchange = function () {
	console.log(inputDpt.value);

	inputCiuDef.style.display = "none";
	inputCiuLim.style.display = "none";
	inputCiuCal.style.display = "none";
	inputCiuPiu.style.display = "none";
	inputCiuTum.style.display = "none";
	inputCiuLam.style.display = "none";
	inputCiuLaL.style.display = "none";
	inputCiuAnc.style.display = "none";
	inputCiuIca.style.display = "none";
	inputCiuAre.style.display = "none";
	inputCiuMoq.style.display = "none";
	inputCiuTac.style.display = "none";
	inputCiuPun.style.display = "none";
	inputCiuCuz.style.display = "none";
	inputCiuApu.style.display = "none";
	inputCiuAya.style.display = "none";
	inputCiuHyo.style.display = "none";
	inputCiuJun.style.display = "none";
	inputCiuPas.style.display = "none";
	inputCiuHco.style.display = "none";
	inputCiuSan.style.display = "none";
	inputCiuCaj.style.display = "none";
	inputCiuAma.style.display = "none";
	inputCiuMad.style.display = "none";
	inputCiuLor.style.display = "none";
	inputCiuUca.style.display = "none";

	if (Number(inputDpt.value) === 0) {
		inputCiuDef.style.display = "block";
	}
	if (Number(inputDpt.value) === 1) {
		inputCiuLim.style.display = "block";
	}
	if (Number(inputDpt.value) === 2) {
		inputCiuCal.style.display = "block";
	}
	if (Number(inputDpt.value) === 3) {
		inputCiuPiu.style.display = "block";
	}
	if (Number(inputDpt.value) === 4) {
		inputCiuTum.style.display = "block";
	}
	if (Number(inputDpt.value) === 5) {
		inputCiuLam.style.display = "block";
	}
	if (Number(inputDpt.value) === 6) {
		inputCiuLaL.style.display = "block";
	}
	if (Number(inputDpt.value) === 7) {
		inputCiuAnc.style.display = "block";
	}
	if (Number(inputDpt.value) === 8) {
		inputCiuIca.style.display = "block";
	}
	if (Number(inputDpt.value) === 9) {
		inputCiuAre.style.display = "block";
	}
	if (Number(inputDpt.value) === 10) {
		inputCiuMoq.style.display = "block";
	}
	if (Number(inputDpt.value) === 11) {
		inputCiuTac.style.display = "block";
	}
	if (Number(inputDpt.value) === 12) {
		inputCiuPun.style.display = "block";
	}
	if (Number(inputDpt.value) === 13) {
		inputCiuCuz.style.display = "block";
	}
	if (Number(inputDpt.value) === 14) {
		inputCiuApu.style.display = "block";
	}
	if (Number(inputDpt.value) === 15) {
		inputCiuAya.style.display = "block";
	}
	if (Number(inputDpt.value) === 16) {
		inputCiuHyo.style.display = "block";
	}
	if (Number(inputDpt.value) === 17) {
		inputCiuJun.style.display = "block";
	}
	if (Number(inputDpt.value) === 18) {
		inputCiuPas.style.display = "block";
	}
	if (Number(inputDpt.value) === 19) {
		inputCiuHco.style.display = "block";
	}
	if (Number(inputDpt.value) === 20) {
		inputCiuSan.style.display = "block";
	}
	if (Number(inputDpt.value) === 21) {
		inputCiuCaj.style.display = "block";
	}
	if (Number(inputDpt.value) === 22) {
		inputCiuAma.style.display = "block";
	}
	if (Number(inputDpt.value) === 23) {
		inputCiuMad.style.display = "block";
	}
	if (Number(inputDpt.value) === 24) {
		inputCiuLor.style.display = "block";
	}
	if (Number(inputDpt.value) === 25) {
		inputCiuUca.style.display = "block";
	}

}

function valCiu() {
	if (Number(inputDpt.value) === 0) {
		alert('Debe seleccionar un departamento para continuar');
		return true;
	}
	if (inputCiuLim.style.display === "block" && Number(inputCiuLim.value) === 0) {
		alert('Debe ingresar una ciudad para continuar');
		return true;
	} 
	if (inputCiuLim.style.display === "block" && Number(inputCiuLim.value) != 0) {
		let valFinCiu = inputCiuLim.value;
		let idCiu = listCiu[valFinCiu];
		CiuHSP = idCiu['HSP'];
		return false;
	}
	if (inputCiuCal.style.display === "block" && Number(inputCiuCal.value) === 0) {
		alert('Debe ingresar una ciudad para continuar');
		return true;
	} 
	if (inputCiuCal.style.display === "block" && Number(inputCiuCal.value) != 0) {
		let valFinCiu = inputCiuCal.value;
		let idCiu = listCiu[valFinCiu];
		CiuHSP = idCiu['HSP'];
		return false;
	}
	if (inputCiuPiu.style.display === "block" && Number(inputCiuPiu.value) === 0) {
		alert('Debe ingresar una ciudad para continuar');
		return true;
	} 
	if (inputCiuPiu.style.display === "block" && Number(inputCiuPiu.value) != 0) {
		let valFinCiu = inputCiuPiu.value;
		let idCiu = listCiu[valFinCiu];
		CiuHSP = idCiu['HSP'];
		return false;
	}
	if (inputCiuTum.style.display === "block" && Number(inputCiuTum.value) === 0) {
		alert('Debe ingresar una ciudad para continuar');
		return true;
	} 
	if (inputCiuTum.style.display === "block" && Number(inputCiuTum.value) != 0) {
		let valFinCiu = inputCiuTum.value;
		let idCiu = listCiu[valFinCiu];
		CiuHSP = idCiu['HSP'];
		return false;
	}
	if (inputCiuLam.style.display === "block" && Number(inputCiuLam.value) === 0) {
		alert('Debe ingresar una ciudad para continuar');
		return true;
	} 
	if (inputCiuLam.style.display === "block" && Number(inputCiuLam.value) != 0) {
		let valFinCiu = inputCiuLam.value;
		let idCiu = listCiu[valFinCiu];
		CiuHSP = idCiu['HSP'];
		return false;
	}
	if (inputCiuLaL.style.display === "block" && Number(inputCiuLaL.value) === 0) {
		alert('Debe ingresar una ciudad para continuar');
		return true;
	} 
	if (inputCiuLaL.style.display === "block" && Number(inputCiuLaL.value) != 0) {
		let valFinCiu = inputCiuLaL.value;
		let idCiu = listCiu[valFinCiu];
		CiuHSP = idCiu['HSP'];
		return false;
	}
	if (inputCiuAnc.style.display === "block" && Number(inputCiuAnc.value) === 0) {
		alert('Debe ingresar una ciudad para continuar');
		return true;
	} 
	if (inputCiuAnc.style.display === "block" && Number(inputCiuAnc.value) != 0) {
		let valFinCiu = inputCiuAnc.value;
		let idCiu = listCiu[valFinCiu];
		CiuHSP = idCiu['HSP'];
		return false;
	}
	if (inputCiuIca.style.display === "block" && Number(inputCiuIca.value) === 0) {
		alert('Debe ingresar una ciudad para continuar');
		return true;
	} 
	if (inputCiuIca.style.display === "block" && Number(inputCiuIca.value) != 0) {
		let valFinCiu = inputCiuIca.value;
		let idCiu = listCiu[valFinCiu];
		CiuHSP = idCiu['HSP'];
		return false;
	}
	if (inputCiuAre.style.display === "block" && Number(inputCiuAre.value) === 0) {
		alert('Debe ingresar una ciudad para continuar');
		return true;
	} 
	if (inputCiuAre.style.display === "block" && Number(inputCiuAre.value) != 0) {
		let valFinCiu = inputCiuAre.value;
		let idCiu = listCiu[valFinCiu];
		CiuHSP = idCiu['HSP'];
		return false;
	}
	if (inputCiuMoq.style.display === "block" && Number(inputCiuMoq.value) === 0) {
		alert('Debe ingresar una ciudad para continuar');
		return true;
	} 
	if (inputCiuMoq.style.display === "block" && Number(inputCiuMoq.value) != 0) {
		let valFinCiu = inputCiuMoq.value;
		let idCiu = listCiu[valFinCiu];
		CiuHSP = idCiu['HSP'];
		return false;
	}
	if (inputCiuTac.style.display === "block" && Number(inputCiuTac.value) === 0) {
		alert('Debe ingresar una ciudad para continuar');
		return true;
	} 
	if (inputCiuTac.style.display === "block" && Number(inputCiuTac.value) != 0) {
		let valFinCiu = inputCiuTac.value;
		let idCiu = listCiu[valFinCiu];
		CiuHSP = idCiu['HSP'];
		return false;
	}
	if (inputCiuPun.style.display === "block" && Number(inputCiuPun.value) === 0) {
		alert('Debe ingresar una ciudad para continuar');
		return true;
	} 
	if (inputCiuPun.style.display === "block" && Number(inputCiuPun.value) != 0) {
		let valFinCiu = inputCiuPun.value;
		let idCiu = listCiu[valFinCiu];
		CiuHSP = idCiu['HSP'];
		return false;
	}
	if (inputCiuCuz.style.display === "block" && Number(inputCiuCuz.value) === 0) {
		alert('Debe ingresar una ciudad para continuar');
		return true;
	} 
	if (inputCiuCuz.style.display === "block" && Number(inputCiuCuz.value) != 0) {
		let valFinCiu = inputCiuCuz.value;
		let idCiu = listCiu[valFinCiu];
		CiuHSP = idCiu['HSP'];
		return false;
	}
	if (inputCiuApu.style.display === "block" && Number(inputCiuApu.value) === 0) {
		alert('Debe ingresar una ciudad para continuar');
		return true;
	} 
	if (inputCiuApu.style.display === "block" && Number(inputCiuApu.value) != 0) {
		let valFinCiu = inputCiuApu.value;
		let idCiu = listCiu[valFinCiu];
		CiuHSP = idCiu['HSP'];
		return false;
	}
	if (inputCiuAya.style.display === "block" && Number(inputCiuAya.value) === 0) {
		alert('Debe ingresar una ciudad para continuar');
		return true;
	} 
	if (inputCiuAya.style.display === "block" && Number(inputCiuAya.value) != 0) {
		let valFinCiu = inputCiuAya.value;
		let idCiu = listCiu[valFinCiu];
		CiuHSP = idCiu['HSP'];
		return false;
	}
	if (inputCiuHyo.style.display === "block" && Number(inputCiuHyo.value) === 0) {
		alert('Debe ingresar una ciudad para continuar');
		return true;
	} 
	if (inputCiuHyo.style.display === "block" && Number(inputCiuHyo.value) != 0) {
		let valFinCiu = inputCiuHyo.value;
		let idCiu = listCiu[valFinCiu];
		CiuHSP = idCiu['HSP'];
		return false;
	}
	if (inputCiuJun.style.display === "block" && Number(inputCiuJun.value) === 0) {
		alert('Debe ingresar una ciudad para continuar');
		return true;
	} 
	if (inputCiuJun.style.display === "block" && Number(inputCiuJun.value) != 0) {
		let valFinCiu = inputCiuJun.value;
		let idCiu = listCiu[valFinCiu];
		CiuHSP = idCiu['HSP'];
		return false;
	}
	if (inputCiuPas.style.display === "block" && Number(inputCiuPas.value) === 0) {
		alert('Debe ingresar una ciudad para continuar');
		return true;
	} 
	if (inputCiuPas.style.display === "block" && Number(inputCiuPas.value) != 0) {
		let valFinCiu = inputCiuPas.value;
		let idCiu = listCiu[valFinCiu];
		CiuHSP = idCiu['HSP'];
		return false;
	}
	if (inputCiuHco.style.display === "block" && Number(inputCiuHyo.value) === 0) {
		alert('Debe ingresar una ciudad para continuar');
		return true;
	} 
	if (inputCiuHco.style.display === "block" && Number(inputCiuHyo.value) != 0) {
		let valFinCiu = inputCiuHyo.value;
		let idCiu = listCiu[valFinCiu];
		CiuHSP = idCiu['HSP'];
		return false;
	}
	if (inputCiuSan.style.display === "block" && Number(inputCiuSan.value) === 0) {
		alert('Debe ingresar una ciudad para continuar');
		return true;
	}
	if (inputCiuSan.style.display === "block" && Number(inputCiuSan.value) != 0) {
		let valFinCiu = inputCiuSan.value;
		let idCiu = listCiu[valFinCiu];
		CiuHSP = idCiu['HSP'];
		return false;
	}
	if (inputCiuCaj.style.display === "block" && Number(inputCiuCaj.value) === 0) {
		alert('Debe ingresar una ciudad para continuar');
		return true;
	} 
	if (inputCiuCaj.style.display === "block" && Number(inputCiuCaj.value) != 0) {
		let valFinCiu = inputCiuCaj.value;
		let idCiu = listCiu[valFinCiu];
		CiuHSP = idCiu['HSP'];
		return false;
	}
	if (inputCiuAma.style.display === "block" && Number(inputCiuAma.value) === 0) {
		alert('Debe ingresar una ciudad para continuar');
		return true;
	} 
	if (inputCiuAma.style.display === "block" && Number(inputCiuAma.value) != 0) {
		let valFinCiu = inputCiuAma.value;
		let idCiu = listCiu[valFinCiu];
		CiuHSP = idCiu['HSP'];
		return false;
	}
	if (inputCiuMad.style.display === "block" && Number(inputCiuMad.value) === 0) {
		alert('Debe ingresar una ciudad para continuar');
		return true;
	} 
	if (inputCiuMad.style.display === "block" && Number(inputCiuMad.value) != 0) {
		let valFinCiu = inputCiuMad.value;
		let idCiu = listCiu[valFinCiu];
		CiuHSP = idCiu['HSP'];
		return false;
	}
	if (inputCiuLor.style.display === "block" && Number(inputCiuLor.value) === 0) {
		alert('Debe ingresar una ciudad para continuar');
		return true;
	} 
	if (inputCiuLor.style.display === "block" && Number(inputCiuLor.value) != 0) {
		let valFinCiu = inputCiuLor.value;
		let idCiu = listCiu[valFinCiu];
		CiuHSP = idCiu['HSP'];
		return false;
	}
	if (inputCiuUca.style.display === "block" && Number(inputCiuUca.value) === 0) {
		alert('Debe ingresar una ciudad para continuar');
		return true;
	} 
	if (inputCiuUca.style.display === "block" && Number(inputCiuUca.value) != 0) {
		let valFinCiu = inputCiuUca.value;
		let idCiu = listCiu[valFinCiu];
		CiuHSP = idCiu['HSP'];
		return false;
	}
}

//eleccion pregunta3
function modalQtn3(opt) {
	if (1 === Number(opt)) {
		modalQuestion3_opt1.ariaPressed = "true";
		modalQuestion3_opt1.style.backgroundColor = "#1B4537";

		modalQuestion3_opt2.ariaPressed = "false";
		modalQuestion3_opt2.style.backgroundColor = "white";
	}
	if (2 === Number(opt)) {
		modalQuestion3_opt2.ariaPressed = "true";
		modalQuestion3_opt2.style.backgroundColor = "#1B4537";

		modalQuestion3_opt1.ariaPressed = "false";
		modalQuestion3_opt1.style.backgroundColor = "white";
	}
}

//funcion pregunta 4 industrias
//funcion que calcula promedio de consumo energetico y promedio base
function calConEnerInd(){
	inputEneAct1 = document.getElementById("inputIndEnerUltRec").value;
	inputEneAct2 = document.getElementById("inputIndEnerPenUltRec").value;
	//promedio
	promEneActMen = (Number(inputEneAct1) + Number(inputEneAct2))/2; //kwh
	promEneActDia = (promEneActMen)/30*1000;
	promBaseInd = (promEneActDia)/13.5; //w
}

//funcion que calcula potencia final por hora(industrias)
function calPotFin(){
	//obtenemos promedio de consumo energetico y promedio base
	calConEnerInd()
	//corresponde banco clinica municipalidades edif aseguradoras
	let facSimWeekTip1 = [0.13,0.13,0.13,0.13,0.13,0.13,0.25,0.34,0.82,1.04,1.08,1.11,1.30,1.19,1.14,1.12,1.11,1.00,0.90,0.13,0.13,0.13,0.13,0.13]; //lunes a viernes
	let facSimSatuTip1 = [0.13,0.13,0.13,0.13,0.13,0.13,0.25,0.34,0.82,0.90,1.00,1.20,0.71,0.52,0.42,0.33,0.13,0.13,0.13,0.13,0.13,0.13,0.13,0.13]; //sabado
	let facSimSundTip1 = [0.13,0.13,0.13,0.13,0.13,0.13,0.13,0.13,0.13,0.13,0.13,0.13,0.13,0.13,0.13,0.13,0.13,0.13,0.13,0.13,0.13,0.13,0.13,0.13]; //domingo

	//corresponde supermercado galerias industrias alimentarias
	let facSimTip2 = [0.30,0.35,0.38,0.36,0.33,0.35,0.48,0.55,0.82,1.04,1.08,1.11,1.14,1.19,1.12,1.14,1.11,1.10,1.11,1.04,0.89,0.25,0.20,0.14]; //toda la semana

	inputTipInd = document.getElementById("inputTipInd").value;

	if(Number(inputTipInd) === 1){

		for (let i = 0; i < 24; i++) {
			let varHoraPotFinWeekTip1 = 0;
			let varHoraPotFinSatuTip1 = 0;
			let varHoraPotFinSundTip1 = 0;

			//potencia final por hora
			varHoraPotFinWeekTip1 = promBaseInd * facSimWeekTip1[i];
			potFinWeekTip1.push(varHoraPotFinWeekTip1);
			
			varHoraPotFinSatuTip1 = promBaseInd * facSimSatuTip1[i];
			potFinSatuTip1.push(varHoraPotFinSatuTip1);

			varHoraPotFinSundTip1 = promBaseInd * facSimSundTip1[i];
			potFinSundTip1.push(varHoraPotFinSundTip1);			
		}

		//potencia final
		for (let i = 0; i < 24; i++) {
			potFinal = potFinal + (potFinWeekTip1[i]*5) + (potFinSatuTip1[i]) + (potFinSundTip1[i]);
		}
	}

	if(Number(inputTipInd) === 2){
		for (let i = 0; i < 24; i++) {
			let varHoraPotFinTip2 = 0;

			varHoraPotFinTip2 = promBaseInd * facSimTip2[i];
			potFinTip2.push(varHoraPotFinTip2);
		}

		//potencia final
		for (let i = 0; i < 24; i++) {
			potFinal = potFinal + (potFinTip2[i]*7);
		}
	}
}

//funcion que muestra resultado de industrias
function mosResInd(){
	calPotFin();
	areaTotDisInd=document.getElementById("inputAreaDisInd").value;
	if(Number(inputTipInd) === 1){
		for (let i = 6; i < 18; i++) {
			promConsumo = promConsumo + (potFinWeekTip1[i]*5) + (potFinSatuTip1[i]) + (potFinSundTip1[i]);
		}
		promConsumo = promConsumo / (7*12);
	}
	if(Number(inputTipInd) === 2){
		for (let i = 6; i < 18; i++) {
			promConsumo = promConsumo + (potFinTip2[i]*7);
		}
		promConsumo = promConsumo / (7*12);
	}
	if(promConsumo%potPanSolar>0){
		canPanSol = parseInt(promConsumo/potPanSolar) + 1;
	}else{
		canPanSol = promConsumo/potPanSolar; 
	}
	canPotSis = canPanSol*potPanSolar;
	//potencia real de sistema - potencia pico
	if((arePanSolar*canPanSol)>Number(areaTotDisInd)){
		canPotReaSis = (areaTotDisInd/arePanSolar)*potPanSolar;
	}else{
		canPotReaSis = canPanSol * potPanSolar;
	}
	genDiaSis = canPotReaSis*powRatio*CiuHSP/1000;	//generacion diaria de sistema
	genAnuSis = genDiaSis*30*12; //generacion anual de sistema
	promPotAnu = promEneActMen*12;
	porAhorro = +(genAnuSis/promPotAnu)*100;

	rptaDom.innerHTML = `<p style="font-size:1,2rem">Generacion anual del sistema: ${parseInt(genAnuSis)} kWh/año</p><p style="font-size:1,2rem>Porcentaje de ahorro: ${parseInt(porAhorro)}%</p>`

	//grafica
	new Chart(graRptCal,{
		type:"line",
		data:{
			labels:["","Generacion anual",""],
			datasets:[
				{
					label:"Generacion de sistema",
					fill: false,
					cubicInterpolationMode: "monotone",
					tension: 0.4,
					borderColor:"#FFD206",
					backgroundColor:"#FFD206",
					data:[0,parseInt(genAnuSis),0]
				}
			]
		},
		options:{
			responsive: true,
			interaction:{
				intersect: false
			},
			scales: {
				x: {
					display: true,
					title:{
						display:true
					}
				},
				y:{
					display: true,
					title:{
						display: true,
						text:"kWh/año"
					}
				}
			}
		}
	})
}

//funcion calcula PotenciaInstalada pregunta 4 domicilios
function calPotIns() {
	//input dimension de vivienda
	let inputAreaVivVal = document.getElementById("inputAreaViv").value;

	if (Number(inputAreaVivVal) <= (Number(iniAreaViv))) {
		totPotIns = iniPotIns;
	}
	if (Number(inputAreaVivVal) > iniAreaViv) {
		let rest = Number(inputAreaVivVal) % iniAreaSig;
		let tam = parseInt((Number(inputAreaVivVal - 90)) / iniAreaSig);
		if (rest === 0) {
			totPotIns = iniPotIns + (iniPotSig * tam);
		} else {
			totPotIns = iniPotIns + (iniPotSig * (tam + 1));
		}
	}
}

//funcion checkeds pregunta 4 domicilios
function valVarGasViv() {
	if (switchQtn4_1.checked) {
		totalCargaClf = cargaClf * FDcargaClf;
	} else {
		totalCargaClf = 0;
	}
	if (switchQtn4_2.checked) {
		totalCocinaEle = cocinaEle * FDcocinaEle;
	} else {
		totalCocinaEle = 0;
	}

	if (switchQtn4_3.checked) {
		totalCalentAgua = calentAgua * FDcalentAgua;
	} else {
		totalCalentAgua = 0;
	}

	if (switchQtn4_4.checked) {
		totalCargaSup = cargaSup * FDcargaSup;
	} else {
		totalCargaSup = 0;
	}
}


//potencia base domicilio
function defPotBase() {
	calPotIns();
	valVarGasViv();
	potBase = (totPotIns + totalCargaClf + totalCocinaEle + totalCalentAgua + totalCargaSup) * facSim;
}

//funcion hallar promedio de consumo 
//en base a horas sol(6am-5pm)
function defPromConsumo() {
	defPotBase();
	//factor de simultaneidad
	//00horas - 23horas

	//dia de semana(lun-vie)
	let facSimWeekday = [0.01, 0.01, 0.01, 0.01, 0.01, 0.03, 0.30, 0.24, 0.08, 0.06, 0.03, 0.07, 0.10, 0.06, 0.05, 0.03, 0.04, 0.03, 0.09, 0.10, 0.23, 0.20, .10, 0.09]
	//fin de semana (sab-dom)
	let facSimWeekend = [0.01, 0.01, 0.01, 0.01, 0.01, 0.03, 0.30, 0.24, 0.08, 0.06, 0.03, 0.07, 0.10, 0.06, 0.05, 0.03, 0.04, 0.03, 0.09, 0.10, 0.23, 0.20, 0.10, 0.09]

	let potTotLun = [];
	let potTotMar = [];
	let potTotMie = [];
	let potTotJue = [];
	let potTotVie = [];
	let potTotSab = [];
	let potTotDom = [];

	let horaSolLun = 0;
	let horaSolMar = 0;
	let horaSolMie = 0;
	let horaSolJue = 0;
	let horaSolVie = 0;
	let horaSolSab = 0;
	let horaSolDom = 0;

	let horasSolDia = 12;

	//potencia total por dia y hora
	for (let i = 0; i < 24; i++) {
		let varHoraPotTotLun = 0;
		let varHoraPotTotMar = 0;
		let varHoraPotTotMie = 0;
		let varHoraPotTotJue = 0;
		let varHoraPotTotVie = 0;
		let varHoraPotTotSab = 0;
		let varHoraPotTotDom = 0;

		varHoraPotTotLun = potBase * facSimWeekday[i];
		potTotLun.push(varHoraPotTotLun);

		varHoraPotTotMar = potBase * facSimWeekday[i];
		potTotMar.push(varHoraPotTotMar);

		varHoraPotTotMie = potBase * facSimWeekday[i];
		potTotMie.push(varHoraPotTotMie);

		varHoraPotTotJue = potBase * facSimWeekday[i];
		potTotJue.push(varHoraPotTotJue);

		varHoraPotTotVie = potBase * facSimWeekday[i];
		potTotVie.push(varHoraPotTotVie);

		varHoraPotTotSab = potBase * facSimWeekend[i];
		potTotSab.push(varHoraPotTotSab);

		varHoraPotTotDom = potBase * facSimWeekend[i];
		potTotDom.push(varHoraPotTotDom);
	}

	//suma de hora sol por dia
	//considerando horas sol(6am-5pm)
	for (let i = 6; i < 18; i++) {
		horaSolLun = horaSolLun + potTotLun[i];
		horaSolMar = horaSolMar + potTotMar[i];
		horaSolMie = horaSolMie + potTotMie[i];
		horaSolJue = horaSolJue + potTotJue[i];
		horaSolVie = horaSolVie + potTotVie[i];
		horaSolSab = horaSolSab + potTotSab[i];
		horaSolDom = horaSolDom + potTotDom[i];
	}

	promConsumo = (horaSolLun + horaSolMar + horaSolMie + horaSolJue + horaSolVie + horaSolSab + horaSolDom) / (horasSolDia * 7);

}

function defParFin() {
	defPromConsumo();
	if(promConsumo%potPanSolar>0){
		canPanSol = parseInt(promConsumo/potPanSolar) + 1;
	}else{
		canPanSol = promConsumo/potPanSolar; 
	}
	canPotSis = canPanSol*potPanSolar;
	genDiaSis = powRatio*CiuHSP*canPotSis/1000;
	console.log(CiuHSP);
	genAnuSis = genDiaSis*12*30;
    
	rptaDom.innerHTML = `<p  style="font-size:1,2rem"
	>Generacion anual del sistema: ${parseInt(genAnuSis)} kWh/año</p>`

	//grafica
	new Chart(graRptCal,{
		type:"line",
		data:{
			labels:["","Generacion anual",""],
			datasets:[
				{
					label:"Generacion de sistema",
					fill: false,
					cubicInterpolationMode: "monotone",
					tension: 0.4,
					borderColor:"#B9C650",
					backgroundColor:"#B9C650",
					data:[0,parseInt(genAnuSis),0]
				}
			]
		},
		options:{
			responsive: true,
			interaction:{
				intersect: false
			},
			scales: {
				x: {
					display: true,
					title:{
						display:true
					}
				},
				y:{
					display: true,
					title:{
						display: true,
						text:"kWh/año"
					}
				}
			}
		}
	})
}


//funcion siguiente paso
function sgtPasoCalSol(opt) {

	if (1 === Number(opt)) {
		modalQuestion1.style.display = "none";
		modalQuestion2.style.display = "block";
	}
	if (2 === Number(opt)) {
		if (valCiu()) {
			return;
		} else {
			modalQuestion2.style.display = "none";
			modalQuestion3.style.display = "block";
		}
	}
	if (3 === Number(opt)) {
		if (modalQuestion3_opt2.ariaPressed === "true") {
			modalQuestion3.style.display = "none";
			modalQuestion4Dom.style.display = "block";
		}
		if (modalQuestion3_opt1.ariaPressed === "true") {
			modalQuestion3.style.display = "none";
			modalQuestion4Ind.style.display = "block";
		}
		if (modalQuestion3_opt1.ariaPressed === "false" & modalQuestion3_opt2.ariaPressed === "false") {
			alert('Debe indicar su tipo de consumo');
			return;
		}

	}
	if(4 === Number(opt)){
		if(modalQuestion3_opt2.ariaPressed === "true"){
			let inputAreaVivVal=document.getElementById("inputAreaViv").value;
			if(Number(inputAreaVivVal)==='' || Number(inputAreaVivVal)===0){
				alert('Debe indicar un area de vivienda para continuar');
				return;
			}else{
				modalQuestion4Dom.style.display = "none";
				modalQuestion5Dom.style.display = "block";
			}
			defParFin();
		}
		if(modalQuestion3_opt1.ariaPressed === "true"){
			let inputTipInd = document.getElementById("inputTipInd");
			let inputUltRec = document.getElementById("inputIndEnerUltRec");
			let inputPenUltRec = document.getElementById("inputIndEnerPenUltRec");

			if(Number(inputTipInd.value) === 0){
				alert("Debe indicar un tipo de industria");
				inputTipInd.focus();
				return;
			}
			if(Number(inputUltRec.value) === "" || Number(inputUltRec.value) === "0"){
				alert("ingresar un valor correcto");
				inputUltRec.focus();
				return;
			}
			if(Number(inputPenUltRec.value) === "" || Number(inputPenUltRec.value) === "0"){
				alert("ingresar un valor correcto");
				inputPenUltRec.focus();
				return;
			}		
			mosResInd();
			modalQuestion4Ind.style.display = "none";
			modalQuestion5Dom.style.display = "block";
			
		}
		

	}
}

function rtcPasoCalSol(opt){
	if (3 === Number(opt)) {
			modalQuestion2.style.display = "block";
			modalQuestion3.style.display = "none";
	}
	if (4 === Number(opt)) {
			modalQuestion3.style.display = "block";
			modalQuestion4Dom.style.display = "none";
			modalQuestion4Ind.style.display = "none";
	}
}
