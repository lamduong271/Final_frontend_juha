import React from 'react';
import SkyLight from 'react-skylight';

class ActivityForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { date: "", activity:"", duration:""};
    }

    handleChange = (event) => {
        this.setState(
            { [event.target.name]: event.target.value }
        );
    }

    // Save car and load cars and finally close modal
    handleSubmit = (event) => {
        event.preventDefault();
        var newActivity = { 
            date: this.state.date, 
            activity: this.state.activity, 
            duration: this.state.duration
        };
        this.props.addActivity(newActivity);
        this.props.loadCustomers();
        this.refs.simpleDialog.hide();
    }

    render() {
        // Add car page doesn't fit to default size modal
        const addCarDialog = {
            width: '70%',
            height: '450px',
            marginTop: '-300px',
            marginLeft: '-35%',
        };

        return (
            <div>
                <SkyLight dialogStyles={addCarDialog} hideOnOverlayClicked ref="simpleDialog">
                    <div className="card" style={{ "width": "95%" }}>
                        <div className="card-body">
                            <h5 className="card-title">Add New Activity</h5>

                            <form className="addForm">
                                <div className="form-group">
                                    <input type="text" placeholder="Activity" className="form-control" name="activity" onChange={this.handleChange} />
                                </div>
                                <div className="form-group">
                                    <input type="date" placeholder="Date" className="form-control" name="date" onChange={this.handleChange} />
                                </div>
                                <div className="form-group">
                                    <input type="text" placeholder="Duration" className="form-control" name="duration" onChange={this.handleChange} />
                                </div>

                                <div className="form-group">
                                    <button className="btn btn-primary addButton" onClick={this.handleSubmit}>Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </SkyLight>
                <div className="col-md-2">
                    <button style={{ 'margin': '10px' }} className="btn btn-primary addButton addButton-activity" onClick={() => this.refs.simpleDialog.show()}>ADD NEW ACTIVITY</button>
                </div>
            </div>
        );
    }
}

export default ActivityForm;
