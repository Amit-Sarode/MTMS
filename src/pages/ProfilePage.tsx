import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { Mail, Camera, Trash2, Save, Loader2, RefreshCw } from 'lucide-react';
import { baseURL } from '../config';
import { Alert, Snackbar } from '@mui/material';

const ProfilePage = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [email, setEmail] = useState('');
  const [designation, setDesignation] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handlePhotoUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const token = localStorage.getItem('authToken');
  const fetchUser = async () => {

    try {
      const res = await fetch(`${baseURL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true',
        }
      });
      const json = await res.json();
      const userData = json?.data;
      console.log(userData);

      setUser(userData);
      setName(userData.name || '');
      setPhone(userData.phoneNumber || '');
      setEmail(userData.email || '');
      setDesignation(userData.designation || '');
      setProfilePhoto(userData.profileImage || '');
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${baseURL}/user`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true',
        },
        body: JSON.stringify({
          name,
          phoneNumber: phone,
          profileImage: profilePhoto,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user.');
      }

      setSnackbarSeverity('success');
      setSnackbarMessage('Profile updated successfully.');
      setSnackbarOpen(true);
      setIsEditing(false);
    } catch (error) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Something went wrong while updating profile.');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };


  const handleCancel = () => {
    setName(user?.name || '');
    setEmail(user?.email || '');
    setDesignation(user?.designation || '');
    setProfilePhoto(user?.profileImage || '');
    setIsEditing(false);
  };

  const handleRemovePhoto = () => {
    setProfilePhoto('');
  };

  const validateName = (name: string): string => {
    if (!name.trim()) {
      return 'Name is required.';
    }

    const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;

    if (name.length < 2) {
      return 'Name must be at least 2 characters.';
    } else if (name.length > 30) {
      return 'Name must not exceed 30 characters.';
    } else if (!nameRegex.test(name)) {
      return 'Only alphabets allowed with one space between words.';
    }
    return '';
  };



  const validatePhone = (phone: string): string => {
    if (!phone.trim()) {
      return 'Phone number is required.';
    }

    const phoneRegex = /^[0-9]{10}$/;

    if (!phoneRegex.test(phone)) {
      return 'Phone number must be 10 digits only.';
    }
    return '';
  };


  if (!user) return <div className="text-center py-20"> <div className="flex justify-center items-center h-100">
        <RefreshCw size={28} className="animate-spin text-[hsl(var(--primary))]" />
      </div></div>;

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] flex flex-col">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <button onClick={() => navigate('/')}
            className="bg-[hsl(var(--primary))] text-white hover:bg-white hover:text-[hsl(var(--primary))] px-4 py-2 rounded transition"
 >

            Back to Dashboard
          </button>
        </div>
        <div className="card max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Profile</h1>
            {!isEditing && (
              <button onClick={() => setIsEditing(true)} className="primary">Edit Profile</button>
            )}
          </div>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-40 h-40 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                  {profilePhoto ? (
                    <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-5xl text-gray-400">{name.charAt(0).toUpperCase()}</div>
                  )}
                </div>
                {isEditing && (
                  <div className="absolute -right-2 -bottom-2 flex flex-col gap-2">
                    <div className="absolute -right-2 -bottom-2 flex flex-col gap-2">
                      <button
                        onClick={handlePhotoUploadClick}
                        className="bg-[hsl(var(--primary))] p-2 rounded-full text-white hover:bg-[hsl(var(--primary-light))]"
                        title="Upload photo"
                      >
                        <Camera size={20} />
                      </button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="hidden"
                      />
                      {profilePhoto && (
                        <button
                          onClick={handleRemovePhoto}
                          className="bg-red-500 p-2 rounded-full text-white hover:bg-red-600"
                          title="Remove photo"
                        >
                          <Trash2 size={20} />
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex-1 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                {isEditing ? (
                  <>
                    <input type="text" value={name} onChange={(e) => {
                      const value = e.target.value;
                      setName(value);
                      setNameError(validateName(value));
                    }}
                      className="w-full" />
                    {nameError && <p className="text-red-500 text-sm mt-1">{nameError}</p>}
                  </>

                ) : (
                  <p className="text-lg" style={{ textTransform: "capitalize" }}>{name}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <div className="flex items-center"><Mail size={18} className="mr-1" /> Email</div>
                </label>
                {isEditing ? (
                  <input type="email" disabled value={email} onChange={(e) => setEmail(e.target.value)} className="w-full" />
                ) : (
                  <p className="text-lg">{email}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={phone}
                      maxLength={10}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        setPhone(value);
                        setPhoneError(validatePhone(value));
                      }}
                      className="w-full"
                    />
                    {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
                  </>
                ) : (
                  <p className="text-lg">{phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <div className="flex items-center">Designation</div>
                </label>
                {isEditing ? (
                  <input disabled type="text" value={designation} onChange={(e) => setDesignation(e.target.value)} className="w-full" style={{ textTransform: "capitalize" }} />
                ) : (
                  <p className="text-lg" style={{ textTransform: "capitalize" }}>{designation}</p>
                )}
              </div>

              {isEditing && (
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleSave}
                    className={`flex items-center px-4 py-2 rounded transition 
                    ${loading || !!nameError || !!phoneError
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-[hsl(var(--primary))] text-white hover:bg-[hsl(var(--primary-light))]'}`}
                    disabled={loading || !!nameError || !!phoneError}
                  >
                    {loading ? (
                      <>
                        <Loader2 size={20} className="animate-spin mr-2" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={18} className="mr-2" />
                        Save Changes
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="secondary"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

    </div>
  );
};

export default ProfilePage;