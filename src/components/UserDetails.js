import React, { Component } from "react";

import { connect } from "react-redux";
import { getDataAsync } from "../utils/fetch";


class UserDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {
                address: {},
                company: {}
            },
            listTodos: [],
            listAlbums: [],
            listPhoto: [],
            listComment: [],

            showPhotoState: [],
            showCommentState: [],

            pagination: {
                "todo": {
                    totalPage: 0,
                    pages: [],
                    currentPage: 0
                }
            },
            done: true,
            notDone: true
        }
    }
    componentDidMount() {
        this.setState({
            user: this.props.user
        })

    }


    showTodoList = () => {

        getDataAsync(`https://jsonplaceholder.typicode.com/todos?userId=${this.props.user.id}`).then(data => {

            console.log(data);
            let ahehe1 = data;
            const { pagination } = this.state
            pagination.todo.totalPage = data.length / 10;
            var pages = []
            for (let i = 0; i < data.length / 10; i++) {
                pages.push(i);
            }
            pagination.todo.pages = pages
            this.setState({
                listTodos: ahehe1,
                showTodoState: !this.state.showTodoState,
                pagination: pagination
            })
        });
    }
    changeTodoStatus = (id) => {
        const { listTodos } = this.state;

        listTodos[id].completed = !listTodos[id].completed;

        this.setState({ listTodos })

    }
    setPage = (page) => {
        const { pagination } = this.state;
        pagination.todo.currentPage = page;
        this.setState({ pagination: pagination })
    }
    renderTodos = (array) => {
        const { pagination, done, notDone } = this.state;
        var check = [];
        array.map((todo) => {
            if (done && notDone)
                check.push(todo)
            else if (!notDone && todo.completed)
                check.push(todo)
            else if (!done && !todo.completed)
                check.push(todo)
        })
        console.log(check);
        var rs = []
        var pages = []
        for (let i = 0; i < check.length / 10; i++) {
            pages.push(i);
        }
        console.log(check.length,pages);
        pagination.todo.totalPage = check.length / 10;

        for (let i = pagination.todo.currentPage * 10; i < (pagination.todo.currentPage * 10 + 10); i++) {
            if (check[i]) {
                rs.push(check[i]);
            }

        }
        let res = rs.map((value, key) => {
            return (
                <div className="todo-item">
                    <div className="btn-completed" onClick={() => this.changeTodoStatus(key)}>
                        {value.completed ? <i class="fa fa-check" aria-hidden="true"></i> :
                            <i class="fa fa-times" aria-hidden="true"></i>}
                    </div>
                    <p>{value.title}  </p>

                </div>
            )
        })
        return res;
    }

    renderPhotos = (array) => {
        let res = array.map((value, key) => {
            return (
                <img className="thumbnailUrl" src={value.url} />
            )
        })
        return res;
    }

    renderComment = (array) => {
        let res = array.map((value, key) => {
            return (
                <div className="comment-item">
                    <p><b><i>Name</i></b> : {value.name}</p>
                    <p><b><i>Email</i></b> : {value.email}</p>
                    <p><b><i>Content</i></b> : {value.body}</p>
                </div>
            )
        })
        return res;
    }


    showPhotoState = (id) => {
        console.log("hi")
        const { showPhotoState } = this.state;
        let array = { ...showPhotoState }
        array[id] = !array[id]
        this.setState({
            showPhotoState: array
        })
        console.log(showPhotoState)
    }


    showCommentState = (id) => {
        console.log("hi")
        const { showCommentState } = this.state;
        let array = { ...showCommentState }
        array[id] = !array[id]
        this.setState({
            showCommentState: array
        })
        console.log(showCommentState)
    }

    fetchPhotos = (albumId, key) => {
        getDataAsync(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`).then(data => {

            console.log(data);
            const { listPhoto } = this.state
            listPhoto[key] = data
            this.setState({
                listPhoto: listPhoto
            })
            console.log(this.state.showPhotoState);

        });

    }



    fetchComment = (postId, key) => {
        console.log(postId);
        getDataAsync(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`).then(data => {

            console.log(data);
            const { listComment } = this.state
            listComment[key] = data
            this.setState({
                listComment: listComment
            })

        });

        console.log(this.state.listComment);

    }
    renderAlbums = (array) => {
        const { listPhoto, showPhotoState } = this.state;
        let res = array.map((value, key) => {
            return (
                <div style={{ paddingLeft: '30px' }} key={key}>
                    <p onClick={() => { this.showPhotoState(key); this.fetchPhotos(value.id, key) }}>
                        <i class="fa fa-arrow-right" aria-hidden="true"></i> {value.title}</p>
                    {showPhotoState[key] ? this.renderPhotos(listPhoto[key]) : ""}
                </div>
            )
        })
        return res;
    }
    renderPost = (array) => {
        const { listComment, showCommentState } = this.state;
        let res = array.map((value, key) => {
            return (
                <div key={key}>
                    <p onClick={() => { this.showCommentState(key); this.fetchComment(value.id, key) }} style={{ paddingLeft: '30px', display: 'inline-block' }}>
                        <i class="fa fa-arrow-right" aria-hidden="true"></i> {value.title}</p>
                    {showCommentState[key] ? this.renderComment(listComment[key]) : ""}
                </div>
            )
        })
        return res;
    }

    showAlbumList = () => {
        getDataAsync(`https://jsonplaceholder.typicode.com/albums?userId=${this.props.user.id}`).then(data => {

            console.log(data);
            let ahehe2 = data;
            this.setState({
                listAlbums: ahehe2,
                showPhotoState: Array(data.length).fill(false),
                listPhoto: Array(data.length).fill([]),
                showAlbumState: !this.state.showAlbumState
            })
        });

    }


    showPostList = () => {
        getDataAsync(`https://jsonplaceholder.typicode.com/posts?userId=${this.props.user.id}`).then(data => {

            console.log(data);
            let ahehe2 = data;
            this.setState({
                listPost: ahehe2,
                showCommentState: Array(data.length).fill(false),
                listComment: Array(data.length).fill([]),
                showPostState: !this.state.showPostState
            })
        });

    }


    printPad = (array) => {
        const { pagination } = this.state
        let res = array.map(i => {
            return (
                <li onClick={() => this.setPage(i)} className={i === pagination.todo.currentPage ? "paginate_button page-item active" : "paginate_button page-item "}>
                    <a href="#" aria-controls="dataTable" data-dt-idx={2} tabIndex={0} className="page-link">{i + 1}</a>
                </li>
            )
        })
        return res;
    }



    show = (state) => {
        console.log(state);

        if (state) {
            return <input type="checkbox" checked />
        }
        else {
            return <input type="checkbox" />
        }
    }


    rePad(array){
        // const { pagination, done, notDone } = this.state;
        // var check = [];
        // array.map((todo) => {
        //     if (done && notDone)
        //         check.push(todo)
        //     else if (!notDone && todo.completed)
        //         check.push(todo)
        //     else if (!done && !todo.completed)
        //         check.push(todo)
        // })
        // var pages = []
        // for (let i = 0; i < check.length / 10; i++) {
        //     pages.push(i);
        // }
        // console.log(check.length,pages);
        // pagination.todo.totalPage = check.length / 10;
        // this.setState({
        //     // pagination.todo.totalPage:check.length / 10
        //     pagination: {
        //         todo: {
        //             totalPage: check.length / 10,
        //             pages:pages,
        //             currentPage: pagination.todo.currentPage < check.length?  pagination.todo.currentPage : 0
        //         }
        //     }
        // })
    }




    render() {
        console.log(this.props.user);
        const { pagination, user, listTodos, showTodoState, showAlbumState, listAlbums, showPostState, listPost } = this.state;
        console.log(user);
        console.log(pagination);


        return (
            <div className="">
                <h3>{user.name}</h3>

                <p><b><i>Phone</i></b> : {user.phone}</p>
                <p><b><i>Website</i></b> : {user.website}</p>
                <p><b><i>Address</i></b> : {user.address.suite}, {user.address.street}, {user.address.city}</p>
                <p><b><i>Company</i></b> : {user.company.name}</p>
                <div>
                    <p className="drop-toggle-p" onClick={() => this.showTodoList()}>
                        <i class="fa fa-arrow-down" aria-hidden="true" ></i> todos list: </p>
                    {showTodoState == true && <div className="drop-toggle-pagination">
                        <ul className="pagination">
                            {
                                this.printPad(pagination.todo.pages)
                            }
                        </ul>
                        <div className="drop-toggle-doing">
                            <div>
                                <label className="switch">
                                {this.show(this.state.done)}
                                <span className="slider round" style={{display:'inline-block'}}  onClick={() =>{
                                    this.rePad(listTodos);this.setState({ done: !this.state.done })
                                } }></span>
                                
                            </label><p>Done </p>
                            </div>
                            <div>
                                <label className="switch">
                                {this.show(this.state.notDone)}
                                <span className="slider round" style={{display:'inline-block'}}  
                                onClick={() => {this.rePad(listTodos);this.setState({ notDone: !this.state.notDone })}}></span>
                                
                            </label><p>Not Done </p>
                            </div>
                            
                            
                        </div>
                    </div>}

                    {showTodoState == true && this.renderTodos(listTodos)}

                </div>
                <div>
                    <p className="drop-toggle-p" onClick={() => this.showAlbumList()} > <i class="fa fa-arrow-down" aria-hidden="true" ></i> albums list: </p>
                    {showAlbumState == true && this.renderAlbums(listAlbums)}
                </div>
                <div>
                    <p className="drop-toggle-p" onClick={() => this.showPostList()} > <i class="fa fa-arrow-down" aria-hidden="true" ></i> posts list: </p>
                    {showPostState == true && this.renderPost(listPost)}
                </div>
            </div>

        )
    }

}
const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);