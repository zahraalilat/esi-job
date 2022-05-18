import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import FaqElement from '../components/FaqElement'

const HelpScreen = () => {
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  return (
    <section className='faq'>
        <div className="container">
          <h1>Frequently asked questions</h1>
            <div className="questions">
                <FaqElement question='Should I create an account to be able to navigate in the platform?' content='Yes, you need to first sign up in the website to be able to see all the offers, trainings and internships provided by diffrent entreprises on the platform, and bookmark all the interesting offers you come across.' />
                <FaqElement question='Is is a must that I fill all the information in my profile as a student?' content='No, but you need do have to fill you bio and your skill set so that recruiters can see you in the freelancers page, and also to get an overall view about whether you satisfy their needs or not, it helps both you and the recruiters.' />
                <FaqElement question='As an entreprise, will the offers I publish in the platform get deleted automatically?' content='Yes, we ensure that all the offers that exeed the deadline put by the entreprise will get automatically without the need to delete it manually by the entreprise, and it cannot be retrieved again.' />
            </div>
            <div className="further-questions">
              <h1>Still have a question?</h1>
              <p>If you cannot find answer to your question in our FAQ, you can always contact us through email. We will answer you shortly!</p>
              {!userInfo ? (
                <Link to='/' className='back-link'>Back to homepage</Link>
              ) : (
                <Link to='/profile' className='back-link'>Back to profile</Link>
              )}
            </div>
        </div>
    </section>
  )
}

export default HelpScreen
