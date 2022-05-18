import React,{ useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deleteBookmark } from '../actions/userActions'
import { BsFillBookmarkFill, BsBookmark } from 'react-icons/bs'

const BookmarkCard = ({ bm }) => {

    const dispatch = useDispatch()

    const [full, setFull]= useState(true)

    const handleDeleteBookmark = (bookmarkId, docType) => {
        dispatch(deleteBookmark(bookmarkId, docType))
    }

  return (
    <article>
                                    <header>
                                        <span className={bm.neededSkills ? 'job offer' : bm.price ? 'training' : 'internship'}>
                                            {bm.neededSkills ? 'job offer' : bm.price ? 'training' : 'internship'}
                                        </span>
                                        <span className="bookmark" title='delete bookmark' onMouseOver={() => setFull(false)} onMouseOut={() => setFull(true)}>
                                                {full ? (
                                                    <BsFillBookmarkFill onClick={() => handleDeleteBookmark(bm._id, bm.neededSkills ? 'offer' : bm.price ? 'training' : 'internship')} />
                                                ) : (
                                                    <BsBookmark onClick={() => handleDeleteBookmark(bm._id, bm.neededSkills ? 'offer' : bm.price ? 'training' : 'internship')} />
                                                )}
                                        </span>
                                    </header>
                                    <Link to={bm.neededSkills ? `/offers/${bm._id}` : bm.price ? `/trainings/${bm._id}` : `/internships/${bm._id}`} className="title">{bm.name}</Link>
                                    <div className="tags">
                                        {bm.neededSkills && (
                                            bm.neededSkills.split(',').map(tag => {
                                                return (
                                                    <i>{tag}</i>
                                                )
                                            })
                                        )}
                                        {bm.tags && (
                                            bm.tags.split(',').map(tag => {
                                                return (
                                                    <i>{tag}</i>
                                                )
                                            })
                                        )}
                                    </div>
                                </article>
  )
}

export default BookmarkCard