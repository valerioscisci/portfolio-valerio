import Markdown from 'markdown-to-jsx';
import { Heading } from '../../ui/Heading/Heading';
import { StyledLink } from '../../common/StyledLink/StyledLink';
import { Button } from '../../ui/Button/Button';
import { BlogImage } from '../BlogImage/BlogImage';
import { Paragraph } from '../../ui/Paragraph/Paragraph';
import { OrderedList } from '../../ui/OrderedList/OrderedList';
import { UnorderedList } from '../../ui/UnorderedList/UnorderedList';
import { Gallery } from '../Gallery/Gallery';

const HEADING_STYLE = { marginTop: '1em' };

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
              style: HEADING_STYLE,
            },
          },
          h3: {
            component: Heading,
            props: {
              variant: 3,
              style: HEADING_STYLE,
            },
          },
          h4: {
            component: Heading,
            props: {
              variant: 4,
              style: HEADING_STYLE,
            },
          },
          h5: {
            component: Heading,
            props: {
              variant: 5,
              style: HEADING_STYLE,
            },
          },
          h6: {
            component: Heading,
            props: {
              variant: 6,
              style: HEADING_STYLE,
            },
          },
          img: {
            component: BlogImage,
          },
          Link: {
            component: (props) => (
              <StyledLink
                {...props}
                hoverSpacing={false}
                color={'red'}
                target={props.target ? props.target : '_blank'}
                hoverColor={'secondary'}
              />
            ),
          },
          Button: {
            component: Button,
          },
          p: {
            component: Paragraph,
          },
          ol: {
            component: OrderedList,
          },
          ul: {
            component: UnorderedList,
          },
          hr: {
            component: () => <hr style={{ margin: '1em' }} />,
          },
          divider: {
            component: ({ variant = 10 }) => (
              <div style={{ height: `${variant * 10}px` }}></div>
            ),
          },
          gallery: {
            component: (props) => {
              return <Gallery images={props.images} />;
            },
          },
        },
      }}
    />
  );
};
