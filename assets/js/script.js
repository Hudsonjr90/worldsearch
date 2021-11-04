/* jshint esversion: 8 */
let countryList = document.querySelector('.country-list');
let searchInput = document.querySelector('#searchInput');
let countryCategory = document.querySelector('#country-category');
let selectedCountry;
let country = document.querySelectorAll('.country');
let loadingBar = document.querySelector('.loadingBar');
let seekableArea = document.querySelector('.seekable-area');
let modalImage = document.querySelector('.modal-image');
let modal = document.querySelector('.modal');
let firstH2 = document.querySelector('.first h2');
let firstP = document.querySelectorAll('.first p span');
let secondP = document.querySelectorAll('.second p span');
let textSecondGroup = document.querySelector('.text-second-group');
let backButton = document.querySelector('.back-button');
let clickedItemParentAttribute;
let modeToggle = document.querySelector('.header-right');
let header = document.querySelector('header');

async  function loadingCountries(){
	let req = await fetch('https://restcountries.com/v2/all');
	let json = await req.json();
	montarPaises(json);
}

async function loadingRegion(){
	let req = await fetch(`https://restcountries.com/v3.1/region/${selectedCountry}`);
	let json = await req.json();
	montarRegiao(json);
}
async function matchedCountries(){
	let req = await fetch(`https://restcountries.com/v2/name/${searchInput.value}`);
	let json = await req.json();
	montarPais(json);
}
async function loadingModal(){
	let req = await fetch(`https://restcountries.com/v2/alpha/${clickedItemParentAttribute}`);
	let json = await req.json();
	montarModal(json);
}
function montarRegiao(lista){
	countryList.innerHTML = '';
	for(let i in lista){
		countryList.innerHTML += `
		<div class='country'>
			<div class='country-img'>
				<img src='${lista[i].flag}'>
			</div>
		<div class='country-details'>
			<h3>${lista[i].name}</h3>
			<p>População: ${lista[i].population}</p>
			<p>Região: ${lista[i].region}</p>
			<p>Capital: ${lista[i].capital}</p>
			</div>
		</div>`; 
		document.querySelectorAll('.country')[i].setAttribute('data-key', lista[i].alpha2Code);
	}
	country = document.querySelectorAll('.country');
	country.forEach((item)=>{
		item.addEventListener('click',(e)=>{
			clickedItemParentAttribute = e.target.closest('.country').getAttribute('data-key');
			seekableArea.style.display = 'none';
			countryList.style.display = 'none';
			loadingBar.style.display = 'block';
			loadingModal();
		});
	});

}
function montarModal(lista){
	loadingBar.style.display = 'none';
	modal.style.display = 'block';
	modalImage.querySelector('img').src = lista.flag;
	firstH2.innerHTML = lista.name;
	firstP[0].innerHTML = lista.population;
	firstP[1].innerHTML = lista.nativeName;
	firstP[2].innerHTML = lista.region;
	firstP[3].innerHTML = lista.subregion;
	firstP[4].innerHTML = lista.capital;
	secondP[0].innerHTML = lista.topLevelDomain;
	secondP[1].innerHTML = lista.currencies[0].name;
	secondP[2].innerHTML = lista.languages[0].name;
	for(let i = 0; i < lista.borders.length;i++){
		let mod = document.querySelector('.border-country').cloneNode(true);
		mod.innerHTML = lista.borders[i];
		textSecondGroup.append(mod);
	}
	backButton.addEventListener('click',()=>{
		modal.style.display = 'none';
		seekableArea.style.display = 'flex';
		countryList.style.display = 'flex';
		loadingCountries();
	});
}
function montarPaises(lista){
		countryList.innerHTML = '';
	for(let i in lista){
		countryList.innerHTML += `
		<div class='country'>
			<div class='country-img'>
				<img src='${lista[i].flag}'>
			</div>
		<div class='country-details'>
			<h3>${lista[i].name}</h3>
			<p>População: ${lista[i].population}</p>
			<p>Região: ${lista[i].region}</p>
			<p>Capital: ${lista[i].capital}</p>
			</div>
		</div>`; 
		//document.querySelectorAll('.country')[i].setAttribute('data-key',i);
		document.querySelectorAll('.country')[i].setAttribute('data-key', lista[i].alpha2Code);
	}
	country = document.querySelectorAll('.country');
	country.forEach((item)=>{
		item.addEventListener('click',(e)=>{
			clickedItemParentAttribute = e.target.closest('.country').getAttribute('data-key');
			seekableArea.style.display = 'none';
			countryList.style.display = 'none';
			loadingBar.style.display = 'block';
			loadingModal();
		});
	});
}

function montarPais(lista){
	countryList.innerHTML = '';
	for(let i in lista){
		if(lista[i].name !== undefined){
		countryList.innerHTML += `
				<div class='country'>
			<div class='country-img'>
				<img src='${lista[i].flag}'>
			</div>
		<div class='country-details'>
			<h3>${lista[i].name}</h3>
			<p>População: ${lista[i].population}</p>
			<p>Região: ${lista[i].region}</p>
			<p>Capital: ${lista[i].capital}</p>
			</div>
		</div>
		`;
		document.querySelectorAll('.country')[i].setAttribute('data-key', lista[i].alpha2Code);
	}else{
		countryList.innerHTML = '';
	}
	}
	country = document.querySelectorAll('.country');
	country.forEach((item)=>{
		item.addEventListener('click',(e)=>{
			clickedItemParentAttribute = e.target.closest('.country').getAttribute('data-key');
			seekableArea.style.display = 'none';
			countryList.style.display = 'none';
			loadingBar.style.display = 'block';
			searchInput.value = '';
			loadingModal();
		});
	});
}
countryCategory.addEventListener('change',()=>{
	selectedCountry = countryCategory.options[countryCategory.selectedIndex].value;
	switch(selectedCountry){
		case 'Todos':
		loadingCountries();
		break;
		case 'África':
		loadingRegion();
		break;
		case 'Américas':
		loadingRegion();
		break;
		case 'Ásia':
		loadingRegion();
		break;
		case 'Europa':
		loadingRegion();
		break;
		case 'Oceania':
		loadingRegion();
		break;
		default:
		alert('escolheu algo válido!');
	}
});
searchInput.addEventListener('keyup',(event)=>{
	if(searchInput.value !== ''){
		matchedCountries();
	}else{
		loadingCountries();
	}
});
let modeTitle = document.querySelector('.header-right span');
let cabecalho = document.querySelector('.header');
let body = document.querySelector('body');
let modalText = document.querySelector('.modal-text');
modeToggle.addEventListener('click',()=>{
	let countryDetails = document.querySelectorAll('.country-details');
	let paisesDeBorda = document.querySelectorAll('.border-country');
if(header.classList.contains('light')){
	header.classList.remove('light');
	modeTitle.innerHTML = 'Dark Mode';
	cabecalho.classList.remove('lightHeader');
	body.classList.remove('lightBody');
	searchInput.classList.remove('lightSearch');
	countryCategory.classList.remove('lightSelect');
	country.forEach((item)=>{
		item.classList.remove('lightCountry');
	});
	countryDetails.forEach((item)=>{
		item.classList.remove('lightCountryDetails');
	});
	firstH2.classList.remove('lightModalH2');
	modalText.classList.remove('lightModalText');
	paisesDeBorda.forEach((item)=>{
		item.classList.remove('lightBorderCountry');
	});
	backButton.classList.remove('lightBackButton');
}else{
	header.classList.add('light');
	modeTitle.innerHTML = 'Light Mode';
	cabecalho.classList.add('lightHeader');
	body.classList.add('lightBody');
	searchInput.classList.add('lightSearch');
	countryCategory.classList.add('lightSelect');
	country.forEach((item)=>{
		item.classList.add('lightCountry');
	});
	countryDetails.forEach((item)=>{
		item.classList.add('lightCountryDetails');
	});
	firstH2.classList.add('lightModalH2');
	modalText.classList.add('lightModalText');
	paisesDeBorda.forEach((item)=>{
		item.classList.add('lightBorderCountry');
	});
	backButton.classList.add('lightBackButton');
}
});
loadingCountries();