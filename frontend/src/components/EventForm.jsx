import React, { useState, useEffect, useCallback } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

import axios from "axios";

const EventForm = (props) => {
   const [formData, setFormData] = useState({
      ename: "",
      ecreator: "",
      edatetime: "",
      evenue: "",
      eaudience: [],
      estate: "",
   });

   useEffect(() => {
      setFormData({
         ename: props.initial.name,
         ecreator: props.initial.creator,
         edatetime: props.initial.datetime,
         evenue: props.initial.venue,
         eaudience: props.initial.audience,
         estate: props.initial.state,
      });
   }, []);

   const handleChange = useCallback((e) => {
      const newFormData = formData;
      newFormData[e.target.name] = e.target.value;
      setFormData(newFormData);
   }, []);

   const handleChangeMultiple = useCallback((e) => {
      const newFormData = formData;
      newFormData[e.target.name] = Array.from(e.target.selectedOptions, (option) => option.value);
      setFormData(newFormData);
   }, []);

   const handleSubmit = useCallback((item) => {
      var submitFormData = new FormData();
      submitFormData.append("name", formData.ename);
      submitFormData.append("datetime", formData.edatetime);
      submitFormData.append("venue", formData.evenue);
      submitFormData.append("creator", formData.ecreator);
      submitFormData.append("audience", formData.eaudience);
      submitFormData.append("state", formData.estate);
      const url = props.action + props.id + "/";
      axios
         .post(url, formData, {
            headers: {
               "Content-Type": "multipart/form-data",
               Authorization: "Token " + localStorage.getItem("token"),
            },
         })
         .then((response) => {
            console.log(response);
         })
         .catch((error) => {
            console.log(error);
         });
      window.location.reload(false);
   }, []);

   return (
      <Form>
         <FormGroup>
            <Label for="ename"> Name </Label>
            <Input type="text" name="ename" value={formData.ename} onChange={handleChange} />
         </FormGroup>
         <FormGroup>
            <Label for="edatetime"> DateTime </Label>
            <Input
               type="text"
               name="edatetime"
               value={formData.edatetime}
               onChange={handleChange}
            />
         </FormGroup>
         <FormGroup>
            <Label for="evenue"> Venue </Label>
            <Input type="textarea" name="evenue" value={formData.evenue} onChange={handleChange} />
         </FormGroup>
         <FormGroup>
            <Label for="eaudience"> Audience </Label>
            <Input
               type="select"
               name="eaudience"
               value={formData.eaudience}
               onChange={handleChangeMultiple}
               multiple
            >
               <option value="ug1"> UG 1 </option>
               <option value="ug2"> UG 2 </option>
               <option value="ug3"> UG 3 </option>
               <option value="ugx"> UG 4+ </option>
               <option value="pg"> PG </option>
               <option value="staff"> Staff </option>
               <option value="faculty"> Faculty </option>
            </Input>
         </FormGroup>
         <FormGroup>
            <Label for="ecreator"> Creator </Label>
            <Input type="text" name="ecreator" value={formData.ecreator} onChange={handleChange} />
         </FormGroup>
         <FormGroup>
            <Label for="estate"> State </Label>
            <Input type="select" name="estate" value={formData.estate} onChange={handleChange}>
               <option value="created"> CREATED </option>
               <option value="approved"> APPROVED </option>
               <option value="published"> PUBLISHED </option>
               <option value="scheduled"> SCHEDULED </option>
               <option value="completed"> COMPLETED </option>
               <option value="deleted"> DELETED </option>
            </Input>
         </FormGroup>
         <Button type="button" onClick={handleSubmit}>
            Submit
         </Button>
      </Form>
   );
};

// class EventForm extends Component {
//    state = {
//       formData: {
//          ename: "",
//          ecreator: "",
//          edatetime: "",
//          evenue: "",
//          eaudience: [],
//          estate: "",
//       },
//    };

//    componentDidMount() {
//       this.setState({
//          formData: {
//             ename: this.props.initial.name,
//             ecreator: this.props.initial.creator,
//             edatetime: this.props.initial.datetime,
//             evenue: this.props.initial.venue,
//             eaudience: this.props.initial.audience,
//             estate: this.props.initial.state,
//          },
//       });
//    }

//    handleChange = (e) => {
//       const newFormData = this.state.formData;
//       newFormData[e.target.name] = e.target.value;
//       this.setState({ formData: newFormData });
//    };

//    handleChangeMultiple = (e) => {
//       const newFormData = this.state.formData;
//       newFormData[e.target.name] = Array.from(e.target.selectedOptions, (option) => option.value);
//       this.setState({ formData: newFormData });
//    };

//    handleSubmit = (item) => {
//       var formData = new FormData();
//       formData.append("name", this.state.formData.ename);
//       formData.append("datetime", this.state.formData.edatetime);
//       formData.append("venue", this.state.formData.evenue);
//       formData.append("creator", this.state.formData.ecreator);
//       formData.append("audience", this.state.formData.eaudience);
//       formData.append("state", this.state.formData.estate);
//       const url = this.props.action + this.props.id + "/";
//       axios
//          .post(url, formData, {
//             headers: {
//                "Content-Type": "multipart/form-data",
//                Authorization: "Token " + localStorage.getItem("token"),
//             },
//          })
//          .then((response) => {
//             console.log(response);
//          })
//          .catch((error) => {
//             console.log(error);
//          });
//       window.location.reload(false);
//    };

//    render() {
//       return (
//          <Form>
//             <FormGroup>
//                <Label for="ename"> Name </Label>
//                <Input
//                   type="text"
//                   name="ename"
//                   value={this.state.formData.ename}
//                   onChange={this.handleChange}
//                />
//             </FormGroup>
//             <FormGroup>
//                <Label for="edatetime"> DateTime </Label>
//                <Input
//                   type="text"
//                   name="edatetime"
//                   value={this.state.formData.edatetime}
//                   onChange={this.handleChange}
//                />
//             </FormGroup>
//             <FormGroup>
//                <Label for="evenue"> Venue </Label>
//                <Input
//                   type="textarea"
//                   name="evenue"
//                   value={this.state.formData.evenue}
//                   onChange={this.handleChange}
//                />
//             </FormGroup>
//             <FormGroup>
//                <Label for="eaudience"> Audience </Label>
//                <Input
//                   type="select"
//                   name="eaudience"
//                   value={this.state.formData.eaudience}
//                   onChange={this.handleChangeMultiple}
//                   multiple
//                >
//                   <option value="ug1"> UG 1 </option>
//                   <option value="ug2"> UG 2 </option>
//                   <option value="ug3"> UG 3 </option>
//                   <option value="ugx"> UG 4+ </option>
//                   <option value="pg"> PG </option>
//                   <option value="staff"> Staff </option>
//                   <option value="faculty"> Faculty </option>
//                </Input>
//             </FormGroup>
//             <FormGroup>
//                <Label for="ecreator"> Creator </Label>
//                <Input
//                   type="text"
//                   name="ecreator"
//                   value={this.state.formData.ecreator}
//                   onChange={this.handleChange}
//                />
//             </FormGroup>
//             <FormGroup>
//                <Label for="estate"> State </Label>
//                <Input
//                   type="select"
//                   name="estate"
//                   value={this.state.formData.estate}
//                   onChange={this.handleChange}
//                >
//                   <option value="created"> CREATED </option>
//                   <option value="approved"> APPROVED </option>
//                   <option value="published"> PUBLISHED </option>
//                   <option value="scheduled"> SCHEDULED </option>
//                   <option value="completed"> COMPLETED </option>
//                   <option value="deleted"> DELETED </option>
//                </Input>
//             </FormGroup>
//             <Button type="button" onClick={this.handleSubmit}>
//                Submit
//             </Button>
//          </Form>
//       );
//    }
// }

export default EventForm;
