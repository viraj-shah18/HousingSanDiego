import * as React from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Collection from "./collection"; 
import { IconButton } from '@mui/material';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';

export default function CollectionPopup () {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false)

    return (
        <>
        <IconButton onClick={handleOpen}><CollectionsBookmarkIcon/></IconButton>
        <Button onClick={handleOpen}></Button>
            <Modal open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Collection/>
            </Modal>
        </>
    );
}