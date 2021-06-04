import {type} from '../../type'


export const openModal = () => ({
    type: type.uiOpenModal 
})

export const closeModal = () => ({
    type: type.uiCloseModal
})