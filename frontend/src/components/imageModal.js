import React from "react";
import { Modal, Box } from "@mui/material";

const ImageModal =({open, image, onClose}) => {
    return(
    <Modal open={open} onClose={onClose}>
        <Box
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 2,
                outline: 'none',

            }}>
                <img src={image} alt="Large Image Focus" style={{maxWidth: '100%', maxHeight: '100%'}}/>
        </Box>
    </Modal>)
};
export default ImageModal;