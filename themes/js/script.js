const days = [
	`شنبه`,
	`یک شنبه`,
	`دو شنبه`,
	`سه شنبه`,
	`چهار شنبه`,
	`پنجشنبه`,
	`جمعه`
	];
let value;
let bgc;

function setColor(color) {
	bgc = color.css(`background-color`);
	$(`.section__input__text`).css(`background-color`,bgc);
}

function add() {
	value = $(`.section__input__text`).val();
	if(value.trim() !== '')
	{
		let time = addTime();
		const char = value.charCodeAt(0);
		let elem = $(`
			<div class="box" style="background-color: ${bgc};">
			<div class="nav">
			<div>
			<svg class="star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
			fill="currentColor">
			<path fill-rule="evenodd"
			d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
			clip-rule="evenodd" />
			</svg>
			</div>
			<div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="edit">
			<path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
			</svg>
			</div>
			<div>
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="trash-icon">
			<path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
			</svg>
			</div>
			</div>
			<div class="value">${value}</div>
			<div class="time">${time}</div>
			</div>
			`);
		if(char >= 65 && char <= 122)
			elem.children(`.value`).css(`direction`,`ltr`);
		else
			elem.children(`.value`).css(`direction`,`rtl`);
		$(`.section__boxes`).append(elem);
		$(`.section__input__text`).val(``);
	}
}

function checkDir(text) {
	let char = text.charCodeAt(0);
	if(char >= 65 && char <= 122)
		return true;
	return false;
}

function editNote(edit) {
	let editValue = $(`.edit__input`).val();
	if(editValue.trim() !== '')
	{
		if(checkDir(editValue) === true)
			edit.css(`direction`,`ltr`);
		else
			edit.css(`direction`,`rtl`);
		edit.html(editValue);
		$(`.section__edit`).css(`bottom`,`-110px`);
	}
	let time = addTime();
	edit.siblings(`.time`).html(`ویرایش شده: ${time}`)
}

function addTime() {
	const d = new Date();
	const day = d.getDay();
	const hour = d.getHours().toString().padStart(2, `0`);
	const minute = d.getMinutes().toString().padStart(2, `0`);
	const time = `${days[(day+1)%7]} ${hour}:${minute}`;
	return time;
}

$(`.color`).click(function() {
	let color = $(this);
	setColor(color);
});

$(`#add-btn`).click(function() {
	add();
});

$(`#delete-btn`).click(function() {
	$(`.section__input__text`).val(``);
});

$(`html`).keydown(function(event) {
	if(event.key == `Enter`)
		add();
});

$(`.section__boxes`).on('click','.star',function() {
	let note = $(this).closest(`.box`);
	if($(this).hasClass(`active`))
		note.css(`order`,`100`);	
	else
		note.css(`order`,`1`);
	$(this).toggleClass(`active`);
});

let edit;
$(`.section__boxes`).on('click','.edit',function() {
	edit = $(this).closest('.nav').siblings('.value');
	$(`.section__edit`).css(`bottom`,`110px`);
	$(`.edit__input`).focus();
	$(`.edit__edit`).click(function() {
		editNote(edit);
	});
	$(`.edit__input`).keydown(function(event) {
		if(event.key == `Enter`)
			editNote(edit);
	});
});

$(`.edit__close`).click(function() {
	$(this).parent(`.section__edit`).css(`bottom`,`-110px`);
});

$(`.section__boxes`).on('click','.trash-icon', function() {
	let trashIcon = $(this).parents(`.box`);
	trashIcon.fadeOut(400);
});

$( `.edit__input`).on('input',function() {
	let text = $(this).val();
	if(checkDir(text) === true)
		$(this).css(`direction`,`ltr`);
	else
		$(this).css(`direction`,`rtl`);
});