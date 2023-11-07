import React, { useState } from "react";
import { Container, Form, Button, Table } from "react-bootstrap"; // Import useState and Table
import "./formstyle.css";
import {
  Formik,
  Field,
  ErrorMessage,
  Form as FormikForm,
  useFormik,
} from "formik";
import * as Yup from "yup";

const MyForm = () => {
  const [studentsData, setStudentsData] = useState([]);
  // const [formData, setFormData] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);

  // Define a validation schema using Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    id: Yup.string().required("ID is required"),
    gender: Yup.string().required("Gender is required"),
    // phoneNumber:Yup.string().required("Phone Number Required"),
    phoneNumber: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be a 10-digit number")
      .required("PhoneNumber is required"),
  });

  const initialValues = {
    name: "",
    id: "",
    gender: "",
    phoneNumber: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    // Handle form submission here
    if (editIndex >= 0) {
      // Update the data if it's in edit mode
      const updatedData = [...studentsData];
      updatedData[editIndex] = values;
      setStudentsData(updatedData);
      setEditIndex(-1);
    } else {
      // Add the form data to the state and reset the form
      setStudentsData([...studentsData, values]);
    }
    resetForm(initialValues); // Reset form with initial values
    setIsSubmitted(true);
  };

  // const formik = useFormik({
  //   initialValues: initialValues,
  //   validationSchema: validationSchema,
  //   onSubmit: handleSubmit,
  // });
  // const { setFieldValue } = formik;

  const handleEdit = (index, setFieldValue) => {
    // Set the edit index and populate the form fields

    const dataToEdit = studentsData[index];

    console.log(dataToEdit);

    // Populate the form fields with the data to be edited
    setFieldValue("name", dataToEdit.name);
    setFieldValue("id", dataToEdit.id);
    setFieldValue("gender", dataToEdit.gender);
    setFieldValue("phoneNumber", dataToEdit.phoneNumber);
    // formik.setValues(dataToEdit);

    setEditIndex(index);
    console.log(dataToEdit.name);
    console.log(dataToEdit.id);
    console.log(dataToEdit.gender);
    console.log(dataToEdit.phoneNumber);
  };

  const remove = (i) => {
    const updatedStudentData = studentsData.filter((elem, id) => id !== i);
    setStudentsData(updatedStudentData);
  };

  const errorClass = "is-invalid";
  return (
    <Container>
      <div className="parent-container">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ touched, errors, setFieldValue }) => (
            <FormikForm className="container-1">
              <Form.Group controlId="formName" className="FormName">
                <Form.Label className="Name LabelWithSpace">Name</Form.Label>
                <div className="text-field">
                  <Field
                    type="text"
                    name="name"
                    // value={values.name}
                    as={Form.Control}
                    className={`${
                      touched.name && errors.name ? errorClass : ""
                    } SmallerFormField`}
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </Form.Group>
              <Form.Group controlId="formId" className="FormId">
                <Form.Label className="ID LabelWithSpace">ID</Form.Label>
                <div className="text-field">
                  <Field
                    type="text"
                    name="id"
                    as={Form.Control}
                    className={`${
                      touched.id && errors.id ? errorClass : ""
                    } SmallerFormField`}
                  />
                  <ErrorMessage
                    name="id"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </Form.Group>
              <Form.Group controlId="formGender" className="FormGender">
                <Form.Label className="LabelWithSpace">Gender</Form.Label>
                <div className="text-field">
                  <Field
                    as="select"
                    name="gender"
                    //   as={Form.Control}

                    className={`${
                      touched.gender && errors.gender ? errorClass : ""
                    } SmallerFormField`}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Field>
                  <ErrorMessage
                    name="gender"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </Form.Group>
              <Form.Group
                controlId="formPhoneNumber"
                className="FormPhoneNumber"
              >
                <Form.Label className="LabelWithSpace">Phone Number</Form.Label>
                <div className="text-field">
                  <Field
                    type="text"
                    name="phoneNumber"
                    as={Form.Control}
                    className={`${
                      touched.phoneNumber && errors.phoneNumber
                        ? errorClass
                        : ""
                    } SmallerFormField`}
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </Form.Group>
              <Button variant="success" type="submit" className="Submit">
                {editIndex >= 0 ? "Update" : "Submit"}
              </Button>
              {isSubmitted && studentsData.length > 0 && (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>ID</th>
                      <th>Gender</th>
                      <th>Phone Number</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentsData.map((data, index) => (
                      <tr key={index}>
                        <td>{data.name}</td>
                        <td>{data.id}</td>
                        <td>{data.gender}</td>
                        <td>{data.phoneNumber}</td>
                        <td>
                          <Button
                            className="EditButton"
                            variant="info"
                            onClick={() => handleEdit(index, setFieldValue)}
                          >
                            Edit
                          </Button>

                          <Button
                            className="Remove"
                            variant="danger"
                            onClick={() => remove(index)}
                          >
                            Remove(-)
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </FormikForm>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default MyForm;
