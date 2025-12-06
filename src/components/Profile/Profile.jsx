import React, { useState, useRef, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, signOutUser } = useContext(AuthContext); 
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    bio: "Frontend Developer | React Enthusiast | Coffee Lover",
    location: "Dhaka, Bangladesh",
  });

  const [avatar, setAvatar] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    console.log("PROFILE USER:", user);
  }, [user]);

  useEffect(() => {
    const lsName = localStorage.getItem("username");
    const lsEmail = localStorage.getItem("email");
    const lsPhoto =
      localStorage.getItem("photoURL") || localStorage.getItem("photoUrl");

    const finalName =
      (user && user.displayName) || lsName || "Unknown User";
    const finalEmail =
      (user && user.email) || lsEmail || "no-email@domain.com";
    const finalPhoto =
      (user && user.photoURL && user.photoURL.trim() !== "")
        ? user.photoURL
        : lsPhoto || null;

    setProfile((prev) => ({
      ...prev,
      name: finalName,
      email: finalEmail,
    }));

    setAvatar(finalPhoto);

    console.log({
      finalName,
      finalEmail,
      finalPhoto,
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditToggle = () => setIsEditing((prev) => !prev);

  const handleImageClick = () => fileInputRef.current?.click();

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setAvatar(imageUrl);
    localStorage.setItem("photoURL", imageUrl);
  };

  const handleSignOut = async () => {
    try {
      await signOutUser();               
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      // optional: localStorage.removeItem("photoURL");

      navigate("/login", { replace: true });  
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);

    localStorage.setItem("username", profile.name);
    localStorage.setItem("email", profile.email);
  };

  const firstLetter =
    (profile.name && profile.name.trim()[0]?.toUpperCase()) || "U";

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-gray-200 pb-6 mb-6">
          {/* Avatar */}
          <div
            className="relative w-28 h-28 rounded-full overflow-hidden cursor-pointer group bg-gray-200 flex items-center justify-center"
            onClick={handleImageClick}
          >
            {avatar ? (
              <img
                src={avatar}
                alt="Profile"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={() => {
                  console.warn("Avatar failed to load, falling back to letter.");
                  setAvatar(null);
                }}
              />
            ) : (
              <span className="text-3xl font-semibold text-gray-700">
                {firstLetter}
              </span>
            )}

            <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-xs text-white opacity-0 group-hover:opacity-100 transition">
              Change Photo
            </div>
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
            className="hidden"
          />

          {/* Basic info */}
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-semibold text-gray-900">
              {profile.name || "Unknown User"}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {profile.email || "no-email@domain.com"}
            </p>
            <p className="text-sm text-gray-600 mt-1">{profile.location}</p>
          </div>
        </div>

        {/* Section Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Profile Details
          </h3>

         
          <div className="flex items-center gap-3">
            <button
              onClick={handleEditToggle}
              className="text-sm px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-900 hover:text-white transition"
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>

            <button
              onClick={handleSignOut}
              className="text-sm px-4 py-2 rounded-full border border-red-300 text-red-600 hover:bg-red-600 hover:text-white transition"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* VIEW MODE */}
        {!isEditing && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs uppercase text-gray-400">Full Name</p>
              <p className="text-sm mt-1">
                {profile.name || "Unknown User"}
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs uppercase text-gray-400">Email</p>
              <p className="text-sm mt-1">
                {profile.email || "no-email@domain.com"}
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs uppercase text-gray-400">Location</p>
              <p className="text-sm mt-1">{profile.location}</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 sm:col-span-2">
              <p className="text-xs uppercase text-gray-400">Bio</p>
              <p className="text-sm mt-1">{profile.bio}</p>
            </div>
          </div>
        )}

        {/* EDIT MODE */}
        {isEditing && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Full Name
              </label>
              <input
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Location
              </label>
              <input
                name="location"
                value={profile.location}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Bio</label>
              <textarea
                name="bio"
                rows="3"
                value={profile.bio}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm resize-none"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleEditToggle}
                className="px-4 py-2 rounded-full text-sm bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-full text-sm bg-blue-600 text-white"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};

export default Profile;
