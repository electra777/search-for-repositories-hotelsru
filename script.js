'use strict';

const form = document.querySelector('.form-search');
const formInput = form.querySelector('.form-search__input');
const errorMessage = form.querySelector('.form-search__text-error');
const result = document.querySelector('.result');

async function getData() {
	let url = `https://api.github.com/search/repositories?q=${formInput.value}&per_page=10`;
	let response = await fetch(url);
	let data = await response.json();

	console.log(data);
	console.log(data.total_count);
	if (data.total_count == 0) {
		result.innerHTML = 'Ничего не найдено';
	} else {
		render(data.items);
	}
	formInput.value = '';
}

form.addEventListener('submit', (e) => {
	e.preventDefault();
	if (formInput.value != '') {
		getData();
	} else {
		errorMessage.style.opacity = 1;
		formInput.classList.add('invalid');
	}
});

function errorOff() {
	if (this.classList.contains('invalid')) {
		this.classList.remove('invalid');
		errorMessage.style.opacity = 0;
	}
}

formInput.onfocus = errorOff;

function render(data) {
	result.innerHTML = data
		.map((item) => {
			return `<div class="result__item">
      <div class="result__item-group">
        <img src="${item.owner.avatar_url}" alt="photo" class="result__item-photo">
        <div class="result__item-login">Логин - ${item.owner.login}</div>
      </div>
      <a href="${item.owner.html_url}" class="result__item-link" target="_blank"><img src="./github-mark.svg" alt="GitHub"
          class="result__item-icon">Ссылка на GitHub профиль</a>
      <div class="result__item-name">Ссылка на репозиторий - <a href="${item.html_url}" class="result__item-link" target="_blank">${item.name}</a></div>
    </div>`;
		})
		.join('');
}
