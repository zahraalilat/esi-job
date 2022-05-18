import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { RiShieldStarFill } from 'react-icons/ri'
import { IoSchoolOutline } from 'react-icons/io5'
import { MdWorkOutline, MdOutlineHomeWork } from 'react-icons/md'
import { FiUsers } from 'react-icons/fi'
import Meta from '../utils/Meta'

const DashboardScreen = () => {
    const navigate = useNavigate()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (!userInfo.isAdmin) {
            navigate('/')
        }
    }, [navigate, userInfo])

  return (
    <section className='bookmarks'>
        <Sidebar />
        <Meta pageName={`Admin Dashboard`} />
        <div className="main-bookmarks" style={{padding: '4rem 0'}}>
            <div className="main-bookmarks-content">
                <div className="heading">
                    <h1><RiShieldStarFill className='icon' />Admin Dashboard</h1>
                    <div className="togglers">
                        <span>manage all resources</span>
                        <span>easy UI</span>
                    </div>
                </div>
                <div className="main-bookmarks-content-grids">
                    <article>
                        <div className="top-header">
                            <span className="icon users">
                                <FiUsers />
                            </span>
                            <Link to='/admin/users' className="title">Manage Users</Link>
                        </div>
                        <p className="desc">update users to admins, delete users and watch profiles</p>
                    </article>
                    <article>
                        <div className="top-header">
                            <span className="icon offers">
                                <MdWorkOutline />
                            </span>
                            <Link to='/admin/offers' className="title">Manage Offers</Link>
                        </div>
                        <p className="desc">validate offers, publish them, and delete offers</p>
                    </article>
                    <article>
                        <div className="top-header">
                            <span className="icon trainings">
                                <IoSchoolOutline />
                            </span>
                            <Link to='/admin/trainings' className="title">Manage Trainings</Link>
                        </div>
                        <p className="desc">validate trainings, publish them, and delete trainings</p>
                    </article>
                    <article>
                        <div className="top-header">
                            <span className="icon internships">
                                <MdOutlineHomeWork />
                            </span>
                            <Link to='/admin/internships' className="title">Manage Internships</Link>
                        </div>
                        <p className="desc">validate internships, publish them, and delete internships</p>
                    </article>
                </div>
            </div>
            <footer className="light-footer">
                All right reserved - &copy; ESI-JOB {new Date().getFullYear()}
            </footer>
        </div>
    </section>
  )
}

export default DashboardScreen