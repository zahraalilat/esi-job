import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { RiMedal2Line } from 'react-icons/ri'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { IoTimeOutline, IoNewspaperOutline } from 'react-icons/io5'
import Sidebar from '../components/Sidebar'
import Messanger from '../components/Messanger'
import { determineMonth } from '../utils/determineMonth'
import { getUser } from '../actions/userActions'
import { RiSendPlaneFill } from 'react-icons/ri'
import { getExistConvo, startConvo } from '../actions/convoActions'
import Loader from '../components/Loader'
import { CONVO_START_RESET } from '../constants/convoConstants'
import Meta from '../utils/Meta'

const StudentProfileScreen = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { id } = useParams()

  const [name, setName]= useState('')
  const [email, setEmail] = useState('')
  const [bio, setBio] = useState('')
  const [skills, setSkills] = useState([])
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [site, setSite] = useState('')
  const [image, setImage] = useState('')
  const [jobExperience, setJobExperience] = useState(0)
  const [certifications, setCertifications] = useState(0)
  const [internships, setInternships] = useState(0)

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const userGet = useSelector(state => state.userGet)
  const { loading: profileInfoLoading, user } = userGet

  const convoStart = useSelector(state => state.convoStart)
  const { success: successStartConvo, convo, loading: loadingStartConvo } = convoStart

  const convoExistConvo = useSelector(state => state.convoExistConvo)
  const { convoId, error, success: successConvoExist, loading: loadingConvoExist } = convoExistConvo

  useEffect(() => {
    if (!userInfo) {
        navigate('/')
    } else {
        dispatch(getUser(id))
    }
  }, [dispatch, navigate, userInfo, id])

  useEffect(() => {
      if (successStartConvo) {
          navigate(`/conversations/${convo._id}`)
      }
  }, [successStartConvo, navigate])

  useEffect(() => {
      if (user) {
        setName(user.name)
        setEmail(user.email)
        setBio(user.bio)
        setSkills(user.skills)
        setPhone(user.phone)
        setAddress(user.address)
        setSite(user.site)
        setImage(user.image)
        setJobExperience(user.jobExperience)
        setCertifications(user.certifications)
        setInternships(user.internships)
      }
  }, [user])

  const handleStartConvo = () => {
      dispatch(getExistConvo(id))
  }

  useEffect(() => {
      if (convoId) {
        navigate(`/conversations/${convoId}`)
      } else if (error) {
        dispatch(startConvo(id))
      }
  }, [error, id, convoId, dispatch])

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
              <button className='edit light-btn' onClick={handleStartConvo}>
                    {loadingStartConvo || loadingConvoExist ? (
                        <span style={{marginRight: '0.4rem', display: 'grid', placeItems: 'center'}}>
                            <Loader />
                        </span>
                        ) : (
                            <>
                                <RiSendPlaneFill className='icon' />
                            </>
                    )}
                    Message
              </button>
            </div>
                <div className='user-static-info'>
                <article>
                  <IoTimeOutline className='icon' />
                  <div className="heading">
                    <p>{jobExperience}+ Years Job</p>
                    <span>Experienced</span>
                  </div>
                </article>
                <article>
                  <RiMedal2Line className='icon' />
                  <div className="heading">
                    <p>{certifications} Certificates</p>
                    <span>Achieved</span>
                  </div>
                </article>
                <article>
                  <IoNewspaperOutline className='icon' />
                  <div className="heading">
                    <p>{internships} Internships</p>
                    <span>Completed</span>
                  </div>
                </article>
              </div>
                      <section className="experiences">
                      <header>
                        <div className='header-title'>
                          <p>Job Experience</p>
                          {user && user.experiences && (
                            <span>{user.experiences.length} Job history</span>
                          )}
                        </div>
                      </header>
                      <div className="main-experiences">
                        {user && user.experiences.map((experience, index) => {
                          return (
                            <article key={index}>
                              <div className="heading">
                                <div className="img-job-titles">
                                  <div className="img-container">
                                  </div>
                                  <div className="job-titles">
                                    <p>{experience.title}</p>
                                    <span>{experience.company}</span>
                                  </div>
                                </div>
                                <div className="job-timing">
                                  <IoTimeOutline className='icon' />
                                  {determineMonth(experience.startDate.substr(5, 2))} {experience.startDate.substr(0, 4)} - {determineMonth(experience.endDate.substr(5, 2))} {experience.endDate.substr(0, 4)}
                                </div>
                                <div className="job-place">
                                  <FaMapMarkerAlt className='icon' />
                                  {experience.city}
                                </div>
                              </div>
                              <div className="job-details">
                                {experience.desc}
                              </div>
                            </article>
                          )
                        })}
                      </div>
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
              </div>
            </div>
            {user && user.skills && user.skills.length > 0 && (
              <div className="skills">
              <header>
                List of skills
              </header>
              <div className="main-skills-content">
                {skills && skills.length > 0 && skills.map(skill => {
                  return (
                    <article>
                      <p className='skill-name'>{skill.name}</p>
                      <div className="perc">
                        <div className="inner-perc" style={{width: `${skill.perc}%`}}></div>
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>
            )}
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

export default StudentProfileScreen