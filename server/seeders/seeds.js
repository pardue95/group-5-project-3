const faker = require('faker');

const db = require('../config/connection');
const { Gift, User, Wishlist } = require('../models');
const dateFormat = require('../utils/dateFormat');

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
    const date = faker.date.past(2);

    for (let i = 0; i < userData.length; i++) {
        const title = faker.lorem.words();
        const description = faker.lorem.sentence();
        const created = dateFormat(date);
        var gender = '';
        if (i % 2 === 0) {
            gender = 'girl';
        } else { gender = 'boy'; }

        const presents = [];

        // Populate wishlist w/presents
        for (let i = 0; i < Math.floor(Math.random() * 50); i++) {
            presents.push(giftData[i]._id);
        }

        wishlistData.push({ title, description, created, gender, presents });
    }

    const createdWishlists = await Wishlist.collection.insertMany(wishlistData);

    console.log(wishlistData[0]);
    console.log('all done!');
    process.exit(0);

});
