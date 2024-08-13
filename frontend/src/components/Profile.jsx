import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

// Placeholder for resume availability
const isResumeAvailable = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
                    <div className='flex items-center gap-4'>
                        <Avatar className="h-20 w-20 md:h-24 md:w-24">
                            <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" alt="profile" />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl'>{user?.fullname}</h1>
                            <p>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className="text-right mt-4 md:mt-0" variant="outline">
                        <Pen />
                    </Button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>
                <div className='my-5'>
                    <h1 className='font-bold text-lg'>Skills</h1>
                    <div className='flex flex-wrap gap-2'>
                        {
                            user?.profile?.skills && user?.profile?.skills.length > 0 
                                ? user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>) 
                                : <span>NA</span>
                        }
                    </div>
                </div>
                <div className='w-full max-w-sm'>
                    <Label className="text-md font-bold">Resume</Label>
                    {
                        isResumeAvailable ? (
                            <a 
                                target='_blank' 
                                rel='noopener noreferrer' 
                                href={user?.profile?.resume} 
                                className='text-blue-500 hover:underline cursor-pointer'
                            >
                                {user?.profile?.resumeOriginalName}
                            </a>
                        ) : <span>NA</span>
                    }
                </div>
            </div>
            <div className='max-w-4xl mx-auto bg-white rounded-2xl p-8 my-5'>
                <h1 className='font-bold text-lg mb-5'>Applied Jobs</h1>
                <AppliedJobTable />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile;
