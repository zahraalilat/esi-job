import React, { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Sidebar from '../components/Sidebar'
import { BsFillBookmarkFill } from 'react-icons/bs'
import { getBookmarks } from '../actions/userActions'
import BookmarkCard from '../components/BookmarkCard'
import SearchNavbar from '../components/SearchNavbar'
import Messanger from '../components/Messanger'
import Meta from '../utils/Meta'

const BookmarksScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userGetBookmarks = useSelector(state => state.userGetBookmarks)
    const { bookmarks, loading } = userGetBookmarks

    const userDeleteBookmark = useSelector(state => state.userDeleteBookmark)
    const { success } = userDeleteBookmark

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (!userInfo) {
            navigate('/')
        } else {
            dispatch(getBookmarks())
        }
    }, [userInfo, dispatch, navigate, success]);

  return (
    <section className='bookmarks'>
        <Sidebar />
        <Messanger />
        <Meta pageName='ESI-JOB | Bookmarks' />
        <div className="main-bookmarks">
            <div className="search-navbar">
                <SearchNavbar noSearch />
            </div>
            <div className="main-bookmarks-content">
                <div className="heading">
                    <h1><BsFillBookmarkFill className='icon' />My Bookmarks</h1>
                    <div className="togglers">
                        <span>quick refrence</span>
                        <span>color classified</span>
                    </div>
                </div>
                <div className="main-bookmarks-content-grids">
                    {bookmarks && bookmarks.length === 0 ? (
                        <div className="empty">
                            <div className="empty-content">
                                <h2>It's Empty!</h2>
                                <p>Bookmark something for later!</p>
                            </div>
                        </div>
                    ) : !loading ? (
                        bookmarks && bookmarks.map(bm => {
                            return (
                                <BookmarkCard bm={bm} />
                            )
                        })
                    ) : (
                        <>
                            <article className='skelton-loader' style={{height: '140px', boxShadow: 'none'}}></article>
                            <article className='skelton-loader' style={{height: '140px', boxShadow: 'none'}}></article>
                            <article className='skelton-loader' style={{height: '140px', boxShadow: 'none'}}></article>
                        </>
                    )}
                </div>
            </div>
            <footer className="light-footer">
                All right reserved - &copy; ESI-JOB {new Date().getFullYear()}
            </footer>
        </div>
    </section>
  )
}

export default BookmarksScreen