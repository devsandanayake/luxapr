const PricingModel = require('../models/PricingModel');


// Create a new pricing
const createPricing = async (adCode, transactionType, priceDetails) => {
    try {
        const newPricing = new PricingModel({
            adCode,
            transactionType,
            price: priceDetails
        });
        await newPricing.save();
        return newPricing;
    } catch (error) {
        throw new Error(`Error creating pricing: ${error.message}`);
    }
};


// get all pricings
const getPricing = async (adCode) => {
    try {
        const pricings = await PricingModel.findOne({adCode: adCode});
        return pricings;
    } catch (error) {
        throw new Error(`Error getting pricings: ${error.message}`);
    }
};

// get  specific pricing
const getPricingOne = async (adCode) => {
    try {
        const pricings = await PricingModel.findOne({adCode});
        return pricings;
    } catch (error) {
        throw new Error(`Error getting pricings: ${error.message}`);
    }
};


const calculatePrice = async (adCode, startDate, endDate) => {
    // Fetch the pricing data based on adCode
    const pricingData = await PricingModel.findOne({ adCode: adCode });
    const prices = pricingData.price;  // Extract the price array
   
    const start = new Date(startDate);
    const end = new Date(endDate);

    const StartYear = start.getFullYear();
    const StartMonth = start.getMonth() + 1;
    const EndYear = end.getFullYear();
    const EndMonth = end.getMonth() + 1;

    // Calculate total days between startDate and endDate
    const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    console.log("Total Days:", totalDays);

    // Function to get the number of days in a month
    const daysInMonth = (year, month) => new Date(year, month, 0).getDate();

    // Breakdown days by month
    let current = new Date(start);
    const breakdown = {};

    while (current <= end) {
        const year = current.getFullYear();
        const month = current.getMonth() + 1;
        const daysInCurrentMonth = daysInMonth(year, month);

        // Calculate days in the current month
        let days = 0;
        if (year === StartYear && month === StartMonth) {
            days = daysInCurrentMonth - current.getDate() + 1;
        } else if (year === EndYear && month === EndMonth) {
            days = end.getDate();
        } else {
            days = daysInCurrentMonth;
        }

        // Add to breakdown
        if (!breakdown[year]) {
            breakdown[year] = {};
        }
        breakdown[year][month] = days;

        // Move to the next month
        current.setMonth(current.getMonth() + 1);
        current.setDate(1);
    }

    // Calculate charges based on the breakdown and prices
    const chargesByMonth = {};

    for (const year in breakdown) {
        chargesByMonth[year] = {};
        const priceYear = prices.find(p => p.year === parseInt(year));

        if (priceYear) {
            for (const month in breakdown[year]) {
                const days = breakdown[year][month];
                const priceDetail = priceYear.details.find(d => month >= d.startMonth && month <= d.endMonth);

                if (priceDetail) {
                    const monthlyPrice = priceDetail.price;
                    const monthlyDays = daysInMonth(year, month);
                    const charge = (days / monthlyDays) * monthlyPrice;

                    chargesByMonth[year][month] = charge;
                }
            }
        }
    }
    return { totalDays, breakdown, chargesByMonth };
}
 

const editPricing = async (adCode, transactionType, priceDetails) => {
    try {
        const pricingData = await PricingModel.findOneAndUpdate(
            { adCode: adCode },
            {
                adCode: adCode,
                transactionType: transactionType,
                price: priceDetails
            },
            { new: true, upsert: true } // Create a new document if it doesn't exist
        );
        return pricingData;
    } catch (error) {
        console.error('Error editing pricing:', error);
        throw error;
    }
};
 
module.exports = {
    createPricing,
    getPricing,
    calculatePrice,
    editPricing,
    getPricingOne
};