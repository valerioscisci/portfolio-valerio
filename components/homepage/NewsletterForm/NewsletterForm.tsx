import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { TextInput } from '../../common/TextInput/TextInput';
import jsonp from 'jsonp';
import toQueryString from 'to-querystring';
import { TFunction } from 'next-i18next';
import { Paragraph } from '../../ui/Paragraph/Paragraph';
import { HeadingTitle } from '../../ui/HeadingTitle/HeadingTitle';
import { Spinner } from '../../common/Spinner/Spinner';
import { StyledLink } from '../../common/StyledLink/StyledLink';
import { url } from '../../../config/config';
import { validateEmail } from '../../../utils/validation';

const textBoxStyle = {
  width: '100%',
  margin: '1em',
};

const textInputStyle = {
  margin: '0.5em 1em',
  width: '100%',
};

interface NewsletterFormProps {
  t: TFunction;
}

export const NewsletterForm: React.FC<NewsletterFormProps> = ({ t }) => {
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

  const getAjaxUrl = async (url?: string) => {
    if (url) {
      return url.replace('/post?', '/post-json?');
    } else {
      return '';
    }
  };

  const subscribe = async (url: string) => {
    jsonp(
      url,
      {
        param: 'c',
      },
      (err, data) => {
        if (err) {
          setStatus('failed');
        } else if (data.result !== 'success') {
          setStatus('failed');
        } else {
          setStatus('success');
          resetForm();
        }
      },
    );
  };

  const submit = async () => {
    setStatus('loading');
    const params = toQueryString({
      EMAIL: email,
      NAME: name,
    });
    const urlRequest =
      (await getAjaxUrl(process.env.NEXT_PUBLIC_MAILCHIMP_URL)) + '&' + params;

    await subscribe(urlRequest);
  };

  return (
    <Section id={'Newsletter'}>
      <Container>
        <div>
          <HeadingTitle color={'white'}>
            {t('homepage:newsletter.subscribe')}
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
              {t('homepage:newsletter.infoText')}
            </Paragraph>
          </InfoText>
        </div>
        <FormContainer>
          <FieldsContainer>
            <TextInput
              name={'newsletter_name'}
              label={t('homepage:contactForm.formLabels.name')}
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
              label={t('homepage:contactForm.formLabels.email')}
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
          <CheckboxContainer>
            <Paragraph color={'white'}>Accetta</Paragraph>
            <CheckboxPrivacy
              type={'checkbox'}
              checked={checkboxChoice}
              readOnly
              onClick={() => {
                setCheckboxChoice(!checkboxChoice);
              }}
            />
            <span></span>
          </CheckboxContainer>
          {status === 'loading' ? (
            <Spinner size={10} style={'margin: 0 0 1em 0;'} />
          ) : status === 'failed' ? (
            <Paragraph color={'red'}>
              {t('homepage:newsletter.failure')}
            </Paragraph>
          ) : (
            status === 'success' && (
              <Paragraph color={'white'}>
                {t('homepage:newsletter.success')}
              </Paragraph>
            )
          )}
          <ButtonSubscribe
            onClick={() => {
              submit();
            }}
            disabled={!validateEmail(email) || !checkboxChoice}
          >
            {t('common:subscribe')}
          </ButtonSubscribe>
          {/* TODO: add privacy policy */}
          <StyledLink href={'/'} color={'white'} hoverSpacing={false}>
            {t('common:footer.privacyPolicy')}
          </StyledLink>
        </FormContainer>
      </Container>
    </Section>
  );
};

const Section = styled.section`
  width: 100%;
  height: 60em;
  margin: 10em 0 0 0;
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
              background-image: url('${url}images/homepage/subscribeButton.svg');
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
              background-image: url('${url}images/homepage/subscribeButton.svg');
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
