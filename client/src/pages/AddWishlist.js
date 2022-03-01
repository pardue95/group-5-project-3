import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { SAVE_WISHLIST } from '../utils/mutations';

const AddWishlist = (props) => {
    const [newDescription, setDescription] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    const [newTitle, setTitle] = useState('');
    const [titleCount, setTitleCount] = useState(0);

    const [createNewWishlist] = useMutation(SAVE_WISHLIST);

    const { loading, data } = useQuery(QUERY_ME);
    const user = data?.me || {};
    const userID = user._id;

    if (loading) {
        return <div>Loading...</div>;
    }

    // checks you are logged in and a mother
    if (!user?.username || user.mother) {
        return (
            <h4>
                You need to be logged and be a Mother in order to see this. Use the navigation links above to
                sign up or log in!
            </h4>
        );
    }

    const handleDescriptionChange = (event) => {
        if (event.target.value.length <= 280) {
            setDescription(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };
    const handleTitleChange = (event) => {
        if (event.target.value.length <= 280) {
            setTitle(event.target.value);
            setTitleCount(event.target.value.length);
        }
    };



    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const selectedGender = document.getElementById('gender').options[document.getElementById('gender').selectedIndex].innerHTML;

        try {
            await createNewWishlist({
                variables: { userId: userID, title: newTitle, description: newDescription, gender: selectedGender }
            });

            window.location.replace("/profile");


        } catch (e) {
            console.error(e);
        }



    };


    return (
        <div>
            <h2>Create a New Wishlist</h2>
            <form>
                <label for='title'>Wishlist Title:  </label>
                <input type="text" id='title' name='title' value={newTitle} onChange={handleTitleChange} /> <br /><br />
                <textarea
                    placeholder='Leave a note for your guests...'
                    value={newDescription}
                    onChange={handleDescriptionChange}
                ></textarea><br />
                <label for='gender'>Baby's Gender  </label>
                <select id='gender' name='gender'>
                    <option value='Boy'>Boy</option>
                    <option value='Girl'>Girl</option>
                    <option value='n/a'>N/A</option>
                </select>
            </form>
            <button type='submit' onClick={handleFormSubmit}>Save New Wishlist</button>

        </div>
    );
};

export default AddWishlist;
