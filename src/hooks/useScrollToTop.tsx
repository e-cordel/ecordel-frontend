import React, { useEffect, ReactElement } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

interface Props extends RouteComponentProps {
  children?: React.ReactNode;
}

const ScrollToTop: React.FC<Props> = ({ children, location: { pathname } }): ReactElement => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return <React.Fragment>{children || null}</React.Fragment>;
};

export default withRouter(ScrollToTop);