import Button from '../Button';
import Markdown from 'markdown-to-jsx';
import Hyperlink from '../../components/Common/Hyperlink';
import Heading from '../../components/Common/Heading';
import StyledImage from '../../components/Common/StyledImage';

const PREFIX_CHAR = '#';
const HEADING_COLOR = 'var(--text-light-grey)';

const MarkdownRenderer = ({ content }) => {
  return (
    <Markdown
      children={content}
      options={{
        overrides: {
          h1: {
            component: Heading,
            props: {
              variant: 1,
              prefixChar: PREFIX_CHAR,
              color: HEADING_COLOR,
            },
          },
          h2: {
            component: Heading,
            props: {
              variant: 2,
              prefixChar: PREFIX_CHAR,
              color: HEADING_COLOR,
            },
          },
          h3: {
            component: Heading,
            props: {
              variant: 3,
              prefixChar: PREFIX_CHAR,
              color: HEADING_COLOR,
            },
          },
          h4: {
            component: Heading,
            props: {
              variant: 4,
              prefixChar: PREFIX_CHAR,
              color: HEADING_COLOR,
            },
          },
          h5: {
            component: Heading,
            props: {
              variant: 5,
              prefixChar: PREFIX_CHAR,
              color: HEADING_COLOR,
            },
          },
          h6: {
            component: Heading,
            props: {
              variant: 6,
              prefixChar: PREFIX_CHAR,
              color: HEADING_COLOR,
            },
          },
          img: {
            component: StyledImage,
          },
          Link: {
            component: Hyperlink,
          },
          Button: {
            component: Button,
          },
        },
      }}
    />
  );
};

export default MarkdownRenderer;
