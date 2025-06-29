import React, { useState, useEffect } from 'react';
import { Upload, X, Save, ArrowLeft, Image as ImageIcon, Trash2, LogIn, LogOut, CheckCircle, AlertCircle, Plus, FolderPlus } from 'lucide-react';
import { supabase, PortfolioPhoto, Project } from '../lib/supabase';

interface PhotoUploadProps {
  onBack: () => void;
}

interface Notification {
  id: string;
  type: 'success' | 'error';
  message: string;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ onBack }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [photos, setPhotos] = useState<PortfolioPhoto[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showNewProject, setShowNewProject] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [loginData, setLoginData] = useState({
    email: 'mejohnc@christensenplumbing.com',
    password: ''
  });
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'general'
  });
  const [newProjectData, setNewProjectData] = useState({
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
    { value: 'drains', label: 'Drain Cleaning' }
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
      
      // Set first project as selected if none selected
      if (data && data.length > 0 && !selectedProject) {
        setSelectedProject(data[0].id);
      }
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

  const createProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert(newProjectData)
        .select()
        .single();

      if (error) throw error;

      await fetchProjects();
      setSelectedProject(data.id);
      setNewProjectData({
        title: '',
        description: '',
        category: 'general',
        location: '',
        completion_date: '',
        featured: false
      });
      setShowNewProject(false);
      addNotification('success', 'Project created successfully!');
    } catch (error: any) {
      addNotification('error', 'Failed to create project: ' + error.message);
    }
  };

  const uploadPhoto = async (file: File, index: number) => {
    const fileId = `${Date.now()}-${index}`;
    
    try {
      if (!selectedProject) {
        throw new Error('Please select a project first');
      }

      // Update progress
      setUploadProgress(prev => ({ ...prev, [fileId]: 0 }));

      // Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `portfolio/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('photos')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Update progress
      setUploadProgress(prev => ({ ...prev, [fileId]: 50 }));

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('photos')
        .getPublicUrl(filePath);

      // Save to database
      const { error: dbError } = await supabase
        .from('portfolio_photos')
        .insert({
          title: formData.title || `Photo ${index + 1}`,
          description: formData.description || '',
          category: formData.category,
          project_id: selectedProject,
          image_url: publicUrl
        });

      if (dbError) throw dbError;

      // Complete progress
      setUploadProgress(prev => ({ ...prev, [fileId]: 100 }));
      
      // Remove progress after a short delay
      setTimeout(() => {
        setUploadProgress(prev => {
          const newProgress = { ...prev };
          delete newProgress[fileId];
          return newProgress;
        });
      }, 1000);

      return true;
    } catch (error) {
      console.error('Error uploading photo:', error);
      setUploadProgress(prev => {
        const newProgress = { ...prev };
        delete newProgress[fileId];
        return newProgress;
      });
      throw error;
    }
  };

  const uploadMultiplePhotos = async (files: FileList) => {
    setUploading(true);
    const fileArray = Array.from(files);
    let successCount = 0;
    let errorCount = 0;

    // Validate files
    const validFiles = fileArray.filter(file => {
      if (file.size > 5 * 1024 * 1024) {
        addNotification('error', `${file.name} is too large (max 5MB)`);
        errorCount++;
        return false;
      }
      if (!file.type.startsWith('image/')) {
        addNotification('error', `${file.name} is not an image file`);
        errorCount++;
        return false;
      }
      return true;
    });

    // Upload valid files
    for (let i = 0; i < validFiles.length; i++) {
      try {
        await uploadPhoto(validFiles[i], i);
        successCount++;
      } catch (error: any) {
        errorCount++;
        addNotification('error', `Failed to upload ${validFiles[i].name}: ${error.message}`);
      }
    }

    // Show summary notification
    if (successCount > 0) {
      addNotification('success', `Successfully uploaded ${successCount} photo${successCount > 1 ? 's' : ''}`);
      await fetchPhotos();
      
      // Reset form if all uploads were successful
      if (errorCount === 0) {
        setFormData({ title: '', description: '', category: 'general' });
      }
    }

    if (errorCount > 0 && successCount === 0) {
      addNotification('error', `Failed to upload ${errorCount} photo${errorCount > 1 ? 's' : ''}`);
    }

    setUploading(false);
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

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      uploadMultiplePhotos(files);
    }
    // Reset input value to allow selecting the same files again
    event.target.value = '';
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      uploadMultiplePhotos(files);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleNewProjectInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setNewProjectData({
      ...newProjectData,
      [e.target.name]: value
    });
  };

  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  // Get photos for selected project
  const selectedProjectPhotos = photos.filter(photo => photo.project_id === selectedProject);

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
          <p className="text-gray-600">Loading projects and photos...</p>
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
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Project Management */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Project Management</h2>
            <button
              onClick={() => setShowNewProject(!showNewProject)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>New Project</span>
            </button>
          </div>

          {/* New Project Form */}
          {showNewProject && (
            <form onSubmit={createProject} className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Project</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="project-title" className="block text-sm font-medium text-gray-700 mb-2">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    id="project-title"
                    name="title"
                    value={newProjectData.title}
                    onChange={handleNewProjectInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Modern Kitchen Renovation"
                  />
                </div>
                <div>
                  <label htmlFor="project-location" className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    id="project-location"
                    name="location"
                    value={newProjectData.location}
                    onChange={handleNewProjectInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., La Jolla"
                  />
                </div>
                <div>
                  <label htmlFor="project-category" className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    id="project-category"
                    name="category"
                    value={newProjectData.category}
                    onChange={handleNewProjectInputChange}
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
                  <label htmlFor="project-completion-date" className="block text-sm font-medium text-gray-700 mb-2">
                    Completion Date
                  </label>
                  <input
                    type="date"
                    id="project-completion-date"
                    name="completion_date"
                    value={newProjectData.completion_date}
                    onChange={handleNewProjectInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="project-description" className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    id="project-description"
                    name="description"
                    value={newProjectData.description}
                    onChange={handleNewProjectInputChange}
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
                      checked={newProjectData.featured}
                      onChange={handleNewProjectInputChange}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Featured Project</span>
                  </label>
                </div>
              </div>
              <div className="flex space-x-3 mt-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Project
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewProject(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* Project Selection */}
          <div>
            <label htmlFor="project-select" className="block text-sm font-medium text-gray-700 mb-2">
              Select Project for Photo Upload
            </label>
            <select
              id="project-select"
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Choose a project...</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.title} - {project.location}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Upload Section */}
        {selectedProject && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Upload Photos to Project</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Photo Title Template
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Kitchen Installation (leave empty for auto-naming)"
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    Photo Category
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
                    placeholder="Brief description of the photos..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Photos (Multiple files supported)
                </label>
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors"
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
                    {uploading ? (
                      <div className="flex flex-col items-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
                        <p className="text-sm text-gray-600">Uploading photos...</p>
                        {Object.keys(uploadProgress).length > 0 && (
                          <div className="mt-2 w-full max-w-xs">
                            {Object.entries(uploadProgress).map(([fileId, progress]) => (
                              <div key={fileId} className="mb-1">
                                <div className="bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${progress}%` }}
                                  ></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600">
                          Click to upload or drag and drop multiple photos
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          PNG, JPG, GIF up to 5MB each
                        </p>
                      </div>
                    )}
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Project Photos Grid */}
        {selectedProject && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Project Photos ({selectedProjectPhotos.length})
            </h2>
            
            {selectedProjectPhotos.length === 0 ? (
              <div className="text-center py-12">
                <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No photos uploaded for this project yet</p>
                <p className="text-sm text-gray-500">Upload your first photos to get started</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {selectedProjectPhotos.map((photo) => (
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
        )}
      </div>
    </div>
  );
};

export default PhotoUpload;