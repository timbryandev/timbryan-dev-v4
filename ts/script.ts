function calculateDates() {
	function calculateDate(tag: HTMLSpanElement | any) {
		const start: Date = new Date(tag.dataset.start);
		const end: Date = tag.dataset.end ? new Date(tag.dataset.end) : new Date();
		const dif: Date = new Date(end.getTime() - start.getTime());
		const years = dif.getFullYear() - 1970;
		const months = dif.getMonth() + 1;
		let outputString = ``;
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
	const nav: HTMLElement | any = document.querySelector('.nav-links');
	if (nav.classList.contains('show')) {
		nav.classList.remove('show');
	} else {
		nav.classList.add('show');
	}
}

function scrollToTop() {
	const header: HTMLHeadElement | any = document.body.querySelector('#header');
	header.scrollIntoView();
}

function initForm() {
	const form: HTMLFormElement | any = document.querySelector('#contact form');
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
		const data = new FormData(form);
		ajax(form.method, form.action, data);
	});
}

function init() {
	calculateDates();
	initForm();
}

window.addEventListener('load', init, false);
