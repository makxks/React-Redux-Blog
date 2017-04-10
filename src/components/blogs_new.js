import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';

class BlogsNew extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    onSubmit(props) {
        firebase.database().ref(props.blogName).set({
            name: props.blogName
        });
        this.context.router.push('/');  
    }

    render() {
        /*if(!firebase.auth().currentUser || firebase.auth().currentUser.uid != "HpSs3QseDCa17bHO9tHM4eEJqNH3"){
            return (
                <div>
                    <h3>You are not authenticated to make new blogs</h3>
                    <Link to="/" className="btn btn-danger">Go Back</Link>
                </div>
            )
        }*/
        const { fields: { blogName }, handleSubmit } = this.props;
 
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <h3>Create A New Blog</h3>
                <div className={`form-group ${blogName.touched && blogName.invalid ? 'has-danger' : ''}`}>
                    <label>Blog Name</label>
                    <input type="text" className="form-control" {...blogName} />
                    <div className="text-help">
                        {blogName.touched ? blogName.error : ''}
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

function validate(values) {
    const errors = {};

    if (!values.blogName) {
        errors.blogName = 'Enter a name';
    }

    return errors;
}

// connect: first argument is mapStateToProps, second is mapDispatchToProps
// reduxForm: first is form config, second is mapStateToProps, third is mapDispatchToProps

export default reduxForm({
    form: 'BlogsNew',
    fields: ['blogName'],
    validate
}, null)(BlogsNew);