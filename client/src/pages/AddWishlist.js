import React, { useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import GiftsList from '../components/GiftsList';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

const AddWishlist = (props) => {
    const [description, setDescription] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    const { userParam } = useParams();
    const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
        variables: { username: userParam },
    });
    const user = data?.me || data?.user || {};

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

    const handleChange = (event) => {
        if (event.target.value.length <= 280) {
            setDescription(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };

    const handleFormSubmit = async (event) => {
        // event.preventDefault();

        console.log(event);


    };


    return (
        <div>
            <h2>Create a New Wishlist</h2>
            <form
                onSubmit={handleFormSubmit}//NOT WORKING
            >
                <label for='title'>Wishlist Title:  </label>
                <input type="text" id='title' name='title' /> <br /><br />
                <textarea
                    placeholder='Leave a note for your guests...'
                    value={description}
                    onChange={handleChange}
                ></textarea><br />
                <label for='gender'>Baby's Gender  </label>
                <select id='gender' name='gender'>
                    <option value='Boy'>Boy</option>
                    <option value='Girl'>Girl</option>
                    <option value='n/a'>N/A</option>
                </select>
            </form>
            <button type='submit'>Save New Wishlist</button>

            <div>
                <GiftsList userData={user}></GiftsList>
            </div>
        </div>
    );
};

export default AddWishlist;
