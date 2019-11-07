
import React from "react";
import { Pane, SearchInput, Card, Heading } from "evergreen-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCameraAlt } from '@fortawesome/pro-solid-svg-icons';
import { faUser, faHorizontalRule, faSignIn, faSignOut, faPlusCircle} from '@fortawesome/pro-light-svg-icons';
import { Link } from 'react-router-dom'
import { useAuth0 } from "../auth0";

const FlexPane = props => {
  return (
    <Pane
      display="flex"
      flexGrow={1}
      flexShrink={0}
      alignItems="center"
      position="relative"
      justifyContent="center"
      width="100%"
      flexDirection="row"
      {...props}
    />
  );
};

const NavLogo = props => {
  return (
    <Card
      display="flex"
      flexGrow={1}
      flexShrink={9999}
      minWidth={40}
      alignItems="center"
    >
      <Link to="/" style={{ width: "100%", textDecoration: "none" }}>
        <Card
          display="flex"
          alignItems="center"
          fontFamily="Inter"
          color="black"
          textDecoration="none"
        >
          <FontAwesomeIcon icon={faCameraAlt} size="2x" color="#333" />
          <FontAwesomeIcon
            icon={faHorizontalRule}
            transform="rotate-90"
            size="2x"
            color="#333"
          />
          <Heading size={700} color="#333">
            Gomofoto 2
          </Heading>
        </Card>
      </Link>
    </Card>
  );
};

const LogoutLink = props => 
  <Link to="/logout" {...props}>
    <FontAwesomeIcon icon={faSignOut} size="2x" />
  </Link>

const LoginLink = props => 
  <Link to="/login" {...props}>
    <FontAwesomeIcon icon={faSignIn} size="2x" />
  </Link>

const AuthLink = props => {
  const { loading, user } = useAuth0();

  return (
    <React.Fragment>
      { loading && <div/>}
      { !loading && !user && <LoginLink {...props} />}
      { !loading && user &&  <LogoutLink {...props} />}
    </React.Fragment>
  )
}

const NavLinks = props => {
  return (
    <Card
      display="flex"
      flexGrow={1}
      flexShrink={9999}
      minWidth={40}
      alignItems="center"
      justifyContent="flex-end"
    >
      <Link to="/upload" style={{paddingLeft: "20px"}}>
        <FontAwesomeIcon icon={faPlusCircle} size="2x" color="#333" />
      </Link>
      <AuthLink style={{paddingLeft: "20px"}} />
    </Card>
  );
};

function Nav() {
  return (
    <FlexPane
      is="nav"
      order={0}
      flexDirection="column"
      borderBottom="1px solid rgba(0,0,0,.0975)"
    >
      <FlexPane maxWidth={1010} height={77} paddingX={26} paddingY={20}>
        <NavLogo />
        <SearchInput placeholder="Search" width={215} minWidth={125} />
        <NavLinks/>
      </FlexPane>
    </FlexPane>
  );
}

export default Nav;