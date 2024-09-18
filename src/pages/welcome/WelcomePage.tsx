import {
  WppActionButton,
  WppCard,
  WppIconArrow,
  WppIconCodeView,
  WppIconTune,
  WppTypography,
} from '@wppopen/components-library-react'
import { useOs } from '@wppopen/react'

import styles from 'pages/welcome/WelcomePage.module.scss'

export const WelcomePage = () => {
  const { osContext, osApi } = useOs()
  const { firstname, lastname, country, agency, email, id } = osContext.userDetails

  const cardsData = [
    {
      title: 'Build Your App',
      description: 'Use micro-frontend approach to create your app',
      linkTitle: 'Documentation',
      linkUrl: 'https://developers.os.wpp.com/docs/developer-guide/quickstart/start-with-react',
      icon: <WppIconCodeView color="var(--wpp-brand-color)" />,
    },
    {
      title: 'UI Components',
      description: 'Use ready-made design components in the app',
      linkTitle: 'View Components',
      linkUrl: 'https://components.os.wpp.com/?path=/story/guidelines-welcome--page',
      icon: <WppIconTune color="var(--wpp-brand-color)" />,
    },
  ]

  const userData = [
    { title: 'User name', value: [firstname, lastname].filter(Boolean).join(' ') || '-' },
    { title: 'Email', value: email || '-' },
    { title: 'Agency', value: agency || '-' },
    { title: 'Country', value: country || '-' },
    { title: 'ID', value: id || '-' },
  ]

  const makeApiRequest = async () => {
    try {
      const response = await fetch('https://localhost:5000/wpp-open/test', {
        headers: {
          Authorization: `Bearer ${osApi.getAccessToken()}`,
          // Authorization:
          //   'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlRFRCBEQU5JTEUiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTE2MjM5MDIyfQ.lTOPFC5ZA4TTygckAJhetqIgXPNIX-PKhKbIu4lkBXmT_HsHBmBo11LOSSW6e0Qhu5jFX6aBOFUI1SDsrJByW2EeT6WE2pdCT_A3eZmf9hFpb5U3Hb3Zn6herbArzbCtOGaQU1TViLFGKMiY6-IQMQDbVSnDc1zVlDbX-fSwYQOhE4l2GfOkytP3FVQz3Phf-6KAht2Z4odcKuVqr9YWIWOCmc9Ri4aFqG8bipxMbKkRjcqDSOuipUEdrH1DUgBrqlaxe8mrLwKZSVIRruejlF6cncdMCRSJAnc4YgR4A1DgdU1sTEkKWd9DKt5fEtclR5q_Jrq4Hhb6P8A9rInlrw',
        },
      })

      const data = await response.json()

      console.log('DATA: ', data)
    } catch (err) {
      console.log('Error: ', err)
    }
  }

  return (
    <>
      <div className={styles.intro}>
        <WppTypography type="2xl-heading" tag="h3" className={styles.introTitle}>
          Welcome to the App Boilerplate
        </WppTypography>
        <WppTypography type="m-body" tag="p">
          Create your own app for WPP Open Platform
        </WppTypography>
      </div>

      <div className={styles.cards}>
        {cardsData.map(card => (
          <WppCard className={styles.card} key={card.title}>
            <div className={styles.cardIcon}>{card.icon}</div>
            <WppTypography className={styles.cardTitle} type="l-strong" tag="h4">
              {card.title}
            </WppTypography>
            <WppTypography className={styles.cardDescription} type="s-body" tag="span">
              {card.description}
            </WppTypography>
            <a className={styles.cardLink} href={card.linkUrl} target="_blank" rel="noreferrer">
              <WppActionButton>
                {card.linkTitle}
                <WppIconArrow slot="icon-end" />
              </WppActionButton>
            </a>
          </WppCard>
        ))}
      </div>

      <WppCard className={styles.sectionUserDetails}>
        <div className={styles.userDetails}>
          {userData.map(({ title, value }) => (
            <div key={title} className={styles.userItem}>
              <WppTypography className={styles.userDetailsTitle} type="xs-body">
                {title}
              </WppTypography>
              <WppTypography className={styles.ellipsis} type="s-body">
                {value}
              </WppTypography>
            </div>
          ))}
        </div>
        <WppActionButton onClick={() => navigator.clipboard.writeText(osApi.getAccessToken())}>
          Copy auth token
        </WppActionButton>
      </WppCard>

      <WppCard>
        <WppActionButton onClick={makeApiRequest}>Make Test API Request</WppActionButton>
      </WppCard>
    </>
  )
}
