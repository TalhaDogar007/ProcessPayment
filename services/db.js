const ErrorHandler = require("../utils/errorHandler.js");
const cardData = require("../data/dummyData");

const getCreditCardData = (data) => {
  return new Promise(async function (resolve, reject) {
    try {
      const cardDetail = cardData.find(
        ({ creditCardNumber }) => creditCardNumber === data.creditCardNumber
      );
      if (!cardDetail) {
        reject(new ErrorHandler("Data not found", 404));
      }
      if (!cardDetail.amount > data.amount) {
        reject(new ErrorHandler("insufficient balance", 402));
      }
      if (cardDetail.expirationDate !== data.expirationDate) {
        reject(new ErrorHandler("credit card is expired", 402));
      }
      resolve(cardDetail);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getCreditCardData: getCreditCardData,
};
