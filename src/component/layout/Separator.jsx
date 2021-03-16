/* eslint-disable no-nested-ternary */
import React from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Route } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { breadcrumbNameMap } from 'component/layout/NavContents';

const LinkRouter = (props) => <Link {...props} component={RouterLink} />;

const Separator = () => {
  return (
    <div>
      <Route>
        {({ location }) => {
          const pathnames = location.pathname.split('/').filter((x) => x);

          return (
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <LinkRouter color="inherit" to="/">
                Home
              </LinkRouter>
              {pathnames.map((value, index) => {
                const last = index === pathnames.length - 1;
                const to = `/${pathnames.slice(0, index + 1).join('/')}`;

                return last ? (
                  <Typography color="textPrimary" key={to}>
                    {breadcrumbNameMap(to)}
                  </Typography>
                ) : (
                  <LinkRouter color="inherit" to={to} key={to}>
                    {breadcrumbNameMap(to)}
                  </LinkRouter>
                );
              })}
            </Breadcrumbs>
          );
        }}
      </Route>
    </div>
  );
};

export default Separator;
