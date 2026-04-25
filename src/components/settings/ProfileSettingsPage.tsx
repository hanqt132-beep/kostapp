import React, { useState, useRef } from 'react';
import { useStore } from '../../store/useStore';
import { 
  Camera, 
  Trash2, 
  Upload, 
  User, 
  Mail, 
  Shield, 
  Save,
  Loader2
} from 'lucide-react';

export const ProfileSettingsPage: React.FC = () => {
  const { currentUser, updateUserProfile, showToast } = useStore();
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.contact || '',
    username: currentUser?.username || '',
    phone: currentUser?.contact || '', // Assuming contact is used for phone/email mix in this schema
    bio: 'Senior Product Manager at TechCorp', // Mock data for premium feel
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      showToast('Image size should be less than 2MB', 'error');
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      showToast('Please upload an image file', 'error');
      return;
    }

    setIsLoading(true);

    try {
      // Convert to Base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        updateUserProfile({ photo: base64String });
        showToast('Profile photo updated successfully', 'success');
        setIsLoading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error(error);
      showToast('Failed to update profile photo', 'error');
      setIsLoading(false);
    }
  };

  const handleRemovePhoto = () => {
    if (confirm('Are you sure you want to remove your profile photo?')) {
      const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser?.name || 'User')}&background=00875A&color=fff&rounded=true&size=128`;
      updateUserProfile({ photo: defaultAvatar });
      showToast('Profile photo removed', 'info');
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      updateUserProfile({
        name: formData.name,
        contact: formData.phone // Simple mapping for this demo
      });
      setIsLoading(false);
      showToast('Profile information saved', 'success');
    }, 800);
  };

  if (!currentUser) return null;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Account Settings</h1>
        <p className="text-slate-500 mt-1">Manage your profile details and personal preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Avatar & Quick Actions */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wider">Public Profile</h3>
            
            <div className="flex flex-col items-center">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-50 shadow-inner">
                  <img 
                    src={currentUser.photo} 
                    alt={currentUser.name} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 p-2.5 bg-emerald-600 text-white rounded-full shadow-lg hover:bg-emerald-700 transition-colors border-2 border-white group-hover:scale-110"
                  title="Change Photo"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-4 text-center">
                <p className="font-semibold text-slate-900 text-lg">{currentUser.name}</p>
                <p className="text-slate-500 text-sm">{currentUser.role === 'admin' ? 'Administrator' : 'Verified Tenant'}</p>
              </div>

              <div className="mt-6 flex gap-3 w-full">
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 py-2 px-4 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  Change
                </button>
                <button 
                  onClick={handleRemovePhoto}
                  className="py-2 px-3 bg-white border border-slate-200 text-slate-700 hover:bg-red-50 hover:text-red-600 hover:border-red-200 rounded-lg transition-all"
                  title="Remove Photo"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              <p className="mt-4 text-xs text-slate-400 text-center">
                Recommended: Square JPG, PNG, or GIF, at least 1000x1000 pixels. Max 2MB.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Forms */}
        <div className="lg:col-span-2 space-y-6">
          {/* General Information */}
          <form onSubmit={handleSaveProfile} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-slate-500" />
                <h3 className="font-semibold text-slate-900 text-sm">General Information</h3>
              </div>
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Full Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Username</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">@</span>
                  <input 
                    type="text" 
                    value={formData.username}
                    disabled
                    className="w-full pl-8 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-500 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Email / Contact</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Role</label>
                <div className="relative">
                  <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    value={currentUser.role === 'admin' ? 'Administrator' : 'Tenant'}
                    disabled
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-500 cursor-not-allowed uppercase font-medium tracking-wide"
                  />
                </div>
              </div>
              
               <div className="col-span-1 md:col-span-2 space-y-2">
                <label className="text-sm font-medium text-slate-700">Bio</label>
                <textarea 
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none"
                  placeholder="Tell us a little bit about yourself..."
                />
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button 
                type="submit"
                disabled={isLoading}
                className="flex items-center gap-2 px-5 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-500/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save Changes
              </button>
            </div>
          </form>

          {/* Contact Section (Static for Visual) */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 opacity-60 pointer-events-none filter grayscale">
            <h3 className="font-semibold text-slate-900 text-sm mb-4">Security Preferences (Coming Soon)</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                <div>
                   <p className="text-sm font-medium text-slate-900">Two-factor Authentication</p>
                   <p className="text-xs text-slate-500">Add an extra layer of security to your account.</p>
                </div>
                 <div className="w-10 h-5 bg-slate-200 rounded-full relative">
                    <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
