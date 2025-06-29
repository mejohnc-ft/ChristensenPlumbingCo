import React, { useState, useEffect } from 'react';
import { Upload, X, Save, ArrowLeft, Image as ImageIcon, Trash2, LogIn, LogOut } from 'lucide-react';
import { supabase, PortfolioPhoto } from '../lib/supabase';

interface PhotoUploadProps {
  onBack: () => void;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ onBack }) => {
  const [photos, setPhotos] = useState<PortfolioPhoto[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [loginData, setLoginData] = useState({
    email: 'mejohnc@christensenplumbing.com',
    password: ''
  });
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'general'
  });

  const categories = [
    { value: 'general', label: 'General Plumbing' },
    { value: 'emergency', label: 'Emergency Repairs' },
    { value: 'installation', label: 'Installations' },
    { value: 'bathroom', label: 'Bathroom Work' },
    { value: 'kitchen', label: 'Kitchen Plumbing' },
    { value: 'water-heater', label: 'Water Heaters' },
    { value: 'pipes', label: 'Pipe Work' },
    { value: 'drains', label: 'Drain Cleaning' }
  ];

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchPhotos();
      } else {
        setLoading(false);
        setShowLogin(true);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchPhotos();
        setShowLogin(false);
      } else {
        setShowLogin(true);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password
      });
      
      if (error) throw error;
      
      setShowLogin(false);
    } catch (error: any) {
      alert('Login failed: ' + error.message);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setPhotos([]);
  };

  const fetchPhotos = async () => {
    try {
      const { data, error } = await supabase
        .from('portfolio_photos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPhotos(data || []);
    } catch (error) {
      console.error('Error fetching photos:', error);
    } finally {
      setLoading(false);
    }
  };

  const uploadPhoto = async (file: File) => {
    try {
      setUploading(true);

      // Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `portfolio/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('photos')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('photos')
        .getPublicUrl(filePath);

      // Save to database
      const { error: dbError } = await supabase
        .from('portfolio_photos')
        .insert({
          title: formData.title || 'Untitled',
          description: formData.description || '',
          category: formData.category,
          image_url: publicUrl
        });

      if (dbError) throw dbError;

      // Reset form and refresh photos
      setFormData({ title: '', description: '', category: 'general' });
      await fetchPhotos();
      
      alert('Photo uploaded successfully!');
    } catch (error) {
      console.error('Error uploading photo:', error);
      alert('Error uploading photo. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const deletePhoto = async (photo: PortfolioPhoto) => {
    if (!confirm('Are you sure you want to delete this photo?')) return;

    try {
      // Delete from database
      const { error: dbError } = await supabase
        .from('portfolio_photos')
        .delete()
        .eq('id', photo.id);

      if (dbError) throw dbError;

      // Delete from storage
      const filePath = photo.image_url.split('/').pop();
      if (filePath) {
        await supabase.storage
          .from('photos')
          .remove([`portfolio/${filePath}`]);
      }

      await fetchPhotos();
      alert('Photo deleted successfully!');
    } catch (error) {
      console.error('Error deleting photo:', error);
      alert('Error deleting photo. Please try again.');
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('File size must be less than 5MB');
        return;
      }
      uploadPhoto(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  // Login Screen
  if (showLogin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-8"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Main Site</span>
            </button>
            <h2 className="text-3xl font-bold text-gray-900">Photo Upload Login</h2>
            <p className="mt-2 text-sm text-gray-600">
              Sign in to manage portfolio photos
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={loginData.email}
                  onChange={handleLoginInputChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={loginData.password}
                  onChange={handleLoginInputChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading photos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Main Site</span>
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-2xl font-bold text-gray-900">Portfolio Photo Manager</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <ImageIcon className="w-4 h-4" />
                <span>{photos.length} photos</span>
              </div>
              {user && (
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Upload New Photo</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Photo Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Kitchen Sink Installation"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Brief description of the work..."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Photo
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  disabled={uploading}
                  className="hidden"
                  id="photo-upload"
                />
                <label
                  htmlFor="photo-upload"
                  className={`cursor-pointer ${uploading ? 'opacity-50' : ''}`}
                >
                  {uploading ? (
                    <div className="flex flex-col items-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
                      <p className="text-sm text-gray-600">Uploading...</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PNG, JPG, GIF up to 5MB
                      </p>
                    </div>
                  )}
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Photos Grid */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Portfolio Photos</h2>
          
          {photos.length === 0 ? (
            <div className="text-center py-12">
              <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No photos uploaded yet</p>
              <p className="text-sm text-gray-500">Upload your first photo to get started</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {photos.map((photo) => (
                <div key={photo.id} className="group relative bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="aspect-square">
                    <img
                      src={photo.image_url}
                      alt={photo.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center">
                    <button
                      onClick={() => deletePhoto(photo)}
                      className="opacity-0 group-hover:opacity-100 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-all duration-200 transform scale-90 group-hover:scale-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="p-3">
                    <h3 className="font-medium text-gray-900 text-sm truncate">
                      {photo.title}
                    </h3>
                    <p className="text-xs text-gray-600 capitalize">
                      {categories.find(cat => cat.value === photo.category)?.label || photo.category}
                    </p>
                    {photo.description && (
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {photo.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhotoUpload;