import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { TextInput } from '../common/TextInput';
import { validateEmail } from '../../utils/validation';
import { subscribeToMailingList } from '../../utils/mailchimpSubscribe';
import { HeadingTitle } from './HeadingTitle';
import subscbribeButton from '../../assets/images/homepage/subscribeButton.svg';
import { Paragraph } from './Paragraph';
import { StyledLink } from './StyledLink';
import { Spinner } from './Spinner';

const textBoxStyle = {
  width: '100%',
  margin: '1em',
};

const textInputStyle = {
  margin: '0.5em 1em',
  width: '100%',
};

export const NewsletterForm: React.FC = observer(() => {
  const { t } = useTranslation();
  const [status, setStatus] = useState<
    'onHold' | 'loading' | 'success' | 'failed'
  >('onHold');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [checkboxChoice, setCheckboxChoice] = useState<boolean>(false);

  const resetForm = () => {
    setName('');
    setEmail('');
  };

  const submit = async () => {
    const subscribeResponde: string = await subscribeToMailingList(
      process.env.REACT_APP_MAILCHIMP_URL,
      {
        email: email,
        name: name,
      },
    );
    if (subscribeResponde === 'error') {
      setStatus('failed');
    } else if (subscribeResponde === 'success') {
      setStatus('success');
      resetForm();
    } else {
      setStatus('onHold');
    }
  };

  return (
    <Section id={'Newsletter'}>
      <Container>
        <div>
          <HeadingTitle color={'white'}>
            {t('newsletter.subscribe')}
          </HeadingTitle>
          <InfoText>
            <Paragraph
              color={'white'}
              style={{
                fontFamily: 'Manrope',
                fontWeight: 'bold',
                letterSpacing: '0.06em',
              }}
            >
              {t('newsletter.infoText')}
            </Paragraph>
          </InfoText>
        </div>
        <FormContainer>
          <FieldsContainer>
            <TextInput
              name={'newsletter_name'}
              label={t('contactForm.formLabels.name')}
              type={'text'}
              onChange={(newName: string) => {
                setName(newName);
              }}
              required={false}
              isValid={!!name}
              textBoxStyle={textBoxStyle}
              style={textInputStyle}
            />
            <TextInput
              name={'newsletter_name_email'}
              label={t('contactForm.formLabels.email')}
              type={'email'}
              onChange={(newEmail: string) => {
                setEmail(newEmail);
              }}
              required={true}
              isValid={validateEmail(email)}
              textBoxStyle={textBoxStyle}
              style={textInputStyle}
            />
          </FieldsContainer>
          <CheckboxContainer
            onChange={() => {
              setCheckboxChoice(!checkboxChoice);
            }}
          >
            <Paragraph color={'white'}>
              Accetta{' '}
              <StyledLink href={'#'} color={'white'} hoverSpacing={false}>
                {t('footer.privacyPolicy')}
              </StyledLink>
            </Paragraph>
            <CheckboxPrivacy type={'checkbox'} checked={checkboxChoice} />
            <span></span>
          </CheckboxContainer>
          {status === 'loading' ? (
            <Spinner size={10} />
          ) : status === 'failed' ? (
            <Paragraph color={'red'}>{t('newsletter.failure')}</Paragraph>
          ) : (
            status === 'success' && (
              <Paragraph color={'white'}>{t('newsletter.success')}</Paragraph>
            )
          )}
          <ButtonSubscribe
            onClick={() => {
              setStatus('loading');
              submit();
            }}
            disabled={!validateEmail(email) || !checkboxChoice}
          >
            {t('newsletter.subscribeButton')}
          </ButtonSubscribe>
        </FormContainer>
      </Container>
    </Section>
  );
});

const Section = styled.section`
  width: 100%;
  height: 60em;
  margin: 10em 0 5em 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.secondary};
  clip-path: polygon(0 20%, 100% 0%, 100% 80%, 0% 100%);

  @media (min-width: 768px) {
    height: 35em;
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: 768px) {
    margin-top: -4em;
    padding-right: 1em;
  }
`;

const FieldsContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  padding-right: 3em;
  @media (min-width: 992px) {
    width: 100%;
    padding-right: 0em;
    flex-direction: row;
  }
`;

const InfoText = styled.div`
  padding: 2em 1em;
  margin-top: -4em;
`;

const CheckboxPrivacy = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;

const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 2em;
  margin: 1em 0;
  cursor: pointer;
  font-size: 1em;
  user-select: none;

  & span {
    position: absolute;
    top: 50%;
    left: 0;
    height: 25px;
    width: 25px;
    transform: translateY(-50%);
    background-color: ${(props) => props.theme.colors.textColorWhite};
    border-radius: 5px;
    border: 1px solid ${(props) => props.theme.colors.textColorGrey};

    &:after {
      content: '';
      position: absolute;
      display: none;
      left: 15%;
      top: 35%;
      width: 8px;
      height: 13px;
      border: solid white;
      border-width: 0 3px 3px 0;
      transform: rotate(45deg) translateY(-50%);
    }
  }

  &:hover input ~ span {
    background-color: ${(props) => props.theme.colors.backgroundLight};
  }

  & input:checked ~ span:after {
    display: block;
  }

  & input:checked ~ span {
    background-color: ${(props) => props.theme.colors.primary};
  }
`;

const ButtonSubscribe = styled.button<{ disabled?: boolean }>`
  @keyframes animateButtonBefore {
    0% {
        width: 3em;
        height: 3em;
    }
    50% {
        top: 0%;
        left: -2.3em;
        width: 4em;
        height: 4em;
      }
    }

    100% {
        width: 3em;
        height: 3em;
    }
  }

  @keyframes animateButtonAfter {
    0% {
        width: 3em;
        height: 3em;
    }
    50% {
        top: 0%;
        right: -2.3em;
        width: 4em;
        height: 4em;
      }
    }

    100% {
        width: 3em;
        height: 3em;
    }
  }

  font-family: Manrope;
  font-size: 1em;
  margin: 0 2em;
  background-color: ${(props) => props.theme.colors.textColorWhite};
  border: none;
  padding: 1em;
  border-radius: 3em;
  min-width: 15em;
  position: relative;
  border: 0.3px solid transparent;

  &:before {
    animation: animateButtonBefore 0.8s cubic-bezier(.36,.07,.19,.97) infinite; 
    animation-play-state: paused; 
  }

  &:after {
    animation: animateButtonAfter 0.8s cubic-bezier(.36,.07,.19,.97) infinite; 
    animation-play-state: paused; 
  }


  ${(props) =>
    props.disabled
      ? css`
          background-color: ${(props) => props.theme.colors.background};
        `
      : css`
          &:hover {
            cursor: pointer;
            &:before {
              filter: blur(2px);
              animation-play-state: running;
              background-image: url('${subscbribeButton}');
              background-size: cover;
              position: absolute;
              display: inline-block;
              width: 3em;
              height: 3em;
              top: 10%;
              left: -1.3em;
              content: '';
            }

            &:after {
              filter: blur(2px);
              animation-play-state: running;
              background-image: url('${subscbribeButton}');
              background-size: cover;
              transform: scaleX(-1);
              position: absolute;
              display: inline-block;
              width: 3em;
              height: 3em;
              top: 10%;
              right: -1.3em;
              content: '';
            }

            box-shadow: 0 0 3px ${(props) => props.theme.colors.textColorWhite},
              0 0 5px ${(props) => props.theme.colors.textColorWhite},
              0 0 8px ${(props) => props.theme.colors.background},
              0 0 10px ${(props) => props.theme.colors.background},
              0 0 8px ${(props) => props.theme.colors.textColorBlack};
          }
        `} 
`;
