import React, { useState, useEffect } from 'react';
import { Upload, X, Save, ArrowLeft, Image as ImageIcon, Trash2, LogIn, LogOut, CheckCircle, AlertCircle, Plus, FolderPlus, Calendar, MapPin, Star } from 'lucide-react';
import { supabase, PortfolioPhoto, Project } from '../lib/supabase';

interface PhotoUploadProps {
  onBack: () => void;
}

interface Notification {
  id: string;
  type: 'success' | 'error';
  message: string;
}

interface PhotoFile {
  file: File;
  id: string;
  preview: string;
  title: string;
  description: string;
  category: string;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ onBack }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [photos, setPhotos] = useState<PortfolioPhoto[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [activeTab, setActiveTab] = useState<'create' | 'manage'>('create');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [selectedPhotos, setSelectedPhotos] = useState<PhotoFile[]>([]);
  const [loginData, setLoginData] = useState({
    email: 'mejohnc@christensenplumbing.com',
    password: ''
  });
  const [projectData, setProjectData] = useState({
    title: '',
    description: '',
    category: 'general',
    location: '',
    completion_date: '',
    featured: false
  });

  const categories = [
    { value: 'general', label: 'General Plumbing' },
    { value: 'emergency', label: 'Emergency Repairs' },
    { value: 'installation', label: 'Installations' },
    { value: 'bathroom', label: 'Bathroom Work' },
    { value: 'kitchen', label: 'Kitchen Plumbing' },
    { value: 'water-heater', label: 'Water Heaters' },
    { value: 'pipes', label: 'Pipe Work' },
    { value: 'drains', label: 'Drain Cleaning' },
    { value: 'custom-work', label: 'Custom Work' }
  ];

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProjects();
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
        fetchProjects();
        fetchPhotos();
        setShowLogin(false);
      } else {
        setShowLogin(true);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const addNotification = (type: 'success' | 'error', message: string) => {
    const id = Date.now().toString();
    const notification: Notification = { id, type, message };
    setNotifications(prev => [...prev, notification]);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password
      });
      
      if (error) throw error;
      
      setShowLogin(false);
      addNotification('success', 'Successfully logged in!');
    } catch (error: any) {
      addNotification('error', 'Login failed: ' + error.message);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setProjects([]);
    setPhotos([]);
    setSelectedPhotos([]);
    setProjectData({
      title: '',
      description: '',
      category: 'general',
      location: '',
      completion_date: '',
      featured: false
    });
    addNotification('success', 'Successfully logged out');
  };

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      addNotification('error', 'Failed to load projects');
    }
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
      addNotification('error', 'Failed to load photos');
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      addPhotosToProject(Array.from(files));
    }
    // Reset input value to allow selecting the same files again
    event.target.value = '';
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      addPhotosToProject(Array.from(files));
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const addPhotosToProject = (files: File[]) => {
    const validFiles = files.filter(file => {
      if (file.size > 5 * 1024 * 1024) {
        addNotification('error', `${file.name} is too large (max 5MB)`);
        return false;
      }
      if (!file.type.startsWith('image/')) {
        addNotification('error', `${file.name} is not an image file`);
        return false;
      }
      return true;
    });

    const newPhotos: PhotoFile[] = validFiles.map(file => ({
      file,
      id: `${Date.now()}-${Math.random().toString(36).substring(2)}`,
      preview: URL.createObjectURL(file),
      title: file.name.replace(/\.[^/.]+$/, ""), // Remove file extension
      description: '',
      category: projectData.category
    }));

    setSelectedPhotos(prev => [...prev, ...newPhotos]);
    
    if (newPhotos.length > 0) {
      addNotification('success', `Added ${newPhotos.length} photo${newPhotos.length > 1 ? 's' : ''} to project`);
    }
  };

  const removePhoto = (photoId: string) => {
    setSelectedPhotos(prev => {
      const photo = prev.find(p => p.id === photoId);
      if (photo) {
        URL.revokeObjectURL(photo.preview);
      }
      return prev.filter(p => p.id !== photoId);
    });
  };

  const updatePhotoDetails = (photoId: string, field: string, value: string) => {
    setSelectedPhotos(prev => prev.map(photo => 
      photo.id === photoId ? { ...photo, [field]: value } : photo
    ));
  };

  const uploadPhoto = async (photoFile: PhotoFile, projectId: string) => {
    try {
      // Update progress
      setUploadProgress(prev => ({ ...prev, [photoFile.id]: 0 }));

      // Upload file to Supabase Storage
      const fileExt = photoFile.file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `portfolio/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('photos')
        .upload(filePath, photoFile.file);

      if (uploadError) throw uploadError;

      // Update progress
      setUploadProgress(prev => ({ ...prev, [photoFile.id]: 50 }));

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('photos')
        .getPublicUrl(filePath);

      // Save to database
      const { error: dbError } = await supabase
        .from('portfolio_photos')
        .insert({
          title: photoFile.title || 'Untitled Photo',
          description: photoFile.description || '',
          category: photoFile.category,
          project_id: projectId,
          image_url: publicUrl
        });

      if (dbError) throw dbError;

      // Complete progress
      setUploadProgress(prev => ({ ...prev, [photoFile.id]: 100 }));
      
      // Remove progress after a short delay
      setTimeout(() => {
        setUploadProgress(prev => {
          const newProgress = { ...prev };
          delete newProgress[photoFile.id];
          return newProgress;
        });
      }, 1000);

      return true;
    } catch (error) {
      console.error('Error uploading photo:', error);
      setUploadProgress(prev => {
        const newProgress = { ...prev };
        delete newProgress[photoFile.id];
        return newProgress;
      });
      throw error;
    }
  };

  const createProjectWithPhotos = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!projectData.title.trim()) {
      addNotification('error', 'Project title is required');
      return;
    }

    setUploading(true);

    try {
      // Create project first
      const { data: project, error: projectError } = await supabase
        .from('projects')
        .insert(projectData)
        .select()
        .single();

      if (projectError) throw projectError;

      // Upload photos if any
      if (selectedPhotos.length > 0) {
        let successCount = 0;
        let errorCount = 0;

        for (const photo of selectedPhotos) {
          try {
            await uploadPhoto(photo, project.id);
            successCount++;
          } catch (error: any) {
            errorCount++;
            addNotification('error', `Failed to upload ${photo.title}: ${error.message}`);
          }
        }

        if (successCount > 0) {
          addNotification('success', `Project created with ${successCount} photo${successCount > 1 ? 's' : ''}!`);
        }
      } else {
        addNotification('success', 'Project created successfully!');
      }

      // Reset form
      setProjectData({
        title: '',
        description: '',
        category: 'general',
        location: '',
        completion_date: '',
        featured: false
      });
      
      // Clean up photo previews
      selectedPhotos.forEach(photo => URL.revokeObjectURL(photo.preview));
      setSelectedPhotos([]);

      // Refresh data
      await fetchProjects();
      await fetchPhotos();

    } catch (error: any) {
      addNotification('error', 'Failed to create project: ' + error.message);
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
      addNotification('success', 'Photo deleted successfully');
    } catch (error) {
      console.error('Error deleting photo:', error);
      addNotification('error', 'Failed to delete photo');
    }
  };

  const deleteProject = async (project: Project) => {
    if (!confirm(`Are you sure you want to delete "${project.title}" and all its photos?`)) return;

    try {
      // Delete project (photos will be deleted automatically due to CASCADE)
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', project.id);

      if (error) throw error;

      await fetchProjects();
      await fetchPhotos();
      addNotification('success', 'Project and all photos deleted successfully');
    } catch (error) {
      console.error('Error deleting project:', error);
      addNotification('error', 'Failed to delete project');
    }
  };

  const handleProjectInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setProjectData({
      ...projectData,
      [e.target.name]: value
    });
  };

  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  // Notification Component
  const NotificationContainer = () => (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg shadow-lg max-w-sm transform transition-all duration-300 ${
            notification.type === 'success'
              ? 'bg-green-50 border border-green-200 text-green-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}
        >
          {notification.type === 'success' ? (
            <CheckCircle className="w-5 h-5 text-green-600" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600" />
          )}
          <p className="text-sm font-medium flex-1">{notification.message}</p>
          <button
            onClick={() => removeNotification(notification.id)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );

  // Login Screen
  if (showLogin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <NotificationContainer />
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-8"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Main Site</span>
            </button>
            <h2 className="text-3xl font-bold text-gray-900">Project Manager Login</h2>
            <p className="mt-2 text-sm text-gray-600">
              Sign in to create projects and manage portfolio photos
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
          <p className="text-gray-600">Loading project manager...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NotificationContainer />
      
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
              <h1 className="text-2xl font-bold text-gray-900">Project Portfolio Manager</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <FolderPlus className="w-4 h-4" />
                <span>{projects.length} projects</span>
              </div>
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
          
          {/* Tab Navigation */}
          <nav className="mt-4 border-t border-gray-200">
            <div className="flex space-x-8">
              {[
                { id: 'create', label: 'Create Project', icon: <Plus className="w-4 h-4" /> },
                { id: 'manage', label: 'Manage Projects', icon: <FolderPlus className="w-4 h-4" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'create' | 'manage')}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-semibold text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-700 text-blue-700'
                      : 'border-transparent text-gray-600 hover:text-blue-700 hover:border-blue-300'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Create Project Tab */}
        {activeTab === 'create' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Create New Project</h2>
              <p className="text-lg text-gray-600">
                Add project details and upload photos all in one place
              </p>
            </div>

            <form onSubmit={createProjectWithPhotos} className="bg-white rounded-lg shadow-md p-8">
              {/* Project Details */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Project Information</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                      Project Title *
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={projectData.title}
                      onChange={handleProjectInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Modern Kitchen Renovation"
                    />
                  </div>
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={projectData.location}
                      onChange={handleProjectInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., La Jolla"
                    />
                  </div>
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={projectData.category}
                      onChange={handleProjectInputChange}
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
                    <label htmlFor="completion_date" className="block text-sm font-medium text-gray-700 mb-2">
                      Completion Date
                    </label>
                    <input
                      type="date"
                      id="completion_date"
                      name="completion_date"
                      value={projectData.completion_date}
                      onChange={handleProjectInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={projectData.description}
                      onChange={handleProjectInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Brief description of the project..."
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="featured"
                        checked={projectData.featured}
                        onChange={handleProjectInputChange}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Featured Project</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Photo Upload Section */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Project Photos</h3>
                
                {/* Upload Area */}
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors mb-6"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileSelect}
                    disabled={uploading}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label
                    htmlFor="photo-upload"
                    className={`cursor-pointer ${uploading ? 'opacity-50' : ''}`}
                  >
                    <div className="flex flex-col items-center">
                      <Upload className="w-12 h-12 text-gray-400 mb-4" />
                      <p className="text-lg text-gray-600 mb-2">
                        Click to upload or drag and drop photos
                      </p>
                      <p className="text-sm text-gray-500">
                        PNG, JPG, GIF up to 5MB each • Multiple files supported
                      </p>
                    </div>
                  </label>
                </div>

                {/* Selected Photos Grid */}
                {selectedPhotos.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Selected Photos ({selectedPhotos.length})
                    </h4>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {selectedPhotos.map((photo) => (
                        <div key={photo.id} className="bg-gray-50 rounded-lg overflow-hidden shadow-sm">
                          <div className="aspect-video relative">
                            <img
                              src={photo.preview}
                              alt={photo.title}
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removePhoto(photo.id)}
                              className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-1 rounded-full transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                            {uploadProgress[photo.id] !== undefined && (
                              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2">
                                <div className="bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${uploadProgress[photo.id]}%` }}
                                  ></div>
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="p-4 space-y-3">
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">
                                Photo Title
                              </label>
                              <input
                                type="text"
                                value={photo.title}
                                onChange={(e) => updatePhotoDetails(photo.id, 'title', e.target.value)}
                                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Photo title..."
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">
                                Category
                              </label>
                              <select
                                value={photo.category}
                                onChange={(e) => updatePhotoDetails(photo.id, 'category', e.target.value)}
                                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                              >
                                {categories.map((cat) => (
                                  <option key={cat.value} value={cat.value}>
                                    {cat.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">
                                Description (Optional)
                              </label>
                              <textarea
                                value={photo.description}
                                onChange={(e) => updatePhotoDetails(photo.id, 'description', e.target.value)}
                                rows={2}
                                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Photo description..."
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={uploading || !projectData.title.trim()}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-semibold shadow-md transition-colors flex items-center space-x-2"
                >
                  {uploading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Creating Project...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      <span>Create Project {selectedPhotos.length > 0 && `with ${selectedPhotos.length} Photo${selectedPhotos.length > 1 ? 's' : ''}`}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Manage Projects Tab */}
        {activeTab === 'manage' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Manage Projects</h2>
              <p className="text-lg text-gray-600">
                View and manage your existing projects and photos
              </p>
            </div>

            {projects.length === 0 ? (
              <div className="text-center py-12">
                <FolderPlus className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-xl text-gray-600 mb-2">No projects created yet</p>
                <p className="text-gray-500 mb-6">Create your first project to get started</p>
                <button
                  onClick={() => setActiveTab('create')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Create First Project
                </button>
              </div>
            ) : (
              <div className="grid lg:grid-cols-2 gap-8">
                {projects.map((project) => {
                  const projectPhotos = photos.filter(photo => photo.project_id === project.id);
                  
                  return (
                    <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                      {/* Project Header */}
                      <div className="p-6 border-b border-gray-200">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                              {project.featured && (
                                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                              )}
                            </div>
                            <p className="text-gray-600 mb-3">{project.description}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center space-x-1">
                                <MapPin className="w-4 h-4" />
                                <span>{project.location}</span>
                              </div>
                              {project.completion_date && (
                                <div className="flex items-center space-x-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>{new Date(project.completion_date).toLocaleDateString()}</span>
                                </div>
                              )}
                              <div className="flex items-center space-x-1">
                                <ImageIcon className="w-4 h-4" />
                                <span>{projectPhotos.length} photos</span>
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => deleteProject(project)}
                            className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      {/* Project Photos */}
                      <div className="p-6">
                        {projectPhotos.length === 0 ? (
                          <div className="text-center py-8">
                            <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-gray-500">No photos in this project</p>
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {projectPhotos.map((photo) => (
                              <div key={photo.id} className="group relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                                <img
                                  src={photo.image_url}
                                  alt={photo.title}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center">
                                  <button
                                    onClick={() => deletePhoto(photo)}
                                    className="opacity-0 group-hover:opacity-100 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-all duration-200"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoUpload;