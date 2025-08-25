import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';

const EditProfilePage = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [viewChangePassword , setview] = useState(false);
    const [formData, setFormData] = useState({
        email: '' , 
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await ApiService.getUserProfile();
                setUser(response.user);
                formData.email = response.user.email;
            } catch (error) {
                setError(error.message);
            }
        };

        fetchUserProfile();
    }, [formData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const validateForm = () => {
        const { currentPassword, newPassword, confirmPassword } = formData;
        if ( !currentPassword || !newPassword ||  !confirmPassword) {
            return false;
        }
        return true;
    };

    const handleDeleteProfile = async () => {
        if (!window.confirm('Are you sure you want to delete your account?')) {
            return;
        }
        try {
            await ApiService.deleteUser(user.id);
            navigate('/signup');
        } catch (error) {
            setError(error.message);
        }
    };
    const handleChangePassword = async (e) => {
    
        e.preventDefault();
        if (!validateForm()) {
            setError('Please fill all the fields.');
            setTimeout(() => setError(''), 3000);
            return;
        }
        if( formData.newPassword !== formData.confirmPassword ) {
            setError('New and Confirm Password dont match');
            setTimeout(() => setError(''), 3000);
            return;
        }
        try {
            // Call the register method from ApiService
            const response = await ApiService.changePassword(formData);
            // Check if the response is successful
            if (response.statusCode === 200) {
                // Clear the form fields after successful changing
                setFormData({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                });
                setSuccessMessage('Password Changed successfully');
                setTimeout(() => {
                    setSuccessMessage('');
                }, 3000);
                setview(false);

                ApiService.logout();   navigate('/login')
            }
        }
         catch (error) {
            if( error.response.status === 403){
                setError('Invalid Password')
                setTimeout(() => setError(''), 3000);
                return;
            }  
            setError(error.response?.data?.message || error.message);
            setTimeout(() => setError(''), 5000);
        }
    }
    return (
        <div className="edit-profile-page">
            <h2>Edit Profile</h2>
            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            {user && (
                <div className="profile-details">
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
                    <button className="delete-profile-button" onClick={handleDeleteProfile}>Delete Profile</button>
                    <button className='change-password-button'
                            onClick={ () => viewChangePassword ? setview(false) : setview(true)}>Change Password</button>
                    <form onSubmit={handleChangePassword}>
                    { viewChangePassword && (
                        <div className="form-group">
                            <br/>
                            <label>Current Password</label>
                            <input
                                type="password" name='currentPassword' 
                                value={formData.currentPassword} onChange={handleInputChange} required
                            />
                            <br/> <br/>
                            <label>New Password</label>
                            <input
                                type="password" name='newPassword' 
                                value={formData.newPassword} onChange={handleInputChange} required
                            />
                            <br/> <br/>
                            <label>Confirm Password</label>
                            <input
                                type="password" name='confirmPassword'
                                value={formData.confirmPassword} onChange={handleInputChange} required
                            /> <br/> <br/>
                        <button className="save-button">Save Changes</button>  <br/> <br/>
                        </div>
                    )}
                    </form>
                    
                </div>
            )}
        </div>
    );
};

export default EditProfilePage;
