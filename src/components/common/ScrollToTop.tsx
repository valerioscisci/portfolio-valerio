import React, { useEffect, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

const ScrollToTop: React.FC = ({ history, children }: any) => {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  }, []);

  return <Fragment>{children}</Fragment>;
};

export default withRouter(ScrollToTop);
