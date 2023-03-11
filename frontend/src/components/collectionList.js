//This page is for collection lists
//This page could be similar to search page but its results are based on the collections
import * as React from 'react';
import {useNavigate,useLocation} from 'react-router-dom';


function CollectionPage() {
    const location = useLocation();
    console.log({location});
    
    return (
        <div>
            <text>This is CollectionPage!!</text>
            <img src={ require('../collectionpage.png') } />
        </div>
    );
}

export default CollectionPage;