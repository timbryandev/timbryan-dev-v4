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

function scrollToTop() {
	window.scrollTo(0, 0);
}

function scrollToContent() {
	const nav: HTMLElement | null = document.querySelector('.navbar');
	if (!nav) return;

	nav.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function setPagePosition() {
	scrollToTop();
	setTimeout(scrollToContent, 1000);
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

function init() {
	setPagePosition();
	calculateDates();
	initForm();
}

window.addEventListener('load', init, false);
