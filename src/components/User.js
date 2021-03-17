import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { getDataAsync } from '../utils/fetch';
import UserDetails from './UserDetails';

class User extends Component {

    constructor(props) {
        super(props);
        this.state = {
            array: [],
            isModalVisible: false,

            user: '',

            modalIsOpen: false
        }

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        getDataAsync(`https://jsonplaceholder.typicode.com/users`).then(data => {

            console.log(data);
            let ahihi = data;
            this.setState({
                array: ahihi

            })
        });
    }

    openModal = (value) => {
        this.setState({ modalIsOpen: true });
        this.props.onDetails(value);
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    renderPost = (array) => {
        let result = array.map((value, key) => {
            return (
                <tr key={key}>
                    <td>{value.id}</td>
                    <td>{value.name}</td>
                    <td>{value.username}</td>
                    <td>{value.email}</td>
                    <td>
                        <button className="btn-primary" onClick={() => this.openModal(value)}>Details</button>
                    </td>
                </tr>
            )
        })
        return result;
    }

    render() {
        const { array } = this.state;
        return (
            <div className="user-container">
                <h1>List of User</h1>

                <table className="table table-bordered dataTable" id="dataTable" width="100%" cellSpacing={0} role="grid" aria-describedby="dataTable_info" style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderPost(array)}
                    </tbody>

                    {this.state.modalIsOpen == true && <UserDetails />}

                </table>


                <div>
                    <Modal onRequestClose={this.closeModal} isOpen={this.state.modalIsOpen}>
                        <div className="modal-container">
                            <button className="modal-container-button" onClick={this.closeModal}>
                                <i className="fa fa-times" aria-hidden="true"></i>
                            </button>
                            <UserDetails />
                        </div>

                    </Modal>
                </div>



            </div>
        )
    }

}
const mapStateToProps = (state, ownProps) => {
    return {
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onDetails: (value) => {
            dispatch({ type: "ON_DETAILS", payload:value })
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(User);