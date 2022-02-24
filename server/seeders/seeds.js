const faker = require('faker');

const db = require('../config/connection');
const { Gift, User, Wishlist } = require('../models');

db.once('open', async () => {
    // Deletes Existing
    await Gift.deleteMany({});
    await User.deleteMany({});
    await Wishlist.deleteMany({});

    // Create User Data 
    const userData = [];

    for (let i = 0; i < 50; i++) {
        const username = faker.internet.userName();
        const email = faker.internet.email(username);
        const password = faker.internet.password();
        const mother = true;
        //faker.random.boolean();

        //console.log("Username: " + username + " Email: " + email + " Password: " + password + " Mother: " + mother);
        userData.push({ username, email, password, mother });
    }

    const createdUsers = await User.collection.insertMany(userData);
    console.log(`${userData.length} Users Created`);

    // Create Gift Data
    const giftData = [];

    for (let i = 0; i < 100; i++) {
        const title = faker.commerce.productName();
        const description = faker.lorem.sentence();
        const image = faker.image.imageUrl();

        //console.log("Title: " + title + " Description: " + description + " Image URL: " + image);
        giftData.push({ title, description, image });
    }

    const createdGifts = await Gift.collection.insertMany(giftData);
    console.log(`${giftData.length} Gifts Created`);

    // Create Wishlist Data
    const wishlistData = [];

    for (let i = 0; i < userData.length; i++) {
        const title = faker.lorem.words();
        const description = faker.lorem.sentence();
        var gender = '';
        if (i % 2 === 0) {
            gender = 'girl';
        } else { gender = 'boy'; }

        const gifts = [];

        // Populate wishlist w/gifts
        for (let i = 0; i < Math.floor(Math.random() * 50); i++) {
            gifts.push(giftData[i]);
        }

        wishlistData.push({ title, description, gender, gifts });
    }

    const createdWishlists = await Wishlist.collection.insertMany(wishlistData);

    console.log(wishlistData);
    console.log('all done!');
    process.exit(0);

});
