import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getUser } from '../actions/userActions'
import { FaMapMarkerAlt } from 'react-icons/fa'
import Loader from '../components/Loader'
import Sidebar from '../components/Sidebar'
import Messanger from '../components/Messanger'
import ProfileOffer from '../components/ProfileOffer'
import Meta from '../utils/Meta'

const CompanyProfileScreen = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { id } = useParams()

  const [name, setName]= useState('')
  const [email, setEmail] = useState('')
  const [bio, setBio] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [site, setSite] = useState('')
  const [image, setImage] = useState('')
  const [postalAddress, setPostalAddress] = useState('')
  const [offers, setOffers] = useState([])
  const [trainings, setTrainings] = useState([])
  const [compnayInternships, setCompnayInternships] = useState([])

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const userGet = useSelector(state => state.userGet)
  const { user, loading: profileInfoLoading } = userGet

  useEffect(() => {
    if (!userInfo) {
      navigate('/')
    } else {
      dispatch(getUser(id))
    }
  }, [dispatch, navigate, userInfo, id])

  useEffect(() => {
      if (user) {
        setName(user.name)
        setEmail(user.email)
        setBio(user.bio)
        setPhone(user.phone)
        setAddress(user.address)
        setSite(user.address)
        setImage(user.image)
        setPostalAddress(user.postalAddress)
        setOffers(user.offers)
        setTrainings(user.trainings)
        setCompnayInternships(user.compnayInternships)
      }
  }, [user])

  const [showMore, setShowMore] = useState(3) 
  const [showMoreBtn, setShowMoreBtn] = useState('Load All')
  
  const [showMoreTrainings, setShowMoreTrainings] = useState(3) 
  const [showMoreBtnTrainings, setShowMoreBtnTrainings] = useState('Load All')

  const [showMoreInternships, setShowMoreInternships] = useState(3) 
  const [showMoreBtnInternships, setShowMoreBtnInternships] = useState('Load All')

  const handleShowMore = () => {
    if (showMoreBtn === 'Load All') {
      setShowMore(offers.length+1)
      setShowMoreBtn('Load Less')
    } else {
      setShowMore(3)
      setShowMoreBtn('Load All')
    }
  }

  const handleShowMoreTrainings = () => {
    if (showMoreBtnTrainings === 'Load All') {
      setShowMoreTrainings(trainings.length+1)
      setShowMoreBtnTrainings('Load Less')
    } else {
      setShowMoreTrainings(3)
      setShowMoreBtnTrainings('Load All')
    }
  }

  const handleShowMoreInternships = () => {
    if (showMoreBtnInternships === 'Load All') {
      setShowMoreInternships(compnayInternships.length+1)
      setShowMoreBtnInternships('Load Less')
    } else {
      setShowMoreInternships(3)
      setShowMoreBtnInternships('Load All')
    }
  }

  return (
    <section className='profile'>
      <Sidebar />
      <Messanger />
      <Meta pageName={`${name} | Profile`} />
      <article className="main-profile">
          <div className="main-profile-content">
          <div className="user-details">
              <div className="img">
                {profileInfoLoading ? (
                  <div className="skelton-image"></div>
                ) : (
                    <img src={image === '/images/default-user.png' ? '/images/default-user.png' : `/${image}`} alt={name} />
                )}
              </div>
              <div className="user-name-type">
                {profileInfoLoading ? (
                  <div className="skelton-loader" style={{marginBottom: '1.7rem'}}></div>
                ) : (
                  <p className='username'>{name}</p>
                )}
                {profileInfoLoading ? (
                  <div className="skelton-loader" style={{marginBottom: '0.4rem'}}></div>
                ) : address &&  (
                  <span className='address'>
                    <FaMapMarkerAlt className='icon' />
                    {address}
                  </span>
                )}
                {profileInfoLoading ? (
                  <div className="skelton-loader"></div>
                ) : bio && (
                  <div className='bio'>
                    <span>
                      {bio}
                    </span>
                  </div>
                )}
              </div>
            </div>
                  <section className="offers">
                    <header>
                        <div className='header-title'>
                            <p>Job Offers</p>
                              {offers && (
                                <span>{offers.length} Job offers history</span>
                              )}
                        </div>
                    </header>
                    {!profileInfoLoading ? (
                      <>
                        {offers && offers.length > 0 && (
                      <div className="company-offers">
                        {
                          offers && offers.length > 0 && (
                            offers.slice(0, showMore).map((ofr) => {
                              return (
                                <ProfileOffer {...ofr} disactivateEdits />
                              )
                            })
                          )
                        }
                      {offers && offers.length > 3 && (
                        <button className='light-btn' onClick={handleShowMore}>{showMoreBtn}</button>
                      )}
                    </div>
                    )}
                      </>
                    ) : (
                      <div style={{textAlign: 'center'}}>
                        <Loader additionalClass={'offers-l'} />
                      </div>
                    )}
                  </section>
                  <section className="offers">
                    <header>
                        <div className='header-title'>
                            <p>Trainings</p>
                              {trainings && (
                                <span>{trainings.length} Trainings history</span>
                              )}
                        </div>
                    </header>
                    {!profileInfoLoading ? (
                      <>
                        {trainings && trainings.length > 0 && (
                      <div className="company-offers">
                       {
                         trainings && trainings.length > 0 && (
                          trainings.slice(0, showMoreTrainings).map((tr) => {
                          return (
                            <ProfileOffer {...tr} disactivateEdits />
                          )
                        })
                         )
                       }
                      {trainings && trainings.length > 3 && (
                        <button className='light-btn' onClick={handleShowMoreTrainings}>{showMoreBtnTrainings}</button>
                      )}
                    </div>
                    )}
                      </>
                    ) : (
                      <div style={{textAlign: 'center'}}>
                        <Loader additionalClass='offers-l' />
                      </div>
                    )}
                  </section>

                  <section className="offers">
                    <header>
                        <div className='header-title'>
                            <p>Internships</p>
                              {compnayInternships && (
                                <span>{compnayInternships.length} Internships history</span>
                              )}
                        </div>
                    </header>
                    {!profileInfoLoading ? (
                      <>
                         {compnayInternships && compnayInternships.length > 0 && (
                      <div className="company-offers">
                       {
                         compnayInternships && compnayInternships.length > 0 && (
                            compnayInternships.slice(0, showMoreInternships).map((intr) => {
                          return (
                            <ProfileOffer {...intr} disactivateEdits />
                          )
                        })
                         )
                       }
                      {compnayInternships && compnayInternships.length > 3 && (
                        <button className='light-btn' onClick={handleShowMoreInternships}>{showMoreBtnInternships}</button>
                      )}
                    </div>
                    )}
                      </>
                    ) : (
                      <div style={{textAlign: 'center'}}>
                        <Loader additionalClass='offers-l' />
                      </div>
                    )}
                  </section>
          </div>
          <div className="secondary-content">
            {!profileInfoLoading ? (
              <>
                <div className="contact-information">
              <header>
                Contact information
              </header>
              <div className="main-contact-information">
                  <p>
                    <strong>E-mail</strong>
                    <a href={`mailto: ${email}`} rel='noopener'>{email}</a>
                  </p>
                {phone && (
                  <p>
                    <strong>Phone</strong>
                    {phone}
                  </p>
                )}
                {site && (
                  <p>
                    <strong>Website</strong>
                    <a href={`https://${site}`} target='_blank' rel='noopener'>{site}</a>
                  </p>
                )}
                {postalAddress && (
                  <p>
                    <strong>Postal Address</strong>
                    {postalAddress}
                  </p>
                )}
              </div>
            </div>
              </>
            ) : (
              <>
                <div className='skelton-loader' style={{height: '140px', marginBottom: '1rem'}}></div>
                <div className='skelton-loader' style={{height: '180px'}}></div>
              </>
            )}
          </div>
      </article>
    </section>
  )
}

export default CompanyProfileScreen