import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AuthActions from '../../Redux/LoginRedux';
import ServiceActions from '../../Redux/ServiceRedux';

const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {
  state = {
  }
  componentWillMount = () => {
    this.props.actions.auth.checkAuth();
  }
  componentDidMount = () => {
    this.props.actions.service.fetchServicesLow({lowStock: true, list: true})
  }
  componentDidUpdate = (prevProps) => {
    if (!prevProps.auth.logoutSuccess && this.props.auth.logoutSuccess) {
      this.props.history.push('/login');
    }
    if (this.props.auth.tokenValidated === false) {
        this.props.history.push('/login');
    }
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut(e) {
    e.preventDefault()
    this.props.history.push('/login')
  }
  render() {
    console.log('PORPS', this.props);
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense  fallback={this.loading()}>
            <DefaultHeader
              onLogout={e=>this.signOut(e)}
              lowServices={this.props.service.servicesLow}
            />
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
            <AppSidebarNav navConfig={navigation} {...this.props} />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes}/>
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} />
                    ) : (null);
                  })}
                  <Redirect from="/" to="/dashboard" />
                </Switch>
              </Suspense>
            </Container>
          </main>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  service: state.service,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    auth: bindActionCreators(AuthActions, dispatch),
    service: bindActionCreators(ServiceActions, dispatch),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout);
