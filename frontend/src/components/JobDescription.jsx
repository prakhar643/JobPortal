import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
            
            if (res.data.success) {
                setIsApplied(true); // Update the local state
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] };
                dispatch(setSingleJob(updatedSingleJob)); // Update UI in real-time
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id)); // Sync state with fetched data
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10'>
            <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between'>
                <div>
                    <h1 className='text-2xl sm:text-3xl font-bold'>{singleJob?.title}</h1>
                    <div className='flex flex-wrap items-center gap-2 mt-4'>
                        <Badge className='text-blue-700 font-bold' variant="ghost">{singleJob?.position} Positions</Badge>
                        <Badge className='text-[#F83002] font-bold' variant="ghost">{singleJob?.jobType}</Badge>
                        <Badge className='text-[#7209b7] font-bold' variant="ghost">{singleJob?.salary} LPA</Badge>
                    </div>
                </div>
                <Button
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`mt-4 sm:mt-0 rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}
                >
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>
            <h2 className='border-b-2 border-gray-300 font-medium py-4 mt-6'>Job Description</h2>
            <div className='my-4 space-y-2'>
                <div className='flex flex-col sm:flex-row items-center'>
                    <h3 className='font-bold text-lg sm:text-xl'>Role:</h3>
                    <p className='ml-4 text-gray-800'>{singleJob?.title}</p>
                </div>
                <div className='flex flex-col sm:flex-row items-center'>
                    <h3 className='font-bold text-lg sm:text-xl'>Location:</h3>
                    <p className='ml-4 text-gray-800'>{singleJob?.location}</p>
                </div>
                <div className='flex flex-col sm:flex-row items-center'>
                    <h3 className='font-bold text-lg sm:text-xl'>Description:</h3>
                    <p className='ml-4 text-gray-800'>{singleJob?.description}</p>
                </div>
                <div className='flex flex-col sm:flex-row items-center'>
                    <h3 className='font-bold text-lg sm:text-xl'>Experience:</h3>
                    <p className='ml-4 text-gray-800'>{singleJob?.experience} yrs</p>
                </div>
                <div className='flex flex-col sm:flex-row items-center'>
                    <h3 className='font-bold text-lg sm:text-xl'>Salary:</h3>
                    <p className='ml-4 text-gray-800'>{singleJob?.salary} LPA</p>
                </div>
                <div className='flex flex-col sm:flex-row items-center'>
                    <h3 className='font-bold text-lg sm:text-xl'>Total Applicants:</h3>
                    <p className='ml-4 text-gray-800'>{singleJob?.applications?.length}</p>
                </div>
                <div className='flex flex-col sm:flex-row items-center'>
                    <h3 className='font-bold text-lg sm:text-xl'>Posted Date:</h3>
                    <p className='ml-4 text-gray-800'>{singleJob?.createdAt.split("T")[0]}</p>
                </div>
            </div>
        </div>
    )
}

export default JobDescription;
