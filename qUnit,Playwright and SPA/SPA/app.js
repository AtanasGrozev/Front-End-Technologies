window.addEventListener("load", solve);

function solve() {
    let numberOfticketsElement = document.getElementById('num-tickets');
    let seatingElement = document.getElementById('seating-preference');
    let fullNameElement = document.getElementById('full-name');
    let emailElement = document.getElementById('email');
    let phoneNumberElement = document.getElementById('phone-number');

    let purchaseButtonElement = document.getElementById('purchase-btn');

    let ticketPreviewElement = document.getElementById('ticket-preview');
    let ticketPurchaseElement = document.getElementById('ticket-purchase');
    let thankMessageAndBackBtnPosition = document.querySelector('.bottom-content');

    purchaseButtonElement.addEventListener("click", onNext)
    function onNext(e) {
        e.preventDefault();

        if (
            numberOfticketsElement.value == '' ||
            seatingElement.value == '' ||
            fullNameElement.value == '' ||
            emailElement.value == '' ||
            phoneNumberElement.value == ''
        ) {
            return;
        }

        let liPreviewElement = document.createElement('li');
        liPreviewElement.setAttribute('class', 'ticket-purchase');

        let articlePreviewElement = document.createElement('article');

        let numberOfTicketParagraph = document.createElement('p');
        numberOfTicketParagraph.textContent = `Count: ${numberOfticketsElement.value}`;

        let seatingParagraph = document.createElement('p');
        seatingParagraph.textContent = `Preference: ${seatingElement.value}`;

        let fullNameParagraph = document.createElement('p');
        fullNameParagraph.textContent = `To: ${fullNameElement.value}`;

        let emailParagraph = document.createElement('p');
        emailParagraph.textContent = `Email: ${emailElement.value}`;

        let phoneNumbParagraph = document.createElement('p');
        phoneNumbParagraph.textContent = `Phone number: ${phoneNumberElement.value}`;

        let editButton = document.createElement('button');
        editButton.setAttribute('class', 'edit-btn');
        editButton.textContent = 'Edit';

        let nextButton = document.createElement('button');
        nextButton.setAttribute('class', 'edit-btn'); // --> име на клас по изискване на задачата
        nextButton.textContent = 'Next';

        articlePreviewElement.appendChild(numberOfTicketParagraph);
        articlePreviewElement.appendChild(seatingParagraph);
        articlePreviewElement.appendChild(fullNameParagraph);
        articlePreviewElement.appendChild(emailParagraph);
        articlePreviewElement.appendChild(phoneNumbParagraph);

        liPreviewElement.appendChild(articlePreviewElement);
        liPreviewElement.appendChild(editButton);
        liPreviewElement.appendChild(nextButton);

        ticketPreviewElement.appendChild(liPreviewElement);

        let editednumberOfticket = numberOfticketsElement.value;
        let editedSeating = seatingElement.value;
        let editedFullName = fullNameElement.value;
        let editedEmail = emailElement.value;
        let editedphoneNumber = phoneNumberElement.value;

        numberOfticketsElement.value = '';
        seatingElement.value = '';
        fullNameElement.value = '';
        emailElement.value = '';
        phoneNumberElement.value = '';

        purchaseButtonElement.disabled = true;


        editButton.addEventListener('click', onEdit)
        function onEdit() {
            numberOfticketsElement.value = editednumberOfticket;
            seatingElement.value = editedSeating;
            fullNameElement.value = editedFullName;
            emailElement.value = editedEmail;
            phoneNumberElement.value = editedphoneNumber;


            liPreviewElement.remove();
            purchaseButtonElement.disabled = false;
        }
        nextButton.addEventListener('click', onContinue)
        function onContinue() {

            let liElementPurchase = document.createElement('li')
            liElementPurchase.setAttribute('class', 'purchase')

            let articleElementPurchase = document.createElement('article')
            articleElementPurchase = articlePreviewElement;

            let buyButton = document.createElement('button')
            buyButton.setAttribute('class', 'buy-btn')
            buyButton.textContent = "Buy";

            liElementPurchase.appendChild(articleElementPurchase)
            liElementPurchase.appendChild(buyButton)

            ticketPurchaseElement.appendChild(liElementPurchase)

            liPreviewElement.remove();


            buyButton.addEventListener('click', onBuy);

            function onBuy() {
                ticketPurchaseElement.innerHTML = '';

                let thankYouMessage = document.createElement('h2');
                thankYouMessage.textContent = 'Thank you for your purchase!';
                thankMessageAndBackBtnPosition.appendChild(thankYouMessage);

                let backButton = document.createElement('button');
                backButton.textContent = 'Back';
                thankMessageAndBackBtnPosition.appendChild(backButton);

                backButton.addEventListener('click', () => {
                    thankYouMessage.remove();
                    backButton.remove();
                    purchaseButtonElement.disabled = false;
                });
            }
        }
    }
}