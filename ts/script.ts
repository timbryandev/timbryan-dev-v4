const THEME_DARK: string = 'theme-dark';
const THEME_LIGHT: string = 'theme-light';
const THEME_DEFAULT: string = THEME_DARK;

function calculateDates() {
	function calculateDate(tag: HTMLSpanElement | any) {
		const start: Date = new Date(tag.dataset.start);
		const end: Date = tag.dataset.end ? new Date(tag.dataset.end) : new Date();
		const dif: Date = new Date(end.getTime() - start.getTime());
		const years: Number = dif.getFullYear() - 1970;
		const months: Number = dif.getMonth() + 1;
		let outputString: String = ``;
		if (years > 0) {
			outputString += `${years} year${years > 1 ? 's' : ''} `;
		}
		if (months > 0) {
			outputString += `${months} month${months > 1 ? 's' : ''} `;
		}
		tag.innerHTML = `( ${outputString})`;
	}

	document.querySelectorAll('.calculate-date').forEach(calculateDate);
}

function navToggleDropdown() {
	const navLinks: HTMLElement | null = document.querySelector('.nav-links');
	if (!navLinks) return;

	if (navLinks.classList.contains('show')) {
		navLinks.classList.remove('show');
	} else {
		navLinks.classList.add('show');
	}
}

function initForm() {
	const form: HTMLFormElement | any = document.querySelector('#contact form');
	if (!form) return;

	const button: HTMLButtonElement = form.querySelector('.submit');
	const status: HTMLParagraphElement = form.querySelector('.form-status');

	function success() {
		form.reset();
		button.style.display = 'none';
		status.innerHTML = 'Thank you for your message!';
	}

	function error() {
		status.innerHTML =
			'Oops! There was a problem. Please try again or try finding me on the social links in the website footer!';
	}

	// helper function for sending an AJAX request
	function ajax(method: string, url: string, data: FormData) {
		const xhr: XMLHttpRequest = new XMLHttpRequest();
		xhr.open(method, url);
		xhr.setRequestHeader('Accept', 'application/json');
		xhr.onreadystatechange = function () {
			if (xhr.readyState !== XMLHttpRequest.DONE) return;
			if (xhr.status === 200) {
				success();
			} else {
				error();
			}
		};
		xhr.send(data);
	}

	// handle the form submission event
	form.addEventListener('submit', function (evt: Event) {
		evt.preventDefault();
		const data: FormData = new FormData(form);
		ajax(form.method, form.action, data);
	});
}

function setTheme(themeName: string) {
	window.localStorage.setItem('theme', themeName);
	document.body.className = themeName;
}

function toggleTheme() {
	if (window.localStorage.getItem('theme') === THEME_DARK) {
		setTheme(THEME_LIGHT);
	} else {
		setTheme(THEME_DARK);
	}
}

function initTheme() {
	const prefersDarkTheme: boolean =
		window.matchMedia &&
		window.matchMedia('(prefers-color-scheme: dark)').matches;

	const currentTheme: string = window.localStorage.getItem('theme');
	
	if (currentTheme) {
		setTheme(currentTheme);
	}
	else if (prefersDarkTheme) {
		setTheme(THEME_DARK);
	}
	else {
		setTheme(THEME_LIGHT);
	}
}

function init() {
	initTheme();
	calculateDates();
	initForm();
}

window.addEventListener('load', init, false);
