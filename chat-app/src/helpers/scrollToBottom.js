import {animateScroll} from 'react-scroll';

export const scrollToBottom = (id) => {
    
    animateScroll.scrollTo(999999,{
        containerId: id,
        duration: 0
    })

}

export const scrollToBottomAnimated = (id) => {
    
    animateScroll.scrollTo(999999,{
        containerId: id,
        duration: 250
    })

}