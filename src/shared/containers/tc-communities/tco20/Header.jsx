/** TCO20 special header */

import PT from 'prop-types';
import React from 'react';
import ContentfulMenu from 'components/Contentful/Menu';
import { Link } from 'topcoder-react-utils';
import { connect } from 'react-redux';
import { Avatar } from 'topcoder-react-ui-kit';
import TCO20Logo from 'assets/themes/tco/TCO20.svg';
import defaultStyle from './header.scss';

function TCO20Header(props) {
  const { base, meta, auth } = props;
  console.log('TCO20Header', props)
  return (
    <div className={defaultStyle.topHeader}>
      <Link to={base} className={defaultStyle.headerLogo}>
        <TCO20Logo />
      </Link>
      {
        meta.menuItems ? (
          <ContentfulMenu
            id={meta.menuItems[0].navigationMenu}
            spaceName={meta.menuItems[0].spaceName}
            environment={meta.menuItems[0].environment}
            baseUrl={base}
          />
        ) : null
      }
      <div className={defaultStyle.profile}>
        {
          auth && auth.profile ? (
            <React.Fragment>
              <Link to={`${base}/members/${auth.profile.handle}`} className={defaultStyle.userMenuHandle}>
                {auth.profile.handle}
              </Link>
              <Avatar url={auth.profile.photoURL} />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <a href="">LOGIN</a>
              <a href="">SIGN UP</a>
            </React.Fragment>
          )
        }
      </div>
    </div>
  );
}

TCO20Header.defaultProps = {
  base: '',
  auth: null,
};

TCO20Header.propTypes = {
  base: PT.string,
  meta: PT.shape().isRequired,
  auth: PT.shape(),
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(TCO20Header);