import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { deleteUser, getAllUsers } from '../actions/adminActions'
import Pagination from '../components/Pagination'
import Sidebar from '../components/Sidebar'
import Toggler from '../components/Toggler'
import { AiOutlineUserDelete } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import { BsChevronLeft } from 'react-icons/bs'
import { ADMIN_USER_DELETE_RESET } from '../constants/adminConstants'
import Meta from '../utils/Meta'

const AdminScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const adminGetAllUsers = useSelector(state => state.adminGetAllUsers)
    const { loading, users, pagination, nbrPages, page } = adminGetAllUsers

    const adminDeleteUser = useSelector(state => state.adminDeleteUser)
    const { success: successDelete } = adminDeleteUser

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/')
        } else if (!users || successDelete) {
            dispatch(getAllUsers())
            dispatch({
                type: ADMIN_USER_DELETE_RESET,
            })
        }
    }, [userInfo, successDelete, navigate, dispatch]);

    const [updatedToAdmin, setUpdatedToAdmin] = useState(false)

    const handleDeleteUser = (userId) => {
        if(window.confirm('Confirm user deletion?')) {
            dispatch(deleteUser(userId))
        }
    }

  return (
    <section className='admin'>
        <Sidebar />
        <Meta pageName='Admin Dashboard | Users' />
        <div className="main-admin">
            <header>
                Admin Dashboard / Users
                <p>manage users, offers and diffrent resources</p>
            </header>
            <div className="main-admin-content">
                <Link to='/dashboard' className='back'>
                    <BsChevronLeft className='icon' />
                </Link>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Member Since</th>
                            <th>Admin</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && users.map(user => {
                            return (
                                <tr>
                                    <td style={user.isCompany ? {fontWeight: '500'} : null}>
                                        {user.name}
                                    </td>
                                    <td>
                                        {user.email}
                                    </td>
                                    <td>
                                        {user.createdAt && user.createdAt.substr(0, 10).replaceAll('-', '/')}
                                    </td>
                                    <td>
                                        <div onClick={() => setUpdatedToAdmin(!updatedToAdmin)}>
                                            <Toggler isAdmin={user.isAdmin} userId={user._id} />
                                        </div>
                                    </td>
                                    <td>
                                        <div className="icons">
                                            <span className="button delete" title='delete user' onClick={() => handleDeleteUser(user._id)}>
                                                <AiOutlineUserDelete />
                                            </span>
                                            <Link to={`/freelancers/${user._id}`} className="button" title="user's profile">
                                                <CgProfile />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <Pagination pagination={pagination} nbrPages={nbrPages} page={page} type='users' />
            </div>
        </div>
    </section>
  )
}

export default AdminScreen