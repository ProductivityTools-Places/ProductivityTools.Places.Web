import React, { useEffect, useState } from 'react';
import { config } from '../../config.js';

const CLIENT_ID = '93484780890-ek2408cguitm92cjcgb7phtb3kd6k0kr.apps.googleusercontent.com'; // Please replace with your OAuth Client ID
const API_KEY = 'AIzaSyBxY4oT4SZd5r-nZiM1eFFnUCcC3UxgYr4'; // From firebase.js
const APP_ID = '93484780890'; // Project number from appId in firebase.js

function PhotoPickerPage() {
    const [accessToken, setAccessToken] = useState(null);
    const [tokenClient, setTokenClient] = useState(null);

    useEffect(() => {
        const initializeGis = () => {
            const client = window.google.accounts.oauth2.initTokenClient({
                client_id: CLIENT_ID,
                scope: 'https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/photoslibrary.readonly',
                callback: (response) => {
                    if (response.error !== undefined) {
                        throw response;
                    }
                    setAccessToken(response.access_token);
                    createPicker(response.access_token);
                },
            });
            setTokenClient(client);
        };

        const loadGapi = () => {
            window.gapi.load('client:picker', () => {
                console.log('GAPI client and picker loaded');
            });
        };

        if (window.google && window.google.accounts) {
            initializeGis();
        }
        if (window.gapi) {
            loadGapi();
        }
    }, []);

    const handleAuthClick = () => {
        const sharedToken = localStorage.getItem('googleAccessToken');
        if (sharedToken) {
            console.log("Using shared token from localStorage:", sharedToken);
            setAccessToken(sharedToken);
            createPicker(sharedToken);
            return;
        }
        if (tokenClient) {
            if (accessToken === null) {
                tokenClient.requestAccessToken({ prompt: 'consent' });
            } else {
                tokenClient.requestAccessToken({ prompt: '' });
            }
        }
    };

    const createPicker = (token) => {
        const view = new window.google.picker.View(window.google.picker.ViewId.PHOTOS);

        const picker = new window.google.picker.PickerBuilder()
            .enableFeature(window.google.picker.Feature.SHOW_FOLDERS)
            .addView(view)
            .setAppId(APP_ID)
            .setOAuthToken(token)
            .setDeveloperKey(API_KEY)
            .setOrigin(window.location.origin)
            .setCallback(pickerCallback)
            .build();
        picker.setVisible(true);
    };

    const pickerCallback = (data) => {
        if (data.action === window.google.picker.Action.PICKED) {
            const doc = data.docs[0];
            console.log('Picked document:', doc);
            alert(`You picked: ${doc.name}`);
        }
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Google Photos Picker</h1>
            <p>Click the button below to select a photo from your Google Photos library.</p>
            <button onClick={handleAuthClick} style={{ padding: '10px 20px', fontSize: '16px' }}>
                Open Photo Picker
            </button>
            {accessToken && <p style={{ color: 'green', marginTop: '10px' }}>Authenticated!</p>}
            <div style={{ marginTop: '20px', color: '#ff0000' }}>
                {CLIENT_ID === '<YOUR_CLIENT_ID>' && (
                    <p><strong>⚠️ Action Required:</strong> Please replace <code>CLIENT_ID</code> in <code>src/Components/PhotoPicker/index.js</code> with your actual OAuth Client ID from Google Cloud Console.</p>
                )}
            </div>
        </div>
    );
}

export default PhotoPickerPage;
