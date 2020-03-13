let textArea = document.getElementById('contentsBox');
let countChar = () => {
	let remainingChar = 140 - textArea.value.length;

	if (remainingChar < 0) {
		document.getElementById('charCountArea').innerHTML = `${remainingChar}`.fontcolor('red');
	} else {
		document.getElementById('charCountArea').innerHTML = `${remainingChar}`
	}
}

textArea.addEventListener('input', countChar);





//Follow Button Effect
$(document).ready(

	function iniciar() {
		$('.follow').on("click", function () {
			$('.follow').css('background-color', '#34CF7A');
			$('.follow').html('<div class="icon-ok"></div> Following');
		});
	}

);