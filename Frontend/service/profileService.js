import axios from 'axios';

// Function to get the user profile
export const getProfile = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get('http://localhost:5006/api/profile', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Function to update the user profile
export const updateProfile = async (profileData) => {
  const token = localStorage.getItem('token');
  await axios.put('http://localhost:5006/api/profile', profileData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Function to upload the profile picture
export const uploadProfilePicture = async (file) => {
  const token = localStorage.getItem('token');
  const formData = new FormData();
  formData.append('profilePicture', file);

  const response = await axios.post('http://localhost:5006/api/profile/picture', formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data.profilePicture; // Assuming the updated URL is returned here
};
