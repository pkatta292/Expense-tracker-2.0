function onGooglePayLoaded() {
    const paymentsClient = new google.payments.api.PaymentsClient({
        environment: 'TEST', // 'TEST' for testing, 'PRODUCTION' for production
    });

    const button = paymentsClient.createButton({
        onClick: onGooglePayButtonClick,
    });

    document.getElementById('google-pay-button').appendChild(button);
}

function onGooglePayButtonClick() {
    const paymentDataRequest = {
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: [
            {
                type: 'CARD',
                parameters: {
                    allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                    allowedCardNetworks: ['AMEX', 'DISCOVER', 'JCB', 'MASTERCARD', 'VISA'],
                },
                tokenizationSpecification: {
                    type: 'PAYMENT_GATEWAY',
                    parameters: {
                        gateway: 'example',
                        gatewayMerchantId: 'exampleGatewayMerchantId',
                    },
                },
            },
        ],
        merchantInfo: {
            merchantId: 'YOUR_MERCHANT_ID',
            merchantName: 'Your Merchant Name',
        },
        transactionInfo: {
            totalPriceStatus: 'FINAL',
            totalPrice: '10.00',
            currencyCode: 'USD',
        },
    };

    const paymentOptions = {
        transactionInfo: paymentDataRequest.transactionInfo,
        merchantInfo: paymentDataRequest.merchantInfo,
        paymentData: {
            allowDebit: true,
            allowCredit: true,
            tokenizationSpecification: paymentDataRequest.allowedPaymentMethods[0].tokenizationSpecification,
            cardRequirements: {
                allowedCardNetworks: paymentDataRequest.allowedPaymentMethods[0].parameters.allowedCardNetworks,
                billingAddressRequired: true,
                billingAddressFormat: 'FULL',
            },
        },
    };

    const paymentsClient = new google.payments.api.PaymentsClient({ environment: 'TEST' });

    paymentsClient.loadPaymentData(paymentDataRequest)
        .then(paymentData => {
            // Handle the payment data, e.g., send it to your server for processing
            console.log('PaymentData', paymentData);
        })
        .catch(error => {
            console.error('Error loading payment data', error);
        });
}
