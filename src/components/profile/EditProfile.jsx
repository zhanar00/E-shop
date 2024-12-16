import React, { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import {login, updateUserInfo} from "../../redux/authSlice";

const EditProfile = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user); // Get user info from Redux state

    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({
        name: user.name,
        surname: user.surname,
        email: user.email,
        address: user.address,
        phone: user.phone,
        profileImage: user.profileImage,
    });

    const [imagePreview, setImagePreview] = useState(user.profileImage);

    const handleEditClick = () => setIsEditing(true);

    const handleSaveClick = () => {
        dispatch(login(formData));
        setIsEditing(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="p-6 bg-white rounded">
            <h2 className="text-2xl font-bold mb-4">
                {isEditing ? "Edit Profile" : "Your Information"}
            </h2>

            {!isEditing ? (
                // Read-Only View
                <div className="space-y-3">
                    {/* Profile Image */}
                    <div className="flex items-center space-x-4 justify-between">
                        <div>
                            <p><strong>Name Surname:</strong> {user.name} {user.surname}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                        </div>
                        <img
                            src={"https://i.pinimg.com/736x/3b/73/48/3b73483fa5af06e3ba35f4f71e541e7a.jpg"}
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover
                             border-2"
                        />
                    </div>
                    <p><strong>Phone Number:</strong> {user.phone}</p>
                    <p><strong>Birthday:</strong> {user.birthday}</p>
                    <p><strong>Shipping Address:</strong> {user.address}</p>
                    <p><strong>Country:</strong> {user.country}</p>
                    <p><strong>City:</strong> {user.city}</p>
                    <p><strong>Postal Code:</strong> {user.postalCode}</p>
                    <button
                        onClick={handleEditClick}
                        className="bg-green-500 text-white p-2 rounded"
                    >
                        Edit Profile
                    </button>
                </div>
            ) : (
                // Editable Form
                <form className="space-y-4">
                    <div className="flex items-center space-x-4">
                        {/* Profile Image Preview */}
                        <img
                            src={"https://via.placeholder.com/150"}
                            alt="Profile Preview"
                            className="w-24 h-24 rounded-full object-cover"
                        />
                        <div>
                            <label className="block mb-1 font-bold">Profile Image:</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full p-2"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block mb-1">Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full border rounded p-2"
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Surname:</label>
                        <input
                            type="text"
                            name="surname"
                            value={formData.surname}
                            onChange={handleInputChange}
                            className="w-full border rounded p-2"
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full border rounded p-2"
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Phone Number:</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full border rounded p-2"
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Birthday:</label>
                        <input
                            type="date"
                            name="birthday"
                            value={formData.birthday}
                            onChange={handleInputChange}
                            className="w-full border rounded p-2"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={handleSaveClick}
                        className="bg-blue-500 text-white p-2 rounded mr-2"
                    >
                        Save Changes
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="bg-gray-300 text-black p-2 rounded"
                    >
                        Cancel
                    </button>
                </form>
            )}
        </div>
    );
};

export default EditProfile;
