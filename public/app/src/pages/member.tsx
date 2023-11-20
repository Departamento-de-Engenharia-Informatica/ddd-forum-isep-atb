
import React from 'react'
import { Layout } from '../shared/layout'
import Header from '../shared/components/header/components/Header'
import { BackNavigation } from '../shared/components/header';
import { ProfileButton } from '../modules/users/components/profileButton';
import { User } from '../modules/users/models/user';
import { UsersState } from '../modules/users/redux/states';
import { ForumState } from '../modules/forum/redux/states';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as usersOperators from '../modules/users/redux/operators'
import * as forumOperators from '../modules/forum/redux/operators'
import withLogoutHandling from '../modules/users/hocs/withLogoutHandling';
import withVoting from '../modules/forum/hocs/withVoting';
import { RouteProps } from 'react-router';
import {RouteComponentProps} from 'react-router';

interface MemberPageProps extends usersOperators.IUserOperators, forumOperators.IForumOperations {
  users: UsersState;
  forum: ForumState;
}

interface IReactRouterParams {
  username: string;
}
export class MemberPage extends React.Component<MemberPageProps & RouteComponentProps<IReactRouterParams>, any> {
  constructor (props: any) {
    super(props);
  
  }

  getUserName () {   
    return this.props.match.params.username;
  }

  // For the moment only returns data about current logged in user
  getUserProfile () {
    return this.props.getUserProfile();
  }

  componentDidMount () {
    this.getUserProfile();
  }

  render () {
    const username = this.getUserName();

    return (
      <Layout>
        <div className="header-container flex flex-row flex-center flex-between">
          <BackNavigation
            text="Back to all discussions"
            to="/"
          />
        </div>
        <div className="header-container flex flex-row flex-center flex-even">
          <Header
            title="Domain-Driven Designers"
            subtitle="Where awesome Domain-Driven Designers are made"
          />
          <ProfileButton
            isLoggedIn={this.props.users.isAuthenticated}
            username={this.props.users.isAuthenticated ? (this.props.users.user as User).username : ''}
            onLogout={() => this.props.logout()}
          />
        </div>

        <div>
        <h1>Member</h1>
        <h2>{username}</h2>
        <h2>Actual logged in user: {this.props.users.isAuthenticated ? (this.props.users.user as User).username : 'unknown user, not logged in'}</h2>
      </div>        
      </Layout>
    )
  }
}

function mapStateToProps ({ users, forum }: { users: UsersState, forum: ForumState }) {
  return {
    users,
    forum
  };
}

function mapActionCreatorsToProps(dispatch: any) {
  return bindActionCreators(
    {
      ...usersOperators,
      ...forumOperators
    }, dispatch);
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(
  withLogoutHandling(
    withVoting(MemberPage)
  )
);
