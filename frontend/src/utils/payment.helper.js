import CryptoJS from "crypto-js";

export const buildEsewaPayload = (state, rentalId) => {
  // Use the Item ID and a timestamp to create a unique ID for this transaction
  // eSewa requires this to be unique every time.
  const transactionId = `RENT-${rentalId}-${Date.now()}`;

  const payload = {
    amount: state.totalAmount.toString(),
    tax_amount: "0",
    total_amount: state.totalAmount.toString(), // The final amount user pays
    transaction_uuid: transactionId,
    product_code: import.meta.env.VITE_ESEWA_MERCHANT_CODE,
    product_service_charge: "0",
    product_delivery_charge: "0",
    success_url: import.meta.env.VITE_ESEWA_SUCCESS_URL,
    failure_url: import.meta.env.VITE_ESEWA_FAILURE_URL,
    signed_field_names: "total_amount,transaction_uuid,product_code",
  };

  // ✅ HMAC-SHA256 Signature generation
  const secretKey = import.meta.env.VITE_ESEWA_SECRET_KEY;
  const message = `total_amount=${payload.total_amount},transaction_uuid=${payload.transaction_uuid},product_code=${payload.product_code}`;

  const hash = CryptoJS.HmacSHA256(message, secretKey);
  payload.signature = CryptoJS.enc.Base64.stringify(hash);

  return payload;
};

export const submitEsewaForm = (payload) => {
  const form = document.createElement("form");
  form.method = "POST";
  form.action = import.meta.env.VITE_ESEWA_PAYMENT_URL;

  Object.entries(payload).forEach(([key, value]) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = key;
    input.value = value;
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
};
