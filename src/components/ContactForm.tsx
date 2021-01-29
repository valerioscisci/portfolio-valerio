import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { observer } from 'mobx-react';
import contactFormBackground from '../assets/images/homepage/contact_form.jpg';
import { HeadingTitle } from './HeadingTitle';
import { ConditionalWrapper } from './ConditionalWrapper';
import { useTranslation } from 'react-i18next';
import { TextInput } from './TextInput';
import ReCAPTCHA from 'react-google-recaptcha';
import { validateEmail } from '../utils/validation';
import { useStores } from '../hooks/useStores';
import { FaEnvelope } from 'react-icons/fa';

export interface ContactFormProps {
  width: number;
}

export const ContactForm: React.FC<ContactFormProps> = observer(({ width }) => {
  const { home } = useStores();
  const { t } = useTranslation();
  const [success, setSuccess] = useState<boolean | undefined>(undefined);
  const [notRobot, setNotRobot] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const resetForm = () => {
    setName('');
    setEmail('');
    setMessage('');
  };

  const encode = (data: any) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]),
      )
      .join('&');
  };

  const handleSubmit = (e: any) => {
    setSuccess(undefined);
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': 'contact',
        ...{ name: name, email: email, message: message },
      }),
    })
      .then(() => {
        setSuccess(true);
        resetForm();
      })
      .catch((error) => {
        setSuccess(false);
      });

    e.preventDefault();
  };

  return (
    <Section>
      {/* Hidden form used by netlify to recognize it */}
      {/* @ts-ignore */}
      <form name="contact" netlify netlify-honeypot="bot-field" hidden>
        <input type="text" name="name" />
        <input type="email" name="email" />
        <textarea name="message"></textarea>
      </form>
      <HeadingTitle
        color={width < 992 ? 'black' : 'white'}
        style={width > 992 ? { marginBottom: '5em' } : {}}
      >
        {t('contactForm.title')}
      </HeadingTitle>
      <ConditionalWrapper
        condition={width > 992}
        wrapper={(children) => <FormContainer>{children}</FormContainer>}
      >
        <form
          id={'ContactForm'}
          name={'contact'}
          method={'POST'}
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          data-netlify={'true'}
          autoComplete="off"
        >
          <input
            autoComplete="off"
            type="hidden"
            name="form-name"
            value="contact"
          />
          <TextInput
            name={'name'}
            label={t('contactForm.formLabels.name')}
            type={'text'}
            onChange={(newName: string) => {
              setName(newName);
            }}
            required={true}
            isValid={!!name}
          />
          <TextInput
            name={'email'}
            label={t('contactForm.formLabels.email')}
            type={'email'}
            onChange={(newEmail: string) => {
              setEmail(newEmail);
            }}
            required={true}
            isValid={validateEmail(email)}
          />
          <TextInput
            name="message"
            label={t('contactForm.formLabels.message')}
            type={'textarea'}
            onChange={(newMessage: string) => setMessage(newMessage)}
            required={true}
            isValid={!!message}
          />
          <ReCAPTCHA
            sitekey={'6LdPmj0aAAAAAJWj0RWQGmt4jXZDpTFuTj5UzoB2'}
            onChange={() => {
              setNotRobot(true);
            }}
            onExpired={() => {
              setNotRobot(false);
            }}
            hl={home.language}
          />
          <ButtonContainer>
            <SubmitButton
              disabled={
                !notRobot ||
                !name ||
                !email ||
                !message ||
                !validateEmail(email)
              }
            >
              {t('contactForm.formLabels.send')}{' '}
              <FaEnvelope size={'1.2em'} style={{ marginLeft: '1em' }} />
            </SubmitButton>
            {success ? (
              <SuccessMessage>{t('contactForm.thanks')}</SuccessMessage>
            ) : (
              success !== undefined && (
                <ErrorMessage>{t('contactForm.error')}</ErrorMessage>
              )
            )}
          </ButtonContainer>
        </form>
      </ConditionalWrapper>
    </Section>
  );
});

const Section = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 50em;
  margin-top: 10em;
  padding: 0 3em;

  background-color: ${(props) => props.theme.colors.background};
  background-image: linear-gradient(
      180deg,
      ${(props) => props.theme.colors.background} 5%,
      rgba(255, 255, 255, 0.8) 25%,
      rgba(255, 255, 255, 0.6) 35%,
      rgba(255, 255, 255, 0.3) 45%,
      rgba(255, 255, 255, 0.1) 52%,
      rgba(255, 255, 255, 0) 75%
    ),
    url(${contactFormBackground});
  background-size: cover;
  background-position: 30% 0%;

  @media (min-width: 992px) {
    flex-direction: row;
    align-items: flex-end;
  }
`;

const FormContainer = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  width: 50%;
  max-width: 500px;
  display: flex;
  justify-content: center;

  padding: 1em;
  border-style: solid;
  border-width: 1px;
  border-color: #edf1f7;
  border-radius: 6px;
  background-color: ${(props) => props.theme.colors.textColorWhite};

  box-shadow: 0 0 1em 3px rgba(230, 234, 240, 0.54);

  margin-bottom: 2em;
`;

const ButtonContainer = styled.div`
  margin: 2em 0;
  width: 100%;

  @media (min-width: 992px) {
    margin: 1em 0 0 0;
    display: flex;
    justify-content: center;
  }
`;

const SuccessMessage = styled.span`
  margin-left: 1em;
  font-family: Corben;
  letter-spacing: 0.2em;
  color: ${(props) => props.theme.colors.primary};
  font-weight: bold;
  font-size: 1.2em;
`;

const ErrorMessage = styled(SuccessMessage)`
  color: ${(props) => props.theme.colors.error};
`;

const SubmitButton = styled.button<{ disabled?: boolean }>`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  cursor: ${(props) => (props.disabled ? 'initial' : 'pointer')};
  padding: 0.4em 1.4em;
  margin: auto;
  border-radius: 0.3em;
  font-family: Manrope;
  font-size: 1em;
  text-decoration: none;
  text-transform: uppercase;
  color: ${(props) =>
    props.disabled
      ? props.theme.colors.textColorGrey
      : props.theme.colors.backgroundDark};
  background: ${(props) => props.theme.colors.background};
  position: relative;
  border: 1px solid ${(props) => props.theme.colors.backgroundDark};
  font-weight: bold;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
  }

  &:hover,
  &:focus,
  &:active {
    ${(props) =>
      !props.disabled &&
      css`
        background: ${(props) => props.theme.colors.backgroundDark};
        color: ${(props) => props.theme.colors.primary};
      `}
`;
