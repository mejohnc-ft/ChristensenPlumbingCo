import React, { useState, useEffect } from 'react';
import { Upload, X, Save, ArrowLeft, Image as ImageIcon, Trash2, LogIn, LogOut, CheckCircle, AlertCircle, Plus, FolderPlus, Edit3, GripVertical, ChevronUp, ChevronDown, Star, Camera, Grid, List } from 'lucide-react';
import type { User as SupabaseUser } from '@supabase/supabase-js';
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
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showNewProject, setShowNewProject] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [editingProject, setEditingProject] = useState<string | null>(null);
  const [draggedProject, setDraggedProject] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showPhotoManager, setShowPhotoManager] = useState<string | null>(null);
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
  const [editProjectData, setEditProjectData] = useState<Project | null>(null);

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
    const loadData = async () => {
      try {
        const projectsResponse = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (projectsResponse.data) {
          setProjects(projectsResponse.data);
          if (projectsResponse.data.length > 0 && !selectedProject) {
            setSelectedProject(projectsResponse.data[0].id);
          }
        }

        const photosResponse = await supabase
          .from('portfolio_photos')
          .select('*')
          .order('created_at', { ascending: false });

        if (photosResponse.data) {
          setPhotos(photosResponse.data);
        }
      } catch (error) {
        console.error('Error loading data:', error);
        addNotification('error', 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadData();
      } else {
        setLoading(false);
        setShowLogin(true);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadData();
        setShowLogin(false);
      } else {
        setShowLogin(true);
      }
    });

    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      addNotification('error', 'Login failed: ' + message);
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
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      addNotification('error', 'Failed to create project: ' + message);
    }
  };

  const updateProject = async (projectId: string, updates: Partial<Project>) => {
    try {
      const { error } = await supabase
        .from('projects')
        .update(updates)
        .eq('id', projectId);

      if (error) throw error;

      await fetchProjects();
      addNotification('success', 'Project updated successfully!');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      addNotification('error', 'Failed to update project: ' + message);
    }
  };

  const deleteProject = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project? This will also delete all associated photos.')) return;

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId);

      if (error) throw error;

      await fetchProjects();
      await fetchPhotos();
      if (selectedProject === projectId) {
        setSelectedProject('');
      }
      addNotification('success', 'Project deleted successfully');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      addNotification('error', 'Failed to delete project: ' + message);
    }
  };

  const moveProject = async (projectId: string, direction: 'up' | 'down') => {
    const currentIndex = projects.findIndex(p => p.id === projectId);
    if (currentIndex === -1) return;

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= projects.length) return;

    const newProjects = [...projects];
    [newProjects[currentIndex], newProjects[newIndex]] = [newProjects[newIndex], newProjects[currentIndex]];
    
    setProjects(newProjects);

    // In a real implementation, you might want to add an 'order' column to properly handle ordering
    addNotification('success', 'Project order updated');
  };

  const toggleFeatured = async (projectId: string, featured: boolean) => {
    await updateProject(projectId, { featured });
  };

  const startEditProject = (project: Project) => {
    setEditProjectData({ ...project });
    setEditingProject(project.id);
  };

  const saveEditProject = async () => {
    if (!editProjectData || !editingProject) return;

    await updateProject(editingProject, editProjectData);
    setEditingProject(null);
    setEditProjectData(null);
  };

  const cancelEditProject = () => {
    setEditingProject(null);
    setEditProjectData(null);
  };

  const handleDragStart = (e: React.DragEvent, projectId: string) => {
    setDraggedProject(projectId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetProjectId: string) => {
    e.preventDefault();
    
    if (!draggedProject || draggedProject === targetProjectId) {
      setDraggedProject(null);
      return;
    }

    const draggedIndex = projects.findIndex(p => p.id === draggedProject);
    const targetIndex = projects.findIndex(p => p.id === targetProjectId);

    if (draggedIndex === -1 || targetIndex === -1) {
      setDraggedProject(null);
      return;
    }

    const newProjects = [...projects];
    const [draggedItem] = newProjects.splice(draggedIndex, 1);
    newProjects.splice(targetIndex, 0, draggedItem);

    setProjects(newProjects);
    setDraggedProject(null);
    addNotification('success', 'Project order updated');
  };

  const uploadPhoto = async (file: File, index: number, projectId: string) => {
    const fileId = `${Date.now()}-${index}`;
    
    try {
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
          project_id: projectId,
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

  const uploadMultiplePhotos = async (files: FileList, projectId: string) => {
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
        await uploadPhoto(validFiles[i], i, projectId);
        successCount++;
      } catch (err) {
        errorCount++;
        const message = err instanceof Error ? err.message : 'Unknown error';
        addNotification('error', `Failed to upload ${validFiles[i].name}: ${message}`);
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

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>, projectId: string) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      uploadMultiplePhotos(files, projectId);
    }
    // Reset input value to allow selecting the same files again
    event.target.value = '';
  };

  const handleFileDrop = (event: React.DragEvent<HTMLDivElement>, projectId: string) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      uploadMultiplePhotos(files, projectId);
    }
  };

  const handleFileDragOver = (event: React.DragEvent<HTMLDivElement>) => {
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

  const handleEditProjectInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!editProjectData) return;
    
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setEditProjectData({
      ...editProjectData,
      [e.target.name]: value
    });
  };

  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  // Get photos for a specific project
  const getProjectPhotos = (projectId: string) => {
    return photos.filter(photo => photo.project_id === projectId);
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

  // Photo Manager Modal Component
  const PhotoManagerModal = ({ projectId }: { projectId: string }) => {
    const project = projects.find(p => p.id === projectId);
    const projectPhotos = getProjectPhotos(projectId);

    if (!project) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Manage Photos</h2>
              <p className="text-gray-600">{project.title} - {project.location}</p>
            </div>
            <button
              onClick={() => setShowPhotoManager(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            {/* Upload Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Photos</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="photo-title" className="block text-sm font-medium text-gray-700 mb-2">
                      Photo Title Template
                    </label>
                    <input
                      type="text"
                      id="photo-title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Kitchen Installation (leave empty for auto-naming)"
                    />
                  </div>

                  <div>
                    <label htmlFor="photo-category" className="block text-sm font-medium text-gray-700 mb-2">
                      Photo Category
                    </label>
                    <select
                      id="photo-category"
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
                    <label htmlFor="photo-description" className="block text-sm font-medium text-gray-700 mb-2">
                      Description (Optional)
                    </label>
                    <textarea
                      id="photo-description"
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
                    onDrop={(e) => handleFileDrop(e, projectId)}
                    onDragOver={handleFileDragOver}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => handleFileSelect(e, projectId)}
                      disabled={uploading}
                      className="hidden"
                      id={`photo-upload-${projectId}`}
                    />
                    <label
                      htmlFor={`photo-upload-${projectId}`}
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

            {/* Existing Photos */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Current Photos ({projectPhotos.length})
                </h3>
              </div>
              
              {projectPhotos.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No photos uploaded for this project yet</p>
                  <p className="text-sm text-gray-500">Upload your first photos using the form above</p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {projectPhotos.map((photo) => (
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
                        <h4 className="font-medium text-gray-900 text-sm truncate">
                          {photo.title}
                        </h4>
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
      </div>
    );
  };

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
      
      {/* Photo Manager Modal */}
      {showPhotoManager && (
        <PhotoManagerModal projectId={showPhotoManager} />
      )}
      
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
              <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-600'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-600'}`}
                >
                  <List className="w-4 h-4" />
                </button>
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

          {/* Projects List */}
          <div className="space-y-4">
            {projects.length === 0 ? (
              <div className="text-center py-12">
                <FolderPlus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No projects created yet</p>
                <p className="text-sm text-gray-500">Create your first project to get started</p>
              </div>
            ) : (
              projects.map((project) => {
                const projectPhotos = getProjectPhotos(project.id);
                const isEditing = editingProject === project.id;
                const isDragging = draggedProject === project.id;

                return (
                  <div
                    key={project.id}
                    className={`bg-white border border-gray-200 rounded-lg p-4 transition-all duration-200 ${
                      isDragging ? 'opacity-50 scale-95' : 'hover:shadow-md'
                    }`}
                    draggable={!isEditing}
                    onDragStart={(e) => handleDragStart(e, project.id)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, project.id)}
                  >
                    {isEditing && editProjectData ? (
                      // Edit Mode
                      <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Project Title *
                            </label>
                            <input
                              type="text"
                              name="title"
                              value={editProjectData.title}
                              onChange={handleEditProjectInputChange}
                              required
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Location
                            </label>
                            <input
                              type="text"
                              name="location"
                              value={editProjectData.location}
                              onChange={handleEditProjectInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Category
                            </label>
                            <select
                              name="category"
                              value={editProjectData.category}
                              onChange={handleEditProjectInputChange}
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
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Completion Date
                            </label>
                            <input
                              type="date"
                              name="completion_date"
                              value={editProjectData.completion_date}
                              onChange={handleEditProjectInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Description
                            </label>
                            <textarea
                              name="description"
                              value={editProjectData.description}
                              onChange={handleEditProjectInputChange}
                              rows={3}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                name="featured"
                                checked={editProjectData.featured}
                                onChange={handleEditProjectInputChange}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              />
                              <span className="text-sm font-medium text-gray-700">Featured Project</span>
                            </label>
                          </div>
                        </div>
                        <div className="flex space-x-3">
                          <button
                            onClick={saveEditProject}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                          >
                            <Save className="w-4 h-4" />
                            <span>Save Changes</span>
                          </button>
                          <button
                            onClick={cancelEditProject}
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      // View Mode
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          {!isEditing && (
                            <div className="text-gray-400 cursor-move">
                              <GripVertical className="w-5 h-5" />
                            </div>
                          )}
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                              <button
                                onClick={() => toggleFeatured(project.id, !project.featured)}
                                className={`transition-colors ${
                                  project.featured ? 'text-yellow-500' : 'text-gray-300 hover:text-yellow-400'
                                }`}
                              >
                                <Star className={`w-5 h-5 ${project.featured ? 'fill-current' : ''}`} />
                              </button>
                              <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                {categories.find(cat => cat.value === project.category)?.label || project.category}
                              </span>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span>{project.location}</span>
                              {project.completion_date && (
                                <span>Completed: {new Date(project.completion_date).toLocaleDateString()}</span>
                              )}
                              <span>{projectPhotos.length} photos</span>
                            </div>
                            {project.description && (
                              <p className="text-gray-600 mt-2">{project.description}</p>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setShowPhotoManager(project.id)}
                            className="flex items-center space-x-2 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors"
                          >
                            <Camera className="w-4 h-4" />
                            <span>Manage Photos</span>
                          </button>
                          <button
                            onClick={() => startEditProject(project)}
                            className="flex items-center space-x-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                            <span>Edit</span>
                          </button>
                          <div className="flex flex-col space-y-1">
                            <button
                              onClick={() => moveProject(project.id, 'up')}
                              disabled={projects.findIndex(p => p.id === project.id) === 0}
                              className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                              <ChevronUp className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => moveProject(project.id, 'down')}
                              disabled={projects.findIndex(p => p.id === project.id) === projects.length - 1}
                              className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                              <ChevronDown className="w-4 h-4" />
                            </button>
                          </div>
                          <button
                            onClick={() => deleteProject(project.id)}
                            className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoUpload;