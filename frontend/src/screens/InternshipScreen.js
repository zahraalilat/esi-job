import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom'  
import { addInternshipStudent, getInternship, publicInternship } from '../actions/internshipActions'
import Sidebar from '../components/Sidebar'
import { determineMonth } from '../utils/determineMonth'
import { MdWorkOutline, MdWork } from 'react-icons/md'
import { BsChevronLeft, BsCheck2 } from 'react-icons/bs'
import Message from '../components/Message'
import createMarkup from '../utils/DOMSanitizer'
import { INTERNSHIP_ADD_STUDENT_RESET, INTERNSHIP_ALL_RESET, INTERNSHIP_PUBLIC_RESET } from '../constants/internshipConstants'
import Messanger from '../components/Messanger'
import Meta from '../utils/Meta'

const OfferScreen = () => {
    const { id } = useParams()

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const tab = location.state?.tab

    // company information
    const [companyId, setCompanyId] = useState('')
    const [companyName, setCompanyName] = useState('')
    const [companyImage, setCompanyImage] = useState('')
    const [companyEmail, setCompanyEmail] = useState('')
    const [companyAddress, setCompanyAddress] = useState('')
    const [companySite, setCompanySite] = useState('')
    const [companyPostalAddress, setCompanyPostalAddress] = useState('')

    // offer information
    const [internshipName, setInternshipName] = useState('')
    const [internshipDesc, setInternshipDesc] = useState('')
    const [internshipPlace, setInternshipPlace] = useState('')
    const [internshipPaymentIncluded, setInternshipPaymentIncluded] = useState(false)
    const [internshipStartDate, setInternshipStartDate] = useState('')
    const [internshipEndDate, setInternshipEndDate] = useState('')
    const [internshipTags, setInternshipTags] = useState('')
    const [internshipCreatedAt, setInternshipCreatedAt] = useState('')
    const [internshipApplicants, setInternshipApplicants] = useState([])
    const [internshipAccepted, setInternshipAccepted] = useState([])
    const [internshipIsPublic, setInternshipIsPublic] = useState(false)

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const internshipGet = useSelector(state => state.internshipGet)
    const { loading, error, internship } = internshipGet

    const internshipAddStudent = useSelector(state => state.internshipAddStudent)
    const { success } = internshipAddStudent

    const internshipPublic = useSelector(state => state.internshipPublic)
    const { success: successUpdateToPublic } = internshipPublic

    useEffect(() => {
        if (!userInfo) {
            navigate('/')
        } else if (!internship || success || successUpdateToPublic) {
            dispatch(getInternship(id))
        } else {
            setCompanyId(internship.company._id)
            setCompanyName(internship.company.name)
            setCompanyImage(internship.company.image)
            setCompanyEmail(internship.company.email)
            setCompanyAddress(internship.company.address)
            setCompanySite(internship.company.site)
            setCompanyPostalAddress(internship.company.postalAddress)
            setInternshipName(internship.name)
            setInternshipDesc(internship.desc)
            setInternshipPlace(internship.place)
            setInternshipPaymentIncluded(internship.paymentIncluded)
            setInternshipStartDate(internship.startDate)
            setInternshipEndDate(internship.endDate)
            setInternshipTags(internship.tags)
            setInternshipCreatedAt(internship.createdAt)
            setInternshipApplicants(internship.appliants)
            setInternshipIsPublic(internship.isPublic)
            setInternshipAccepted(internship.accepted)
        }
    }, [userInfo, dispatch, navigate, internship, id, success, successUpdateToPublic])

    useEffect(() => {
        if (error) {
            navigate('/profile')
        }
    }, [internship, navigate])

    useEffect(() => {
        if (success) {
            dispatch({
                type: INTERNSHIP_ADD_STUDENT_RESET,
            })
        }
    }, [success])

    useEffect(() => {
        if (successUpdateToPublic) {
            dispatch({
                type: INTERNSHIP_PUBLIC_RESET,
            })
        }
    }, [successUpdateToPublic])

    const handleUpdateToPublic = () => {
        dispatch(publicInternship(id, true))
        dispatch({
            type: INTERNSHIP_ALL_RESET,
        })
    }

  return (
    <section className='offer-details'>
        <Sidebar />
        <Messanger />
        <Meta pageName={internshipName} />
        <div className="main-offer-details">
                    <div className="offer-blog-parent">
                   <button onClick={() => navigate(tab ? '/positions' : -1, { state: tab })} className='back sbm'>
                        <BsChevronLeft />
                    </button>
                    {loading ? (
                       <div className='skelton-loader' style={{height: '430px'}} />
                    ) : (
                        <div className="offer-blog">
            {userInfo._id === companyId && (
                (!internshipIsPublic && (
                    <Message text='Your internship is pending approval by admins' success />
                ))
            )}
            {userInfo.isAdmin && (
                            <div className='admin-msg'>
                                {!internshipIsPublic && (
                                <>
                                    <Message text='This internship is pending approval by admins' success />
                                    <div className="back" onClick={handleUpdateToPublic}>
                                        <BsCheck2 />
                                    </div>
                                </>
                                )}
                            </div>
            )}
                <h1><span>#</span>{internshipName}</h1>
                <div className="heading">
                    <div className="img">
                        <img src={companyImage==='/images/default-user.png' ? '/images/default-user.png' : `/${companyImage}`} alt={companyName} />
                    </div>
                    <div className="offer-blog-company">
                        <Link to={`/freelancers/entreprise/${companyId}`} className='link'>{companyName}</Link>
                        <span className='date'><i className='bold'>published on </i>
                            {new Date(internshipCreatedAt).toDateString()}
                        </span>
                    </div>
                </div>
                <div className="offer-body">
                    <div dangerouslySetInnerHTML={createMarkup(internshipDesc)} className='editor-text' />
                </div>
                <div className="tags">
                    {internshipTags && internshipTags.split(',').map(skill => {
                        return (
                            <span className="skill">{skill}</span>
                        )
                    })}
                </div>
            </div>
                    )}
               </div>
            <div className="other-offers">
                {loading ? (
                    <div className='skelton-loader' style={{height: '170px', marginBottom: '1.5rem'}} />
                ) : (
                    <div className="offer-info">
                    <header className="card-header">
                        Internship details
                    </header>
                    <div className="offer-info-body">
                        <p className='place'><strong>Place</strong>{internshipPlace}</p>
                        <p><strong>Payment</strong><span className='payment-included'>{internshipPaymentIncluded ? 'Yes' : 'No'}</span></p>
                        <p><strong>Start Date</strong>
                            <span>
                                {internshipStartDate.substr(8, 2)} {determineMonth(internshipStartDate.substr(5, 2))} {internshipStartDate.substr(0, 4)}
                            </span>
                        </p>
                        <p><strong>End Date</strong>
                            {internshipEndDate ? (
                                <span className={Date.now() > new Date(internshipEndDate).getTime() ? 'ended' : 'available'}>
                                {internshipEndDate.substr(8, 2)} {determineMonth(internshipEndDate.substr(5, 2))} {internshipEndDate.substr(0, 4)}
                            </span>
                            ) : (
                                <span>Not specified</span>
                            )}
                        </p>
                    </div>
                    <div className="buttons" style={userInfo.isCompany ? {gridTemplateColumns: '1fr'} : null}>
                        <button className='light-btn applicants-btn' style={userInfo.isCompany ? {borderRight: 'none'} : null}>
                            {internship && internshipApplicants.length} Applicants
                        </button>
                        {!userInfo.isCompany && (
                            <button onClick={() => dispatch(addInternshipStudent(id))} className='light-btn' style={(internshipApplicants.includes(userInfo._id) || internshipAccepted.includes(userInfo._id)) ? {userSelect: 'none', pointerEvents: 'none', color: '#999'} : null}>
                                <span>
                                    {!internshipApplicants.includes(userInfo._id) ? <MdWorkOutline className='icon' /> : <MdWork className='icon' />}
                                    {(!internshipApplicants.includes(userInfo._id) && !internshipAccepted.includes(userInfo._id)) ? 'Apply' : 'Applied'}
                                </span>
                            </button>
                        )}
                    </div>
                </div>
                )}
                {loading ? (
                    <div className='skelton-loader' style={{height: '170px'}} />
                ) : (
                    <div className="offer-info">
                    <header className="card-header">
                        Company details
                    </header>
                    <div className="offer-info-body">
                        <p className='link'><strong>Email</strong><a href={`mailto:${{companyEmail}}`} rel='noopener'>{companyEmail}</a></p>
                        <p className='address'><strong>Address</strong>{companyAddress}</p>
                        <p><strong>Postal Address</strong>{companyPostalAddress}</p>
                        <p className='link'><strong>Website</strong><a href={`https://${{companySite}}`} rel='noopener'>{companySite}</a></p>
                    </div>
                </div>
                )}
            </div>
        </div>
    </section>
  )
}

export default OfferScreen