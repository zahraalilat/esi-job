import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { 
  deleteField, 
  listProfile, 
  newExperience, 
  updateProfile, 
  newSkill, 
  deleteSkill 
} from '../actions/userActions'
import { BiHide, BiShowAlt } from 'react-icons/bi'
import { BiEdit } from 'react-icons/bi'
import { MdOutlineAdd, MdOutlineClose } from 'react-icons/md'
import { RiDeleteBin7Line, RiMedal2Line } from 'react-icons/ri'
import { FaUserCircle, FaMapMarkerAlt } from 'react-icons/fa'
import { IoTimeOutline, IoNewspaperOutline, IoCloseOutline } from 'react-icons/io5'
import axios from 'axios'
import Loader from '../components/Loader'
import { 
  USER_DELETE_FIELD_RESET, 
  USER_DELETE_SKILL_RESET, 
  USER_NEW_EXPERIENCE_RESET, 
  USER_NEW_SKILL_RESET, 
  USER_PROFILE_UPDATE_RESET 
} from '../constants/userConstants'
import Sidebar from '../components/Sidebar'
import Messanger from '../components/Messanger'
import { createOffer, listCompanyOffers } from '../actions/offerActions'
import { OFFER_ACCEPT_DELETE_STUDENT_RESET, OFFER_CREATE_RESET, OFFER_GET_RESET, OFFER_REMOVE_RESET } from '../constants/offerConstants'
import { determineMonth } from '../utils/determineMonth'
import ProfileOffer from '../components/ProfileOffer'
import { convertToRaw, EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import { createTraining, listTrainings } from '../actions/trainingActions';
import { TRAINING_ACCEPT_DELETE_STUDENT_RESET, TRAINING_CREATE_RESET, TRAINING_DELETE_RESET, TRAINING_GET_RESET } from '../constants/trainingConstants';
import { INTERNSHIP_ACCEPT_DELETE_STUDENT_RESET, INTERNSHIP_CREATE_RESET, INTERNSHIP_DELETE_RESET, INTERNSHIP_GET_RESET } from '../constants/internshipConstants';
import { createInternship, listInternships } from '../actions/internshipActions';
import Meta from '../utils/Meta'

const ProfileScreen = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // wysiwyg
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  const [name, setName]= useState('')
  const [email, setEmail] = useState('')
  const [bio, setBio] = useState('')
  const [skills, setSkills] = useState([])
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [site, setSite] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [image, setImage] = useState('')
  const [isCompany, setIsCompany] = useState(false)
  const [jobExperience, setJobExperience] = useState(0)
  const [certifications, setCertifications] = useState(0)
  const [internships, setInternships] = useState(0)
  const [postalAddress, setPostalAddress] = useState('')

  // Experience fields
  const [title, setTitle] = useState('')
  const [company, setCompany] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [desc, setDesc] = useState('')
  const [city, setCity] = useState('')

  // skill fields
  const [skillName, setSkillName] = useState('')
  const [skillPerc, setSkillPerc] = useState('')

  // offer fields
  const [offerTitle, setOfferTitle] = useState('')
  const [offerPlace, setOfferPlace] = useState('')
  const [offerStartDate, setOfferStartDate] = useState('')
  const [offerEndDate, setOfferEndDate] = useState('2090-01-01')
  const [offerDesc, setOfferDesc] = useState('')
  const [offerRequiredSkills, setOfferRequiredSkills] = useState('')

  // training fields
  const [trainingName, setTrainingName]= useState('')
  const [trainingDesc, setTrainingDesc]= useState('')
  const [trainingPlace, setTrainingPlace]= useState('')
  const [trainingPrice, setTrainingPrice]= useState('')
  const [trainingStartDate, setTrainingStartDate]= useState('')
  const [trainingEndDate, setTrainingEndDate]= useState('2090-01-01')
  const [trainingTags, setTrainingTags]= useState('')

  // internship fields
  const [internshipName, setInternshipName]= useState('')
  const [internshipDesc, setInternshipDesc]= useState('')
  const [internshipPlace, setInternshipPlace]= useState('')
  const [internshipStartDate, setInternshipStartDate]= useState('')
  const [internshipEndDate, setInternshipEndDate]= useState('2090-01-01')
  const [internshipTags, setInternshipTags]= useState('')
  const [internshipPaymentIncluded, setInternshipPaymentIncluded]= useState(false)

  const [type, setType] = useState('password')
  const [typeConfirm, setTypeConfirm] = useState('password')

  const [edit, setEdit] = useState(false)

  const [add, setAdd] = useState(false)

  const [addOffer, setAddOffer] = useState(false)

  const [addTraining, setAddTraining] = useState(false)

  const [addInternship, setAddInternship] = useState(false)

  const userProfile = useSelector(state => state.userProfile)
  const { user, loading: profileInfoLoading } = userProfile

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  
  const userProfileUpdate = useSelector(state => state.userProfileUpdate)
  const { loading, success, error } = userProfileUpdate

  const userDeleteField = useSelector(state => state.userDeleteField)
  const { success: successDeleteField } = userDeleteField

  const userAddExperience = useSelector(state => state.userAddExperience)
  const { loading: addExperienceLoading, success: addExperienceSuccess } = userAddExperience

  const userAddSkill = useSelector(state => state.userAddSkill)
  const { loading: addSkillLoading, success: addSkillSuccess } = userAddSkill

  const userDeleteSkill = useSelector(state => state.userDeleteSkill)
  const { success: deleteSkillSuccess } = userDeleteSkill
 
  const offerCreate = useSelector(state => state.offerCreate)
  const { loading: offerLoading, success: offerSuccess } = offerCreate
 
  const offerGetAll = useSelector(state => state.offerGetAll)
  const { offers, loading: offersLoading } = offerGetAll
 
  const offerDelete = useSelector(state => state.offerDelete)
  const { success: offerDeleteSuccess } = offerDelete
 
  const trainingCreate = useSelector(state => state.trainingCreate)
  const { loading: trainingCreateLoading, success: trainingCreateSuccess } = trainingCreate
 
  const trainingDelete = useSelector(state => state.trainingDelete)
  const { success: trainingDeleteSuccess } = trainingDelete
 
  const trainingGetAll = useSelector(state => state.trainingGetAll)
  const { trainings, loading: trainingsLoading } = trainingGetAll

  const internshipCreate = useSelector(state => state.internshipCreate)
  const { loading: internshipCreateLoading, success: internshipCreateSuccess } = internshipCreate

  const internshipDelete= useSelector(state => state.internshipDelete)
  const { success: internshipDeleteSuccess } = internshipDelete
 
  const internshipGetAll = useSelector(state => state.internshipGetAll)
  const { internships: companyInternships, loading: internshipsLoading } = internshipGetAll

  const offerAcceptDeleteStudent = useSelector(state => state.offerAcceptDeleteStudent)
  const { success: successDelete, loading: loadingDelete } = offerAcceptDeleteStudent

  const trainingAcceptDeleteStudent = useSelector(state => state.trainingAcceptDeleteStudent)
  const { success: trainingSuccessDelete, loading: trainingLoadingDelete } = trainingAcceptDeleteStudent

  const internshipAcceptDeleteStudent = useSelector(state => state.internshipAcceptDeleteStudent)
  const { success: internshipSuccessDelete, loading: internshipLoadingDelete } = internshipAcceptDeleteStudent

  useEffect(() => {
    if (!userInfo) {
      navigate('/')
    } else {
      dispatch(listProfile())
      dispatch(listCompanyOffers(userInfo._id))
      dispatch(listTrainings())
      dispatch(listInternships())
    }
  }, [userInfo])

  useEffect(() => {
    if (!userInfo ) {
      navigate('/')
    } else if (!user.name || success || successDeleteField || addExperienceSuccess || addSkillSuccess || deleteSkillSuccess || offerSuccess || offerDeleteSuccess || trainingCreateSuccess || trainingDeleteSuccess || internshipCreateSuccess || internshipDeleteSuccess || successDelete || trainingSuccessDelete || internshipSuccessDelete) {
      dispatch(listProfile())
      dispatch(listCompanyOffers(userInfo._id))
      dispatch(listTrainings())
      dispatch(listInternships())
      dispatch({
        type: USER_PROFILE_UPDATE_RESET
      })
      dispatch({
        type: USER_DELETE_FIELD_RESET
      })
      dispatch({
        type: USER_NEW_EXPERIENCE_RESET
      })
      dispatch({
        type: USER_NEW_SKILL_RESET
      })
      dispatch({
        type: USER_DELETE_SKILL_RESET
      })
      dispatch({
        type: OFFER_CREATE_RESET
      })
      dispatch({
        type: OFFER_REMOVE_RESET
      })
      dispatch({
        type: TRAINING_CREATE_RESET
      })
      dispatch({
        type: TRAINING_DELETE_RESET
      })
      dispatch({
        type: INTERNSHIP_CREATE_RESET
      })
      dispatch({
        type: INTERNSHIP_DELETE_RESET
      })
      dispatch({
        type: OFFER_ACCEPT_DELETE_STUDENT_RESET
      })
      dispatch({
        type: TRAINING_ACCEPT_DELETE_STUDENT_RESET
      })
      dispatch({
        type: INTERNSHIP_ACCEPT_DELETE_STUDENT_RESET
      })
      setPassword('')
      setConfirmPassword('')
    } else {
      setName(user.name)
      setEmail(user.email)
      setImage(user.image)
      setBio(user.bio)
      setSkills(user.skills)
      setPhone(user.phone)
      setAddress(user.address)
      setSite(user.site)
      setIsCompany(user.isCompany)
      setJobExperience(user.jobExperience)
      setCertifications(user.certifications)
      setInternships(user.internships)
      setPostalAddress(user.postalAddress)
    }
  }, [dispatch, user, userInfo, navigate, success, successDeleteField, addExperienceSuccess, addSkillSuccess, deleteSkillSuccess, offerSuccess, offerDeleteSuccess, trainingCreateSuccess, trainingDeleteSuccess, internshipCreateSuccess, internshipDeleteSuccess, successDelete, trainingSuccessDelete, internshipSuccessDelete])

  useEffect(() => {
    dispatch({
      type: OFFER_GET_RESET
    })
  }, [dispatch])

  useEffect(() => {
    dispatch({
      type: TRAINING_GET_RESET
    })
  }, [dispatch])

  useEffect(() => {
    dispatch({
      type: INTERNSHIP_GET_RESET
    })
  }, [dispatch])

  const uploadImageHandler = async(e) => {
      const file = e.target.files[0]
      const formData = new FormData()
      formData.append('image', file)
      try {
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }

        const { data } = await axios.post('/api/upload', formData, config)

        setImage(data)
      } catch(error) {
        console.log(error)
      }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    if (password === confirmPassword) {
      if (bio) {
        if (bio.length >= 80) {
          if (/@esi-sba.dz\s*$/.test(email)) {
            dispatch(updateProfile(name, email, password, image, bio, skills, phone, address, site, jobExperience, certifications, internships, postalAddress))
            passwordRef.current.style.border = '1px solid rgba(85, 85, 85, 0.15)'
            passwordRef.current.style.outline = 'none'
            confirmPasswordRef.current.style.border = '1px solid rgba(85, 85, 85, 0.15)'
            confirmPasswordRef.current.style.outline = 'none'
            bioRef.current.style.border = '1px solid rgba(85, 85, 85, 0.15)'
            bioRef.current.style.outline = 'none'
            emailRef.current.style.border = '1px solid rgba(85, 85, 85, 0.15)'
            emailRef.current.style.outline = 'none'
          } else {
            emailRef.current.style.border = '1px solid rgba(255, 0, 0, 0.3)'
            emailRef.current.style.outline = '3px solid rgba(255, 0, 0, 0.2)'
          }
        } else {
          bioRef.current.style.border = '1px solid rgba(255, 0, 0, 0.3)'
          bioRef.current.style.outline = '3px solid rgba(255, 0, 0, 0.2)'
        }
      } else {
        dispatch(updateProfile(name, email, password, image, bio, skills, phone, address, site, jobExperience, certifications, internships, postalAddress))
        passwordRef.current.style.border = '1px solid rgba(85, 85, 85, 0.15)'
        passwordRef.current.style.outline = 'none'
        confirmPasswordRef.current.style.border = '1px solid rgba(85, 85, 85, 0.15)'
        confirmPasswordRef.current.style.outline = 'none'
      }
    } else {
      passwordRef.current.style.border = '1px solid rgba(255, 0, 0, 0.3)'
      passwordRef.current.style.outline = '3px solid rgba(255, 0, 0, 0.2)'
      confirmPasswordRef.current.style.border = '1px solid rgba(255, 0, 0, 0.3)'
      confirmPasswordRef.current.style.outline = '3px solid rgba(255, 0, 0, 0.2)'
      emailRef.current.style.border = '1px solid rgba(255, 0, 0, 0.3)'
      emailRef.current.style.outline = '3px solid rgba(255, 0, 0, 0.2)'
    }
  }

  const emailRef = useRef()

  useEffect(() => {
    if (edit) {
      if (error && email !== userInfo.email) {
        emailRef.current.style.border = '1px solid rgba(255, 0, 0, 0.3)'
        emailRef.current.style.outline = '3px solid rgba(255, 0, 0, 0.2)'
      } else {
        emailRef.current.style.border = '1px solid rgba(85, 85, 85, 0.15)'
        emailRef.current.style.outline = 'none'
      }
    }
  }, [error])

  const handleType = () => {
    if (type === 'password') {
        setType('text')
    } else {
        setType('password')
    }
  }

  const handleTypeConfirm = () => {
    if (typeConfirm === 'password') {
        setTypeConfirm('text')
    } else {
        setTypeConfirm('password')
    }
  }

  const handleAddExperience = (e) => {
    e.preventDefault()
    if (title && company && startDate && endDate && desc && city) {
      dispatch(newExperience({
        title,
        company,
        startDate,
        endDate,
        desc,
        city,
      }))
    }
  }

  const handleAddSkill = () => {
    if (skillName && skillPerc) {
      dispatch(newSkill(
        skillName,
        skillPerc,
      ))
    }
  }

  // offer Refs
  const offerTitleRef = useRef()
  const offerDescRef = useRef()
  const offerPlaceRef = useRef()
  const offerSkillsRef = useRef()
  const offerStartDateRef = useRef()

  const handleAddOffer = (e) => {
    e.preventDefault()
    if (offerTitle && offerPlace && offerDesc && offerStartDate && offerRequiredSkills) {
      dispatch(createOffer(
        offerTitle,
        offerDesc,
        offerRequiredSkills,
        offerPlace,
        offerStartDate,
        new Date(offerEndDate),
        new Date(offerEndDate),
      ))
        offerTitleRef.current.style.border = '1px solid rgba(85, 85, 85, 0.15)'
        offerTitleRef.current.style.outline = 'none'
        offerPlaceRef.current.style.border = '1px solid rgba(85, 85, 85, 0.15)'
        offerPlaceRef.current.style.outline = 'none'
        offerDescRef.current.style.border = '1px solid rgba(85, 85, 85, 0.15)'
        offerDescRef.current.style.outline = 'none'
        offerStartDateRef.current.style.border = '1px solid rgba(85, 85, 85, 0.15)'
        offerStartDateRef.current.style.outline = 'none'
        offerSkillsRef.current.style.border = '1px solid rgba(85, 85, 85, 0.15)'
        offerSkillsRef.current.style.outline = 'none'
    } else {
      if (!offerTitle) {
        offerTitleRef.current.style.border = '1px solid rgba(255, 0, 0, 0.3)'
        offerTitleRef.current.style.outline = '3px solid rgba(255, 0, 0, 0.2)'
      } else {
        offerTitleRef.current.style.border = '1px solid rgba(85, 85, 85, 0.15)'
        offerTitleRef.current.style.outline = 'none'
      }
      if (!offerPlace) {
        offerPlaceRef.current.style.border = '1px solid rgba(255, 0, 0, 0.3)'
        offerPlaceRef.current.style.outline = '3px solid rgba(255, 0, 0, 0.2)'
      } else {
        offerPlaceRef.current.style.border = '1px solid rgba(85, 85, 85, 0.15)'
        offerPlaceRef.current.style.outline = 'none'
      }
      if (!offerDesc) {
        offerDescRef.current.style.color = 'rgba(255, 0, 0, 0.8)'
      } else {
        offerDescRef.current.style.color = '#333'
      }
      if (!offerStartDate) {
        offerStartDateRef.current.style.border = '1px solid rgba(255, 0, 0, 0.3)'
        offerStartDateRef.current.style.outline = '3px solid rgba(255, 0, 0, 0.2)'
      } else {
        offerStartDateRef.current.style.border = '1px solid rgba(85, 85, 85, 0.15)'
        offerStartDateRef.current.style.outline = 'none'
      }
      if (!offerRequiredSkills) {
        offerSkillsRef.current.style.border = '1px solid rgba(255, 0, 0, 0.3)'
        offerSkillsRef.current.style.outline = '3px solid rgba(255, 0, 0, 0.2)'
      } else {
        offerSkillsRef.current.style.border = '1px solid rgba(85, 85, 85, 0.15)'
        offerSkillsRef.current.style.outline = 'none'
      }
    }
  }

  // training Refs
  const trainingNameRef = useRef()
  const trainingDescRef = useRef()
  const trainingPlaceRef = useRef()
  const trainingPriceRef = useRef()
  const trainingTagsRef = useRef()
  const trainingStartDateRef = useRef()

  const handleAddTraining = (e) => {
    e.preventDefault()

    // console.log('name', trainingName)
    // console.log('desc', trainingDesc)
    // console.log('palce', trainingPlace)
    // console.log('price', trainingPrice)
    // console.log('tags', trainingTags)
    // console.log('start date', trainingStartDate)
    // console.log('end date', trainingEndDate)

    if (trainingName && trainingDesc && trainingPlace && trainingPrice && trainingTags && trainingStartDate) {
      dispatch(createTraining(
        trainingName,
        trainingDesc,
        trainingPlace,
        trainingTags,
        trainingPrice,
        trainingStartDate,
        new Date(trainingEndDate),
        new Date(trainingEndDate),
      ))
      trainingNameRef.current.style.border = '1px solid rgba(85, 85, 85, 0.15)'
      trainingNameRef.current.style.outline = 'none'
      trainingDescRef.current.style.border = '1px solid rgba(85, 85, 85, 0.15)'
      trainingDescRef.current.style.outline = 'none'
      trainingPlaceRef.current.style.border = '1px solid rgba(85, 85, 85, 0.15)'
      trainingPlaceRef.current.style.outline = 'none'
      trainingPriceRef.current.style.border = '1px solid rgba(85, 85, 85, 0.15)'
      trainingPriceRef.current.style.outline = 'none'
      trainingTagsRef.current.style.border = '1px solid rgba(85, 85, 85, 0.15)'
      trainingTagsRef.current.style.outline = 'none'
      trainingStartDateRef.current.style.border = '1px solid rgba(85, 85, 85, 0.15)'
      trainingStartDateRef.current.style.outline = 'none'
    } else {
      if (!trainingName) {
        trainingNameRef.current.style.border = '1px solid rgba(255, 0, 0, 0.3)'
        trainingNameRef.current.style.outline = '3px solid rgba(255, 0, 0, 0.2)'
      } else {
        trainingNameRef.current.style.border = '1px solid rgba(85, 85, 85, 0.15)'
        trainingNameRef.current.style.outline = 'none'
      }
      if (!trainingPlace) {
        trainingPlaceRef.current.style.border = '1px solid rgba(255, 0, 0, 0.3)'
        trainingPlaceRef.current.style.outline = '3px solid rgba(255, 0, 0, 0.2)'
      } else {
        trainingPlaceRef.current.style.border = '1px solid rgba(85, 85, 85, 0.15)'
        trainingPlaceRef.current.style.outline = 'none'
      }
      if (!trainingDesc) {
        trainingDescRef.current.style.color = 'rgba(255, 0, 0, 0.8)'
      } else {
        trainingDescRef.current.style.color = '#333'
      }
      if (!trainingPrice) {
        trainingPriceRef.current.style.border = '1px solid rgba(255, 0, 0, 0.3)'
        trainingPriceRef.current.style.outline = '3px solid rgba(255, 0, 0, 0.2)'
      } else {
        trainingPriceRef.current.style.border = '1px solid rgba(85, 85, 85, 0.15)'
        trainingPriceRef.current.style.outline = 'none'
      }
      if (!trainingTags) {
        trainingTagsRef.current.style.border = '1px solid rgba(255, 0, 0, 0.3)'
        trainingTagsRef.current.style.outline = '3px solid rgba(255, 0, 0, 0.2)'
      } else {
        trainingTagsRef.current.style.border = '1px solid rgba(85, 85, 85, 0.15)'
        trainingTagsRef.current.style.outline = 'none'
      }
      if (!trainingStartDate) {
        trainingStartDateRef.current.style.border = '1px solid rgba(255, 0, 0, 0.3)'
        trainingStartDateRef.current.style.outline = '3px solid rgba(255, 0, 0, 0.2)'
      } else {
        trainingStartDateRef.current.style.border = '1px solid rgba(85, 85, 85, 0.15)'
        trainingStartDateRef.current.style.outline = 'none'
      }
    }
  }

  // internship Refs
  const internshipNameRef = useRef()
  const internshipDescRef = useRef()
  const internshipPlaceRef = useRef()
  const internshipTagsRef = useRef()
  const internshipStartDateRef = useRef()

  const handleAddInternship = (e) => {
    e.preventDefault()

    if (internshipName && internshipDesc && internshipPlace && internshipStartDate && internshipTags) {
      dispatch(createInternship(
        internshipName,
        internshipDesc,
        internshipPlace,
        internshipTags,
        internshipStartDate,
        new Date(internshipEndDate),
        internshipPaymentIncluded,
        new Date(internshipEndDate),
      ))
      internshipNameRef.current.style.border = '1px solid rgba(85, 85, 85, 0.15)'
      internshipNameRef.current.style.outline = 'none'
      internshipDescRef.current.style.border = '1px solid rgba(85, 85, 85, 0.15)'
      internshipDescRef.current.style.outline = 'none'
      internshipPlaceRef.current.style.border = '1px solid rgba(85, 85, 85, 0.15)'
      internshipPlaceRef.current.style.outline = 'none'
      internshipTagsRef.current.style.border = '1px solid rgba(85, 85, 85, 0.15)'
      internshipTagsRef.current.style.outline = 'none'
      internshipStartDateRef.current.style.border = '1px solid rgba(85, 85, 85, 0.15)'
      internshipStartDateRef.current.style.outline = 'none'
    } else {
      if (!internshipName) {
        internshipNameRef.current.style.border = '1px solid rgba(255, 0, 0, 0.3)'
        internshipNameRef.current.style.outline = '3px solid rgba(255, 0, 0, 0.2)'
      } else {
        internshipNameRef.current.style.border = '1px solid rgba(85, 85, 85, 0.15)'
        internshipNameRef.current.style.outline = 'none'
      }
      if (!internshipPlace) {
        internshipPlaceRef.current.style.border = '1px solid rgba(255, 0, 0, 0.3)'
        internshipPlaceRef.current.style.outline = '3px solid rgba(255, 0, 0, 0.2)'
      } else {
        internshipPlaceRef.current.style.border = '1px solid rgba(85, 85, 85, 0.15)'
        internshipPlaceRef.current.style.outline = 'none'
      }
      if (!internshipDesc) {
        internshipDescRef.current.style.color = 'rgba(255, 0, 0, 0.8)'
      } else {
        internshipDescRef.current.style.color = '#333'
      }
      if (!internshipTags) {
        internshipTagsRef.current.style.border = '1px solid rgba(255, 0, 0, 0.3)'
        internshipTagsRef.current.style.outline = '3px solid rgba(255, 0, 0, 0.2)'
      } else {
        internshipTagsRef.current.style.border = '1px solid rgba(85, 85, 85, 0.15)'
        internshipTagsRef.current.style.outline = 'none'
      }
      if (!internshipStartDate) {
        internshipStartDateRef.current.style.border = '1px solid rgba(255, 0, 0, 0.3)'
        internshipStartDateRef.current.style.outline = '3px solid rgba(255, 0, 0, 0.2)'
      } else {
        internshipStartDateRef.current.style.border = '1px solid rgba(85, 85, 85, 0.15)'
        internshipStartDateRef.current.style.outline = 'none'
      }
    }
  }

  useEffect(() => {
    if (addSkillSuccess) {
      setSkillName('')
      setSkillPerc('')
    }
  }, [addSkillSuccess])

  useEffect(() => {
    if (addExperienceSuccess) {
      setTitle('')
      setCompany('')
      setStartDate('')
      setEndDate('')
      setDesc('')
      setCity('')
    }
  }, [addExperienceSuccess])

  useEffect(() => {
    if (offerSuccess) {
      setOfferTitle('')
      setOfferDesc('')
      setOfferPlace('')
      setOfferRequiredSkills('')
      setOfferStartDate('')
      setOfferEndDate('')
      setAddOffer(false)
    }
  }, [offerSuccess])

  useEffect(() => {
    if (trainingCreateSuccess) {
      setTrainingName('')
      setTrainingDesc('')
      setTrainingPlace('')
      setTrainingPrice('')
      setTrainingEndDate('')
      setTrainingStartDate('')
      setTrainingTags('')
      setAddTraining(false)
    }
  }, [trainingCreateSuccess])

  useEffect(() => {
    if (internshipCreateSuccess) {
      setInternshipName('')
      setInternshipDesc('')
      setInternshipPlace('')
      setInternshipEndDate('')
      setInternshipStartDate('')
      setInternshipTags('')
      setInternshipPaymentIncluded(false)
      setAddInternship(false)
    }
  }, [internshipCreateSuccess])

  const passwordRef = useRef()
  const confirmPasswordRef = useRef()

  const bioRef = useRef()

  const handleDeleteField = (type) => {
    if (window.confirm(`Delete your ${type}?`)) {
      dispatch(deleteField(type))
    }
  }

  const experienceImages = ['/images/sketch.png', '/images/dribbble.png']

  const handleTextareaHeight = () => {
    bioRef.current.style.height = `${bioRef.current.scrollHeight}px`
  }

  const textareaHandler = (e) => {
    setBio(e.target.value)
    handleTextareaHeight()
  }

  useEffect(() => {
    if (edit) {
      bioRef.current.style.height = `${bioRef.current.scrollHeight}px`
    }
  }, [edit])

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
      setShowMoreInternships(companyInternships.length+1)
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
      <Meta pageName={`ESI-JOB | My Profile`} />
      <article className="main-profile">
          <div className="main-profile-content">
          <div className="user-details">
              <div className="img">
                {profileInfoLoading ? (
                  <div className="skelton-image"></div>
                ) : (
                  <>
                    <img src={image} alt={name} />
                    {edit && (
                      <form>
                        <label>
                          <input type="file" onChange={uploadImageHandler} />
                          Select
                        </label>
                      </form>
                    )}
                  </>
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
              <button className='edit light-btn' onClick={() => setEdit(!edit)}>
                {!edit ? (
                  <>
                    <BiEdit className='icon' />
                    Edit
                  </>
                ) : (
                  <>
                  <FaUserCircle className='icon' />
                    Profile
                  </>
                )}
              </button>
            </div>
            {edit===true ? (
              <form onSubmit={submitHandler}>
                <header>
                  Edit profile
                </header>
                <div className="inner-forms">
                <div className="personal-information">
                <div className="form-control">
                <label>name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter full name' />
              </div>
              <div className="form-control">
                <label>email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} ref={emailRef} placeholder='Enter email' />
              </div>
              <div className='form-control'>
                  <label>new password</label>
                  <div className="password-control" ref={passwordRef}>
                      <input type={type} value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Change password' />
                      {type==='password' ? (
                      <BiHide className='show-hide-toggle' onClick={handleType} style={password === '' && {pointerEvents: 'none', color: '#777'}} />
                      ) : (
                      <BiShowAlt className='show-hide-toggle' onClick={handleType} />
                      )}            
                  </div>
              </div>
              <div className='form-control'>
                <label>confirm new password</label>
                <div className="password-control" ref={confirmPasswordRef}>
                  <input type={typeConfirm} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Confirm new password' />
                  {typeConfirm==='password' ? (
                    <BiHide className='show-hide-toggle' onClick={handleTypeConfirm} style={confirmPassword === '' && {pointerEvents: 'none', color: '#777'}} />
                    ) : (
                      <BiShowAlt className='show-hide-toggle' onClick={handleTypeConfirm} />
                      )}                          
                </div>
              </div>
              {userInfo && !userInfo.isCompany && (
                <div className="form-control">
                <label>
                  certificates
                </label>
                <input type="number" min='0' value={certifications} onChange={(e) => setCertifications(Number(e.target.value))} placeholder='5 years' />
              </div>
              )}
                </div>
             <div className="contact-information">
              <div className="form-control">
                <label>
                  phone
                  <RiDeleteBin7Line onClick={() => handleDeleteField('phone')} className='icon' />
                </label>
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Enter phone number' />
              </div>
              <div className="form-control">
                <label>
                  address
                  <RiDeleteBin7Line onClick={() => handleDeleteField('address')} className='icon' />
                </label>
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Enter address' />
              </div>
              {userInfo && userInfo.isCompany && (
                <div className="form-control">
                  <label>
                    postal address
                    <RiDeleteBin7Line onClick={() => handleDeleteField('postalAddress')} className='icon' />
                  </label>
                  <input type="text" value={postalAddress} onChange={(e) => setPostalAddress(e.target.value)} placeholder='Enter postal address' />
                </div>
              )}
              <div className="form-control">
                <label>
                  website
                  <RiDeleteBin7Line onClick={() => handleDeleteField('website')} className='icon' />
                </label>
                <input type="text" value={site} onChange={(e) => setSite(e.target.value)} placeholder={isCompany ? 'Enter official website' : 'Enter personal website'} />
              </div>
              {userInfo && !userInfo.isCompany && (
                <div className="form-control">
                <label>
                  internships
                </label>
                <input type="number" min='0' value={internships} onChange={(e) => setInternships(Number(e.target.value))} placeholder='3 years' />
              </div>
              )}
              {userInfo && !userInfo.isCompany && (
                <div className="form-control">
                <label>
                  years of experience
                </label>
                <input type="number" min='0' value={jobExperience} onChange={(e) => setJobExperience(Number(e.target.value))} placeholder='3 years' />
              </div>
              )}
             </div>
            </div>
            {userInfo && !userInfo.isCompany && (
              <div className="skills-control">
              <label>Add a skill</label>
              <div className="add-skill-control">
                <div className="inputs">
                  <input type="text" placeholder='Enter skill name' maxlength='25' onChange={(e) => setSkillName(e.target.value)} value={skillName} />
                  <input type="number" min='10' max='100' step='10' placeholder='Out of 100' onChange={(e) => setSkillPerc(Number(e.target.value))} value={skillPerc} />
                </div>
                <span className='span-btn' onClick={handleAddSkill}>
                  Add
                  {addSkillLoading && (
                    <Loader />
                  )}
                </span>
              </div>
              <div className="skills-list">
                {skills && skills.length > 0 && skills.map(skill => {
                  return (
                    <article key={skill._id}>
                      {skill.name}
                      <IoCloseOutline className='icon' onClick={() => dispatch(deleteSkill(skill._id))} />
                    </article>
                  )
                })}
              </div>
          </div>
            )}
              <div className="bottom-part">
              <div className="form-control">
                <label>{userInfo && userInfo.isCompany ? 'Company Description' : 'Your biography'}</label>
                <textarea className='bio-text' maxlength='170' value={bio} onChange={textareaHandler} placeholder={userInfo && userInfo.isCompany ? 'Describe the company' : 'Add your bio'} ref={bioRef}>{bio}</textarea>
              </div>
              <div className="form-control">
                <button type='submit'>
                    Update
                    {loading && <Loader />}
                </button>
              </div>
             </div>
            </form>
            ) : !profileInfoLoading && (
              <>
             {userInfo && !userInfo.isCompany && (
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
             )}
                {userInfo && userInfo.isCompany && !addOffer ? (
                  <section className="offers">
                    <header>
                        <div className='header-title'>
                            <p>Job Offers</p>
                              {offers && (
                                <span>{offers.length} Job offers history</span>
                              )}
                        </div>
                        <button className='light-btn' onClick={() => setAddOffer(!addOffer)}>
                          <MdOutlineAdd className='icon' />
                          Add More
                        </button>
                    </header>
                    {!offersLoading ? (
                      <>
                        {offers && offers.length > 0 && (
                      <div className="company-offers">
                        {
                          offers && offers.length > 0 && (
                            offers.slice(0, showMore).map((ofr) => {
                              return (
                                <ProfileOffer {...ofr} />
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
                ) : userInfo && userInfo.isCompany && (
                  <section className="add-offers">
                    <header className='card-header'>
                      Add job offer
                      <MdOutlineClose className='icon' onClick={() => setAddOffer(!addOffer)} />
                    </header>
                    <form onSubmit={handleAddOffer}>
                    <div className="double-form-control">
                      <div className="form-control">
                          <label>Title<i>*</i></label>
                          <input type="text" value={offerTitle} onChange={(e) => setOfferTitle(e.target.value)} placeholder='e.g. Security expert, Fullstack developper...' ref={offerTitleRef} />
                      </div>
                      <div className="form-control">
                          <label>Place<i>*</i></label>
                          <input type="text" value={offerPlace} onChange={(e) => setOfferPlace(e.target.value)} placeholder='e.g. Hannover, Germany' ref={offerPlaceRef} />
                      </div>
                    </div>
                    <div className="double-form-control">
                      <div className="form-control">
                          <label>Start Date<i>*</i></label>
                          <input type="date" onChange={(e) => setOfferStartDate(e.target.value)} ref={offerStartDateRef} />
                      </div>
                      <div className="form-control">
                          <label>End Date</label>
                          <input type="date" onChange={(e) => setOfferEndDate(e.target.value)} />
                      </div>
                    </div>
                    <div className="form-control">
                        <label>Description<i>*</i></label>
                        <small ref={offerDescRef}>Describe the offer and list the required skills</small>
                        <Editor
                            editorState={editorState} 
                            onEditorStateChange={(newState) => {
                              setEditorState(newState)
                              setOfferDesc(draftToHtml(convertToRaw(newState.getCurrentContent())))
                            }}
                            wrapperClassName="wrapper-class"
                            editorClassName="editor-class"
                            toolbarClassName="toolbar-class"
                            toolbar={{
                              options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'history'],
                              inline: { inDropdown: true },
                              list: { inDropdown: true },
                              history: { inDropdown: true },
                              blockType: {
                                inDropdown: true,
                                options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
                              }
                            }}
                        />
                    </div>
                    <div className="double-form-control">
                      <div className="form-control">
                          <label>Tags<i>*</i></label>
                          <input type="text" value={offerRequiredSkills} onChange={(e) => setOfferRequiredSkills(e.target.value)} placeholder='Tags seperated by commas e.g. Asm, linux...' ref={offerSkillsRef} />
                      </div>
                      <div className="form-control">
                        <button type="submit">
                          Add Job Offer
                          {offerLoading && (
                            <Loader />
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                  </section>
                )}
                {userInfo && userInfo.isCompany && !addTraining ? (
                  <section className="offers">
                    <header>
                        <div className='header-title'>
                            <p>Trainings</p>
                              {trainings && (
                                <span>{trainings.length} Trainings history</span>
                              )}
                        </div>
                        <button className='light-btn' onClick={() => setAddTraining(!addTraining)} >
                          <MdOutlineAdd className='icon' />
                          Add More
                        </button>
                    </header>
                    {!trainingsLoading ? (
                      <>
                        {trainings && trainings.length > 0 && (
                      <div className="company-offers">
                       {
                         trainings && trainings.length > 0 && (
                          trainings.slice(0, showMoreTrainings).map((tr) => {
                          return (
                            <ProfileOffer {...tr} />
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
                ) : userInfo && userInfo.isCompany && (
                  <section className="add-offers">
                    <header className='card-header'>
                      Add training
                      <MdOutlineClose className='icon' onClick={() => setAddTraining(!addTraining)} />
                    </header>
                    <form onSubmit={handleAddTraining}>
                    <div className="double-form-control">
                      <div className="form-control">
                          <label>Title<i>*</i></label>
                          <input type="text" value={trainingName} onChange={(e) => setTrainingName(e.target.value)} placeholder='e.g. Django, MongoDB...' ref={trainingNameRef} />
                      </div>
                      <div className="form-control">
                          <label>Place<i>*</i></label>
                          <input type="text" value={trainingPlace} onChange={(e) => setTrainingPlace(e.target.value)} placeholder='e.g. Hannover, Germany' ref={trainingPlaceRef} />
                      </div>
                    </div>
                    <div className="double-form-control">
                      <div className="form-control">
                          <label>Start Date<i>*</i></label>
                          <input type="date" onChange={(e) => setTrainingStartDate(e.target.value)} ref={trainingStartDateRef} />
                      </div>
                      <div className="form-control">
                          <label>End Date</label>
                          <input type="date" onChange={(e) => setTrainingEndDate(e.target.value)} />
                      </div>
                    </div>
                    <div className="form-control">
                        <label>Description<i>*</i></label>
                        <small ref={trainingDescRef}>Describe the training and list the prerequities if there are any</small>
                        <Editor
                            editorState={editorState} 
                            onEditorStateChange={(newState) => {
                              setEditorState(newState)
                              setTrainingDesc(draftToHtml(convertToRaw(newState.getCurrentContent())))
                            }}
                            wrapperClassName="wrapper-class"
                            editorClassName="editor-class"
                            toolbarClassName="toolbar-class"
                            toolbar={{
                              options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'history'],
                              inline: { inDropdown: true },
                              list: { inDropdown: true },
                              history: { inDropdown: true },
                              blockType: {
                                inDropdown: true,
                                options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
                              }
                            }}
                        />
                    </div>
                    <div className="double-form-control">
                      <div className="form-control">
                          <label>Price<i>*</i></label>
                          <input type="Number" min='0' value={trainingPrice} onChange={(e) => setTrainingPrice(e.target.value)} placeholder='Enter training price in Dinnars' ref={trainingPriceRef} />
                      </div>
                      <div className="form-control">
                          <label>Tags<i>*</i></label>
                          <input type="text" value={trainingTags} onChange={(e) => setTrainingTags(e.target.value)} placeholder='Tags seperated by commas e.g. Asm, linux...' ref={trainingTagsRef} />
                      </div>
                    </div>
                    <div className="form-control">
                        <button type="submit" className='long'>
                          Add Training
                          {trainingCreateLoading && (
                            <Loader />
                          )}
                        </button>
                      </div>
                  </form>
                  </section>
                )}
                {userInfo && userInfo.isCompany && !addInternship ? (
                  <section className="offers">
                    <header>
                        <div className='header-title'>
                            <p>Internships</p>
                              {companyInternships && (
                                <span>{companyInternships.length} Internships history</span>
                              )}
                        </div>
                        <button className='light-btn' onClick={() => setAddInternship(!addInternship)} >
                          <MdOutlineAdd className='icon' />
                          Add More
                        </button>
                    </header>
                    {!internshipsLoading ? (
                      <>
                         {companyInternships && companyInternships.length > 0 && (
                      <div className="company-offers">
                       {
                         companyInternships && companyInternships.length > 0 && (
                          companyInternships.slice(0, showMoreInternships).map((intr) => {
                          return (
                            <ProfileOffer {...intr} />
                          )
                        })
                         )
                       }
                      {companyInternships && companyInternships.length > 3 && (
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
                ) : userInfo && userInfo.isCompany && (
                  <section className="add-offers">
                    <header className='card-header'>
                      Add internship
                      <MdOutlineClose className='icon' onClick={() => setAddInternship(!addInternship)} />
                    </header>
                    <form onSubmit={handleAddInternship}>
                    <div className="double-form-control">
                      <div className="form-control">
                          <label>Title<i>*</i></label>
                          <input type="text" value={internshipName} onChange={(e) => setInternshipName(e.target.value)} placeholder='e.g. intesive server management internship' ref={internshipNameRef} />
                      </div>
                      <div className="form-control">
                          <label>Place<i>*</i></label>
                          <input type="text" value={internshipPlace} onChange={(e) => setInternshipPlace(e.target.value)} placeholder='e.g. Hannover, Germany' ref={internshipPlaceRef} />
                      </div>
                    </div>
                    <div className="double-form-control">
                      <div className="form-control">
                          <label>Start Date<i>*</i></label>
                          <input type="date" onChange={(e) => setInternshipStartDate(e.target.value)} ref={internshipStartDateRef} />
                      </div>
                      <div className="form-control">
                          <label>End Date</label>
                          <input type="date" onChange={(e) => setInternshipEndDate(e.target.value)} />
                      </div>
                    </div>
                    <div className="form-control">
                        <label>Description<i>*</i></label>
                        <small ref={internshipDescRef}>Describe the internship and list the prerequities if there are any</small>
                        <Editor
                            editorState={editorState} 
                            onEditorStateChange={(newState) => {
                              setEditorState(newState)
                              setInternshipDesc(draftToHtml(convertToRaw(newState.getCurrentContent())))
                            }}
                            wrapperClassName="wrapper-class"
                            editorClassName="editor-class"
                            toolbarClassName="toolbar-class"
                            toolbar={{
                              options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'history'],
                              inline: { inDropdown: true },
                              list: { inDropdown: true },
                              history: { inDropdown: true },
                              blockType: {
                                inDropdown: true,
                                options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
                              }
                            }}
                        />
                    </div>
                    <div className="double-form-control">
                      <div className="form-control">
                          <label>Tags<i>*</i></label>
                          <input type="text" value={internshipTags} onChange={(e) => setInternshipTags(e.target.value)} placeholder='e.g. servers, security...' ref={internshipTagsRef} />
                      </div>
                      <div className="form-control check-control">
                          <label>Payment included</label>
                            <div className="check-box">
                              <input type="checkbox" value={internshipPaymentIncluded} onChange={(e) => setInternshipPaymentIncluded(e.target.checked)} />
                              <p>Yes, this internship includes payment</p>
                            </div>
                      </div>
                    </div>
                    <div className="form-control">
                        <button type="submit" className='long'>
                          Add Internship
                          {internshipCreateLoading && (
                            <Loader />
                          )}
                        </button>
                      </div>
                  </form>
                  </section>
                )}
                {userInfo && !userInfo.isCompany && add ? (
                  <article className='edit-experiences'>
                  <header className='card-header'>
                    Add experience
                    <MdOutlineClose className='icon' onClick={() => setAdd(!add)} />
                  </header>
                  <form onSubmit={handleAddExperience}>
                    <div className="double-form-control">
                      <div className="form-control">
                          <label>Title</label>
                          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='e.g. Security expert, Fullstack developper...' />
                      </div>
                      <div className="form-control">
                          <label>Company</label>
                          <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder='e.g. Kaspersky, Avast...' />
                      </div>
                    </div>
                    <div className="double-form-control">
                      <div className="form-control">
                          <label>Start Date</label>
                          <input type="date" onChange={(e) => setStartDate(e.target.value)} />
                      </div>
                      <div className="form-control">
                          <label>End Date</label>
                          <input type="date" onChange={(e) => setEndDate(e.target.value)} />
                      </div>
                    </div>
                    <div className="form-control">
                        <label>Description</label>
                        <textarea type="text" value={desc} onChange={(e) => setDesc(e.target.value)} placeholder='Describe your experience and what you have gained from it...'>{desc}</textarea>
                    </div>
                    <div className="double-form-control">
                      <div className="form-control">
                          <label>City</label>
                          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder='e.g. Berlin, Germany' />
                      </div>
                      <div className="form-control">
                        <button type="submit">
                          Add Experience
                          {addExperienceLoading && (
                            <Loader />
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </article>
                ) : (
                  <>
                    {userInfo && !userInfo.isCompany && user.experiences && (
                      <section className="experiences">
                      <header>
                        <div className='header-title'>
                          <p>Job Experience</p>
                          {user.experiences && (
                            <span>{user.experiences.length} Job history</span>
                          )}
                        </div>
                        <button className='light-btn' onClick={() => setAdd(!add)} >
                          <MdOutlineAdd className='icon' />
                          Add More
                        </button>
                      </header>
                      <div className="main-experiences">
                        {user.experiences.map((experience, index) => {
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
                    )}
                  </>
                )}
            </>
            )}
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
            {user && user.skills && !user.isCompany && user.skills.length > 0 && (
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

export default ProfileScreen