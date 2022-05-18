import DOMPurify from 'dompurify'

const createMarkup = (html) => {
    return {
        __html: DOMPurify.sanitize(html)
    }
}

export default createMarkup