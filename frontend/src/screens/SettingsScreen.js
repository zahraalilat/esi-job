import React, { useState } from 'react'
import styled from 'styled-components'

const SettingsStyled = styled.section`
    background: ${({theme}) => theme.bgs.primaryBg};
    color: ${({theme}) => theme.colors.mainColor};
`

const SettingsScreen = () => {

    const [theme, setTheme] = useState()

    const handleTheme = () => {
        if (theme === 'dark') {
            setTheme('light')
            localStorage.setItem('theme', 'light')
        } else {
            setTheme('dark')
            localStorage.setItem('theme', 'dark')
        }
    }

    return (
        <SettingsStyled>
            <h1>Hello</h1>
            <button onClick={handleTheme}>change theme</button>
        </SettingsStyled>
  )
}

export default SettingsScreen