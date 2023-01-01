import React from 'react'
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

const UserOrder = ()=>{
    const timeslot = ['12am - 3am', '3am - 6am', '6am - 9am', '9am - 11am', '11am - 2pm', '2pm - 5pm','5pm - 8pm', '8pm - 11pm',]
    
    const registerUser = async(values)=>{
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        };

        const response = await fetch('http://localhost:5000/register', requestOptions);
        const data = await response.json()

        if(data){
            alert(data.msg)
        }
    }

	const SignupSchema = Yup.object().shape({
		productType: Yup.string().required('Required'),
		productWeight: Yup.string().required('Required'),
        maxSize: Yup.string().required('Required'),
		senderLocation: Yup.string().required('Required'),
		receipantLocation: Yup.string().required('Required'),
	});

    return(
        <section className='form_section'>
            <div className='container'>
                <div className='form'>
                    <h1>User Order</h1>

                    <Formik
                        initialValues={{
                            productType: '',
                            productWeight: '',
                            maxSize: '',
                            senderLocation: '',
                            receipentLocation: '',
                            receipantName: '',
                            PhoneNumber: '',
                            delivertDate: '',
                            delivertTime:''
                        }}
                        validationSchema={SignupSchema}
                        onSubmit={values=>{
                            registerUser(values)
                        }}
                    >

                        {({ errors, touched, values, handleChange, handleBlur, handleSubmit }) => (
                            <Form  onSubmit={handleSubmit}>
                                <select name="productType" value={values.productType} onChange={handleChange} onBlur={handleBlur}>
                                    <option value="" disabled="disabled" label="Select Product Type"></option>
                                    <option value="electronics" label="Electronics">Electronics</option>
                                    <option value="crafts" label="Crafts">Crafts</option>
                                    <option value="documents" label="Documents">Documents</option>
                                    <option value="accessories" label="Accessories">Accessories</option>
                                    <option value="others" label="Others">Others</option>
                                </select>
                                {errors.productType && touched.productType ? (<div className="error">{errors.productType}</div>) : null}
                                
                                <Field name="productWeight" placeholder="Product Weight" value={values.productWeight} onChange={handleChange} onBlur={handleBlur} />
                                {errors.productWeight && touched.productWeight ? (<div className="error">{errors.productWeight}</div>) : null}

                                <Field name="maxSize" placeholder="Product max size(in meters)" value={values.maxSize} onChange={handleChange} onBlur={handleBlur} />
                                {errors.maxSize && touched.maxSize ? (<div className="error">{errors.maxSize}</div>) : null}

                                <Field name="senderLocation" placeholder="Sender Location" value={values.senderLocation} onChange={handleChange} onBlur={handleBlur} />
                                {errors.senderLocation && touched.senderLocation ? (<div className="error">{errors.senderLocation}</div>) : null}

                                <Field name="receipentLocation" placeholder="Receipent Location" value={values.receipentLocation} onChange={handleChange} onBlur={handleBlur} />
                                {errors.receipentLocation && touched.receipentLocation ? (<div className="error">{errors.receipentLocation}</div>) : null}

                                <Field name="receipantName" placeholder="Receipent Name" value={values.receipantName} onChange={handleChange} onBlur={handleBlur} />
                                {errors.receipantName && touched.receipantName ? (<div className="error">{errors.receipantName}</div>) : null}

                                <Field name="PhoneNumber" placeholder="Receipent Phone Number" value={values.PhoneNumber} onChange={handleChange} onBlur={handleBlur} />
                                {errors.PhoneNumber && touched.PhoneNumber ? (<div className="error">{errors.PhoneNumber}</div>) : null}

                                <Field name="delivertDate" placeholder="Pick Delivery Date" value={values.delivertDate} onChange={handleChange} onBlur={handleBlur} />
                                {errors.delivertDate && touched.delivertDate ? (<div className="error">{errors.delivertDate}</div>) : null}

                                <select name="exportTime" value={values.exportTime} onChange={handleChange} onBlur={handleBlur}>
                                    <option value="" disabled="disabled" label="Select Delivery Time"></option>
                                    {timeslot.map(time => {
                                        console.log(time)
                                        return(
                                            <option value={time} label={time} key={time}>{time}</option>
                                        )
                                    })}
                                </select>
                                {errors.exportTime && touched.exportTime ? (<div className="error">{errors.exportTime}</div>) : null}

                                <button type="submit">Signup</button>
                            </Form>
                        )} 
                    </Formik>
                </div>
            </div>
        </section>
    )
}
export default UserOrder