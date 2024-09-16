import { useEffect, useState } from "react";

const useModal = () => {
const [isOpen,setIsOpen]= useState(false);
const openModal = () => setIsOpen(true);
const closeModal = () => setIsOpen(false)

useEffect(()=>{
    const handlekeyPress = (event) => {
        if(event.key === 'ESCAPE')
            {
                closeModal()
            };
    }
    if(isOpen){
        window.addEventListener('keydown', handlekeyPress)
    }else{
        window.removeEventListener('keydown', handlekeyPress);
    }
    return () =>{
        window.removeEventListener('keydown', handlekeyPress);
    }

    },[isOpen])

    return{isOpen, openModal, closeModal}
};
export default useModal;
