import React, { Component } from "react";
import {Card, CardImg, CardText, CardBody, CardTitle,Breadcrumb, BreadcrumbItem, Button,Modal, ModalHeader, ModalBody, Label, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors, ActionTypes } from "react-redux-form";
import { Loading } from './loadingComponent';
import { baseUrl } from '../shared/baseURL'; 
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
const required = val => val;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);




class CommentForm extends Component{
   constructor(props){
       super(props);
       this.state = {
           isModalOpen: false
       }
       this.toggleModal = this.toggleModal.bind(this);
   }

   handleSubmit(values) {
    this.toggleModal();
    this.props.postComment(this.props.campsiteId, values.rating, values.author, values.text);
}

   toggleModal(){
       this.setState({
           isModalOpen: !this.state.isModalOpen
       });
   }
   render(){
       return(
           <>
           <div>
               <Button outline onClick={this.toggleModal}><i className="fa fa-pencil fa-lg" />Submit Comment</Button>
               <Modal isOpen={this.state.isModalOpen}>
                   <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                       <ModalBody>
                           <LocalForm onSubmit={values => this.handleSubmit(values)}>
                               <div className="form-group">
                                   <Label htmlFor="rating">Rating</Label>
                                            <Control.select model=".rating" id="rating" name="rating" className="form-control" validators = {{required}} >
                                                <option>Select</option>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </Control.select>
                                            <Errors
                                             className="text-danger"
                                             model=".rating"
                                             show="touched"
                                             component="div"
                                             messages={{
                                                 required: "Required",
                                             }}
                                            />  
                                </div >
                                <div className="form-group">
                                    <Label htmlFor="author">Your Name</Label>
                                            <Control.text model=".author" id="author" name="author" className="form-control"
                                             placeholder="Your Name"
                                             className="form-control"
                                             validators ={{
                                                 required,
                                                 minLength: minLength(2),
                                                 maxLength: maxLength(15)
                                             }}
                                            />
                                            <Errors
                                             className="text-danger"
                                             model=".author"
                                             show="touched"
                                             component="div"
                                             messages={{
                                                 required: "Required",
                                                 minLength: "Must be at least 2 characters long",
                                                 maxLength: "Must be 15 characters or less"
                                             }}
                                            /> 
                                            
                                                
                                    
                                            
                                </div>
                                <div className="form-group">
                                    <Label htmlFor="text">Comment</Label>
                                            <Control.textarea model=".text" id="text" name="text" className="form-control">
                                    
                                    
                                            </Control.textarea>
                                </div>
                                <Button type="submit" value="submit" color="primary">Submit</Button>
                           </LocalForm>
                       </ModalBody>
               </Modal>
           </div>
           </>
       )
   }
}




function RenderCampsite({campsite}){
        return(
            <div className="col-md-5 m-1">
                <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                    <Card>
                        <CardImg top src = {baseUrl + campsite.image} alt={campsite.name} />
                        <CardBody>
                            <CardText>{campsite.description}</CardText>
                        </CardBody>   
                    </Card>
                </FadeTransform>
            </div>
        )
    };

function RenderComments({comments,postComment,campsiteId}){
        if(comments){
            return(
                <Fade in>
                    <div className="col-md-5 m-1">
                    <h4>Comments</h4>
                <Stagger in>
                    {comments.map(comment => {
                            return (
                                <Fade in key={comment.id}>
                                    <div>
                                        <p>
                                            {comment.text}<br />
                                            -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                                        </p>
                                    </div>
                                </Fade>
                            );
                        })
                    }
                </Stagger>
                        <CommentForm campsiteId={campsiteId} postComment={postComment}/>
                    </div>
                </Fade>
            )
        }
        return <div/>;
    };


function CampsiteInfo(props) {
    if (props.isLoading){
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    if (props.errMess){
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }
    if (props.campsite) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments 
                        comments={props.comments} 
                        postComment={props.postComment}
                        campsiteId={props.campsite.id}
                    />
                </div>
            </div>
        );
    }
}


export default CampsiteInfo;