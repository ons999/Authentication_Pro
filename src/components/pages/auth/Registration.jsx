import React, { useState } from 'react'; // Add useState
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Form, Container, Col, Row, Alert, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons
import 'bootstrap/dist/css/bootstrap.css'
const Registration = () => {
  const navigate = useNavigate();

  // State for password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, 'Username must be at least 3 characters')
        .required('Username is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password should be at least 6 characters')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
      terms: Yup.bool()
        .oneOf([true], 'You must accept the terms and conditions')
        .required('You must accept the terms and conditions'),
    }),
    onSubmit: (values) => {
      console.log('Form Values:', values);
      navigate('/login');
    },
  });

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h2 className="mb-4">Register</h2>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.username && !!formik.errors.username}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.username}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="email" className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.email && !!formik.errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="password" className="mt-3">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? 'text' : 'password'} // Toggle input type
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.password && !!formik.errors.password}
                />
                <InputGroup.Text onClick={togglePasswordVisibility}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Toggle icon */}
                </InputGroup.Text>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.password}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="confirmPassword" className="mt-3">
              <Form.Label>Confirm Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showConfirmPassword ? 'text' : 'password'} // Toggle input type
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
                />
                <InputGroup.Text onClick={toggleConfirmPasswordVisibility}>
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />} {/* Toggle icon */}
                </InputGroup.Text>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.confirmPassword}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="terms" className="mt-3">
              <Form.Check
                type="checkbox"
                label="I accept the terms and conditions"
                name="terms"
                checked={formik.values.terms}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.terms && !!formik.errors.terms}
              />
              {formik.touched.terms && formik.errors.terms ? (
                <Alert variant="danger" className="mt-2">
                  {formik.errors.terms}
                </Alert>
              ) : null}
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3" block>
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Registration;
