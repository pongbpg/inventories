import { connect } from 'react-redux'
import React, { Component } from "react";
import { getUsersRequest, createUserRequest, deleteUserRequest, usersError } from '../../actions/users';
import UsersList from './List';
import NewUserForm from './Create';
import { Alert } from 'reactstrap'
class App extends Component {
    constructor(props) {
        super(props)
        this.props.getUsersRequest();
    }
    handleSubmit = ({ firstName, lastName }) => {
        // console.log(firstName, lastName)
        this.props.createUserRequest({
            firstName, lastName
        })
    }
    handelDeleteUserClick = (userId) => {
        this.props.deleteUserRequest(userId)
    }

    handleCloseAlert = () => {
        return this.props.usersError({ error: undefined });
    }
    render() {
        const users = this.props.users;
        return (
            <div style={{ margin: '0 auto', padding: '20px', maxWidth: '600px' }}>
                <Alert color="danger" isOpen={!!this.props.users.error} toggle={this.handleCloseAlert}>
                    {this.props.users.error}
                </Alert>
                <NewUserForm onSubmit={this.handleSubmit} />
                <UsersList onDeleteUser={this.handelDeleteUserClick} users={users.items} />
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        users: state.users
    };
};
// const mapDispatchToProps = dispatch => ({
//     getUsersRequest: () => dispatch(getUsersRequest())
// })
export default connect(mapStateToProps, { getUsersRequest, createUserRequest, deleteUserRequest, usersError })(App);
