import React from 'react';
import css from './DailyCaloriesForm.module.css'
import { useDispatch} from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { 
    addHeight, 
    addAge, 
    addCurrentWeight, 
    addDesiredWeight, 
    addBloodType, 
    clearForm 
} from '../../redux/recommendations/recommendationsSlice'; 
import Modal from '../Modal/Modal';
import useModal from '../../hooks/useModal'; 
import { fetchPublicRecommendations } from '../../redux/recommendations/operations';

const validationSchema = Yup.object({
    height: Yup.number().min(50, 'Too small').max(300, 'Too large').required('Required'),
    age: Yup.number().min(1, 'Age cannot be less than 1').max(120, 'Age cannot exceed 120').required('Required'),
    current_weight: Yup.number().min(30, 'Too small').max(300, 'Too large').required('Required'),
    desired_weight: Yup.number().min(30, 'Too small').max(300, 'Too large').required('Required'),
    blood_type: Yup.string().oneOf(['0(I)', 'A(II)', 'B(III)', 'AB(IV)'], 'Select a valid blood type').required('Required'),
});

const DailyCaloriesForm = () => {
    const dispatch = useDispatch();
    const { isOpen, openModal, closeModal } = useModal();

    return (
        <>
            <Formik
                initialValues={{
                    height: '',
                    age: '',
                    current_weight: '',
                    desired_weight: '',
                    blood_type: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                    dispatch(addHeight(Number(values.height)));
                    dispatch(addAge(Number(values.age)));
                    dispatch(addCurrentWeight(Number(values.current_weight)));
                    dispatch(addDesiredWeight(Number(values.desired_weight)));
                    dispatch(addBloodType(values.blood_type));
                    dispatch(fetchPublicRecommendations(values));
                    console.log("Form data", values);
                    resetForm();
                    dispatch(clearForm());
                }}
            >
                {({ isSubmitting, isValid }) => (
                    <Form className={css.form}>
                        <div className={css.container}>
                            <div className={css.leftSide}>
                                <div className={css.formGroup}>
                                    <div>
                                        <Field
                                            type="number"
                                            name="height"
                                            placeholder="Height*"
                                            className={css.inputField}
                                        />
                                        <ErrorMessage name="height" component="div" className={css.error} />
                                    </div>
                                    
                                    <div>
                                        <Field
                                            type="number"
                                            name="age"
                                            placeholder="Age*"
                                            className={css.inputField}
                                        />
                                        <ErrorMessage name="age" component="div" className={css.error} />
                                    </div>
                                    
                                    <div>
                                        <Field
                                            type="number"
                                            name="current_weight"
                                            placeholder="Current weight*"
                                            className={css.inputField}
                                        />
                                        <ErrorMessage name="current_weight" component="div" className={css.error} />
                                    
                                    </div>
                                    
                                </div>
                            </div>

                            <div className={css.rightSide}>
                                <div className={css.formGroup}>
                                    <div>
                                        <Field
                                            type="number"
                                            name="desired_weight"
                                            placeholder="Desired weight*"
                                            className={css.inputField}
                                        />
                                        <ErrorMessage name="desired_weight" component="div" className={css.error} />
                                    </div>
                                    

                                    <div className={css.bloodTypeGroup}>
                                        <label htmlFor="blood_type_0">
                                            <Field type="radio" name="blood_type" value="0(I)" id="blood_type_0" />
                                            <span>0(I)</span>
                                        </label>

                                        <label htmlFor="blood_type_A">
                                            <Field type="radio" name="blood_type" value="A(II)" id="blood_type_A" />
                                            <span>A(II)</span>
                                        </label>

                                        <label htmlFor="blood_type_B">
                                            <Field type="radio" name="blood_type" value="B(III)" id="blood_type_B" />
                                            <span>B(III)</span>
                                        </label>

                                        <label htmlFor="blood_type_AB">
                                            <Field type="radio" name="blood_type" value="AB(IV)" id="blood_type_AB" />
                                            <span>AB(IV)</span>
                                        </label>
                                    </div>
                                    <ErrorMessage name="blood_type" component="div" className={css.error} />
                                </div>
                            </div>
                        </div>
                        <div className={css.button}>
                            <button type="submit" disabled={isSubmitting || !isValid} onClick={openModal} className={css.modalButton}>
                                Start losing weight
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>

            {isOpen && <Modal closeModal={closeModal} />}
        </>
    );
};

export default DailyCaloriesForm;
