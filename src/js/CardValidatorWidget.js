export default class CardValidatorWidget {
	constructor() {
	  this.container = null;
	  this.formEl = null;
	  this.cardImagesContainer = null;
	  this.inputEl = null;
	  this.resultImageEl = null;
	  this.messageEl = null;
	  this.onKeyUpListeners = [];
	  this.onSubmitListeners = [];
	  this.cards = new Map();

	  this.messages = {
			valid: 'Корректный номер',
			invalid: 'Некорректный номер карты',
	  };
	}

	drawUi() {
	  this.checkBinding();

	  this.container.innerHTML = `
	  <form class="card_validator_widget" action="#" name="card_validator_widget">
		<div class="card_images_container"></div>
		<div class="input_container">
		  <input type="text" class="card_input" id="card_input" placeholder="Credit card number">
		  <button class="validate_button">Click to validate</button>
		</div>
		<span class="form_hint" hidden>Please insert a credit card number!</span>
		<div class="message_container">
		  <div class="message_title">
			<div class="result_img"></div>
		  </div>
		  <div class="message"></div>
		</div>
	  </form>
	  `;

	  this.formEl = this.container.querySelector('form');
	  this.cardImagesContainerEl = this.container.querySelector('.card_images_container');
	  this.inputEl = this.container.querySelector('.card_input');
	  this.resultImageEl = this.container.querySelector('.result_img');
	  this.messageEl = this.container.querySelector('.message');

	  this.formEl.addEventListener('submit', this.onSubmit.bind(this));
	  this.inputEl.addEventListener('keyup', this.onKeyUp.bind(this));

	  this.showWaitingMessage();
	}

	addCardType(cardType) {
	  const cardImage = document.createElement('div');
	  cardImage.classList.add('card_image');
	  cardImage.title = cardType.fullName;
	  cardImage.setAttribute('data-id', cardType.name);
	  this.cards.set(cardType.name, cardImage);
	  this.cardImagesContainerEl.appendChild(cardImage);
	}

	get inputValue() {
	  return this.inputEl.value;
	}

	selectCard(cardType) {
	  this.unselectCards();
	  if (!cardType) return;
	  this.cards.get(cardType.name).classList.add('selected');
	}

	unselectCards() {
	  for (const card of this.cards.values()) card.classList.remove('selected');
	}

	showWaitingMessage() {
	  this.resultImageEl.hidden = true;
	  this.messageEl.textContent = this.messages.waiting;
	}

	showValidMessage() {
	  this.resultImageEl.classList.remove('invalid');
	  this.resultImageEl.classList.add('valid');
	  this.resultImageEl.hidden = false;
	  this.messageEl.textContent = this.messages.valid;
	}

	showInvalidMessage() {
	  this.resultImageEl.classList.remove('valid');
	  this.resultImageEl.classList.add('invalid');
	  this.resultImageEl.hidden = false;
	  this.messageEl.textContent = this.messages.invalid;
	}

	bindToDOM(container) {
	  if (!(container instanceof HTMLElement)) {
			throw new Error('Ошибка');
	  }
	  this.container = container;
	}

	addOnKeyUpListener(callback) {
	  this.onKeyUpListeners.push(callback);
	}

	addOnSubmitListener(callback) {
	  this.onSubmitListeners.push(callback);
	}

	onKeyUp(event) {
	  this.onKeyUpListeners.forEach((o) => o.call(null, event));
	}

	onSubmit(event) {
	  this.onSubmitListeners.forEach((o) => o.call(null, event));
	}

	checkBinding() {
	  if (this.container === null) {
			throw new Error('Ошибка');
	  }
	}
}
