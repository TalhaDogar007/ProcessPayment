const ErrorHandler = require("../utils/errorHandler.js");
const db = require("../services/db");

const processPayment = async (req, res) => {
  try {
    const amount = req.body.amount;
    if (amount < 20) {
      const data = await cheapPaymentGateway(req.body);
      res.status(200).send({ success: true, data: "Payment is processed" });
    } else if (amount > 20 && amount < 500) {
      const data = await expensivePaymentGateway(req.body)
        .then((result) => {
          res.status(200).send({ success: true, data: "Payment is processed" });
        })
        .catch(async (error) => {
          const data = await cheapPaymentGateway(req.body);
          res.status(200).send({ success: true, data: "Payment is processed" });
        });
    } else {
      const data = await premiumPaymentGateway(req.body);
      if (data.success == false) {
        var retries = 3;
        var success = true;
        while (retries > 0) {
          if (!success == (await premiumPaymentGateway(req.body).success)) {
            retries--;
          } else {
            res
              .status(200)
              .send({ success: true, data: "Payment is processed" });
          }
        }
        res.status(500).send({ success: false });
      } else {
        res.status(200).send({ success: true, data: "Payment is processed" });
      }
    }
  } catch (error) {
    res.status(500).send({ success: false });
  }
};

const cheapPaymentGateway = (data) => {
  return new Promise(async function (resolve, reject) {
    try {
      const cardDetail = await db.getCreditCardData(data);
      resolve(cardDetail);
    } catch (error) {
      reject(error);
    }
  });
};

const expensivePaymentGateway = (data) => {
  return new Promise(async function (resolve, reject) {
    try {
      const cardDetail = await db.getCreditCardData(data);
      resolve(cardDetail);
    } catch (error) {
      reject(error);
    }
  });
};

const premiumPaymentGateway = async (data) => {
  try {
    const cardDetail = await db.getCreditCardData(data);
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

module.exports = {
  processPayment: processPayment,
};
