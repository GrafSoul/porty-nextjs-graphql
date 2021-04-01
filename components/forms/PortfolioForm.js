//Core
import { useEffect, useState } from 'react';
// Hook Form
import { useForm } from 'react-hook-form';
// Datepicker
import DatePicker from 'react-datepicker';

const PortfolioForm = ({ onSubmit, initialData = {} }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const { handleSubmit, register, setValue } = useForm({
        defaultValues: initialData,
    });

    useEffect(() => {
        register({ name: 'startDate' });
        register({ name: 'endDate' });
    }, [register]);

    useEffect(() => {
        const { startDate, endDate } = initialData;

        if (startDate) {
            setStartDate(new Date(parseInt(startDate, 10)));
        }

        if (endDate) {
            setEndDate(new Date(parseInt(endDate, 10)));
        }
    }, [initialData]);

    const handleDateChange = (dateType, setDate) => (date) => {
        setValue(
            dateType,
            (date && new Date(date.setHours(0, 0, 0, 0)).toISOString()) || date,
        );
        setDate(date);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                    ref={register}
                    defaultValue={initialData.title}
                    name="title"
                    type="text"
                    className="form-control"
                    id="title"
                />
            </div>

            <div className="form-group">
                <label htmlFor="company">Company</label>
                <input
                    ref={register}
                    defaultValue={initialData.company}
                    name="company"
                    type="text"
                    className="form-control"
                    id="company"
                />
            </div>

            <div className="form-group">
                <label htmlFor="companyWebsite">Company Website</label>
                <input
                    ref={register}
                    defaultValue={initialData.companyWebsite}
                    name="companyWebsite"
                    type="text"
                    className="form-control"
                    id="companyWebsite"
                />
            </div>

            <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                    ref={register}
                    defaultValue={initialData.location}
                    name="location"
                    type="text"
                    className="form-control"
                    id="location"
                />
            </div>

            <div className="form-group">
                <label htmlFor="jobTitle">Job Title</label>
                <input
                    ref={register}
                    defaultValue={initialData.jobTitle}
                    name="jobTitle"
                    type="text"
                    className="form-control"
                    id="jobTitle"
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                    ref={register}
                    defaultValue={initialData.description}
                    name="description"
                    rows="5"
                    type="text"
                    className="form-control"
                    id="description"
                ></textarea>
            </div>

            <div className="form-group">
                <label htmlFor="startDate">Start Date</label>
                <div>
                    <DatePicker
                        showYearDropdown
                        selected={startDate}
                        onChange={handleDateChange('startDate', setStartDate)}
                    />
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="endDate">End Date</label>
                <div>
                    <DatePicker
                        showYearDropdown
                        disabled={!endDate}
                        selected={endDate}
                        onChange={handleDateChange('endDate', setEndDate)}
                    />
                </div>
            </div>

            <div className="form-group">
                {endDate && (
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() =>
                            handleDateChange('endDate', setEndDate)(null)
                        }
                    >
                        No End Date
                    </button>
                )}
                {!endDate && (
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={() =>
                            handleDateChange('endDate', setEndDate)(new Date())
                        }
                    >
                        Set End Date
                    </button>
                )}
            </div>

            <button type="submit" className="btn btn-primary">
                {startDate ? 'Update' : 'Create'}
            </button>
        </form>
    );
};

export default PortfolioForm;
