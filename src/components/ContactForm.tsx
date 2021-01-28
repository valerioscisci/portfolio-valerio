import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import contactFormBackground from '../assets/images/homepage/contact_form.jpg';
import { HeadingTitle } from './HeadingTitle';
import { ConditionalWrapper } from './ConditionalWrapper';
import { useTranslation } from 'react-i18next';
import { TextInput } from './TextInput';
import ReCAPTCHA from 'react-google-recaptcha';
import { validateEmail } from '../utils/validation';
import { useStores } from '../hooks/useStores';
import { Button } from './Button';
import { FaEnvelope } from 'react-icons/fa';

export interface ContactFormProps {
  width: number;
}

export const ContactForm: React.FC<ContactFormProps> = observer(({ width }) => {
  const { home } = useStores();
  const { t } = useTranslation();
  const [success, setSuccess] = useState<boolean>(false);
  const [notRobot, setNotRobot] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    if (window.location.search.includes('success=true')) {
      setSuccess(true);
    }
  }, []);

  return (
    <Section>
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
          name={'contact'}
          method={'POST'}
          action="/contact/?success=true"
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
            <Button
              buttonText={t('contactForm.formLabels.send')}
              disabled={
                !notRobot ||
                !name ||
                !email ||
                !message ||
                !validateEmail(email)
              }
              type="submit"
              iconRight={<FaEnvelope size={'1em'} />}
            />
            {success && (
              <SuccessMessage>{t('contactForm.thanks')}</SuccessMessage>
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
