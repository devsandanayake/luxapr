const auctionServiceModel = require('../models/auctionServiceModel');
const adsModel = require('../models/ads');
const UserModel = require('../models/user');

// Validate input
const validateInput = (auctionID, adCode) => {
    if (!auctionID || !adCode) {
        throw new Error('Invalid input: auctionID and adCode are required');
    }
};

// Register auction service
const registerAuctionService = async (req, res) => {
    try {
        const { auctionID, adCode } = req.body;
        const username = req.user;

        validateInput(auctionID, adCode);

        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const ad = await adsModel.findOne({ adCode });
        if (!ad) {
            return res.status(404).json({ message: 'Ad not found' });
        }

        // Create a new auction service entry
        const newAuctionService = {
            auctionID,
            username,
            adCode
        };

        // Add the new auction service to the user's auctionService array
        user.auctionService.push(newAuctionService);

        // Save the updated user
        await user.save();

        const auctionService = new auctionServiceModel({
            auctionID,
            username,
            adCode
        });
        await auctionService.save();

        res.status(201).json({ message: 'Auction service registered' });
    } catch (err) {
        console.error('Error registering auction service:', err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    registerAuctionService
};
