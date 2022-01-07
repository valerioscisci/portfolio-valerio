import Markdown from 'markdown-to-jsx';
import { Heading } from '../../ui/Heading/Heading';
import { StyledLink } from '../../common/StyledLink/StyledLink';
import { Button } from '../../ui/Button/Button';
import { BlogImage } from '../BlogImage/BlogImage';

export const MarkdownRenderer = ({ content }) => {
  return (
    <Markdown
      children={content}
      options={{
        overrides: {
          h1: {
            component: Heading,
            props: {
              variant: 1,
            },
          },
          h2: {
            component: Heading,
            props: {
              variant: 2,
            },
          },
          h3: {
            component: Heading,
            props: {
              variant: 3,
            },
          },
          h4: {
            component: Heading,
            props: {
              variant: 4,
            },
          },
          h5: {
            component: Heading,
            props: {
              variant: 5,
            },
          },
          h6: {
            component: Heading,
            props: {
              variant: 6,
            },
          },
          img: {
            component: BlogImage,
          },
          Link: {
            component: StyledLink,
          },
          Button: {
            component: Button,
          },
        },
      }}
    />
  );
};
